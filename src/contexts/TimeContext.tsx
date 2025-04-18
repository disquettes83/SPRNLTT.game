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
    
    // Apply effects after modal is closed
    if (currentEvent && profile) {
      // Effects are now applied directly when the event is generated 
      // through applyEventToProfile in the handleRandomEvent function
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
        // Apply the event to the profile and capture all effects
        const { updatedProfile, appliedEffects } = applyEventToProfile(profile, event);
        
        // Update the profile
        setProfile(updatedProfile);
        
        // Store event and effects in state for the modal
        setCurrentEvent(event);
        setEventKarmaEffect(appliedEffects.karmaEffect);
        setEventMoneyEffect(appliedEffects.moneyEffect);
        setEventHealthEffect(appliedEffects.healthEffect);
        setEventDebtEffect(appliedEffects.debtEffect);
        setEventAddictionEffect(appliedEffects.addictionEffect);
        setEventSocialEffect(appliedEffects.socialEffect);
        setEventLifeEvents(appliedEffects.lifeEvents);
        
        // Show modal
        setShowEventModal(true);
      }
    }
    
    // Check for dream events only on draw days
    if (isDrawDay && shouldDreamEventOccur()) {
      const dreamEvent = getRandomDreamEvent(profile);
      if (dreamEvent) {
        setCurrentEvent(dreamEvent);
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
      const { death, deathEvent } = checkPlayerDeath(hasWonJackpot);
      
      // Notify the player about their birthday if they're still alive
      if (!death) {
        toast.info(`Buon compleanno! Ora hai ${profile.age} anni.`);
      } else if (deathEvent) {
        // Handle death
        setDeathEvent(deathEvent);
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
  
  // Advance time by specified number of days (default: 1)
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
      
      // Check for draw day - simula estrazione nazionale solo nei giorni di estrazione
      const newDayOfWeek = getDay(newDate);
      if (DRAW_DAYS.includes(newDayOfWeek)) {
        toast.info(`Oggi c'è l'estrazione del SuperEnaLosso!`, {
          description: `${format(newDate, 'EEEE d MMMM yyyy')}`
        });
        
        // Simula l'estrazione nazionale solo nei giorni di estrazione
        const { drawn, results } = simulateNationalDraw();
        
        // Verifica se c'è stata una vincita del 6 e informa il giocatore tramite toast
        if (results.winners.six > 0) {
          const winAmount = results.winningAmounts.six;
          toast.info(`🎉 Qualcuno ha vinto il jackpot! ${results.winners.six} vincitori, ${winAmount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })} ciascuno.`);
        }
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
