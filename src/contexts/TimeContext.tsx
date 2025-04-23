import React, { createContext, useContext, useState, useEffect } from 'react';
import { format, addDays, isEqual, getDay, isSameDay, addWeeks, addMonths, isFirstDayOfMonth, getMonth } from 'date-fns';
import { usePlayer } from './PlayerContext';
import { toast } from 'sonner';
import { 
  getRandomEvent, 
  shouldEventOccur, 
  applyEventToProfile, 
  getRandomDreamEvent, 
  shouldDreamEventOccur,
  generateTargetedEvent
} from '@/lib/events';
import { incrementAge, checkForDeath, generateChildProfile } from '@/lib/player';
import EventModal from '@/components/EventModal';
import { 
  drawLottoNumbers, 
  simulateNationalResults, 
  NationalResults, 
  getCurrentJackpot,
  setCurrentJackpot
} from '@/lib/lottery';

// Days of the week for lotto draws
const DRAW_DAYS = [2, 4, 5, 6]; // Tuesday, Thursday, Friday, Saturday (0 = Sunday, 1 = Monday, etc.)

interface TimeContextType {
  currentDate: Date;
  advanceTime: (days?: number) => void;
  isDrawDay: boolean;
  nextDrawDate: Date;
  daysUntilNextDraw: number;
  daysUntilSalary: number;
  suggestedNumbers: number[];
  resetSuggestedNumbers: () => void;
  talkedToNPCToday: boolean;
  setTalkedToNPCToday: (talked: boolean) => void;
  resetDailyNPCTalks: () => void;
  lastDrawnNumbers: number[] | null;
  lastNationalResults: NationalResults | null;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Start with January 1, 1990 as the default date
	const [currentDate, setCurrentDate] = useState<Date>(() => {
  	const storedDate = localStorage.getItem('gameCurrentDate');
  // Se non c'è una data salvata, inizia dal 1 gennaio 1990
  	return storedDate ? new Date(storedDate) : new Date(1990, 0, 1);
});
  
  const { profile, modifyBalance, modifyKarma, setProfile, checkPlayerDeath, simulateWeek } = usePlayer();
  
  // State for event modal
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventKarmaEffect, setEventKarmaEffect] = useState<number | undefined>(undefined);
  const [eventMoneyEffect, setEventMoneyEffect] = useState<number | undefined>(undefined);
  const [eventHealthEffect, setEventHealthEffect] = useState<boolean | undefined>(undefined);
  const [eventDebtEffect, setEventDebtEffect] = useState<string | undefined>(undefined);
  const [eventAddictionEffect, setEventAddictionEffect] = useState<number | undefined>(undefined);
  const [eventSocialEffect, setEventSocialEffect] = useState<string | undefined>(undefined);
  const [eventLifeEvents, setEventLifeEvents] = useState<string[] | undefined>(undefined);
  const [suggestedNumbers, setSuggestedNumbers] = useState<number[]>([]);
  
  // State for tracking last month checked for salary and weekly simulations
  const [lastMonthChecked, setLastMonthChecked] = useState<number>(() => {
    return currentDate.getMonth();
  });
  
  const [lastWeekChecked, setLastWeekChecked] = useState<number>(() => {
    // Simplified week number calculation (days since start of year / 7)
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const daysSinceStartOfYear = Math.floor((currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.floor(daysSinceStartOfYear / 7);
  });
  
  // State for tracking years passed for aging
  const [lastYearChecked, setLastYearChecked] = useState<number>(() => {
    return currentDate.getFullYear();
  });
  
  // State for tracking death events
  const [deathEvent, setDeathEvent] = useState<any>(null);
  const [showDeathModal, setShowDeathModal] = useState<boolean>(false);
  const [hasWonJackpot, setHasWonJackpot] = useState<boolean>(false);
  
  // State for NPC interactions
  const [talkedToNPCToday, setTalkedToNPCToday] = useState<boolean>(false);
  
  // Nuovi stati per tenere traccia delle estrazioni nazionali
  const [lastDrawnNumbers, setLastDrawnNumbers] = useState<number[] | null>(null);
  const [lastNationalResults, setLastNationalResults] = useState<NationalResults | null>(null);
  
  // Save current date to localStorage when it changes
  useEffect(() => {
    if (currentDate) {
      localStorage.setItem('gameCurrentDate', currentDate.toISOString());
    }
  }, [currentDate]);
  
  // Check if today is a draw day
  const isDrawDay = DRAW_DAYS.includes(getDay(currentDate));
  
  // Calculate next draw date
  const getNextDrawDate = (): Date => {
    let testDate = new Date(currentDate);
    let daysChecked = 0;
    
    while (daysChecked < 7) {
      testDate = addDays(testDate, 1);
      daysChecked++;
      if (DRAW_DAYS.includes(getDay(testDate))) {
        return testDate;
      }
    }
    
    // Fallback (shouldn't happen)
    return addDays(currentDate, 1);
  };
  
  const nextDrawDate = getNextDrawDate();
  
  // Calculate days until next draw
  const calculateDaysUntil = (targetDate: Date): number => {
    let tempDate = new Date(currentDate);
    let days = 0;
    
    while (!isSameDay(tempDate, targetDate)) {
      tempDate = addDays(tempDate, 1);
      days++;
      
      if (days > 7) return 7; // Safeguard
    }
    
    return days;
  };
  
  const daysUntilNextDraw = calculateDaysUntil(nextDrawDate);
  
  // Calculate days until next salary payment (first day of month)
  const getNextSalaryDate = (): Date => {
    if (isFirstDayOfMonth(currentDate)) return currentDate;
    
    let nextMonth = addMonths(currentDate, 1);
    return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
  };
  
  const nextSalaryDate = getNextSalaryDate();
  const daysUntilSalary = calculateDaysUntil(nextSalaryDate);
  
  // Reset suggested numbers
  const resetSuggestedNumbers = () => {
    setSuggestedNumbers([]);
  };
  
  // Funzione per resettare esplicitamente i flag delle conversazioni NPC
  const resetDailyNPCTalks = () => {
    setTalkedToNPCToday(false);
  };
  
  // Funzione per simulare un'estrazione nazionale solo nei giorni di estrazione
const simulateNationalDraw = (): { drawn: number[], results: NationalResults } => {
  // Utilizziamo la data corrente (che è il giorno di estrazione) per il log
  console.log(`Simulazione estrazione nazionale per il giorno ${format(currentDate, 'dd/MM/yyyy')}`);
  
  // Estrazione dei numeri
  const drawn = drawLottoNumbers();
  setLastDrawnNumbers(drawn);
  
  // Simula i risultati nazionali
  const results = simulateNationalResults(drawn);
  setLastNationalResults(results);
  
  // Aggiorna il jackpot globale
  setCurrentJackpot(results.jackpot);
  
  return { drawn, results };
};
  
  // Handle event modal close
  const handleEventModalClose = () => {
    setShowEventModal(false);
    
    // APPLICA GLI EFFETTI QUI, dopo la chiusura del modale
    if (currentEvent && profile) {
      console.log('Applicazione effetti dopo chiusura modale');
      
      // Applica gli effetti monetari e karma mediante le funzioni esistenti
      if (eventKarmaEffect !== undefined) {
        modifyKarma(eventKarmaEffect);
      }
      
      if (eventMoneyEffect !== undefined) {
        modifyBalance(eventMoneyEffect);
      }
      
      // Per gli altri effetti più complessi, dobbiamo chiamare applyEventToProfile
      // ma prima rimuoviamo karma e money per evitare doppia applicazione
      let eventWithoutKarmaAndMoney = { ...currentEvent };
      delete eventWithoutKarmaAndMoney.karmaEffect;
      delete eventWithoutKarmaAndMoney.moneyEffect;
      
      // Verifica se ci sono altri effetti da applicare
      if (eventHealthEffect || eventDebtEffect || eventAddictionEffect || 
          eventSocialEffect || (eventLifeEvents && eventLifeEvents.length > 0)) {
        // Applica gli effetti rimanenti
        const { updatedProfile } = applyEventToProfile(profile, eventWithoutKarmaAndMoney);
        setProfile(updatedProfile);
      }
    }
    
    // Reset event state
    setCurrentEvent(null);
    setEventKarmaEffect(undefined);
    setEventMoneyEffect(undefined);
    setEventHealthEffect(undefined);
    setEventDebtEffect(undefined);
    setEventAddictionEffect(undefined);
    setEventSocialEffect(undefined);
    setEventLifeEvents(undefined);
  };
  
  // Handle death modal close
  const handleDeathModalClose = (continueWithChild: boolean) => {
    setShowDeathModal(false);
    
    if (continueWithChild && profile && profile.hasChildren) {
      // Generate child profile and continue
      const childProfile = generateChildProfile(profile);
      setProfile(childProfile);
      toast.info(`${childProfile.name} continua la ricerca della giocata fortunata del genitore.`);
    } else {
      // Game over - reset profile
      localStorage.removeItem('playerProfile');
      setProfile(null);
      toast.info("Game Over. Inizia una nuova partita.");
    }
    
    // Reset death event state
    setDeathEvent(null);
  };
  
  // Handle accepting suggested numbers from dream events
  const handleAcceptSuggestedNumbers = (numbers: number[]) => {
    // Reset previous suggestions before adding new ones
    setSuggestedNumbers(numbers);
    toast.success(`Numeri suggeriti dal sogno aggiunti: ${numbers.join(', ')}`);
  };
  
  // Procedura per gestire un evento casuale
  const handleRandomEvent = () => {
    if (!profile) return;
    
    // Verifichiamo se deve verificarsi un evento
    if (shouldEventOccur()) {
      // Try to get a targeted event first
      let event = generateTargetedEvent(profile);
      
      // If no targeted event, get a random one
      if (!event) {
        event = getRandomEvent(profile);
      }
      
      if (event) {
        // CAMBIAMENTO CRITICO: NON chiamare applyEventToProfile qui!
        // Invece, calcoliamo solo quali sarebbero gli effetti
  
        // Memorizza evento e effetti potenziali
        setCurrentEvent(event);
        setEventKarmaEffect(event.karmaEffect);
        setEventMoneyEffect(event.moneyEffect);
        
        // Per gli altri effetti più complessi, dobbiamo determinare manualmente
        // se sarebbero stati applicati
        setEventHealthEffect(event.healthEffect ? true : undefined);
        setEventDebtEffect(event.debtEffect ? 
            (event.debtEffect.type === 'increase' ? `Aumentato a ${event.debtEffect.amount}` : 
             event.debtEffect.type === 'decrease' ? `Ridotto a ${event.debtEffect.amount}` : undefined) 
            : undefined);
        setEventAddictionEffect(event.addictionEffect ?
            (event.addictionEffect.type === 'new' || event.addictionEffect.type === 'worsen' ? 
             event.addictionEffect.severityChange : 
             event.addictionEffect.type === 'improve' ? 
             -(event.addictionEffect.severityChange || 1) : undefined)
            : undefined);
        setEventSocialEffect(event.socialStatusEffect ?
            (event.socialStatusEffect.type === 'improve' ? 
             `Miglioramento a ${event.socialStatusEffect.newStatus || 'stato superiore'}` :
             event.socialStatusEffect.type === 'worsen' ?
             `Declassamento a ${event.socialStatusEffect.newStatus || 'stato inferiore'}` : undefined)
            : undefined);
        setEventLifeEvents(event.lifeEvents);
        
        // Mostra il modale
        setShowEventModal(true);
      }
    }
    
    // Check for dream events only on draw days
    if (isDrawDay && shouldDreamEventOccur()) {
      const dreamEvent = getRandomDreamEvent(profile);
      if (dreamEvent) {
        setCurrentEvent(dreamEvent);
        
        // Per i sogni, di solito non ci sono effetti da applicare immediatamente
        // ma potremmo avere dei numeri suggeriti
        setEventKarmaEffect(dreamEvent.karmaEffect);
        setEventMoneyEffect(dreamEvent.moneyEffect);
        setEventHealthEffect(undefined);
        setEventDebtEffect(undefined);
        setEventAddictionEffect(undefined);
        setEventSocialEffect(undefined);
        setEventLifeEvents(dreamEvent.lifeEvents);
        
        setShowEventModal(true);
      }
    }
  };
  
  // Check for aging and death
  const checkAgingAndDeath = (newDate: Date) => {
    if (!profile) return;
    
    // Check if a year has passed
    const currentYear = newDate.getFullYear();
    if (currentYear > lastYearChecked) {
      // Use the Player Context's method for aging
      const { died, event } = checkPlayerDeath(hasWonJackpot);
      
      // Notify the player about their birthday if they're still alive
      if (!died) {
        toast.info(`Buon compleanno! Ora hai ${profile.age} anni.`);
      } else if (event) {
        // Handle death
        setDeathEvent(event);
        setShowDeathModal(true);
      }
      
      setLastYearChecked(currentYear);
    }
  };
  
  // Check for weekly simulation
  const checkWeeklySimulation = (newDate: Date) => {
    if (!profile) return;
    
    // Calculate current week
    const startOfYear = new Date(newDate.getFullYear(), 0, 1);
    const daysSinceStartOfYear = Math.floor((newDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const currentWeek = Math.floor(daysSinceStartOfYear / 7);
    
    // Check if a week has passed
    if (currentWeek !== lastWeekChecked) {
      // Use the Player Context's method for weekly simulation
      const weekImpact = simulateWeek();
      
      // Notify the player about significant events
      if (weekImpact.events.length > 0) {
        const eventString = weekImpact.events.length > 1 
          ? `${weekImpact.events[0]} e altri eventi...` 
          : weekImpact.events[0];
          
        toast.info(`Questa settimana: ${eventString}`);
      }
      
      // Update finances notification
      const netChange = weekImpact.balanceChange;
      if (netChange !== 0) {
        if (netChange > 0) {
          toast.success(`Bilancio settimanale: +${netChange.toFixed(2)}€`);
        } else {
          toast.error(`Bilancio settimanale: ${netChange.toFixed(2)}€`);
        }
      }
      
      // Notify about karma changes
      if (weekImpact.karmaChange !== 0) {
        if (weekImpact.karmaChange > 0) {
          toast.success(`Il tuo karma è migliorato! (+${weekImpact.karmaChange})`);
        } else {
          toast.error(`Il tuo karma è peggiorato... (${weekImpact.karmaChange})`);
        }
      }
      
      setLastWeekChecked(currentWeek);
    }
  };
  
  // Check for monthly salary and expenses
  const checkMonthlySalaryAndExpenses = (newDate: Date) => {
    if (!profile) return;
    
    // Check if a month has passed
    const currentMonth = getMonth(newDate);
    if (currentMonth !== lastMonthChecked || isFirstDayOfMonth(newDate)) {
      // Handle monthly income and expenses
      if (profile.employment !== 'disoccupato') {
        const salary = profile.weeklyIncome * 4; // Monthly income
        const expenses = profile.fixedExpenses * 4; // Monthly expenses
        const variableExpenses = profile.variableExpenses * 4; // Monthly variable expenses
        const net = salary - expenses - variableExpenses;
        
        // Apply to balance
        modifyBalance(net);
        
        // Show toast messages
        if (profile.employment === 'pensionato') {
          toast.success(`Hai ricevuto la pensione: +${salary.toFixed(2)}€`);
        } else {
          toast.success(`Hai ricevuto lo stipendio: +${salary.toFixed(2)}€`);
        }
        
        toast.info(`Spese fisse mensili: -${expenses.toFixed(2)}€`);
        
        if (variableExpenses > 0) {
          toast.info(`Spese variabili mensili: -${variableExpenses.toFixed(2)}€`);
        }
        
        if (net > 0) {
          toast.success(`Bilancio netto: +${net.toFixed(2)}€`);
        } else {
          toast.error(`Bilancio netto: ${net.toFixed(2)}€`);
        }
        
        // Check for hidden income
        if (profile.hiddenIncome && profile.hiddenIncome > 0) {
          const monthlyHiddenIncome = profile.hiddenIncome * 4;
          modifyBalance(monthlyHiddenIncome);
          toast.info(`Entrate extra non dichiarate: +${monthlyHiddenIncome.toFixed(2)}€`, {
            description: "Meglio non chiedere da dove vengono questi soldi..."
          });
        }
      } else {
        // For unemployed players
        const expenses = profile.fixedExpenses * 4; // Monthly expenses
        const variableExpenses = profile.variableExpenses * 4; // Monthly variable expenses
        const net = -(expenses + variableExpenses);
        
        // Apply to balance
        modifyBalance(net);
        
        toast.error(`Non hai un'entrata fissa mensile.`);
        toast.info(`Spese mensili totali: -${(expenses + variableExpenses).toFixed(2)}€`);
        
        // Check for hidden income for unemployed people
        if (profile.hiddenIncome && profile.hiddenIncome > 0) {
          const monthlyHiddenIncome = profile.hiddenIncome * 4;
          modifyBalance(monthlyHiddenIncome);
          toast.info(`Entrate extra non dichiarate: +${monthlyHiddenIncome.toFixed(2)}€`, {
            description: "Come fai a sopravvivere? Meglio non fare domande..."
          });
        }
      }
      
      setLastMonthChecked(currentMonth);
    }
  };
  
  // La modifica da fare sostituisce il blocco attuale con questo:
const advanceTime = (days: number = 1) => {
  let newDate = currentDate;
  let remainingDays = days;
  
  // Reset suggested numbers when advancing time
  resetSuggestedNumbers();
  
  // Reset del flag quando cambia il giorno
  if (days > 0) {
    setTalkedToNPCToday(false);
  }
  
  // Handle one day at a time to check for events
  while (remainingDays > 0) {
    // Verifica se il giorno ATTUALE è un giorno di estrazione
    // prima di avanzare al giorno successivo
    const currentDayOfWeek = getDay(newDate);
    const isDrawDayToday = DRAW_DAYS.includes(currentDayOfWeek);
    
    // Avanza al giorno successivo
    newDate = addDays(newDate, 1);
    remainingDays--;
    
    // Check for aging and death
    checkAgingAndDeath(newDate);
    
    // If player died, stop advancing time
    if (showDeathModal) break;
    
    // Check for weekly simulation
    checkWeeklySimulation(newDate);
    
    // Check for monthly salary and expenses
    checkMonthlySalaryAndExpenses(newDate);
    
    // Verifica se il giorno precedente era un giorno di estrazione
    // Questa è la parte cruciale: ora controlliamo se il giorno PRECEDENTE era un giorno di estrazione
    if (isDrawDayToday) {
      const previousDate = addDays(newDate, -1); // Data del giorno precedente (giorno dell'estrazione)
      
      // Simula l'estrazione nazionale
      // Nota: simulateNationalDraw richiama simulateNationalResults che aggiorna il jackpot
      const { drawn, results } = simulateNationalDraw();
      
      // Verifica se c'è stata una vincita del 6 e informa il giocatore tramite toast
      if (results.winners.six > 0) {
        const winAmount = results.winningAmounts.six;
        toast.info(`🎉 Qualcuno ha vinto il jackpot! ${results.winners.six} vincitori, ${winAmount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })} ciascuno.`);
      }
      
      // IMPORTANTE: Qui non facciamo altro - il jackpot è già stato aggiornato in simulateNationalResults
    }
    
    // Gestione evento casuale per ogni giorno
    handleRandomEvent();
  }
  
  setCurrentDate(newDate);
};
  
  // Set hasWonJackpot when player wins the jackpot
  const setJackpotWon = (won: boolean) => {
    setHasWonJackpot(won);
  };
  
  const value = {
    currentDate,
    advanceTime,
    isDrawDay,
    nextDrawDate,
    daysUntilNextDraw,
    daysUntilSalary,
    suggestedNumbers,
    resetSuggestedNumbers,
    talkedToNPCToday,
    setTalkedToNPCToday,
    resetDailyNPCTalks,
    lastDrawnNumbers,
    lastNationalResults
  };
  
  return (
    <TimeContext.Provider value={value}>
      {children}
      
      {/* Event Modal */}
      <EventModal
        event={currentEvent}
        open={showEventModal}
        onClose={handleEventModalClose}
        karmaEffect={eventKarmaEffect}
        moneyEffect={eventMoneyEffect}
        healthEffect={eventHealthEffect}
        debtEffect={eventDebtEffect}
        addictionEffect={eventAddictionEffect}
        socialEffect={eventSocialEffect}
        lifeEvents={eventLifeEvents}
        onAcceptSuggestedNumbers={handleAcceptSuggestedNumbers}
      />
      
      {/* Death Modal */}
      {deathEvent && (
        <DeathModal
          event={deathEvent}
          open={showDeathModal}
          onClose={handleDeathModalClose}
          hasChildren={profile?.hasChildren || false}
        />
      )}
    </TimeContext.Provider>
  );
};

// Death Modal Component
interface DeathModalProps {
  event: any;
  open: boolean;
  onClose: (continueWithChild: boolean) => void;
  hasChildren: boolean;
}

const DeathModal: React.FC<DeathModalProps> = ({ event, open, onClose, hasChildren }) => {
  if (!open || !event) return null;
  
  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-red-600">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {event.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 text-center">
          <p className="text-lg font-semibold mb-4">Game Over</p>
          
          {hasChildren && (
            <p className="mb-4">
              Vuoi che tuo figlio continui la ricerca della giocata fortunata?
            </p>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => onClose(false)}
            className="flex-1"
          >
            Nuova Partita
          </Button>
          
          {hasChildren && (
            <Button 
              onClick={() => onClose(true)}
              className="flex-1"
            >
              Continua con tuo figlio
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const useTime = (): TimeContextType => {
  const context = useContext(TimeContext);
  
  if (context === undefined) {
    throw new Error('useTime must be used within a TimeProvider');
  }
  
  return context;
};
