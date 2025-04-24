import React, { useState } from 'react';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Gift, RefreshCw, Briefcase, Heart, Users, AlertCircle, CreditCard, Activity, PiggyBank } from 'lucide-react';
import { confetti } from '@/lib/confetti';
import { cn } from '@/lib/utils';
import { generateRandomProfile, PlayerProfile } from '@/lib/player';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProfileCardProps {
  profile: PlayerProfile;
  onClick: () => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, className, onClick }) => {
  // Traduzioni per gli stati
  const maritalStatusText = {
    'single': 'Single',
    'sposato': 'Sposato',
    'vedovo': 'Vedovo',
    'divorziato': 'Divorziato',
    'separato': 'Separato',
    'convivente': 'Convivente'
  };
  
  const socialStatusText = {
    'indigente': 'Indigente',
    'povero': 'In difficoltà',
    'classe media-bassa': 'Classe Operaia',
    'classe media': 'Classe Media',
    'benestante': 'Benestante',
    'ricco': 'Ricco',
    'elite': 'Elite'
  };
  
  const employmentText = {
    'disoccupato': 'Disoccupato',
    'precario': 'Lavoratore Precario',
    'part-time': 'Part-time',
    'impiego fisso': 'Impiego Fisso',
    'libero professionista': 'Libero Professionista',
    'imprenditore': 'Imprenditore',
    'pensionato': 'Pensionato'
  };
  
  const debtText = {
    'nessuno': 'Nessuno',
    'piccolo': 'Piccolo',
    'medio': 'Medio',
    'grande': 'Grande',
    'schiacciante': 'Schiacciante'
  };
  
  const addictionText = {
    'nessuna': 'Nessuna',
    'gioco': 'Gioco d\'azzardo',
    'alcol': 'Alcol',
    'shopping': 'Shopping compulsivo',
    'sigarette': 'Sigarette',
    'più dipendenze': 'Dipendenze multiple'
  };
  
  // Calcola il bilancio settimanale netto
  const weeklyNetIncome = profile.weeklyIncome - profile.fixedExpenses - profile.variableExpenses;
  
  // Determina il colore del debito
  const getDebtColor = () => {
    if (profile.debt === 'nessuno') return 'text-green-600';
    if (profile.debt === 'piccolo') return 'text-yellow-500';
    if (profile.debt === 'medio') return 'text-yellow-600';
    if (profile.debt === 'grande') return 'text-orange-500';
    return 'text-red-500';
  };
  
  // Determina il colore della dipendenza
  const getAddictionColor = () => {
    if (profile.addiction === 'nessuna') return 'text-green-600';
    if (profile.addictionSeverity <= 3) return 'text-yellow-500';
    if (profile.addictionSeverity <= 7) return 'text-orange-500';
    return 'text-red-500';
  };
  
  return (
    <Card className={cn("cursor-pointer hover:shadow-lg transition-all duration-300", className)} onClick={onClick}>
      <CardHeader className="pb-2">
        <CardTitle>{profile.name}</CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            {profile.age} anni, {profile.city} 
            <Badge variant="outline">{profile.region}</Badge>
          </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="bg-muted p-2 rounded-sm mb-3">
          <div className="font-semibold mb-1 flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            Situazione economica
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="text-muted-foreground">Condizione:</div>
            <div>{socialStatusText[profile.socialStatus]}</div>
            
            <div className="text-muted-foreground">Occupazione:</div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {employmentText[profile.employment]}
            </div>
            
            <div className="text-muted-foreground">Debito:</div>
            <div className={getDebtColor()}>
              {debtText[profile.debt]}
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-2 rounded-sm mb-3">
          <div className="font-semibold mb-1 flex items-center gap-1">
            <Users className="h-4 w-4" />
            Stato personale
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="text-muted-foreground">Stato civile:</div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {maritalStatusText[profile.maritalStatus]}
            </div>
            
            <div className="text-muted-foreground">Figli:</div>
            <div>
              {profile.hasChildren 
               ? `${profile.numberOfChildren} ${profile.numberOfChildren === 1 ? 'figlio' : 'figli'}`
               : 'No'}
            </div>
            
            <div className="text-muted-foreground">Dipendenze:</div>
            <div className={getAddictionColor()}>
              {addictionText[profile.addiction]}
              {profile.addiction !== 'nessuna' && ` (${profile.addictionSeverity}/10)`}
            </div>
            
            {profile.healthIssues && profile.healthIssues.length > 0 && profile.healthIssues[0] !== "Nessuno" && (
              <>
                <div className="text-muted-foreground">Problemi di salute:</div>
                <div className="text-red-500 flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  {profile.healthIssues[0]}
                </div>
              </>
            )}
          </div>
        </div>
          
        <div className="font-semibold mb-1">Situazione finanziaria</div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Bilancio:</span>
          <span className="font-medium">{profile.balance.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Entrate settimanali:</span>
          <span className="text-green-600">{profile.weeklyIncome.toFixed(2)} €</span>
        </div>
        {profile.hiddenIncome > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Entrate in nero:</span>
            <span className="text-gray-500">{profile.hiddenIncome.toFixed(2)} €</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Spese fisse:</span>
          <span className="text-red-600">{profile.fixedExpenses.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Spese variabili:</span>
          <span className="text-red-600">{profile.variableExpenses.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between font-medium mt-1 pt-1 border-t border-dashed">
          <span>Bilancio settimanale netto:</span>
          <span className={weeklyNetIncome >= 0 ? 'text-green-600' : 'text-red-600'}>
            {weeklyNetIncome.toFixed(2)} €
          </span>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-xs mt-2">
                <AlertCircle className="h-3 w-3" />
                <span>Karma: {profile.karma}/10</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Il karma influenza le probabilità di eventi fortunati e sfortunati</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Scegli questo profilo
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProfileCreation: React.FC = () => {
  const { setProfile } = usePlayer();
  const [profiles, setProfiles] = useState<PlayerProfile[]>(() => {
    // Genera 3 profili casuali iniziali
    return Array.from({ length: 3 }, () => generateRandomProfile());
  });
  
  const handleRefresh = () => {
    setProfiles(Array.from({ length: 3 }, () => generateRandomProfile()));
  };
  
  const handleSelectProfile = (index: number) => {
    // Effetto visivo
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Imposta il profilo scelto direttamente nel context
    const selectedProfile = profiles[index];
    setProfile(selectedProfile);
  };
  
  // Classificazione difficoltà profilo
  const getDifficultyBadge = (profile: PlayerProfile) => {
    // Calcola un punteggio di difficoltà basato su diversi fattori
    let difficultyScore = 0;
    
    // Fattori finanziari
    const weeklyNet = profile.weeklyIncome - profile.fixedExpenses - profile.variableExpenses;
    if (weeklyNet < 0) difficultyScore += 3;
    else if (weeklyNet < 50) difficultyScore += 2;
    else if (weeklyNet < 100) difficultyScore += 1;
    
    // Fattori sociali
    if (profile.socialStatus === 'indigente') difficultyScore += 3;
    else if (profile.socialStatus === 'povero') difficultyScore += 2;
    else if (profile.socialStatus === 'classe media-bassa') difficultyScore += 1;
    
    // Fattori personali
    if (profile.addiction !== 'nessuna') difficultyScore += profile.addictionSeverity > 5 ? 2 : 1;
    if (profile.debt === 'schiacciante') difficultyScore += 3;
    else if (profile.debt === 'grande') difficultyScore += 2;
    else if (profile.debt === 'medio') difficultyScore += 1;
    if (profile.healthIssues && profile.healthIssues.length > 0 && profile.healthIssues[0] !== "Nessuno") difficultyScore += 2;
    if (profile.karma < 4) difficultyScore += 2;
    else if (profile.karma < 7) difficultyScore += 1;
    
    // Classifica la difficoltà
    if (difficultyScore >= 8) return <Badge className="bg-red-600 hover:bg-red-700">Difficile</Badge>;
    if (difficultyScore >= 4) return <Badge className="bg-yellow-600 hover:bg-yellow-700">Medio</Badge>;
    return <Badge className="bg-green-600 hover:bg-green-700">Facile</Badge>;
  };
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Inizia la tua avventura al SPRNLTT</h1>
        <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
          Scegli un profilo per iniziare la tua carriera da giocatore! 
          Ogni personaggio ha una situazione economica e personale diversa.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {profiles.map((profile, index) => (
          <div key={index} className="relative">
            <div className="absolute -top-3 right-3 z-10">
              {getDifficultyBadge(profile)}
            </div>
            <ProfileCard 
              profile={profile}
              onClick={() => handleSelectProfile(index)}
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> Genera nuovi profili
        </Button>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-center">
          <div className="flex justify-center mb-2">
            <Gift className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-medium text-amber-800">Suggerimento</h3>
          <p className="text-sm text-amber-700">
            I giocatori con un bilancio più alto possono permettersi di giocare più a lungo, 
            ma ricorda che il SPRNLTT è un gioco dove le probabilità non sono mai a tuo favore!
          </p>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
          <div className="flex justify-center mb-2">
            <PiggyBank className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Strategie di sopravvivenza</h3>
          <p className="text-sm text-gray-700">
            Un buon bilancio settimanale netto positivo ti permetterà di sopravvivere più a lungo.
            Le dipendenze e i debiti possono rapidamente peggiorare la tua situazione finanziaria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;
