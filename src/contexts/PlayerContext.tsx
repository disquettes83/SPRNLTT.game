import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PlayerProfile, 
  generateRandomProfile, 
  generateChildProfile,
  savePlayerProfile, 
  loadPlayerProfile,
  updateKarma,
  updateBalance,
  recordTicketPlayed,
  recordWinnings,
  incrementAge,
  checkForDeath,
  simulateWeeklyImpact
} from '@/lib/player';

interface PlayerContextType {
  profile: PlayerProfile | null;
  loading: boolean;
  setProfile: (profile: PlayerProfile) => void;
  generateNewProfile: () => void;
  generateChildProfileFromParent: () => void;
  resetProfile: () => void;
  modifyKarma: (amount: number) => void;
  modifyBalance: (amount: number) => void;
  playTicket: (cost: number) => void;
  addWinning: (amount: number) => void;
  ageOneYear: () => {death: boolean, deathEvent: any | null};
  simulateWeek: () => {
    balanceChange: number,
    events: string[],
    karmaChange: number
  };
  checkPlayerDeath: (hasWonJackpot?: boolean) => {died: boolean, event: any};
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [profile, setProfileState] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Carica il profilo dal localStorage all'avvio
  useEffect(() => {
    const loadedProfile = loadPlayerProfile();
    setProfileState(loadedProfile);
    setLoading(false);
  }, []);
  
  // Salva il profilo nel localStorage quando cambia
  useEffect(() => {
    if (profile) {
      savePlayerProfile(profile);
    }
  }, [profile]);
  
  // Imposta direttamente un profilo
  const setProfile = (newProfile: PlayerProfile) => {
    setProfileState(newProfile);
    savePlayerProfile(newProfile);
  };
  
  // Genera un nuovo profilo casuale
  const generateNewProfile = () => {
    const newProfile = generateRandomProfile();
    setProfileState(newProfile);
  };
  
  // Genera un profilo per il figlio del giocatore attuale
  const generateChildProfileFromParent = () => {
    if (profile) {
      const childProfile = generateChildProfile(profile);
      setProfileState(childProfile);
    }
  };
  
  // Reimposta il profilo
  const resetProfile = () => {
    localStorage.removeItem('playerProfile');
    setProfileState(null);
  };
  
  // Modifica il karma
  const modifyKarma = (amount: number) => {
    if (profile) {
      setProfileState(updateKarma(profile, amount));
    }
  };
  
  // Modifica il bilancio
  const modifyBalance = (amount: number) => {
    if (profile) {
      setProfileState(updateBalance(profile, amount));
    }
  };
  
  // Registra una schedina giocata
  const playTicket = (cost: number) => {
    if (profile) {
      setProfileState(recordTicketPlayed(profile, cost));
    }
  };
  
  // Registra una vincita
  const addWinning = (amount: number) => {
    if (profile) {
      setProfileState(recordWinnings(profile, amount));
    }
  };
  
  // Invecchia il giocatore di un anno e gestisce eventuali conseguenze
  const ageOneYear = () => {
    if (!profile) {
      return { death: false, deathEvent: null };
    }
    
    // Incrementa l'età
    const updatedProfile = incrementAge(profile);
    setProfileState(updatedProfile);
    
    // Verifica se il giocatore muore
    const deathCheck = checkForDeath(updatedProfile);
    
    return {
      death: deathCheck.died,
      deathEvent: deathCheck.event
    };
  };
  
  // Simula l'impatto settimanale sul bilancio e altri fattori
  const simulateWeek = () => {
    if (!profile) {
      return { balanceChange: 0, events: [], karmaChange: 0 };
    }
    
    // Simula l'impatto settimanale
    const weekImpact = simulateWeeklyImpact(profile);
    
    // Aggiorna il bilancio
    const updatedProfile = updateBalance(profile, weekImpact.balanceChange);
    
    // Aggiorna il karma se necessario
    if (weekImpact.karmaChange !== 0) {
      const finalProfile = updateKarma(updatedProfile, weekImpact.karmaChange);
      setProfileState(finalProfile);
    } else {
      setProfileState(updatedProfile);
    }
    
    return weekImpact;
  };
  
  // Verifica se il giocatore muore (per eventi straordinari)
  const checkPlayerDeath = (hasWonJackpot: boolean = false) => {
    if (!profile) {
      return { died: false, event: null };
    }
    
    return checkForDeath(profile, hasWonJackpot);
  };
  
  const value = {
    profile,
    loading,
    setProfile,
    generateNewProfile,
    generateChildProfileFromParent,
    resetProfile,
    modifyKarma,
    modifyBalance,
    playTicket,
    addWinning,
    ageOneYear,
    simulateWeek,
    checkPlayerDeath
  };
  
  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  
  return context;
};
