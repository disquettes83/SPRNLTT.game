import React from 'react';
import { usePlayer } from '@/contexts/PlayerContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Euro, User, Home, Heart, CreditCard, TrendingUp, TrendingDown, 
  Users, Briefcase, AlertCircle, Activity, PiggyBank, Calendar,
  AlertTriangle, Clock, MapPin, BadgeEuro
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PlayerProfile: React.FC = () => {
  const { profile } = usePlayer();
  
  if (!profile) return null;
  
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
  
  // Determina il colore del karma
  const getKarmaColor = () => {
    if (profile.karma <= 3) return 'bg-red-500';
    if (profile.karma <= 6) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Determina il colore della dipendenza
  const getAddictionColor = () => {
    if (profile.addiction === 'nessuna') return '';
    if (profile.addictionSeverity <= 3) return 'text-yellow-500';
    if (profile.addictionSeverity <= 7) return 'text-orange-500';
    return 'text-red-500';
  };
  
  // Determina il colore del debito
  const getDebtColor = () => {
    if (profile.debt === 'nessuno') return '';
    if (profile.debt === 'piccolo') return 'text-yellow-500';
    if (profile.debt === 'medio') return 'text-yellow-600';
    if (profile.debt === 'grande') return 'text-orange-500';
    return 'text-red-500';
  };
  
  // Calcola il bilancio settimanale netto
  const weeklyNetIncome = profile.weeklyIncome - profile.fixedExpenses - profile.variableExpenses;
  
  return (
    <Card className="pixel-border">
      <CardHeader className="pb-2 border-b-2 border-border">
        <CardTitle className="text-lg flex items-center gap-2 uppercase">
          <User className="h-5 w-5" />
          Documento d'Identità {profile.generation && profile.generation > 1 ? 
            <Badge variant="outline" className="ml-2">Generazione {profile.generation}</Badge> : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div>
          <h3 className="font-bold text-xl uppercase">{profile.name}</h3>
          <div className="flex flex-col text-sm space-y-1 mt-2">
            <div className="flex items-center gap-2 border-b border-dashed border-border pb-1">
              <span className="text-muted-foreground font-bold uppercase w-24">Età:</span>
              <span className="font-mono">{profile.age} anni</span>
            </div>
            <div className="flex items-center gap-2 border-b border-dashed border-border pb-1">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">{profile.city}</span>
              {profile.region && <Badge variant="outline" className="ml-1">{profile.region}</Badge>}
            </div>
            <div className="flex items-center gap-2 border-b border-dashed border-border pb-1">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">{maritalStatusText[profile.maritalStatus]}</span>
            </div>
            <div className="flex items-center gap-2 border-b border-dashed border-border pb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">
                {profile.hasChildren ? `${profile.numberOfChildren} ${profile.numberOfChildren === 1 ? 'figlio' : 'figli'}` : 'Nessun figlio'}
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-dashed border-border pb-1">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">{socialStatusText[profile.socialStatus]}</span>
            </div>
            <div className="flex items-center gap-2 border-b border-dashed border-border pb-1">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">{employmentText[profile.employment]}</span>
            </div>
            
            {/* Problemi di salute */}
            {profile.healthIssues && profile.healthIssues.length > 0 && profile.healthIssues[0] !== "Nessuno" && (
              <div className="flex items-center gap-2 border-b border-dashed border-border pb-1">
                <Activity className="h-4 w-4 text-red-500" />
                <span className="font-mono text-red-500">{profile.healthIssues.join(', ')}</span>
              </div>
            )}
            
            {/* Dipendenze */}
            {profile.addiction && profile.addiction !== 'nessuna' && (
              <div className="flex items-center gap-2 border-b border-dashed border-border pb-1">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className={`font-mono ${getAddictionColor()}`}>
                  {addictionText[profile.addiction]} 
                  {profile.addictionSeverity && ` (Livello ${profile.addictionSeverity}/10)`}
                </span>
              </div>
            )}
            
            {/* Debiti */}
            {profile.debt && profile.debt !== 'nessuno' && (
              <div className="flex items-center gap-2 border-b border-dashed border-border pb-1">
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
                <span className={`font-mono ${getDebtColor()}`}>
                  Debito: {debtText[profile.debt]}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t-2 border-border pt-3 space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium uppercase">Bilancio</span>
              <span className={`font-bold font-mono ${profile.balance < 0 ? 'text-red-500' : ''}`}>
                {profile.balance.toFixed(2)} €
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs mt-2 bg-muted p-2 rounded-sm">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <div>
                  <div className="text-muted-foreground uppercase">Entrate</div>
                  <div className="font-medium font-mono">{profile.weeklyIncome.toFixed(2)} €/sett</div>
                  {profile.hiddenIncome > 0 && (
                    <div className="font-medium font-mono text-gray-400">+{profile.hiddenIncome.toFixed(2)} €/sett (non dichiarato)</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <div>
                  <div className="text-muted-foreground uppercase">Spese</div>
                  <div className="font-medium font-mono">{profile.fixedExpenses.toFixed(2)} €/sett (fisse)</div>
                  {profile.variableExpenses > 0 && (
                    <div className="font-medium font-mono">{profile.variableExpenses.toFixed(2)} €/sett (variabili)</div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bilancio netto settimanale */}
            <div className="flex justify-between items-center mt-2 text-xs">
              <span className="text-muted-foreground uppercase">Bilancio netto settimanale</span>
              <span className={`font-bold font-mono ${weeklyNetIncome >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {weeklyNetIncome.toFixed(2)} €/sett
              </span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium uppercase">Karma</span>
              <span className="font-bold font-mono">{profile.karma}/10</span>
            </div>
            <div className="h-2 w-full bg-red-200 rounded-full overflow-hidden">
              <div 
                className={cn("h-full", getKarmaColor())}
                style={{ width: `${profile.karma * 10}%` }}
              ></div>
            </div>
          </div>
          
          {/*
          <div className="grid grid-cols-2 gap-3 text-xs bg-muted p-2 rounded-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground uppercase">Schedine giocate</span>
              <span className="font-bold font-mono">{profile.playedTickets}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground uppercase">Soldi spesi</span>
              <span className="font-bold text-red-500 font-mono">{profile.moneySpent.toFixed(2)} €</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground uppercase">Soldi vinti</span>
              <span className="font-bold text-green-500 font-mono">{profile.moneyWon.toFixed(2)} €</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground uppercase">Bilancio gioco</span>
              <span className={`font-bold font-mono ${profile.moneyWon - profile.moneySpent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {(profile.moneyWon - profile.moneySpent).toFixed(2)} €
              </span>
            </div>
          </div>
          */}
          
          {/* Eventi di vita */}
          {profile.lifeEvents && profile.lifeEvents.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="life-events">
                <AccordionTrigger className="text-sm font-medium uppercase py-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Eventi significativi
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="text-xs space-y-1 pt-1">
                    {profile.lifeEvents.map((event, index) => (
                      <li key={index} className="flex items-start">
                        <Clock className="h-3 w-3 mr-1 mt-0.5 text-muted-foreground" />
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          
          {/* Valutazione stato */}
          <div className="flex justify-end mt-2">
            {profile.karma >= 7 ? (
              <div className="stamp-approved">FELICE</div>
            ) : profile.karma <= 3 ? (
              <div className="stamp-denied">DISPERATO</div>
            ) : (
              <div className="stamp-pending">ANSIOSO</div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-3 text-xs text-muted-foreground">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <BadgeEuro className="h-4 w-4 mr-1" />
            <span>Stile di vita {socialStatusText[profile.socialStatus].toLowerCase()}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Costo della vita: {profile.region}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlayerProfile;
