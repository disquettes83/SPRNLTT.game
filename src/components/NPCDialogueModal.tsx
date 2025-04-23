import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NPC, DialogueOption } from '@/lib/npcs';
import { usePlayer } from '@/contexts/PlayerContext';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface NPCDialogueModalProps {
  npc: NPC;
  open: boolean;
  onClose: () => void;
}

const NPCDialogueModal: React.FC<NPCDialogueModalProps> = ({ npc, open, onClose }) => {
  const { profile, modifyKarma, modifyBalance } = usePlayer();
  const [currentDialogue, setCurrentDialogue] = useState(npc.dialogue);
  const [showingResponse, setShowingResponse] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DialogueOption | null>(null);
  
  // Quando la modale si apre, carica lo stato del dialogo dal localStorage se esiste
  useEffect(() => {
    if (open) {
      const savedDialogueState = localStorage.getItem(`npc_dialogue_${npc.id}_${new Date().toDateString()}`);
      
      if (savedDialogueState) {
        const parsed = JSON.parse(savedDialogueState);
        setCurrentDialogue(parsed.currentDialogue);
        setShowingResponse(parsed.showingResponse);
        setSelectedOption(parsed.selectedOption);
      } else {
        // Se non c'è dialogo salvato per oggi, inizia con quello default
        setCurrentDialogue(npc.dialogue);
        setShowingResponse(false);
        setSelectedOption(null);
      }
    }
  }, [npc, open]);
  
  // Salva lo stato del dialogo nel localStorage quando cambia
  useEffect(() => {
    if (open) {
      const dialogueState = {
        currentDialogue,
        showingResponse,
        selectedOption
      };
      
      localStorage.setItem(
        `npc_dialogue_${npc.id}_${new Date().toDateString()}`, 
        JSON.stringify(dialogueState)
      );
    }
  }, [currentDialogue, showingResponse, selectedOption, npc.id, open]);
  
  // Verifica se un'opzione è disponibile in base allo stato sociale
  const isOptionAvailable = (option: DialogueOption): boolean => {
    if (!option.requirements) return true;
    
    // Verifica requisiti dello stato sociale
    if (option.requirements.socialStatus && profile) {
      if (Array.isArray(option.requirements.socialStatus)) {
        if (!option.requirements.socialStatus.includes(profile.socialStatus)) {
          return false;
        }
      } else if (option.requirements.socialStatus !== profile.socialStatus) {
        return false;
      }
    }
    
    // Verifica requisiti di karma
    if (option.requirements.minKarma && profile) {
      if (profile.karma < option.requirements.minKarma) {
        return false;
      }
    }
    
    // Verifica requisiti di bilancio
    if (option.requirements.minBalance && profile) {
      if (profile.balance < option.requirements.minBalance) {
        return false;
      }
    }
    
    // Verifica requisiti di dipendenze
    if (option.requirements.noAddictions && profile) {
      if (profile.addiction !== 'nessuna') {
        return false;
      }
    }
    
    // Verifica requisiti di debito
    if (option.requirements.maxDebt && profile) {
      const debtSeverity = {
        'nessuno': 0,
        'piccolo': 1,
        'medio': 2,
        'grande': 3,
        'schiacciante': 4
      };
      
      if (debtSeverity[profile.debt] > debtSeverity[option.requirements.maxDebt]) {
        return false;
      }
    }
    
    return true;
  };
  
  const handleOptionSelect = (option: DialogueOption) => {
    setSelectedOption(option);
    setShowingResponse(true);
    
    // Apply karma effect
    if (option.karmaEffect) {
      modifyKarma(option.karmaEffect);
      
      // Show toast based on karma effect
      if (option.karmaEffect > 0) {
        toast.success(`+${option.karmaEffect} Karma`);
      } else if (option.karmaEffect < 0) {
        toast.error(`${option.karmaEffect} Karma`);
      }
    }
    
    // Apply money effect
    if (option.moneyEffect) {
      modifyBalance(option.moneyEffect);
      
      // Show toast based on money effect
      if (option.moneyEffect > 0) {
        toast.success(`+${option.moneyEffect.toFixed(2)} €`);
      } else if (option.moneyEffect < 0) {
        toast.error(`${option.moneyEffect.toFixed(2)} €`);
      }
    }
  };
  
  const handleContinue = () => {
    if (selectedOption?.nextDialogue) {
      setCurrentDialogue(selectedOption.nextDialogue);
      setShowingResponse(false);
      setSelectedOption(null);
    } else {
      onClose();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[90vh] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-32 w-32 rounded-none border-2 border-primary/20 mb-3">
              <AvatarImage src={npc.avatar} alt={npc.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {npc.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{npc.name}</DialogTitle>
              <DialogDescription className="flex flex-col">
                {/*<span>{npc.title}</span>*/}
                {npc.socialStatus && (
                  <Badge variant="outline" className="mt-1 w-fit">
                    {npc.socialStatus}
                  </Badge>
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* NPC Dialogue */}
          <div className="bg-muted p-3 rounded-lg rounded-tl-none">
            <p className="text-sm">{currentDialogue.text}</p>
          </div>
          
          {/* Player Response Options or NPC Response */}
          {showingResponse ? (
            <div className="space-y-4">
              {selectedOption && (
                <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none ml-auto">
                  <p className="text-sm">{selectedOption.text}</p>
                </div>
              )}
              
              {selectedOption && selectedOption.response && (
                <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                  <p className="text-sm">{selectedOption.response}</p>
                </div>
              )}
              
              <Button 
                className="w-full" 
                onClick={handleContinue}
              >
                {selectedOption?.nextDialogue ? "Continua" : "Chiudi"}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {currentDialogue.options.map((option, index) => {
                const available = isOptionAvailable(option);
                
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-2 px-3 ${!available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => available && handleOptionSelect(option)}
                    disabled={!available}
                  >
                    <div className="flex flex-col items-start">
                      <span>{option.text}</span>
                      {!available && option.requirements && (
                        <span className="text-xs text-red-500 mt-1">
                          {option.requirements.socialStatus && 'Richiede status sociale specifico. '}
                          {option.requirements.minKarma && `Richiede karma min. ${option.requirements.minKarma}. `}
                          {option.requirements.minBalance && `Richiede min. ${option.requirements.minBalance.toFixed(2)}€. `}
                          {option.requirements.noAddictions && 'Non disponibile con dipendenze. '}
                          {option.requirements.maxDebt && `Richiede un debito max. ${option.requirements.maxDebt}. `}
                        </span>
                      )}
                      {option.karmaEffect && available && (
                        <span className={`text-xs mt-1 ${option.karmaEffect > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          Karma: {option.karmaEffect > 0 ? '+' : ''}{option.karmaEffect}
                        </span>
                      )}
                      {option.moneyEffect && available && (
                        <span className={`text-xs mt-1 ${option.moneyEffect > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {option.moneyEffect > 0 ? '+' : ''}{option.moneyEffect.toFixed(2)}€
                        </span>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NPCDialogueModal;
