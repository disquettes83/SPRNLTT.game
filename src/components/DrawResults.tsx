import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { confetti } from '@/lib/confetti';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info, AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { NationalResults, shouldUseUnluckyNumbers } from '@/lib/lottery';
import { useTime } from '@/contexts/TimeContext';
import { usePlayer } from '@/contexts/PlayerContext';

// Funzione per generare tutte le combinazioni possibili di 6 numeri da un array di numeri più grande
const generateCombinations = (numbers: number[], size: number = 6): number[][] => {
  const result: number[][] = [];
  
  function backtrack(start: number, current: number[]) {
    if (current.length === size) {
      result.push([...current]);
      return;
    }
    
    for (let i = start; i < numbers.length; i++) {
      current.push(numbers[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
};

interface DrawResultsProps {
  playerNumbers: number[];
  drawnNumbers: number[] | null;
  winAmount: number;
  onNewGame: () => void;
  nationalResults: NationalResults | null;
  jackpot: number;
  combinations?: number; // Numero di combinazioni sviluppate
}

const DrawResults: React.FC<DrawResultsProps> = ({
  playerNumbers,
  drawnNumbers,
  winAmount,
  onNewGame,
  nationalResults,
  jackpot,
  combinations = 1
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showCombinations, setShowCombinations] = useState(false);
  const { advanceTime } = useTime();
  const { profile } = usePlayer();
  
  // Verifica se sta usando numeri sfigati
  const forceUnluckyNumbers = profile ? shouldUseUnluckyNumbers(profile) : false;
  
  // Genera tutte le possibili combinazioni dei numeri giocati
  const allCombinations = playerNumbers.length > 6 
    ? generateCombinations(playerNumbers) 
    : [playerNumbers];
  
  // Identifica le combinazioni vincenti
  const winningCombinations = allCombinations.filter(combo => {
    if (!drawnNumbers) return false;
    const matchCount = combo.filter(num => drawnNumbers.includes(num)).length;
    return matchCount >= 2; // Consideriamo vincenti le combinazioni con almeno 2 numeri
  });
  
  useEffect(() => {
    // Attiva confetti solo se ha vinto e non aveva karma zero
    if (drawnNumbers && winAmount > 0 && !forceUnluckyNumbers) {
      confetti();
    }
    
    // Set a timer to consider animation complete
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [drawnNumbers, winAmount, forceUnluckyNumbers]);
  
  const handleContinue = () => {
    // Advance to the next day
    advanceTime(1);
    
    // Then start a new game
    onNewGame();
  };
  
  if (!drawnNumbers) return null;
  
  // Sort player numbers and drawn numbers in ascending order
  const sortedPlayerNumbers = [...playerNumbers].sort((a, b) => a - b);
  const sortedDrawnNumbers = [...drawnNumbers].sort((a, b) => a - b);
  
  const matchedNumbers = sortedPlayerNumbers.filter(num => sortedDrawnNumbers.includes(num));
  const matchCount = matchedNumbers.length;
  
  let resultMessage = '';
  let resultClass = '';
  
  // Formatta gli importi in euro
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
  };
  
  if (winningCombinations.length > 0) {
    // Se ci sono combinazioni vincenti, mostriamo un messaggio diverso
    resultMessage = `Hai ${winningCombinations.length === 1 ? 'una combinazione vincente' : `${winningCombinations.length} combinazioni vincenti`}!`;
    resultClass = 'text-2xl text-accent font-bold';
  } else {
    resultMessage = 'Nessuna combinazione vincente. Ritenta!';
    resultClass = 'text-lg font-medium text-muted-foreground';
  }
  
  // Formatta i numeri con separatore delle migliaia
  const formatNumber = (num: number): string => {
    return num.toLocaleString('it-IT');
  };
  
  return (
    <div className="ticket-paper">
      <h2 className="text-xl font-bold mb-4 border-b-2 border-border pb-2">Risultati dell'estrazione</h2>
      
      {/* Messaggio per numeri sfigati */}
      {forceUnluckyNumbers && winningCombinations.length === 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm">
          <div className="font-bold mb-1 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            KARMA ZERO: RISULTATO PREVEDIBILE
          </div>
          <p>Con quei numeri così sfigati, la tua sconfitta era inevitabile. Forse dovresti riconsiderare le tue scelte di vita.</p>
        </div>
      )}
      
      {/* Messaggio sorprendente se ha vinto nonostante i numeri sfigati */}
      {forceUnluckyNumbers && winningCombinations.length > 0 && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-sm text-amber-600 text-sm">
          <div className="font-bold mb-1 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            MIRACOLO IMPROBABILE
          </div>
          <p>Nonostante i numeri sfigati imposti dal tuo karma azzerato, hai vinto qualcosa! Forse la fortuna sta tornando dalla tua parte...</p>
        </div>
      )}
      
      <div className="grid grid-cols-6 gap-2 mb-6">
        {sortedDrawnNumbers.map((num, idx) => (
          <div
            key={idx}
            className={cn(
              "lotto-number drawn",
              sortedPlayerNumbers.includes(num) && "matched"
            )}
          >
            {num}
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">I tuoi numeri:</h3>
          
          {/* Mostra numero di combinazioni se maggiore di 1 */}
          {playerNumbers.length > 6 && (
            <div className="text-sm bg-primary/10 px-3 py-1 rounded-full">
              {combinations} combinazioni
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {sortedPlayerNumbers.map((num, idx) => (
            <div
              key={idx}
              className={cn(
                "lotto-number selected",
                sortedDrawnNumbers.includes(num) && "matched",
                forceUnluckyNumbers && "unlucky" // Aggiunge una classe per i numeri sfigati
              )}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      
      <div className={cn("text-center py-4", resultClass)}>
        {resultMessage}
      </div>
      
      {winningCombinations.length > 0 && (
        <div className="bg-accent/20 p-4 rounded-sm border-2 border-accent text-center mb-6 animate-pulse">
          <p className="font-bold text-lg mb-1">Hai vinto:</p>
          <p className="text-3xl font-extrabold">{formatCurrency(winAmount)}</p>
          {winningCombinations.some(combo => combo.filter(num => sortedDrawnNumbers.includes(num)).length === 6) && (
            <div className="stamp mt-2">APPROVATO</div>
          )}
        </div>
      )}
      
      {/* Visualizzazione delle combinazioni vincenti */}
      {playerNumbers.length > 6 && (
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowCombinations(!showCombinations)}
            className="w-full flex items-center justify-between"
          >
            <span>
              {showCombinations ? "Nascondi combinazioni" : "Visualizza combinazioni"} 
              ({winningCombinations.length} vincenti su {allCombinations.length})
            </span>
            {showCombinations ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {showCombinations && (
            <div className="mt-4 p-3 border rounded-sm max-h-60 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {winningCombinations.map((combo, idx) => {
                  const matchCount = combo.filter(num => sortedDrawnNumbers.includes(num)).length;
                  return (
                    <div 
                      key={idx} 
                      className={cn(
                        "p-2 border rounded-sm text-center",
                        matchCount >= 6 ? "bg-green-100 border-green-300" :
                        matchCount >= 5 ? "bg-blue-100 border-blue-300" :
                        matchCount >= 4 ? "bg-indigo-100 border-indigo-300" :
                        matchCount >= 3 ? "bg-purple-100 border-purple-300" :
                        "bg-gray-100 border-gray-300"
                      )}
                    >
                      <div className="flex flex-wrap justify-center gap-1 mb-1">
                        {combo.map(num => (
                          <span 
                            key={num}
                            className={cn(
                              "inline-block w-6 h-6 rounded-full text-xs flex items-center justify-center",
                              sortedDrawnNumbers.includes(num) 
                                ? "bg-green-500 text-white" 
                                : "bg-gray-200"
                            )}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-medium">{matchCount} numeri</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Jackpot e risultati nazionali */}
      <div className="mb-6">
        <div className="bg-primary/10 p-4 rounded-sm border-2 border-primary text-center mb-4">
          <p className="font-bold text-lg mb-1">Jackpot attuale:</p>
          <p className="text-2xl font-extrabold">{formatCurrency(jackpot)}</p>
        </div>
        
        {nationalResults && (
          <Accordion type="single" collapsible className="border-2 rounded-sm">
            <AccordionItem value="results">
              <AccordionTrigger className="px-4 py-2">
                <div className="flex items-center">
                  <Info className="mr-2 h-4 w-4" />
                  Risultati nazionali
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Schedine giocate:</span>
                    <span className="font-medium">{formatNumber(nationalResults.totalTickets)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Montepremi totale:</span>
                    <span className="font-medium">{formatCurrency(nationalResults.totalPrize)}</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <p className="font-semibold mb-2">Vincitori per categoria:</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>6 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.six} {nationalResults.winners.six === 1 ? 'vincitore' : 'vincitori'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>5 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.five} {nationalResults.winners.five === 1 ? 'vincitore' : 'vincitori'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>4 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.four} {nationalResults.winners.four === 1 ? 'vincitore' : 'vincitori'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>3 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.three} {nationalResults.winners.three === 1 ? 'vincitore' : 'vincitori'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.two} {nationalResults.winners.two === 1 ? 'vincitore' : 'vincitori'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <p className="font-semibold mb-2">Vincite per categoria:</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>6 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.six > 0 ? formatCurrency(nationalResults.winningAmounts.six) : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>5 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.five > 0 ? formatCurrency(nationalResults.winningAmounts.five) : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>4 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.four > 0 ? formatCurrency(nationalResults.winningAmounts.four) : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>3 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.three > 0 ? formatCurrency(nationalResults.winningAmounts.three) : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2 numeri:</span>
                        <span className="font-medium">{nationalResults.winners.two > 0 ? formatCurrency(nationalResults.winningAmounts.two) : '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
      
      {animationComplete && (
        <Button onClick={handleContinue} className="w-full lucasarts-button">
          <ArrowRight className="mr-2 h-5 w-5" />
          Vai avanti
        </Button>
      )}
    </div>
  );
};

export default DrawResults;