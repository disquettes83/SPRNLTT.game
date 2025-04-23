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
import { Trophy, Newspaper } from 'lucide-react';
import { confetti } from '@/lib/confetti';
import { usePlayer } from '@/contexts/PlayerContext';
import EventModal from '@/components/EventModal';

// Lista di città italiane per generare casualmente la città del vincitore
const italianCities = [
  'Roma', 'Milano', 'Napoli', 'Torino', 'Palermo',
  'Bologna', 'Firenze', 'Bari', 'Catania', 'Venezia',
  'Genova', 'Verona', 'Cagliari', 'Messina', 'Padova',
  'Trieste', 'Taranto', 'Brescia', 'Prato', 'Reggio Calabria',
  'Modena', 'Parma', 'Livorno', 'Foggia', 'Salerno',
	"Lecce",
    "Aosta",
    "Pordenone",
    "Civitanova Marche",
    "Ragusa",
    "Matera",
    "Udine",
    "Alghero",
    "Cremona",
    "Sassari",
    "La Spezia",
    "Avellino",
    "Pisa",
    "Terni",
    "Trapani",
    "Agrigento",
    "Viterbo",
    "Frosinone",
    "Campobasso",
    "Cosenza",
    "Catanzaro"
];

// Frasi sensazionalistiche per il titolo
const sensationalPhrases = [
  "CLAMOROSO",
  "INCREDIBILE",
  "STORICO",
  "PAZZESCO",
  "STRAORDINARIO",
  "COLPO DI SCENA",
  "MIRACOLO",
  "SVOLTA EPOCALE",
  "SHOCK",
  "BOMBA",
	"È SUCCESSO DAVVERO",
    "ROBA DA MATTI",
    "IL DESTINO ESISTE",
    "UNA FOLLIA",
    "IL COSMO HA SCELTO",
    "FENOMENO SENZA PRECEDENTI",
    "GLI ASTRI LO AVEVANO PREDETTO",
    "NESSUNO CI CREDE",
    "NON SUCCEDE... MA SE SUCCEDE",
    "BOOM!",
    "L’ITALIA SI FERMA",
    "SCHEDINA MIRACOLOSA",
    "LA DEA BENDATA COLPISCE ANCORA"
];

// Frasi per descrivere il vincitore
const winnerDescriptions = [
  "Impiegato disperato",
  "Pensionato fortunato",
  "Casalinga coraggiosa",
  "Operaio instancabile",
  "Studente squattrinato",
  "Barista simpatico",
  "Tassista sognatore",
  "Insegnante paziente",
  "Disoccupato perseverante",
  "Commerciante audace",
	"Barbiere scettico",
    "Macellaio in pensione",
    "Influencer decadente",
    "Parrucchiera visionaria",
    "Giardiniere zen",
    "Venditore ambulante disilluso",
    "Nonna che gioca dal 1975",
    "Ex galeotto redento",
    "Collezionista di gratta e vinci",
    "Parroco dubbioso",
    "Benzinaio veggente",
    "Programmatore pentito",
    "Sindaco che si è votato da solo",
    "Cassiera con poteri medianici",
    "Nonno affetto da smorfite acuta"
];

// Conseguenze per il bottone "Congratulazioni"
const congratulationsConsequences = [
  {
    narrative: "Hai inviato un pensiero positivo. L'universo ti ascolta.",
    effect: "Però... hai appena dimenticato la tua schedina sul treno.",
    type: "malus",
    karmaEffect: 1,
    lostTickets: 1
  },
  {
    narrative: "Hai inviato un pensiero positivo. L'universo ti ascolta.",
    effect: "Ti senti in pace. Ottieni 1 giocata gratis.",
    type: "bonus",
    karmaEffect: 1,
    freeTickets: 1
  },
  {
    narrative: "Hai inviato un pensiero positivo. L'universo ti ascolta.",
    effect: "La ricevitoria sbaglia e gioca i numeri di qualcun altro al posto dei tuoi.",
    type: "neutral",
    karmaEffect: 1
  },
	{
      narrative: "Hai fatto la cosa giusta. Almeno per oggi.",
      effect: "Il giornalaio ti regala un sorriso. E un buono da 1€.",
      type: "bonus",
      karmaEffect: 1,
      freeTickets: 1
    },
    {
      narrative: "Ti sei congratulato con il cuore.",
      effect: "Ma nel profondo, ti rode l’invidia. Karma +1. Mal di stomaco +1.",
      type: "neutral",
      karmaEffect: 1
    },
    {
      narrative: "Hai reagito con grazia. Sei un esempio.",
      effect: "Purtroppo un piccione ha centrato la tua schedina. Irrecuperabile.",
      type: "malus",
      karmaEffect: 1,
      lostTickets: 1
    },
    {
      narrative: "L’universo ti osserva con approvazione.",
      effect: "Ti viene offerta una caramella alla menta. È tutto ciò che otterrai.",
      type: "neutral",
      karmaEffect: 1
    }
];

// Conseguenze per il bottone "Vaffambagno"
const vaffambagnoConsequences = [
  {
    narrative: "L'odio ti scorre nelle vene. Ma l'universo ama il caos.",
    effect: "Hai bestemmiato talmente forte da aprire una voragine, ma ci trovi una giocata magica.",
    type: "bonus",
    karmaEffect: -1,
    freeTickets: 1
  },
  {
    narrative: "L'odio ti scorre nelle vene. Ma l'universo ama il caos.",
    effect: "Una forza oscura ti regala 5 giocate gratis.",
    type: "bonus",
    karmaEffect: -2,
    freeTickets: 5
  },
	{
      narrative: "La tua rabbia è tangibile. Il tabaccaio ti guarda e ti porge una schedina 'speciale'.",
      effect: "Contiene sei 6. Tutti sbagliati.",
      type: "malus",
      karmaEffect: -1
    },
    {
      narrative: "Urli al cielo. Qualcosa ti risponde.",
      effect: "Ricevi una schedina misteriosa in una busta nera. Gratis.",
      type: "bonus",
      karmaEffect: -1,
      freeTickets: 1
    },
    {
      narrative: "Il cosmo si piega al tuo grido.",
      effect: "Ottieni 3 giocate gratuite. Ma tutte con numeri consecutivi.",
      type: "bonus",
      karmaEffect: -2,
      freeTickets: 3
    },
    {
      narrative: "Ti senti meglio. Per un istante.",
      effect: "Il karma precipita. Ma la pressione ti si abbassa.",
      type: "malus",
      karmaEffect: -2
    },
    {
      narrative: "Comparsa improvvisa del Bambino Bendato.",
      effect: "Ti tocca la fronte e ti sussurra 'ritenta'. Ricevi una schedina karmica.",
      type: "bonus",
      karmaEffect: -1,
      freeTickets: 1
    }
];

interface JackpotWinModalProps {
  open: boolean;
  onClose: () => void;
  winners: number;
  amount: number;
}

const JackpotWinModal: React.FC<JackpotWinModalProps> = ({
  open,
  onClose,
  winners,
  amount
}) => {
  const { modifyKarma, modifyBalance } = usePlayer();
  
  // Stato per il modal delle conseguenze
  const [showConsequenceModal, setShowConsequenceModal] = useState(false);
  const [consequenceEvent, setConsequenceEvent] = useState<any>(null);
  const [consequenceKarmaEffect, setConsequenceKarmaEffect] = useState<number | undefined>(undefined);
  const [consequenceMoneyEffect, setConsequenceMoneyEffect] = useState<number | undefined>(undefined);
  
  // Genera una città casuale per il vincitore
  const [winnerCity] = React.useState(() => 
    italianCities[Math.floor(Math.random() * italianCities.length)]
  );
  
  // Genera una frase sensazionalistica casuale
  const [sensationalPhrase] = React.useState(() => 
    sensationalPhrases[Math.floor(Math.random() * sensationalPhrases.length)]
  );
  
  // Genera una descrizione casuale per il vincitore
  const [winnerDescription] = React.useState(() => 
    winnerDescriptions[Math.floor(Math.random() * winnerDescriptions.length)]
  );

  // Trigger confetti when modal opens
  React.useEffect(() => {
    if (open) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.3 }
      });
    }
  }, [open]);

  // Gestisce la chiusura del modal delle conseguenze
  const handleConsequenceModalClose = () => {
    setShowConsequenceModal(false);
    
    // Applica gli effetti dopo la chiusura del modal
    if (consequenceEvent) {
      if (consequenceKarmaEffect !== undefined) {
        modifyKarma(consequenceKarmaEffect);
      }
      
      if (consequenceMoneyEffect !== undefined) {
        modifyBalance(consequenceMoneyEffect);
      }
    }
    
    // Reset dello stato delle conseguenze
    setConsequenceEvent(null);
    setConsequenceKarmaEffect(undefined);
    setConsequenceMoneyEffect(undefined);
    
    // Chiude il modal principale
    onClose();
  };

  const handleCongratulations = () => {
    // Seleziona una conseguenza casuale
    const consequence = congratulationsConsequences[Math.floor(Math.random() * congratulationsConsequences.length)];
    
    // Prepara l'evento per il modal
    const event = {
      id: 'congratulations_consequence',
      title: consequence.narrative,
      description: consequence.effect
    };
    
    // Imposta gli effetti
    setConsequenceEvent(event);
    setConsequenceKarmaEffect(consequence.karmaEffect);
    
    // Imposta l'effetto monetario se presente
    if (consequence.freeTickets) {
      setConsequenceMoneyEffect(consequence.freeTickets);
    }
    
    // Mostra il modal delle conseguenze
    setShowConsequenceModal(true);
  };

  const handleVaffambagno = () => {
    // Seleziona una conseguenza casuale
    const consequence = vaffambagnoConsequences[Math.floor(Math.random() * vaffambagnoConsequences.length)];
    
    // Prepara l'evento per il modal
    const event = {
      id: 'vaffambagno_consequence',
      title: consequence.narrative,
      description: consequence.effect
    };
    
    // Imposta gli effetti
    setConsequenceEvent(event);
    setConsequenceKarmaEffect(consequence.karmaEffect);
    
    // Imposta l'effetto monetario se presente
    if (consequence.freeTickets) {
      setConsequenceMoneyEffect(consequence.freeTickets);
    }
    
    // Mostra il modal delle conseguenze
    setShowConsequenceModal(true);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-2xl text-amber-500 font-bold">
              <Trophy className="h-8 w-8 mr-2 text-amber-500" />
              Jackpot Vinto!
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {/* Titolo di giornale sensazionalistico */}
            <div className="bg-white p-4 rounded-md border-2 border-gray-800 font-serif">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold">IL LOTTO QUOTIDIANO</span>
                <span className="text-xs">EDIZIONE STRAORDINARIA</span>
              </div>
              
              <h2 className="text-3xl font-black text-center uppercase tracking-tight leading-tight mb-2">
                {sensationalPhrase}! {winners === 1 ? "VINTI" : "DIVISI"} {formatCurrency(winners === 1 ? amount : amount * winners)} AL SPRNLTT
              </h2>
              
              <h3 className="text-xl font-bold text-center mb-3">
                {winners === 1 ? 
                  `${winnerDescription} di ${winnerCity} indovina tutti e 6 i numeri` : 
                  `${winners} fortunati giocatori si dividono il montepremi`}
              </h3>
              
              <p className="text-sm text-center italic">
                {winners === 1 ? 
                  `"Non ci posso credere, cambierà la mia vita" - dichiara il vincitore di ${winnerCity}` : 
                  `Festa grande in ${winners} città italiane dopo l'estrazione di ieri`}
              </p>
            </div>
            
            <div className="flex items-center justify-center text-sm text-muted-foreground gap-2">
              <Newspaper className="h-4 w-4" />
              <span>Il jackpot è stato resettato. Nuove possibilità per tutti!</span>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={handleCongratulations} 
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Congratulazioni
            </Button>
            <Button 
              onClick={handleVaffambagno} 
              variant="destructive"
              className="flex-1"
            >
              Vaffambagno
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal per le conseguenze */}
      <EventModal
        event={consequenceEvent}
        open={showConsequenceModal}
        onClose={handleConsequenceModalClose}
        karmaEffect={consequenceKarmaEffect}
        moneyEffect={consequenceMoneyEffect}
      />
    </>
  );
};

export default JackpotWinModal;
