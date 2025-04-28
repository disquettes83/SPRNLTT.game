import React from 'react';
import { Euro, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/contexts/PlayerContext';
import { toast } from 'sonner';

const Header = () => {
  const { resetProfile } = usePlayer();

  const handleNewGame = () => {
    if (confirm('Sei sicuro di voler iniziare una nuova partita? Perderai tutti i progressi attuali.')) {
      resetProfile();
      toast.success('Nuova partita iniziata! Scegli un nuovo profilo.');
    }
  };

  return (
    <header className="bg-primary text-white py-3 px-4 shadow-md border-b-4 border-accent">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Euro className="h-6 w-6" />
          <h1 className="text-2xl font-bold uppercase tracking-wider">SPRNLTT</h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm md:text-base italic font-mono">
            Giocheresti a un gioco dove non vinci mai?
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-black border-white hover:bg-white/20 hover:text-white pixel-border border-white"
            onClick={handleNewGame}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Nuova Partita
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
