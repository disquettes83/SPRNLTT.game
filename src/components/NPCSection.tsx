import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Check, BadgeEuro, Users } from 'lucide-react';
import { useTime } from '@/contexts/TimeContext';
import { usePlayer } from '@/contexts/PlayerContext';
import { getNPCForDate } from '@/lib/npcs';
import NPCDialogueModal from './NPCDialogueModal';
import { Badge } from '@/components/ui/badge';

const NPCSection: React.FC = () => {
  const { currentDate, talkedToNPCToday, setTalkedToNPCToday } = useTime();
  const { profile } = usePlayer();
  const [showDialogue, setShowDialogue] = useState(false);
  
  // Get NPC for current date
  const npc = getNPCForDate(currentDate);
  
  if (!npc) return null;
  
  const handleTalkButtonClick = () => {
    setShowDialogue(true);
  };
  
  const handleDialogueClose = () => {
    setShowDialogue(false);
    setTalkedToNPCToday(true); // Imposta che hai parlato con l'NPC oggi
  };
  
  // Verifica compatibilità sociale tra giocatore e NPC
  const getSocialCompatibility = () => {
    if (!profile || !npc.socialStatus) return null;
    
    const statusRanking = [
      'indigente', 'povero', 'classe media-bassa', 'classe media', 
      'benestante', 'ricco', 'elite'
    ];
    
    const playerIndex = statusRanking.indexOf(profile.socialStatus);
    const npcIndex = statusRanking.indexOf(npc.socialStatus);
    
    // Se l'NPC è di classe sociale significativamente più alta
    if (npcIndex - playerIndex >= 2) {
      return {
        text: "Superiore",
        variant: "destructive" as const
      };
    }
    // Se l'NPC è di classe sociale significativamente più bassa
    else if (playerIndex - npcIndex >= 2) {
      return {
        text: "Inferiore",
        variant: "default" as const
      };
    }
    
    // Se sono simili
    return {
      text: "Pari",
      variant: "outline" as const
    };
  };
  
  const compatibility = getSocialCompatibility();
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-4 flex flex-col items-center">
        <p className="text-sm text-muted-foreground italic mb-3">
          Oggi in ricevitoria hai incontrato questo personaggio discutibile:
        </p>
        
        <Avatar className="h-64 w-64 rounded-none border-2 border-primary/20 mb-3 relative">
          <AvatarImage src={npc.avatar} alt={npc.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-lg rounded-none">
            {npc.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
          
          {/* Badge per lo stato sociale */}
          {npc.socialStatus && (
            <div className="absolute bottom-1 right-1">
              <Badge variant="secondary" className="text-xs px-1">
                <BadgeEuro className="h-3 w-3 mr-1" />
                {npc.socialStatus === 'classe media' ? 'Media' : 
                 npc.socialStatus === 'classe media-bassa' ? 'Media-bassa' : 
                 npc.socialStatus.charAt(0).toUpperCase() + npc.socialStatus.slice(1)}
              </Badge>
            </div>
          )}
        </Avatar>
        
        <div className="text-center mb-3">
          <h3 className="font-bold text-base">{npc.name}</h3>
          {/* <p className="text-xs text-muted-foreground">{npc.title}</p> */}
          
          {/* Compatibilità sociale */}
          {compatibility && (
            <div className="mt-1 flex justify-center">
              <Badge variant={compatibility.variant} className="text-xs flex items-center gap-1">
                <Users className="h-3 w-3" />
                Status {compatibility.text}
              </Badge>
            </div>
          )}
        </div>
        
        {talkedToNPCToday ? (
          <div className="flex items-center gap-1 text-green-600">
            <Check className="h-4 w-4" />
            <span className="text-sm">Già parlato oggi</span>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={handleTalkButtonClick}
          >
            <MessageSquare className="h-4 w-4" />
            Parla
          </Button>
        )}
      </CardContent>
      
      <NPCDialogueModal
        npc={npc}
        open={showDialogue}
        onClose={handleDialogueClose}
      />
    </Card>
  );
};

export default NPCSection;
