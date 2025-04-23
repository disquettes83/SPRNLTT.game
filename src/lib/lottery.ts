// Funzioni di utilità per il gioco del lotto
import { PlayerProfile } from './player'; 
// Costanti per il sistema di montepremi
export const TICKET_COST = 1; // Costo di una schedina in euro
export const TOTAL_PRIZE_PERCENTAGE = 0.6; // 60% dell'importo raccolto va al montepremi
export const AVERAGE_TICKETS_PER_DRAW = 23000000; // 23 milioni di schedine per estrazione

// Distribuzione del montepremi per categoria
export const PRIZE_DISTRIBUTION = {
  SIX: 0.174, // 17.4% per 6 numeri
  FIVE_PLUS_JOLLY: 0.13, // 13% per 5 numeri + jolly
  FIVE: 0.042, // 4.2% per 5 numeri
  FOUR: 0.042, // 4.2% per 4 numeri
  THREE: 0.128, // 12.8% per 3 numeri
  TWO: 0.4, // 40% per 2 numeri
  IMMEDIATE: 0.084 // 8.4% per vincite immediate (non implementato)
};

// Inizializza il jackpot con un valore casuale tra 5 e 7 milioni
const baseMin = 5000000; // 5 milioni
const baseMax = 7000000; // 7 milioni
let currentJackpot = baseMin + Math.random() * (baseMax - baseMin);
currentJackpot = Math.round(currentJackpot / 100000) * 100000; // Arrotonda a 100.000€

// Inizializzazione jackpot da localStorage (se presente)
try {
  const storedJackpot = localStorage.getItem('currentJackpot');
  if (storedJackpot) {
    currentJackpot = Number(storedJackpot);
  }
} catch (e) {
  console.error("Errore nell'accesso a localStorage per il jackpot", e);
}

// Genera estrazione di 6 numeri da 1 a 90
export function drawLottoNumbers(): number[] {
  const numbers = new Set<number>();
  
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 90) + 1);
  }
  
  return Array.from(numbers).sort((a, b) => a - b);
}

// Genera un numero jolly (diverso dai 6 numeri estratti)
export function generateJollyNumber(drawnNumbers: number[]): number {
  let jolly: number;
  do {
    jolly = Math.floor(Math.random() * 90) + 1;
  } while (drawnNumbers.includes(jolly));
  
  return jolly;
}

// Calcola la vincita in base ai numeri indovinati
export function calculateWinnings(playerNumbers: number[], drawnNumbers: number[]): number {
  // Conta i numeri indovinati
  const matches = playerNumbers.filter(num => drawnNumbers.includes(num)).length;
  
  // Calcola il montepremi totale per questa estrazione
  const totalPrize = AVERAGE_TICKETS_PER_DRAW * TICKET_COST * TOTAL_PRIZE_PERCENTAGE;
  
  // Simula il numero di vincitori per categoria
  const winners = simulateWinners();
  
  // Calcola la vincita in base alla categoria
  switch (matches) {
    case 6: // Jackpot
      if (winners.six > 0) {
        return currentJackpot / winners.six;
      }
      return currentJackpot;
    case 5: // 5 numeri (senza considerare il jolly per semplicità)
      if (winners.five > 0) {
        const categoryPrize = totalPrize * PRIZE_DISTRIBUTION.FIVE;
        return categoryPrize / winners.five;
      }
      return 0;
    case 4: // 4 numeri
      if (winners.four > 0) {
        const categoryPrize = totalPrize * PRIZE_DISTRIBUTION.FOUR;
        return categoryPrize / winners.four;
      }
      return 0;
    case 3: // 3 numeri
      if (winners.three > 0) {
        const categoryPrize = totalPrize * PRIZE_DISTRIBUTION.THREE;
        return categoryPrize / winners.three;
      }
      return 0;
    case 2: // 2 numeri
      if (winners.two > 0) {
        const categoryPrize = totalPrize * PRIZE_DISTRIBUTION.TWO;
        return categoryPrize / winners.two;
      }
      return 0;
    default:
      return 0;
  }
}

// Genera numeri sfigati (con bassa probabilità di vincita)
export function generateUnluckyNumbers(): number[] {
  // Genera diverse tipologie di combinazioni sfigati
  const unluckyPatterns = [
    // Tutti numeri consecutivi
    Array.from({ length: 6 }, (_, i) => i + 1),
    // Tutti numeri che finiscono con la stessa cifra (es. 10, 20, 30, 40, 50, 60)
    Array.from({ length: 6 }, (_, i) => (i + 1) * 10),
    // Tutti i numeri che terminano con zero
    [10, 20, 30, 40, 50, 60],
    // Tutti i numeri che sono multipli di 11
    [11, 22, 33, 44, 55, 66],
    // Tutti i numeri pari o tutti dispari
    [2, 4, 6, 8, 10, 12],
    // Numeri di valore molto alto (improbabili storicamente)
    [70, 75, 80, 82, 85, 90],
    // Pattern geometrici sulla schedina (numeri in diagonale)
    [1, 12, 23, 34, 45, 56],
    // Numeri di date famosi (compleanno, natale, capodanno)
    [1, 12, 25, 31, 24, 19]
  ];
  
  // Seleziona un pattern casuale
  return unluckyPatterns[Math.floor(Math.random() * unluckyPatterns.length)];
}

// Verifica se il karma è zero per decidere se usare numeri sfigati
export function shouldUseUnluckyNumbers(profile: PlayerProfile): boolean {
  return profile && profile.karma <= 0;
}

// Simula il numero di vincitori per ogni categoria
export function simulateWinners() {
  // Probabilità approssimative di vincita per categoria
  const probabilities = {
    six: 1 / 622614630, // 1 su 622 milioni circa
    five: 1 / 1250000, // Approssimativo
    four: 1 / 11900, // Approssimativo
    three: 1 / 327, // Approssimativo
    two: 1 / 22 // Approssimativo
  };
  
  // Calcola il numero atteso di vincitori per categoria
  const expectedWinners = {
    six: AVERAGE_TICKETS_PER_DRAW * probabilities.six,
    five: AVERAGE_TICKETS_PER_DRAW * probabilities.five,
    four: AVERAGE_TICKETS_PER_DRAW * probabilities.four,
    three: AVERAGE_TICKETS_PER_DRAW * probabilities.three,
    two: AVERAGE_TICKETS_PER_DRAW * probabilities.two
  };
  
  // Genera numeri casuali di vincitori basati sui valori attesi
  // Utilizziamo la distribuzione di Poisson per simulare eventi rari
  return {
    six: poissonRandom(expectedWinners.six),
    five: poissonRandom(expectedWinners.five),
    four: poissonRandom(expectedWinners.four),
    three: poissonRandom(expectedWinners.three),
    two: poissonRandom(expectedWinners.two)
  };
}

// Funzione per generare numeri casuali secondo la distribuzione di Poisson
function poissonRandom(lambda: number): number {
  if (lambda < 30) {
    // Per lambda piccoli, usiamo l'algoritmo di Knuth
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    
    do {
      k++;
      p *= Math.random();
    } while (p > L);
    
    return k - 1;
  } else {
    // Per lambda grandi, approssimiamo con una distribuzione normale
    const normal = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
    return Math.max(0, Math.round(normal * Math.sqrt(lambda) + lambda));
  }
}

// Aggiorna il jackpot dopo un'estrazione
export function updateJackpot(matchesSix: boolean): number {
  // Numero variabile di biglietti per questa estrazione (±15% intorno alla media)
  const ticketsSold = Math.round(AVERAGE_TICKETS_PER_DRAW * (0.85 + Math.random() * 0.3));
  
  // Montepremi totale per questa estrazione
  const totalPrize = ticketsSold * TICKET_COST * TOTAL_PRIZE_PERCENTAGE;
  
  // Quota del jackpot per questa estrazione
  const jackpotShare = totalPrize * PRIZE_DISTRIBUTION.SIX;
  
  // Se nessuno ha fatto 6, aggiungi la quota del jackpot al montepremi attuale
  if (!matchesSix) {
    currentJackpot += jackpotShare;
    console.log(`Nessun vincitore del 6: Jackpot aumentato di ${jackpotShare.toLocaleString('it-IT')}€ a ${currentJackpot.toLocaleString('it-IT')}€`);
  } else {
    // Se qualcuno ha fatto 6, resetta il jackpot a un valore base variabile tra 5 e 7 milioni
    const baseMin = 5000000; // 5 milioni
    const baseMax = 7000000; // 7 milioni
    currentJackpot = baseMin + Math.random() * (baseMax - baseMin);
    currentJackpot = Math.round(currentJackpot / 100000) * 100000; // Arrotonda a 100.000€
    console.log(`Vincitore del 6: Jackpot resettato a ${currentJackpot.toLocaleString('it-IT')}€`);
  }
  
  // Salva il nuovo jackpot nel localStorage
  try {
    localStorage.setItem('currentJackpot', currentJackpot.toString());
  } catch (e) {
    console.error("Errore nel salvataggio del jackpot in localStorage", e);
  }
  
  return currentJackpot;
}

// Ottieni il jackpot attuale
export function getCurrentJackpot(): number {
  return currentJackpot;
}

// Funzione per impostare direttamente il jackpot
export function setCurrentJackpot(amount: number): void {
  if (amount > 0) {
    currentJackpot = amount;
    
    // Salva nel localStorage
    try {
      localStorage.setItem('currentJackpot', amount.toString());
    } catch (e) {
      console.error("Errore nel salvataggio del jackpot in localStorage", e);
    }
  }
}

// Simula i risultati nazionali di un'estrazione
export interface NationalResults {
  totalTickets: number;
  totalPrize: number;
  jackpot: number;
  winners: {
    six: number;
    five: number;
    four: number;
    three: number;
    two: number;
  };
  winningAmounts: {
    six: number;
    five: number;
    four: number;
    three: number;
    two: number;
  };
}

export function simulateNationalResults(drawnNumbers: number[]): NationalResults {
  // Numero di schedine giocate (con una piccola variazione casuale)
  const totalTickets = Math.round(AVERAGE_TICKETS_PER_DRAW * (0.85 + Math.random() * 0.3));
  
  // Montepremi totale
  const totalPrize = totalTickets * TICKET_COST * TOTAL_PRIZE_PERCENTAGE;
  
  // Simula i vincitori
  const winners = simulateWinners();
  
  // Calcola gli importi delle vincite per categoria
  const winningAmounts = {
    six: winners.six > 0 ? currentJackpot / winners.six : 0,
    five: winners.five > 0 ? (totalPrize * PRIZE_DISTRIBUTION.FIVE) / winners.five : 0,
    four: winners.four > 0 ? (totalPrize * PRIZE_DISTRIBUTION.FOUR) / winners.four : 0,
    three: winners.three > 0 ? (totalPrize * PRIZE_DISTRIBUTION.THREE) / winners.three : 0,
    two: winners.two > 0 ? (totalPrize * PRIZE_DISTRIBUTION.TWO) / winners.two : 0
  };
  
  // Aggiorna il jackpot
  const hasSixWinners = winners.six > 0;
  const newJackpot = updateJackpot(hasSixWinners);
  
  return {
    totalTickets,
    totalPrize,
    jackpot: newJackpot,
    winners,
    winningAmounts
  };
}
