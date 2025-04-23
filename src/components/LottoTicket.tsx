import React, { useState, useEffect } from 'react';
import LottoGrid from './LottoGrid';
import { Button } from '@/components/ui/button';
import { Ticket, Trash2, RefreshCw, Sparkles, AlertTriangle, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useTime } from '@/contexts/TimeContext';
import { generateUnluckyNumbers, shouldUseUnluckyNumbers } from '@/lib/lottery';
import { usePlayer } from '@/contexts/PlayerContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Tabella di combinazioni e costi
const COMBINATIONS_DATA = [
  { numeri: 6, combinazioni: 1, costo: 1.00 },
  { numeri: 7, combinazioni: 7, costo: 7.00 },
  { numeri: 8, combinazioni: 28, costo: 28.00 },
  { numeri: 9, combinazioni: 84, costo: 84.00 },
  { numeri: 10, combinazioni: 210, costo: 210.00 },
  { numeri: 11, combinazioni: 462, costo: 462.00 },
  { numeri: 12, combinazioni: 924, costo: 924.00 },
  { numeri: 13, combinazioni: 1716, costo: 1716.00 },
  { numeri: 14, combinazioni: 3003, costo: 3003.00 },
  { numeri: 15, combinazioni: 5005, costo: 5005.00 },
  { numeri: 16, combinazioni: 8008, costo: 8008.00 },
  { numeri: 17, combinazioni: 12376, costo: 12376.00 },
  { numeri: 18, combinazioni: 18564, costo: 18564.00 },
  { numeri: 19, combinazioni: 27132, costo: 27132.00 }
];

interface LottoTicketProps {
  onPlay: (numbers: number[], combinations: number) => void;
  ticketCost: number;
  suggestedNumbers?: number[];
}

const LottoTicket: React.FC<LottoTicketProps> = ({ onPlay, ticketCost, suggestedNumbers = [] }) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [maxSelections, setMaxSelections] = useState<number>(6);
  const { isDrawDay } = useTime();
  const { profile } = usePlayer(); // Ottiene il profilo per controllare il karma
  
  // Determina se forzare i numeri sfigati
  const forceUnluckyNumbers = profile ? shouldUseUnluckyNumbers(profile) : false;

  // Calcola le combinazioni e il costo attuale in base al numero di selezioni
  const getCurrentCombinationsInfo = () => {
    const data = COMBINATIONS_DATA.find(d => d.numeri === maxSelections);
    return {
      combinations: data?.combinazioni || 1,
      cost: data?.costo || 1.00
    };
  };
  
  // Se il karma è zero, usa i numeri sfigati
  useEffect(() => {
    if (forceUnluckyNumbers) {
      const unluckyNumbers = generateUnluckyNumbers();
      setSelectedNumbers(unluckyNumbers);
      setMaxSelections(6); // Forza a 6 numeri
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
          if (!newSelection.includes(num) && newSelection.length < maxSelections) {
            newSelection.push(num);
          }
        }
        
        return newSelection;
      });
    }
  }, [suggestedNumbers, forceUnluckyNumbers, maxSelections]);
  
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

    // Calcola il costo e le combinazioni
    const { combinations, cost } = getCurrentCombinationsInfo();
    
    // Verifica che il giocatore abbia abbastanza soldi
    if (profile && profile.balance < cost) {
      toast.error(`Non hai abbastanza soldi! Questa giocata costa ${cost.toFixed(2)}€`);
      return;
    }
    
    onPlay(selectedNumbers, combinations);
    
    if (forceUnluckyNumbers) {
      toast.error('Schedina giocata con numeri sfigati. Inutile sperare...');
    } else {
      toast.success(`Schedina giocata con ${selectedNumbers.length} numeri! Sviluppate ${combinations} combinazioni.`);
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
    toast.info(`${maxSelections} numeri casuali selezionati`);
  };
  
  const handleClear = () => {
    // Impedisci la cancellazione se il karma è zero
    if (forceUnluckyNumbers) return;
    
    setSelectedNumbers([]);
  };

  const handleMaxSelectionsChange = (newMax: number) => {
    if (forceUnluckyNumbers) return;
    
    setMaxSelections(newMax);
    
    // Riduci i numeri selezionati se necessario
    if (selectedNumbers.length > newMax) {
      setSelectedNumbers(selectedNumbers.slice(0, newMax));
    }
  };

  // Calcola info correnti
  const { combinations, cost } = getCurrentCombinationsInfo();

  return (
    <div className="ticket-paper">
      <div className="flex justify-between items-center mb-4 border-b-2 border-border pb-2">
        <h2 className="text-xl font-bold uppercase tracking-wider">Schedina Ufficiale</h2>
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground font-mono mr-2">
            Scegli {maxSelections} numeri
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Puoi scegliere da 6 a 19 numeri.<br/>Più numeri scegli, più combinazioni verranno generate.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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

      {/* Selector per il numero di selezioni */}
      {!forceUnluckyNumbers && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Numeri da giocare:</span>
            <div className="flex items-center gap-1">
              {[6, 8, 10, 12, 15, 19].map(num => (
                <Button 
                  key={num}
                  variant={maxSelections === num ? "default" : "outline"}
                  size="sm"
                  className="h-6 w-8 p-0 text-xs"
                  onClick={() => handleMaxSelectionsChange(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-sm p-2 bg-primary/10 rounded-sm">
            <span>Combinazioni sviluppate: <strong>{combinations}</strong></span>
            <span>Costo giocata: <strong>{cost.toFixed(2)}€</strong></span>
          </div>
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
          Gioca ({cost.toFixed(2)} €){!isDrawDay ? " (Non è giorno di estrazione)" : ""}
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