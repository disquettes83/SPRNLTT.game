import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import LottoTicket from '@/components/LottoTicket';
import DrawResults from '@/components/DrawResults';
import StatsPanel from '@/components/StatsPanel';
import { 
  drawLottoNumbers, 
  calculateWinnings, 
  simulateNationalResults, 
  NationalResults,
  getCurrentJackpot,
  AVERAGE_TICKETS_PER_DRAW, 
  TICKET_COST, 
  TOTAL_PRIZE_PERCENTAGE,
  PRIZE_DISTRIBUTION,
  simulateWinners
  // Rimuovi simulateWinners da qui
} from '@/lib/lottery';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, RotateCcw, Newspaper, Calendar } from 'lucide-react';
import ProfileCreation from '@/components/ProfileCreation';
import PlayerProfile from '@/components/PlayerProfile';
import GameCalendar from '@/components/GameCalendar';
import { usePlayer } from '@/contexts/PlayerContext';
import { useTime } from '@/contexts/TimeContext';
import { confetti } from '@/lib/confetti';
import EventModal from '@/components/EventModal';
import JackpotWinModal from '@/components/JackpotWinModal';
import NewspaperModal from '@/components/NewspaperModal';
import NPCSection from '@/components/NPCSection';
import { getHeadlineForDate } from '@/lib/newspaper';
import { 
  getRandomEvent, 
  shouldEventOccur, 
  getRandomDreamEvent, 
  shouldDreamEventOccur,
  generateTargetedEvent,
  applyEventToProfile
} from '@/lib/events';
import { getRandomFunFact } from '@/lib/utils';
import { 
  calculateCombinations, 
  generateAllCombinations, 
  getCombinationsInfo 
} from '@/lib/lotteryUtils';


const Index = () => {
  const { profile, playTicket, addWinning, modifyKarma, modifyBalance, resetProfile, setProfile, checkPlayerDeath, ageOneYear, simulateWeek } = usePlayer();
  const { 
    currentDate, 
    isDrawDay, 
    advanceTime, 
    daysUntilNextDraw, 
    suggestedNumbers, 
    resetSuggestedNumbers,
    lastDrawnNumbers,
    lastNationalResults
  } = useTime();
  
  const [playerNumbers, setPlayerNumbers] = useState<number[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [jackpot, setJackpot] = useState(getCurrentJackpot());
  const [nationalResults, setNationalResults] = useState<NationalResults | null>(null);
  
  // Event modal state
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventKarmaEffect, setEventKarmaEffect] = useState<number | undefined>(undefined);
  const [eventMoneyEffect, setEventMoneyEffect] = useState<number | undefined>(undefined);
  const [eventHealthEffect, setEventHealthEffect] = useState<boolean | undefined>(undefined);
  const [eventDebtEffect, setEventDebtEffect] = useState<string | undefined>(undefined);
  const [eventAddictionEffect, setEventAddictionEffect] = useState<number | undefined>(undefined);
  const [eventSocialEffect, setEventSocialEffect] = useState<string | undefined>(undefined);
  const [eventLifeEvents, setEventLifeEvents] = useState<string[] | undefined>(undefined);
  
  // Newspaper modal state
  const [showNewspaperModal, setShowNewspaperModal] = useState(false);
  const [currentHeadline, setCurrentHeadline] = useState<{title: string, content: string}>({
    title: "",
    content: ""
  });
  
  // Jackpot win modal state
  const [showJackpotWinModal, setShowJackpotWinModal] = useState(false);
  const [jackpotWinners, setJackpotWinners] = useState(0);
  const [jackpotWinAmount, setJackpotWinAmount] = useState(0);
  
  // Statistiche salvate in local storage
  const [moneySpent, setMoneySpent] = useState(0);
  const [moneyWon, setMoneyWon] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const [funFact, setFunFact] = useState("");

  useEffect(() => {
    setFunFact(getRandomFunFact());
  }, []);
  
  // Effetto per aggiornare il jackpot quando lastNationalResults cambia
  useEffect(() => {
    if (lastNationalResults) {
      setJackpot(lastNationalResults.jackpot);
      
      // Se c'è stata un'estrazione con vincita del 6 mentre il giocatore non era presente
      if (lastNationalResults.winners.six > 0) {
        setJackpotWinners(lastNationalResults.winners.six);
        setJackpotWinAmount(lastNationalResults.winningAmounts.six);
        
        // Mostra il modal dopo un breve ritardo
        setTimeout(() => {
          setShowJackpotWinModal(true);
        }, 1000);
      }
    }
  }, [lastNationalResults]);
  
  // Update player numbers when suggested numbers change
  useEffect(() => {
    if (suggestedNumbers && suggestedNumbers.length > 0) {
      setPlayerNumbers(prev => {
        // Create a copy of the current selection
        const newSelection = [...prev];
        
        // Add suggested numbers if there's space
        for (const num of suggestedNumbers) {
          if (!newSelection.includes(num) && newSelection.length < 6) {
            newSelection.push(num);
          }
        }
        
        return newSelection;
      });
    }
  }, [suggestedNumbers]);
  
  // Carica statistiche da local storage
  useEffect(() => {
    try {
      const stats = localStorage.getItem('lottoStats');
      if (stats) {
        const { spent, won, games } = JSON.parse(stats);
        setMoneySpent(spent);
        setMoneyWon(won);
        setGamesPlayed(games);
      }
    } catch (error) {
      console.error('Errore nel caricamento delle statistiche', error);
    }
  }, []);
  
  // Salva statistiche in local storage
  useEffect(() => {
    if (gamesPlayed > 0) {
      localStorage.setItem('lottoStats', JSON.stringify({
        spent: moneySpent,
        won: moneyWon,
        games: gamesPlayed
      }));
    }
  }, [moneySpent, moneyWon, gamesPlayed]);
  
  // Handle event modal close
  const handleEventModalClose = () => {
    if (profile) {
      console.log('Chiusura modale evento in Index.tsx');
    }
    
    setShowEventModal(false);
    
    // Applica gli effetti qui
    if (currentEvent && profile) {
      // Applica karma e effetti monetari
      if (eventKarmaEffect !== undefined) {
        modifyKarma(eventKarmaEffect);
      }
      
      if (eventMoneyEffect !== undefined) {
        modifyBalance(eventMoneyEffect);
      }
      
      // Per altri effetti complessi, stesso approccio di TimeContext.tsx
      let eventWithoutKarmaAndMoney = { ...currentEvent };
      delete eventWithoutKarmaAndMoney.karmaEffect;
      delete eventWithoutKarmaAndMoney.moneyEffect;
      
      if (eventHealthEffect || eventDebtEffect || eventAddictionEffect || 
          eventSocialEffect || (eventLifeEvents && eventLifeEvents.length > 0)) {
        const { updatedProfile } = applyEventToProfile(profile, eventWithoutKarmaAndMoney);
        setProfile(updatedProfile);
      }
    }
    
    // Reset dell'evento
    setCurrentEvent(null);
    setEventKarmaEffect(undefined);
    setEventMoneyEffect(undefined);
    setEventHealthEffect(undefined);
    setEventDebtEffect(undefined);
    setEventAddictionEffect(undefined);
    setEventSocialEffect(undefined);
    setEventLifeEvents(undefined);
  };
  
  // Handle jackpot win modal close
  const handleJackpotWinModalClose = () => {
    setShowJackpotWinModal(false);
    
    // Check if player won the jackpot and if it causes death
    if (profile && winAmount > 1000000) {
      const { died, event } = checkPlayerDeath(true); // true means they won jackpot
      
      if (died && event) {
        // Handle player death after jackpot win
        setTimeout(() => {
          setCurrentEvent(event);
          setShowEventModal(true);
          toast.error(`Tragedia: ${profile.name} è morto dopo aver vinto il jackpot!`);
        }, 1000);
      }
    }
  };
  
  // Handle newspaper modal
  const handleOpenNewspaper = () => {
    // Get headline for current date
    const headline = getHeadlineForDate(currentDate);
    setCurrentHeadline(headline);
    setShowNewspaperModal(true);
  };
  
  const handleCloseNewspaper = () => {
    setShowNewspaperModal(false);
  };
  
  // Handle accepting suggested numbers from dream events
  const handleAcceptSuggestedNumbers = (numbers: number[]) => {
    // This function is no longer needed as we're using the context version
    // But we'll keep it for compatibility with EventModal
  };
  
  // Avanza il tempo di un giorno
  const handleAdvanceDay = () => {
    // Avanza il tempo di un giorno
    advanceTime(1);
    
    // Aggiorna il jackpot e verifica le vincite nazionali
    if (lastNationalResults) {
      setJackpot(lastNationalResults.jackpot);
      
      // Se c'è stata un'estrazione con vincita del 6
      if (lastNationalResults.winners.six > 0) {
        setJackpotWinners(lastNationalResults.winners.six);
        setJackpotWinAmount(lastNationalResults.winningAmounts.six);
        
        // Mostra il modal dopo un breve ritardo
        setTimeout(() => {
          setShowJackpotWinModal(true);
        }, 1000);
      }
    }
  };
  
  // Advances a year and checks for aging effects
  const handleAdvanceYear = () => {
    if (profile) {
      // Age the player and check for death
      const { death, deathEvent } = ageOneYear();
      
      if (death && deathEvent) {
        // Handle player death
        setCurrentEvent(deathEvent);
        setShowEventModal(true);
        toast.error(`${profile.name} è morto all'età di ${profile.age} anni.`);
        
        // After player death, show a dialog to continue with a new generation
        setTimeout(() => {
          if (confirm(`${profile.name} è morto. Vuoi continuare con la prossima generazione?`)) {
            // Generate child profile from parent
            const { generateChildProfileFromParent } = usePlayer();
            generateChildProfileFromParent();
            toast.success(`Continui l'avventura con il figlio di ${profile.name}!`);
          }
        }, 3000);
      } else {
        toast.success(`Un altro anno è passato. ${profile.name} ora ha ${profile.age} anni.`);
      }
    }
  };
  
  // Gestisce la giocata
  const handlePlay = async (numbers: number[], combinations: number) => {
    // Verifica che il giocatore abbia abbastanza soldi
    const combinationsCost = getCombinationsInfo(numbers.length).cost;
    
    if (profile && profile.balance < combinationsCost) {
      toast.error(`Non hai abbastanza soldi per giocare! Questa giocata costa ${combinationsCost.toFixed(2)}€`);
      return;
    }
    
    // Verifica che sia un giorno di estrazione
    if (!isDrawDay) {
      toast.error("Oggi non c'è estrazione! Torna in ricevitoria domani.");
      return;
    }
    
    setPlayerNumbers(numbers);
    setDrawnNumbers(null);
    setIsDrawing(true);
    setWinAmount(0);
    setNationalResults(null);
    
    // Aggiorna il profilo del giocatore
    if (profile) {
      playTicket(combinationsCost);
    }
    
    // Aggiorna le statistiche generali
    setMoneySpent(prev => prev + combinationsCost);
    setGamesPlayed(prev => prev + 1);
    
    // Simula l'attesa dell'estrazione
    toast.info('Estrazione in corso...');
    
    setTimeout(() => {
      // Estrazione dei numeri
      const drawn = drawLottoNumbers();
      setDrawnNumbers(drawn);
      
      // Usa i numeri estratti e simula i risultati senza modificare il jackpot
      const winners = simulateWinners();
      
      // Calcola gli importi delle vincite per categoria
      const totalTickets = Math.round(AVERAGE_TICKETS_PER_DRAW * (0.85 + Math.random() * 0.3));
      const totalPrize = totalTickets * TICKET_COST * TOTAL_PRIZE_PERCENTAGE;
      
      const winningAmounts = {
        six: winners.six > 0 ? jackpot / winners.six : 0,
        five: winners.five > 0 ? (totalPrize * PRIZE_DISTRIBUTION.FIVE) / winners.five : 0,
        four: winners.four > 0 ? (totalPrize * PRIZE_DISTRIBUTION.FOUR) / winners.four : 0,
        three: winners.three > 0 ? (totalPrize * PRIZE_DISTRIBUTION.THREE) / winners.three : 0,
        two: winners.two > 0 ? (totalPrize * PRIZE_DISTRIBUTION.TWO) / winners.two : 0
      };
      
      // Crea l'oggetto risultati completo
      const results: NationalResults = {
        totalTickets,
        totalPrize,
        jackpot, // Usa il jackpot attuale senza modificarlo
        winners,
        winningAmounts
      };
      
      setNationalResults(results);
      
      // Verifica se qualcuno ha vinto il jackpot a livello nazionale
      if (results.winners.six > 0) {
        setJackpotWinners(results.winners.six);
        setJackpotWinAmount(results.winningAmounts.six);
        
        // Mostra il modal dopo un breve ritardo
        setTimeout(() => {
          setShowJackpotWinModal(true);
        }, 1000);
      }
      
      // Calcolo vincita adattato per gestire le combinazioni multiple
      let win = 0;
      
      // Se abbiamo selezionato esattamente 6 numeri, usiamo la funzione esistente
      if (numbers.length === 6) {
        win = calculateWinnings(numbers, drawn);
      } else {
        // Altrimenti, generiamo tutte le combinazioni e calcoliamo le vincite
        const allCombinations = generateAllCombinations(numbers, 6);
        
        // Per ogni combinazione, calcoliamo la vincita
        allCombinations.forEach(combination => {
          const combinationWin = calculateWinnings(combination, drawn);
          win += combinationWin;
        });
      }
      
      setWinAmount(win);
      
      if (win > 0) {
        toast.success(`Hai vinto ${win.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}!`);
        setMoneyWon(prev => prev + win);
        
        // Aggiorna il profilo del giocatore
        if (profile) {
          addWinning(win);
          
          // Effetto confetti per le vincite
          if (win >= 50) {
            confetti({
              particleCount: Math.min(500, win),
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }
      } else {
        toast.error('Nessuna vincita. Ritenta!');
      }
      
      
      setIsDrawing(false);
    }, 3000);
  };
  
  // Inizia una nuova partita
  const handleNewGame = () => {
    setPlayerNumbers([]);
    setDrawnNumbers(null);
    setNationalResults(null);
    // Reset suggested numbers when starting a new game
    resetSuggestedNumbers();
  };
  
  // Resetta le statistiche
  const handleResetStats = () => {
    if (confirm('Sei sicuro di voler azzerare tutte le statistiche?')) {
      setMoneySpent(0);
      setMoneyWon(0);
      setGamesPlayed(0);
      localStorage.removeItem('lottoStats');
      toast.success('Statistiche azzerate');
    }
  };
  
  // Inizia una nuova partita e torna alla selezione del profilo
  const handleStartNewGame = () => {
    if (confirm('Sei sicuro di voler iniziare una nuova partita? Perderai tutti i progressi attuali.')) {
      resetProfile();
      toast.success('Nuova partita iniziata! Scegli un nuovo profilo.');
    }
  };
  
  // Se non c'è un profilo, mostra la schermata di creazione
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow">
          <ProfileCreation />
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 px-4">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">SPRNLTT</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scegli i tuoi numeri e prova a vincere! 
            Le probabilità riflettono quelle reali, ma i soldi sono virtuali.
          </p>
          <p className="text-primary font-semibold mt-2">
            Jackpot attuale: {jackpot.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
          </p>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {!drawnNumbers ? (
              <LottoTicket 
                onPlay={handlePlay} 
                ticketCost={TICKET_COST}
                suggestedNumbers={suggestedNumbers}
              />
            ) : (
              <DrawResults 
                playerNumbers={playerNumbers}
                drawnNumbers={drawnNumbers}
                winAmount={winAmount}
                onNewGame={handleNewGame}
                nationalResults={nationalResults}
                jackpot={jackpot}
              />
            )}
            
            {/* Buttons for time advancement */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleAdvanceDay}
              >
                <Calendar className="h-4 w-4" />
                Avanza di un giorno
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleAdvanceYear}
              >
                <Calendar className="h-4 w-4" />
                Avanza di un anno
              </Button>
            </div>
            
            {/* NPC Section - Moved here from sidebar */}
            <div className="mt-6">
              <NPCSection />
            </div>
            
            
          </div>
          
          <div className="space-y-6">
            <PlayerProfile />
            
            <GameCalendar />
            
            {/* Newspaper Section */}
            <div className="bg-white p-4 rounded-md border border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg flex items-center">
                  <Newspaper className="h-5 w-5 mr-2 text-primary" />
                  Il Quotidiano
                </h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleOpenNewspaper}
                >
                  Leggi il giornale
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Leggi le ultime notizie e scopri cosa succede nel mondo del SPRNLTT.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-md border border-gray-200 shadow-md text-center">
              <p className="text-lg font-semibold mb-2">💡 Lo sapevi che...</p>
              <p className="text-sm text-muted-foreground mb-2">
                La probabilità di vincere il jackpot al SPRNLTT è di circa 1 su 622 milioni.
              </p>
              <p className="text-xs text-muted-foreground">
                {funFact}
              </p>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                className="w-full mb-2"
                onClick={() => setShowStats(!showStats)}
              >
                {showStats ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" /> Nascondi statistiche
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" /> Mostra statistiche
                  </>
                )}
              </Button>
              
              {showStats && (
                <div className="space-y-4">
                  <StatsPanel 
                    moneySpent={moneySpent}
                    moneyWon={moneyWon}
                    gamesPlayed={gamesPlayed}
                  />
                  
                  {gamesPlayed > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs text-red-500 hover:text-red-600"
                      onClick={handleResetStats}
                    >
                      Azzera statistiche
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-200 py-4 text-center text-sm text-muted-foreground">
  <p>SPRNLTT (Solo Perderai Realmente, Nessuno Lotta Tranne Te)</p>
  <p className="text-xs">Ideato e sviluppato da disquette•s</p>
  
  {/* Social media links */}
  <div className="flex justify-center items-center space-x-4 mt-2">
    <a href="https://open.spotify.com/artist/YourSpotifyID" target="_blank" rel="noopener noreferrer" 
       className="text-muted-foreground hover:text-primary transition-colors">
      <i className="fab fa-spotify text-lg"></i>
    </a>
    
    <a href="https://music.apple.com/artist/YourAppleMusicID" target="_blank" rel="noopener noreferrer"
       className="text-muted-foreground hover:text-primary transition-colors">
      <i className="fab fa-apple text-lg"></i>
    </a>
    
    <a href="https://ko-fi.com/YourKofiUsername" target="_blank" rel="noopener noreferrer"
       className="text-muted-foreground hover:text-primary transition-colors">
      <i className="fas fa-coffee text-lg"></i>
    </a>
  </div>
</footer>
      
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
      
      {/* Jackpot Win Modal */}
      <JackpotWinModal
        open={showJackpotWinModal}
        onClose={handleJackpotWinModalClose}
        winners={jackpotWinners}
        amount={jackpotWinAmount}
      />
      
      {/* Newspaper Modal */}
      <NewspaperModal
        open={showNewspaperModal}
        onClose={handleCloseNewspaper}
        headline={currentHeadline}
        currentDate={currentDate}
      />
    </div>
  );
};

export default Index;
