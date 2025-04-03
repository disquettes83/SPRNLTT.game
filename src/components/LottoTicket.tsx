import React, { useState, useEffect } from 'react';
import LottoGrid from './LottoGrid';
import { Button } from '@/components/ui/button';
import { Ticket, Trash2, RefreshCw, Sparkles, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useTime } from '@/contexts/TimeContext';
import { generateUnluckyNumbers, shouldUseUnluckyNumbers } from '@/lib/lottery';
import { usePlayer } from '@/contexts/PlayerContext';

interface LottoTicketProps {
  onPlay: (numbers: number[]) => void;
  ticketCost: number;
  suggestedNumbers?: number[];
}

const LottoTicket: React.FC<LottoTicketProps> = ({ onPlay, ticketCost, suggestedNumbers = [] }) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const maxSelections = 6;
  const { isDrawDay } = useTime();
  const { profile } = usePlayer(); // Ottiene il profilo per controllare il karma
  
  // Determina se forzare i numeri sfigati
  const forceUnluckyNumbers = profile ? shouldUseUnluckyNumbers(profile) : false;
  
  // Se il karma è zero, usa i numeri sfigati
  useEffect(() => {
    if (forceUnluckyNumbers) {
      const unluckyNumbers = generateUnluckyNumbers();
      setSelectedNumbers(unluckyNumbers);
    }
  }, [forceUnluckyNumbers]);
  
  // Quando arrivano numeri suggeriti, aggiungerli alla selezione (solo se non è obbligato a usare numeri sfigati)
  useEffect(() => {
    if (suggestedNumbers.length > 0 && !forceUnluckyNumbers) {
      setSelectedNumbers(prev => {
        // Crea una copia dell'array corrente
        const newSelection = [...prev];
        
        // Aggiungi i numeri suggeriti se c'è spazio
        for (const num of suggestedNumbers) {
          if (!newSelection.includes(num) && newSelection.length < 6) {
            newSelection.push(num);
          }
        }
        
        return newSelection;
      });
    }
  }, [suggestedNumbers, forceUnluckyNumbers]);
  
  const handleNumberClick = (number: number) => {
    // Impedisci la selezione manuale se il karma è zero
    if (forceUnluckyNumbers) return;
    
    setSelectedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      } else if (prev.length < maxSelections) {
        return [...prev, number];
      }
      return prev;
    });
  };
  
  const handlePlay = () => {
    if (!isDrawDay) {
      toast.error("Oggi non c'è estrazione! Attendi il prossimo giorno di estrazione.");
      return;
    }
    
    if (selectedNumbers.length !== maxSelections) {
      toast.error(`Devi selezionare ${maxSelections} numeri`);
      return;
    }
    
    onPlay(selectedNumbers);
    
    if (forceUnluckyNumbers) {
      toast.error('Schedina giocata con numeri sfigati. Inutile sperare...');
    } else {
      toast.success('Schedina giocata! Buona fortuna!');
    }
  };
  
  const handleRandom = () => {
    // Impedisci la selezione casuale se il karma è zero
    if (forceUnluckyNumbers) return;
    
    const numbers = new Set<number>();
    while (numbers.size < maxSelections) {
      numbers.add(Math.floor(Math.random() * 90) + 1);
    }
    setSelectedNumbers(Array.from(numbers));
    toast.info('Numeri casuali selezionati');
  };
  
  const handleClear = () => {
    // Impedisci la cancellazione se il karma è zero
    if (forceUnluckyNumbers) return;
    
    setSelectedNumbers([]);
  };

  return (
    <div className="ticket-paper">
      <div className="flex justify-between items-center mb-4 border-b-2 border-border pb-2">
        <h2 className="text-xl font-bold uppercase tracking-wider">Schedina Ufficiale</h2>
        <span className="text-sm text-muted-foreground font-mono">
          Scegli {maxSelections} numeri da 1 a 90
        </span>
      </div>
      
      {/* Avviso quando il karma è zero */}
      {forceUnluckyNumbers && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm">
          <div className="font-bold mb-1 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            KARMA AZZERATO
          </div>
          <p>La tua sfortuna ha raggiunto livelli critici. Sei costretto a giocare questi numeri evidentemente perdenti.</p>
        </div>
      )}
      
      <div className="mb-6">
        <div className="bg-muted p-4 rounded-sm border border-border">
          <LottoGrid
            selectedNumbers={selectedNumbers}
            onNumberClick={handleNumberClick}
            maxSelections={maxSelections}
            disableSelection={forceUnluckyNumbers} // Aggiungi questa prop a LottoGrid
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRandom} 
              className="pixel-border"
              disabled={forceUnluckyNumbers} // Disabilita se karma zero
            >
              <RefreshCw className="mr-1 h-4 w-4" /> Quick Pick
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClear} 
              className="pixel-border"
              disabled={forceUnluckyNumbers} // Disabilita se karma zero
            >
              <Trash2 className="mr-1 h-4 w-4" /> Cancella
            </Button>
          </div>
          <div className="text-sm font-bold font-mono">
            Selezionati: {selectedNumbers.length}/{maxSelections}
          </div>
        </div>
        
        {suggestedNumbers.length > 0 && !forceUnluckyNumbers && (
          <div className="bg-indigo-50 p-2 rounded-sm border border-indigo-200 flex items-center mb-2">
            <Sparkles className="h-4 w-4 text-indigo-600 mr-2" />
            <span className="text-xs text-indigo-800 font-mono">
              Numeri suggeriti dal sogno: {suggestedNumbers.join(', ')}
            </span>
          </div>
        )}
        
        <Button 
          disabled={selectedNumbers.length !== maxSelections || !isDrawDay} 
          onClick={handlePlay}
          className={`mt-2 pixel-border uppercase ${forceUnluckyNumbers ? 'bg-red-600 hover:bg-red-700' : ''}`}
        >
          <Ticket className="mr-2 h-5 w-5" /> 
          Gioca ({ticketCost.toFixed(2)} €){!isDrawDay ? " (Non è giorno di estrazione)" : ""}
        </Button>
        {!isDrawDay && (
          <p className="text-xs text-amber-600 mt-1 font-mono">
            Oggi non c'è estrazione. Le estrazioni avvengono martedì, giovedì, venerdì e sabato.
          </p>
        )}
      </div>
    </div>
  );
};

export default LottoTicket;
