import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CoinsIcon, TrendingUp, TrendingDown, Ticket, BarChart, Clock, AlertCircle, BadgeDollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlayer } from '@/contexts/PlayerContext';

interface StatsPanelProps {
  moneySpent: number;
  moneyWon: number;
  gamesPlayed: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  moneySpent,
  moneyWon,
  gamesPlayed,
}) => {
  const { profile } = usePlayer();
  const returnRate = moneySpent > 0 ? (moneyWon / moneySpent) * 100 : 0;
  const profit = moneyWon - moneySpent;
  const isProfitable = profit >= 0;
  
  // Calcola la percentuale di reddito settimanale speso in lotteria
  const calculateWeeklyIncomePercentage = () => {
    if (!profile || !profile.weeklyIncome || profile.weeklyIncome === 0) return 0;
    
    // Calcolo più accurato della spesa media settimanale in gioco
    
    // 1. Determina il numero di settimane di gioco in modo più accurato
    // Se non abbiamo informazioni sulla durata del gioco, assumiamo almeno 1 settimana
    let weeks = 1;
    
    if (gamesPlayed > 0) {
      // Approssimiamo il numero di settimane in base al numero di partite giocate
      // Assumendo che in media una persona giochi 2 volte a settimana
      weeks = Math.max(1, Math.ceil(gamesPlayed / 2));
    }
    
    // 2. Calcola la spesa media settimanale
    const weeklySpent = moneySpent / weeks;
    
    // 3. Calcola la percentuale rispetto al reddito settimanale totale
    // Includiamo anche il reddito nascosto per un calcolo più accurato
    const totalWeeklyIncome = profile.weeklyIncome + (profile.hiddenIncome || 0);
    
    // 4. Calcola e restituisci la percentuale
    return (weeklySpent / totalWeeklyIncome) * 100;
  };
  
  // Determina il colore e il testo per la percentuale di spesa
  const getSpendingPercentageInfo = () => {
    const percentage = calculateWeeklyIncomePercentage();
    
    // Log per debug
    console.log(`Spesa settimanale: ${(moneySpent / Math.max(1, Math.ceil(gamesPlayed / 2))).toFixed(2)}€`);
    console.log(`Reddito settimanale: ${profile?.weeklyIncome.toFixed(2)}€ + ${profile?.hiddenIncome?.toFixed(2) || '0'}€ nascosti`);
    console.log(`Percentuale calcolata: ${percentage.toFixed(2)}%`);
    
    if (percentage >= 30) {
      return {
        color: 'text-red-600',
        text: 'CRITICO - Più del 30% del tuo reddito settimanale'
      };
    } else if (percentage >= 15) {
      return {
        color: 'text-orange-500',
        text: 'ALTO - Tra il 15% e il 30% del tuo reddito settimanale'
      };
    } else if (percentage >= 5) {
      return {
        color: 'text-yellow-500',
        text: 'MODERATO - Tra il 5% e il 15% del tuo reddito settimanale'
      };
    } else {
      return {
        color: 'text-green-600',
        text: 'CONTROLLATO - Meno del 5% del tuo reddito settimanale'
      };
    }
  };
  
  const spendingInfo = getSpendingPercentageInfo();
  
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="basic">Base</TabsTrigger>
        <TabsTrigger value="advanced">Avanzate</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Statistiche di gioco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Ticket className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Giocate effettuate</span>
                  </div>
                  <span className="font-bold">{gamesPlayed}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Soldi spesi</span>
                  </div>
                  <span className="font-bold text-red-500">-{moneySpent.toFixed(2)} €</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Soldi vinti</span>
                  </div>
                  <span className="font-bold text-green-500">+{moneyWon.toFixed(2)} €</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CoinsIcon className="mr-2 h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Bilancio</span>
                  </div>
                  <span className={`font-bold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                    {isProfitable ? '+' : ''}{profit.toFixed(2)} €
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tasso di ritorno</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
              <div className="mb-2">
  <Progress value={calculateWeeklyIncomePercentage()} max={50} className="h-2" />
  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
    <span>0%</span>
    <span>15%</span>
    <span>30%</span>
    <span>50%</span>
  </div>
</div>
                
                <div className="text-center">
                  <p className="text-3xl font-bold">{returnRate.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">
                    Hai recuperato il {returnRate.toFixed(1)}% di quanto hai speso
                  </p>
                  {returnRate < 100 && (
                    <p className="text-xs text-red-500 mt-2 italic">
                      {moneySpent > 0 ? `Hai perso ${(moneySpent - moneyWon).toFixed(2)} €` : ''}
                    </p>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground text-center italic">
                  <p>Le lotterie hanno un tasso di ritorno medio di circa 50%</p>
                  <p>Il SuperEnalotto ha un tasso di ritorno di circa 34%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="advanced">
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Analisi dell'impatto finanziario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="text-sm font-medium mb-2 flex items-center">
                    <BadgeDollarSign className="mr-2 h-4 w-4 text-amber-500" />
                    Impatto sul reddito settimanale
                  </div>
                  
                  <div className="mb-2">
                    <Progress value={calculateWeeklyIncomePercentage()} max={50} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>15%</span>
                      <span>30%</span>
                      <span>50%</span>
                    </div>
                  </div>
                  
                  <div className="text-xs flex items-center">
                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                    <span>Livello di spesa:</span>
                    <span className={`ml-1 font-semibold ${spendingInfo.color}`}>
                      {spendingInfo.text}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200 space-y-2">
                  <div className="text-sm font-medium mb-1 flex items-center">
                    <BarChart className="mr-2 h-4 w-4 text-indigo-500" />
                    Statistiche comparative
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="text-muted-foreground">Spesa media per giocata:</div>
                    <div className="font-medium">
                      {gamesPlayed > 0 ? (moneySpent / gamesPlayed).toFixed(2) : '0.00'} €
                    </div>
                    
                    <div className="text-muted-foreground">Vincita media per giocata:</div>
                    <div className="font-medium">
                      {gamesPlayed > 0 ? (moneyWon / gamesPlayed).toFixed(2) : '0.00'} €
                    </div>
                    
                    {profile && (
                      <>
                        <div className="text-muted-foreground">Rispetto al patrimonio iniziale:</div>
                        <div className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {profile.balance > 0 
                            ? ((profit / profile.balance) * 100).toFixed(1) 
                            : '0.00'}%
                        </div>
                        
                        {profile.addiction === 'gioco' && (
                          <>
                            <div className="text-muted-foreground">Livello dipendenza dal gioco:</div>
                            <div className="font-medium text-red-500">
                              {profile.addictionSeverity}/10
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-md border border-amber-200 space-y-2">
                  <div className="text-sm font-medium mb-1 flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-amber-600" />
                    Tempo e risorse
                  </div>
                  
                  <div className="text-xs text-amber-800">
                    <p className="mb-1">Con i soldi spesi nel gioco fino ad ora ({moneySpent.toFixed(2)} €), avresti potuto:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {moneySpent >= 30 && <li>Acquistare {Math.floor(moneySpent / 30)} pasti completi al ristorante</li>}
                      {moneySpent >= 10 && <li>Andare al cinema {Math.floor(moneySpent / 10)} volte</li>}
                      {moneySpent >= 50 && <li>Pagare {Math.floor(moneySpent / 50)} bollette di utenze medie</li>}
                      {moneySpent >= 100 && <li>Mettere da parte {moneySpent.toFixed(2)} € per spese impreviste</li>}
                      {moneySpent >= 500 && <li>Iniziare un piccolo investimento di {moneySpent.toFixed(2)} €</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StatsPanel;
