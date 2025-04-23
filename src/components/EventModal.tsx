import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GameEvent } from '@/lib/events';
import { Moon, Check, X, AlertCircle, Coins, BadgeEuro, HeartCrack, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EventModalProps {
  event: GameEvent | null;
  open: boolean;
  onClose: () => void;
  karmaEffect?: number;
  moneyEffect?: number;
  healthEffect?: boolean;
  debtEffect?: string;
  addictionEffect?: number;
  socialEffect?: string;
  lifeEvents?: string[];
  onAcceptSuggestedNumbers?: (numbers: number[]) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  event,
  open,
  onClose,
  karmaEffect,
  moneyEffect,
  healthEffect,
  debtEffect,
  addictionEffect,
  socialEffect,
  lifeEvents,
  onAcceptSuggestedNumbers
}) => {
  const [showButtons, setShowButtons] = useState(false);
  
  // Mostra i bottoni per gli eventi di sogno
  React.useEffect(() => {
    if (event && event.specialType === 'dream' && event.suggestedNumbers) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [event]);
  
  if (!event) return null;
  
  const handleAcceptNumbers = () => {
    if (event.suggestedNumbers && onAcceptSuggestedNumbers) {
      onAcceptSuggestedNumbers(event.suggestedNumbers);
    }
    onClose();
  };
  
  const handleRejectNumbers = () => {
    onClose();
  };

  // Determina il colore dell'effetto debito
  const getDebtEffectColor = (effect: string | undefined) => {
    if (!effect) return '';
    if (effect.includes('migliorato')) return 'text-green-600';
    return 'text-red-600';
  };

  // Determina il colore dell'effetto sociale
  const getSocialEffectColor = (effect: string | undefined) => {
    if (!effect) return '';
    if (effect.includes('miglioramento') || effect.includes('promozione')) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {event.specialType === 'dream' && <Moon className="h-5 w-5 text-indigo-500" />}
            {event.type === 'economic' && <BadgeEuro className="h-5 w-5 text-amber-500" />}
            {event.type === 'health' && <HeartCrack className="h-5 w-5 text-red-500" />}
            {event.type === 'social' && <Heart className="h-5 w-5 text-pink-500" />}
            {event.title}
          </DialogTitle>
          <DialogDescription>
            {event.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Eventi di vita aggiunti durante questo evento */}
          {lifeEvents && lifeEvents.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm font-medium text-gray-800 mb-2">Eventi significativi:</p>
              <ul className="space-y-1">
                {lifeEvents.map((event, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <AlertCircle className="h-3 w-3 mr-1 mt-0.5 text-muted-foreground" />
                    <span>{event}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        
          {/* Effetti dell'evento */}
          {(karmaEffect !== undefined || moneyEffect !== undefined || 
            healthEffect !== undefined || debtEffect !== undefined || 
            addictionEffect !== undefined || socialEffect !== undefined) && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Effetti:</p>
              
              {karmaEffect !== undefined && (
                <div className="flex justify-between items-center">
                  <span>Karma:</span>
                  <span className={karmaEffect > 0 ? 'text-green-600' : 'text-red-600'}>
                    {karmaEffect > 0 ? `+${karmaEffect}` : karmaEffect}
                  </span>
                </div>
              )}
              
              {moneyEffect !== undefined && (
                <div className="flex justify-between items-center">
                  <span>Bilancio:</span>
                  <span className={moneyEffect > 0 ? 'text-green-600' : 'text-red-600'}>
                    {moneyEffect > 0 ? `+${moneyEffect.toFixed(2)}` : moneyEffect.toFixed(2)} €
                  </span>
                </div>
              )}
              
              {healthEffect !== undefined && (
                <div className="flex justify-between items-center">
                  <span>Salute:</span>
                  <Badge variant="outline" className="text-red-600">Peggiorata</Badge>
                </div>
              )}
              
              {debtEffect !== undefined && (
                <div className="flex justify-between items-center">
                  <span>Debito:</span>
                  <span className={getDebtEffectColor(debtEffect)}>{debtEffect}</span>
                </div>
              )}
              
              {addictionEffect !== undefined && (
                <div className="flex justify-between items-center">
                  <span>Dipendenza:</span>
                  <span className={addictionEffect > 0 ? 'text-red-600' : 'text-green-600'}>
                    {addictionEffect > 0 ? `Peggiorata (${addictionEffect})` : `Migliorata (${addictionEffect})`}
                  </span>
                </div>
              )}
              
              {socialEffect !== undefined && (
                <div className="flex justify-between items-center">
                  <span>Status sociale:</span>
                  <span className={getSocialEffectColor(socialEffect)}>{socialEffect}</span>
                </div>
              )}
            </div>
          )}
          
          {event.specialType === 'dream' && event.suggestedNumbers && (
            <div className="mt-4 p-3 bg-indigo-50 rounded-md border border-indigo-200">
              <p className="text-sm font-medium text-indigo-800 mb-2">Numeri suggeriti:</p>
              <div className="flex flex-wrap gap-2">
                {event.suggestedNumbers.map(num => (
                  <div key={num} className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {showButtons ? (
            <div className="flex w-full gap-2">
              <Button 
                onClick={handleRejectNumbers} 
                variant="outline"
                className="flex-1"
              >
                <X className="mr-2 h-4 w-4" />
                Ignora
              </Button>
              <Button 
                onClick={handleAcceptNumbers}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              >
                <Check className="mr-2 h-4 w-4" />
                Accetta numeri
              </Button>
            </div>
          ) : (
            <Button onClick={onClose} className="w-full">OK</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
