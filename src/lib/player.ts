// Tipi di dati estesi per il profilo del giocatore
export type MaritalStatus = 'single' | 'sposato' | 'vedovo' | 'divorziato' | 'separato' | 'convivente';
export type SocialStatus = 'indigente' | 'povero' | 'classe media-bassa' | 'classe media' | 'benestante' | 'ricco' | 'elite';
export type Employment = 'disoccupato' | 'precario' | 'part-time' | 'impiego fisso' | 'libero professionista' | 'imprenditore' | 'pensionato';
export type Debt = 'nessuno' | 'piccolo' | 'medio' | 'grande' | 'schiacciante';
export type Addiction = 'nessuna' | 'gioco' | 'alcol' | 'shopping' | 'sigarette' | 'più dipendenze';

export interface PlayerProfile {
  name: string;
  age: number;
  city: string;
  socialStatus: SocialStatus;
  maritalStatus: MaritalStatus;
  hasChildren: boolean;
  numberOfChildren: number; // Numero effettivo di figli
  employment: Employment;
  debt: Debt;
  addiction: Addiction;
  addictionSeverity: number; // 1-10
  balance: number;
  weeklyIncome: number;
  fixedExpenses: number;
  variableExpenses: number; // Nuova voce: spese variabili (imprevisti, capricci)
  karma: number; // da 0 a 10, solo numeri interi
  playedTickets: number;
  moneySpent: number;
  moneyWon: number;
  lifeEvents: string[]; // Eventi significativi nella vita del giocatore
  generation?: number; // Generazione del giocatore (1 = originale, 2 = figlio, ecc.)
  hiddenIncome?: number; // Entrate non dichiarate o illegali
  healthIssues?: string[]; // Problemi di salute che possono incidere sulle spese
  region?: string; // Regione d'Italia (influisce su costo della vita)
}

// Nomi e cognomi casuali
export const firstNames = [
  'Marco', 'Giuseppe', 'Antonio', 'Giovanni', 'Francesco',
'Maria', 'Anna', 'Lucia', 'Giovanna', 'Rosa',
'Alessandro', 'Luigi', 'Salvatore', 'Roberto', 'Paolo',
'Andrea', 'Stefano', 'Pietro', 'Vincenzo', 'Carlo',
'Sofia', 'Giulia', 'Chiara', 'Francesca', 'Laura',
'Martina', 'Sara', 'Valentina', 'Elena', 'Caterina',
'Luca', 'Matteo', 'Davide', 'Massimo', 'Daniele',
'Federica', 'Paola', 'Roberta', 'Angela', 'Silvia',
'Claudio', 'Fabio', 'Lorenzo', 'Gabriele', 'Domenico',
'Elisa', 'Alessia', 'Monica', 'Simona', 'Antonella',
'Raffaele', 'Pasquale', 'Ciro', 'Carmine', 'Gaetano',
'Michele', 'Aniello', 'Gennaro', 'Cosimo', 'Fortunato',
'Cataldo', 'Vito', 'Nicola', 'Rocco', 'Biagio',
'Emanuele', 'Donato', 'Rosario', 'Tommaso', 'Achille',
'Concetta', 'Filomena', 'Carmela', 'Assunta', 'Immacolata',
'Nunzia', 'Rosaria', 'Graziella', 'Addolorata', 'Margherita',
'Teresa', 'Alfonsina', 'Loredana', 'Letizia', 'Vincenza',
'Giovannina', 'Agata', 'Mirella', 'Saveria', 'Giuliana',
'Zosimo', 'Epifanio', 'Onofrio', 'Alfiero', 'Calogero',
'Tancredi', 'Tito', 'Sebastiano', 'Leonzio', 'Zaccaria',
'Filiberto', 'Baldassarre', 'Amilcare', 'Ermenegildo', 'Teodoro',
'Benedetta', 'Eufemia', 'Serafina', 'Clelia', 'Bibiana',
'Aurora', 'Adalgisa', 'Gelsomina', 'Letizia', 'Ortensia',
'Palmira', 'Celestina', 'Pasqualina', 'Speranza', 'Clementina'

];

export const lastNames = [
  'Rossi', 'Bianchi', 'Esposito', 'Romano', 'Colombo',
'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Ferrari',
'Russo', 'Conti', 'Costa', 'Fontana', 'Rizzo', 'Moretti',
'Barbieri', 'Lombardi', 'Santoro', 'Mariani', 'Rinaldi',
'Caruso', 'Ferrara', 'Leone', 'Marchetti', 'Martini',
'Vitale', 'De Luca', 'Ferri', 'Parisi', 'Benedetti',
'Bellini', 'Barone', 'Monti', 'Gatti', 'Pellegrini',
'Rossetti', 'Palumbo', 'Cattaneo', 'Bernardi', 'Mancini',
'Valentini', 'Messina', 'Fabbri', 'Martino', 'Serra',
'Coppola', 'De Santis', 'D\'Angelo', 'Rizzi', 'Villa',
'Amato', 'Puglisi', 'Lombardo', 'Grasso', 'Fichera',
'Alfano', 'Piazza', 'Mancuso', 'Siciliano', 'Paternò',
'Lo Russo', 'Di Mauro', 'Criscuolo', 'Giordano', 'Napolitano',
'Panebianco', 'Morabito', 'Crispino', 'Sabbatino', 'Zito',
'Terranova', 'Pagano', 'Sapienza', 'Modica', 'Ciaramella',
'Pisani', 'Licata', 'Graziano', 'Sorrentino', 'Gulotta',
'Trapani', 'Cefalù', 'Caracciolo', 'Cutrò', 'Ragusa',
'Altavilla', 'Campanella', 'Melfi', 'Monteleone', 'Palmeri',
'De Laurentiis', 'Fiore', 'Galasso', 'Tropea', 'Di Benedetto'
];

// Città italiane
export const italianCities = [
  'Roma', 'Milano', 'Napoli', 'Torino', 'Palermo',
  'Bologna', 'Firenze', 'Bari', 'Catania', 'Venezia',
  'Genova', 'Verona', 'Messina', 'Padova', 'Trieste',
  'Taranto', 'Brescia', 'Prato', 'Reggio Calabria', 'Modena',
  'Parma', 'Reggio Emilia', 'Perugia', 'Livorno', 'Ravenna',
  'Cagliari', 'Foggia', 'Rimini', 'Salerno', 'Ferrara',
  'Sassari', 'Latina', 'Giugliano in Campania', 'Monza', 'Siracusa',
  'Pescara', 'Bergamo', 'Forlì', 'Vicenza', 'Trento',
  'Terni', 'Novara', 'Bolzano', 'Piacenza', 'Ancona',
  'Andria', 'Udine', 'Arezzo', 'Cesena', 'Lecce',
  'Barletta', 'Brindisi', 'Como', 'La Spezia', 'Marsala',
  'Pesaro', 'Pisa', 'Caserta', 'Varese', 'Catanzaro',
  'Lucca', 'Matera', 'Pistoia', 'Viterbo', 'Asti',
  'Sondrio', 'Benevento', 'Crotone', 'Siena', 'Biella',
  'Aosta', 'Cremona', 'Trani', 'Ragusa', 'Mantova', 'Gallipoli'
];

// Database regioni italiane con costo della vita
const italianRegions = {
  "Lombardia": { costMultiplier: 1.3, cities: ["Milano", "Brescia", "Bergamo", "Monza", "Como", "Varese", "Pavia"] },
  "Lazio": { costMultiplier: 1.2, cities: ["Roma", "Latina", "Frosinone", "Viterbo", "Rieti"] },
  "Campania": { costMultiplier: 0.9, cities: ["Napoli", "Salerno", "Caserta", "Benevento", "Avellino"] },
  "Sicilia": { costMultiplier: 0.85, cities: ["Palermo", "Catania", "Messina", "Siracusa", "Ragusa"] },
  "Toscana": { costMultiplier: 1.15, cities: ["Firenze", "Pisa", "Livorno", "Siena", "Lucca"] },
  "Veneto": { costMultiplier: 1.1, cities: ["Venezia", "Verona", "Padova", "Vicenza", "Treviso"] },
  "Piemonte": { costMultiplier: 1.05, cities: ["Torino", "Novara", "Alessandria", "Asti", "Cuneo"] },
  "Puglia": { costMultiplier: 0.9, cities: ["Bari", "Taranto", "Lecce", "Foggia", "Brindisi", "Gallipoli"] },
  "Emilia-Romagna": { costMultiplier: 1.1, cities: ["Bologna", "Modena", "Parma", "Reggio Emilia", "Ravenna", "Ferrara"] },
  "Calabria": { costMultiplier: 0.8, cities: ["Reggio Calabria", "Catanzaro", "Cosenza", "Crotone", "Vibo Valentia"] },
  "Liguria": { costMultiplier: 1.15, cities: ["Genova", "La Spezia", "Savona", "Imperia"] },
  "Marche": { costMultiplier: 1.0, cities: ["Ancona", "Pesaro", "Ascoli Piceno", "Macerata", "Urbino"] },
  "Abruzzo": { costMultiplier: 0.95, cities: ["L'Aquila", "Pescara", "Teramo", "Chieti"] },
  "Friuli-Venezia Giulia": { costMultiplier: 1.05, cities: ["Trieste", "Udine", "Pordenone", "Gorizia"] },
  "Sardegna": { costMultiplier: 0.9, cities: ["Cagliari", "Sassari", "Olbia", "Nuoro", "Oristano"] },
  "Trentino-Alto Adige": { costMultiplier: 1.2, cities: ["Trento", "Bolzano", "Merano", "Rovereto", "Catanzaro"] },
  "Umbria": { costMultiplier: 1.0, cities: ["Perugia", "Terni", "Foligno", "Spoleto"] },
  "Basilicata": { costMultiplier: 0.85, cities: ["Potenza", "Matera"] },
  "Molise": { costMultiplier: 0.85, cities: ["Campobasso", "Isernia"] },
  "Valle d'Aosta": { costMultiplier: 1.25, cities: ["Aosta"] }
};

// Eventi di vita che possono influenzare il profilo
const lifeEvents = [
  { name: "Problemi di salute", financialImpact: -0.2, karmaImpact: -1 },
  { name: "Perdita del lavoro", financialImpact: -0.3, karmaImpact: -2 },
  { name: "Divorzio costoso", financialImpact: -0.25, karmaImpact: -1 },
  { name: "Vincita lotteria minore", financialImpact: 0.1, karmaImpact: 1 },
  { name: "Causa legale", financialImpact: -0.15, karmaImpact: -1 },
  { name: "Crollo investimenti", financialImpact: -0.2, karmaImpact: 0 },
  { name: "Eredità", financialImpact: 0.2, karmaImpact: 0 },
  { name: "Debiti accumulati", financialImpact: -0.1, karmaImpact: -1 },
  { name: "Truffa subita", financialImpact: -0.15, karmaImpact: 0 },
  { name: "Ritorno a casa dei figli", financialImpact: -0.1, karmaImpact: -1 },
  { name: "Acquisto casa", financialImpact: -0.3, karmaImpact: 1 },
  { name: "Matrimonio costoso", financialImpact: -0.2, karmaImpact: 0 },
  { name: "Incidente", financialImpact: -0.1, karmaImpact: -1 },
  { name: "Problemi fiscali", financialImpact: -0.15, karmaImpact: -2 },
  { name: "Spese mediche", financialImpact: -0.1, karmaImpact: 0 }
];

// Problemi di salute possibili
const healthIssues = [
  "Nessuno",
  "Diabete", 
  "Ipertensione", 
  "Problemi cardiaci", 
  "Depressione", 
  "Ansia cronica",
  "Problemi alla schiena", 
  "Disturbi digestivi", 
  "Problemi respiratori", 
  "Malattie croniche"
];

// Funzione per determinare la regione in base alla città
function getRegionFromCity(city: string): string {
  for (const [region, data] of Object.entries(italianRegions)) {
    if (data.cities.includes(city)) {
      return region;
    }
  }
  // Fallback se la città non viene trovata
  return "Lombardia";
}

// Funzione migliorata per generare un profilo casuale
export function generateRandomProfile(): PlayerProfile {
  // Generazione nome (invariata)
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  
  // Età con distribuzione più realistica
  const ageDistribution = Math.random();
  let age;
  if (ageDistribution < 0.15) {
    // Giovani adulti (18-30)
    age = 18 + Math.floor(Math.random() * 13);
  } else if (ageDistribution < 0.55) {
    // Adulti (31-50)
    age = 31 + Math.floor(Math.random() * 20);
  } else if (ageDistribution < 0.85) {
    // Mezza età (51-65)
    age = 51 + Math.floor(Math.random() * 15);
  } else {
    // Anziani (66-85)
    age = 66 + Math.floor(Math.random() * 20);
  }
  
  // Selezione città e regione
  const city = italianCities[Math.floor(Math.random() * italianCities.length)];
  const region = getRegionFromCity(city);
  const regionData = italianRegions[region] || { costMultiplier: 1.0 };
  
  // Stato sociale con distribuzione più realistica e stratificata
  const socialRoll = Math.random();
  let socialStatus: SocialStatus;
  if (socialRoll < 0.05) socialStatus = 'indigente';
  else if (socialRoll < 0.25) socialStatus = 'povero';
  else if (socialRoll < 0.45) socialStatus = 'classe media-bassa';
  else if (socialRoll < 0.75) socialStatus = 'classe media';
  else if (socialRoll < 0.90) socialStatus = 'benestante';
  else if (socialRoll < 0.98) socialStatus = 'ricco';
  else socialStatus = 'elite';
  
  // Stato lavorativo basato su età e stato sociale
  let employment: Employment;
  const employmentRoll = Math.random();
  
  if (age >= 67) {
    employment = 'pensionato';
  } else if (socialStatus === 'indigente' || (socialStatus === 'povero' && employmentRoll < 0.4)) {
    employment = 'disoccupato';
  } else if ((socialStatus === 'povero' && employmentRoll >= 0.4) || 
             (socialStatus === 'classe media-bassa' && employmentRoll < 0.3)) {
    employment = 'precario';
  } else if (socialStatus === 'classe media-bassa' || 
             (socialStatus === 'classe media' && employmentRoll < 0.3)) {
    employment = 'part-time';
  } else if (socialStatus === 'classe media' || 
             (socialStatus === 'benestante' && employmentRoll < 0.5)) {
    employment = 'impiego fisso';
  } else if ((socialStatus === 'benestante' && employmentRoll >= 0.5) || 
             (socialStatus === 'ricco' && employmentRoll < 0.5)) {
    employment = 'libero professionista';
  } else {
    employment = 'imprenditore';
  }
  
  // Stato civile tenendo conto dell'età
  const maritalRoll = Math.random();
  let maritalStatus: MaritalStatus;
  
  if (age < 25) {
    // Giovani più probabilmente single
    if (maritalRoll < 0.8) maritalStatus = 'single';
    else if (maritalRoll < 0.9) maritalStatus = 'convivente';
    else maritalStatus = 'sposato';
  } else if (age < 40) {
    // Adulti giovani
    if (maritalRoll < 0.4) maritalStatus = 'single';
    else if (maritalRoll < 0.6) maritalStatus = 'convivente';
    else if (maritalRoll < 0.85) maritalStatus = 'sposato';
    else if (maritalRoll < 0.95) maritalStatus = 'separato';
    else maritalStatus = 'divorziato';
  } else if (age < 60) {
    // Mezza età
    if (maritalRoll < 0.25) maritalStatus = 'single';
    else if (maritalRoll < 0.35) maritalStatus = 'convivente';
    else if (maritalRoll < 0.65) maritalStatus = 'sposato';
    else if (maritalRoll < 0.8) maritalStatus = 'divorziato';
    else if (maritalRoll < 0.9) maritalStatus = 'separato';
    else maritalStatus = 'vedovo';
  } else {
    // Anziani
    if (maritalRoll < 0.2) maritalStatus = 'single';
    else if (maritalRoll < 0.25) maritalStatus = 'convivente';
    else if (maritalRoll < 0.55) maritalStatus = 'sposato';
    else if (maritalRoll < 0.7) maritalStatus = 'divorziato';
    else maritalStatus = 'vedovo';
  }
  
  // Determina se ha figli e quanti
  let hasChildrenProbability = 0.1; // probabilità base bassa
  
  if (age >= 30 && age <= 60) hasChildrenProbability += 0.3;
  if (maritalStatus === 'sposato') hasChildrenProbability += 0.4;
  else if (maritalStatus === 'divorziato' || maritalStatus === 'vedovo' || maritalStatus === 'separato') hasChildrenProbability += 0.3;
  else if (maritalStatus === 'convivente') hasChildrenProbability += 0.2;
  
  const hasChildren = Math.random() < hasChildrenProbability;
  
  // Numero di figli (se ne ha)
  let numberOfChildren = 0;
  if (hasChildren) {
    const childrenRoll = Math.random();
    if (childrenRoll < 0.5) numberOfChildren = 1;
    else if (childrenRoll < 0.8) numberOfChildren = 2;
    else if (childrenRoll < 0.95) numberOfChildren = 3;
    else numberOfChildren = 4 + Math.floor(Math.random() * 3); // Famiglie numerose
  }
  
  // Livello di debito basato su stato sociale e occupazione
  let debt: Debt;
  const debtRoll = Math.random();
  
  if (socialStatus === 'indigente' || socialStatus === 'povero') {
    if (debtRoll < 0.3) debt = 'nessuno'; // Troppo poveri per avere credito
    else if (debtRoll < 0.6) debt = 'piccolo';
    else if (debtRoll < 0.9) debt = 'medio';
    else debt = 'grande';
  } else if (socialStatus === 'classe media-bassa' || socialStatus === 'classe media') {
    if (debtRoll < 0.2) debt = 'nessuno';
    else if (debtRoll < 0.4) debt = 'piccolo';
    else if (debtRoll < 0.7) debt = 'medio';
    else if (debtRoll < 0.9) debt = 'grande';
    else debt = 'schiacciante';
  } else {
    if (debtRoll < 0.4) debt = 'nessuno';
    else if (debtRoll < 0.7) debt = 'piccolo';
    else if (debtRoll < 0.85) debt = 'medio';
    else if (debtRoll < 0.95) debt = 'grande';
    else debt = 'schiacciante';
  }
  
  // Dipendenze
  let addiction: Addiction;
  const addictionRoll = Math.random();
  let addictionSeverity = 0;
  
  if (addictionRoll < 0.6) {
    addiction = 'nessuna';
  } else if (addictionRoll < 0.75) {
    addiction = 'gioco';
    addictionSeverity = 1 + Math.floor(Math.random() * 10);
  } else if (addictionRoll < 0.85) {
    addiction = 'alcol';
    addictionSeverity = 1 + Math.floor(Math.random() * 10);
  } else if (addictionRoll < 0.92) {
    addiction = 'shopping';
    addictionSeverity = 1 + Math.floor(Math.random() * 10);
  } else if (addictionRoll < 0.98) {
    addiction = 'sigarette';
    addictionSeverity = 1 + Math.floor(Math.random() * 10);
  } else {
    addiction = 'più dipendenze';
    addictionSeverity = 3 + Math.floor(Math.random() * 8);
  }
  
  // Reddito settimanale più realistico e stratificato
  let baseWeeklyIncome: number;
  
  if (employment === 'disoccupato') {
    baseWeeklyIncome = 50 + Math.floor(Math.random() * 50); // Sussidi o lavori in nero
  } else if (employment === 'pensionato') {
    switch (socialStatus) {
      case 'indigente': baseWeeklyIncome = 100 + Math.floor(Math.random() * 50); break; // Pensione sociale
      case 'povero': baseWeeklyIncome = 150 + Math.floor(Math.random() * 50); break;
      case 'classe media-bassa': baseWeeklyIncome = 200 + Math.floor(Math.random() * 100); break;
      case 'classe media': baseWeeklyIncome = 250 + Math.floor(Math.random() * 150); break;
      case 'benestante': baseWeeklyIncome = 400 + Math.floor(Math.random() * 200); break;
      case 'ricco': baseWeeklyIncome = 600 + Math.floor(Math.random() * 400); break;
      case 'elite': baseWeeklyIncome = 1000 + Math.floor(Math.random() * 1000); break;
    }
  } else {
    switch (socialStatus) {
      case 'indigente': baseWeeklyIncome = employment === 'precario' ? 100 + Math.floor(Math.random() * 50) : 80 + Math.floor(Math.random() * 40); break;
      case 'povero': baseWeeklyIncome = 150 + Math.floor(Math.random() * 100); break;
      case 'classe media-bassa': baseWeeklyIncome = 250 + Math.floor(Math.random() * 100); break;
      case 'classe media': baseWeeklyIncome = 350 + Math.floor(Math.random() * 150); break;
      case 'benestante': baseWeeklyIncome = 500 + Math.floor(Math.random() * 300); break;
      case 'ricco': baseWeeklyIncome = 1000 + Math.floor(Math.random() * 1000); break;
      case 'elite': baseWeeklyIncome = 2000 + Math.floor(Math.random() * 8000); break;
    }
    
    // Aggiustamenti per tipo di impiego
    if (employment === 'precario') baseWeeklyIncome *= 0.7;
    else if (employment === 'part-time') baseWeeklyIncome *= 0.8;
    else if (employment === 'libero professionista') baseWeeklyIncome *= 1.2;
    else if (employment === 'imprenditore') baseWeeklyIncome *= 1.5;
  }
  
  // Applica il moltiplicatore regionale al reddito
  const weeklyIncome = Math.round(baseWeeklyIncome * regionData.costMultiplier);
  
  // Reddito nascosto o in nero (più comune per certe categorie)
  let hiddenIncome = 0;
  const hiddenIncomeRoll = Math.random();
  
  if (socialStatus === 'indigente' && hiddenIncomeRoll < 0.3) {
    hiddenIncome = 50 + Math.floor(Math.random() * 50);
  } else if (socialStatus === 'povero' && hiddenIncomeRoll < 0.25) {
    hiddenIncome = 50 + Math.floor(Math.random() * 100);
  } else if (employment === 'precario' && hiddenIncomeRoll < 0.3) {
    hiddenIncome = 50 + Math.floor(Math.random() * 150);
  } else if (employment === 'libero professionista' && hiddenIncomeRoll < 0.4) {
    hiddenIncome = 100 + Math.floor(Math.random() * 300);
  } else if (employment === 'imprenditore' && hiddenIncomeRoll < 0.5) {
    hiddenIncome = 200 + Math.floor(Math.random() * 500);
  } else if (hiddenIncomeRoll < 0.1) {
    hiddenIncome = 50 + Math.floor(Math.random() * 200);
  }
  
  // Spese fisse settimanali realistiche (affitto/mutuo, bollette, trasporti, ecc.)
  let fixedExpensesRate: number;
  
  // Base percentuale che varia in base allo stato sociale
  switch (socialStatus) {
    case 'indigente': fixedExpensesRate = 0.6 + Math.random() * 0.3; break; // 60-90%
    case 'povero': fixedExpensesRate = 0.5 + Math.random() * 0.3; break; // 50-80%
    case 'classe media-bassa': fixedExpensesRate = 0.5 + Math.random() * 0.25; break; // 50-75%
    case 'classe media': fixedExpensesRate = 0.45 + Math.random() * 0.25; break; // 45-70%
    case 'benestante': fixedExpensesRate = 0.4 + Math.random() * 0.2; break; // 40-60%
    case 'ricco': fixedExpensesRate = 0.3 + Math.random() * 0.2; break; // 30-50%
    case 'elite': fixedExpensesRate = 0.2 + Math.random() * 0.2; break; // 20-40%
  }
  
  // Aggiustamento per figli
  fixedExpensesRate += numberOfChildren * 0.05;
  
  // Aggiustamento per debiti
  switch (debt) {
    case 'piccolo': fixedExpensesRate += 0.05; break;
    case 'medio': fixedExpensesRate += 0.1; break;
    case 'grande': fixedExpensesRate += 0.15; break;
    case 'schiacciante': fixedExpensesRate += 0.25; break;
  }
  
  // Calcolo spese fisse
  const fixedExpenses = Math.floor((weeklyIncome + hiddenIncome) * fixedExpensesRate);
  
  // Spese variabili (dipendenze, svago, spese impreviste)
  let variableExpensesRate = 0.1; // Base 10%
  
  // Aggiustamento per dipendenze
  if (addiction !== 'nessuna') {
    variableExpensesRate += (addictionSeverity / 100);
  }
  
  // Aggiustamento per stato sociale (elite e ricchi hanno più spese discrezionali)
  if (socialStatus === 'ricco') variableExpensesRate += 0.1;
  else if (socialStatus === 'elite') variableExpensesRate += 0.2;
  
  const variableExpenses = Math.floor((weeklyIncome + hiddenIncome) * variableExpensesRate);
  
  // Eventi di vita che influenzano la situazione finanziaria
  const numLifeEvents = Math.floor(Math.random() * 3); // Da 0 a 2 eventi di vita
  const playerLifeEvents: string[] = [];
  let lifeEventBalanceModifier = 0;
  let lifeEventKarmaModifier = 0;
  
  for (let i = 0; i < numLifeEvents; i++) {
    const event = lifeEvents[Math.floor(Math.random() * lifeEvents.length)];
    playerLifeEvents.push(event.name);
    lifeEventBalanceModifier += event.financialImpact;
    lifeEventKarmaModifier += event.karmaImpact;
  }
  
  // Problemi di salute
  const healthIssueRoll = Math.random();
  const healthIssuesList: string[] = [];
  
  // Probabilità di problemi di salute aumenta con l'età
  const healthProbability = 0.1 + (age > 60 ? 0.3 : age > 40 ? 0.15 : 0);
  
  if (healthIssueRoll < healthProbability) {
    // Seleziona un problema di salute casuale
    const issue = healthIssues[Math.floor(Math.random() * (healthIssues.length - 1)) + 1]; // Esclude "Nessuno"
    healthIssuesList.push(issue);
    // Problemi di salute aumentano le spese fisse (cure, medicine)
    fixedExpensesRate += 0.05;
  }
  
  // Bilancio iniziale (più realistico)
  const weeklyNet = (weeklyIncome + hiddenIncome) - fixedExpenses - variableExpenses;
  
  // Base del bilancio: 2-5 settimane di reddito netto
  let baseBalance = weeklyNet * (2 + Math.floor(Math.random() * 4));
  
  // Modifica il bilancio in base agli eventi di vita
  baseBalance = Math.max(0, baseBalance * (1 + lifeEventBalanceModifier));
  
  // Aggiusta in base allo stato sociale e al debito
  if (socialStatus === 'indigente') baseBalance = Math.min(baseBalance, 500);
  else if (socialStatus === 'povero') baseBalance = Math.min(baseBalance, 2000);
  
  if (debt === 'grande' || debt === 'schiacciante') baseBalance = Math.max(0, baseBalance - 500);
  
  // Karma iniziale (medio) con modifiche dagli eventi di vita
  let karma = 5 + Math.floor(Math.random() * 3) + lifeEventKarmaModifier;
  karma = Math.max(1, Math.min(10, karma)); // Limita tra 1 e 10
  
  // Modifica karma in base alle dipendenze
  if (addiction !== 'nessuna') {
    karma = Math.max(1, karma - Math.floor(addictionSeverity / 3));
  }
  
  return {
    name,
    age,
    city,
    socialStatus,
    maritalStatus,
    hasChildren,
    numberOfChildren,
    employment,
    debt,
    addiction,
    addictionSeverity,
    balance: Math.round(baseBalance),
    weeklyIncome,
    fixedExpenses,
    variableExpenses,
    karma,
    playedTickets: 0,
    moneySpent: 0,
    moneyWon: 0,
    lifeEvents: playerLifeEvents,
    generation: 1,
    hiddenIncome,
    healthIssues: healthIssuesList,
    region
  };
}

// Genera un profilo per il figlio del giocatore (funzione migliorata)
export function generateChildProfile(parent: PlayerProfile): PlayerProfile {
  const lastName = parent.name.split(' ')[1];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const name = `${firstName} ${lastName}`;
  
  // Il figlio è più giovane (tra 18 e 40 anni, dipende dall'età del genitore)
  const maxAge = Math.min(40, parent.age - 20);
  const minAge = Math.max(18, parent.age - 55);
  const age = minAge + Math.floor(Math.random() * (maxAge - minAge + 1));
  
  // Stessa città e regione del genitore, ma con possibilità di trasferimento
  let city = parent.city;
  let region = parent.region || getRegionFromCity(city);
  
  // 20% di probabilità che il figlio si sia trasferito
  if (Math.random() < 0.2) {
    city = italianCities[Math.floor(Math.random() * italianCities.length)];
    region = getRegionFromCity(city);
  }
  
  // Stato sociale influenzato dal genitore ma con mobilità
  const socialMobilityRoll = Math.random();
  let socialStatus = parent.socialStatus as SocialStatus;
  
  // Mobilità sociale intergenerazionale
  if (socialMobilityRoll < 0.2) {
    // 20% di possibilità di salire nella scala sociale
    const statuses: SocialStatus[] = ['indigente', 'povero', 'classe media-bassa', 'classe media', 'benestante', 'ricco', 'elite'];
    const currentIndex = statuses.indexOf(parent.socialStatus);
    
    if (currentIndex < statuses.length - 1) {
socialStatus = statuses[currentIndex + 1];
    }
  } else if (socialMobilityRoll < 0.5) {
    // 30% di possibilità di scendere nella scala sociale
    const statuses: SocialStatus[] = ['indigente', 'povero', 'classe media-bassa', 'classe media', 'benestante', 'ricco', 'elite'];
    const currentIndex = statuses.indexOf(parent.socialStatus);
    
    if (currentIndex > 0) {
      socialStatus = statuses[currentIndex - 1];
    }
  }
  
  // Stato lavorativo basato sull'età e stato sociale
  let employment: Employment;
  const employmentRoll = Math.random();
  
  if (age < 25 && employmentRoll < 0.4) {
    // Giovani spesso precari o disoccupati
    employment = employmentRoll < 0.2 ? 'disoccupato' : 'precario';
  } else if (socialStatus === 'indigente') {
    employment = employmentRoll < 0.7 ? 'disoccupato' : 'precario';
  } else if (socialStatus === 'povero') {
    if (employmentRoll < 0.3) employment = 'disoccupato';
    else if (employmentRoll < 0.7) employment = 'precario';
    else employment = 'part-time';
  } else if (socialStatus === 'classe media-bassa') {
    if (employmentRoll < 0.2) employment = 'precario';
    else if (employmentRoll < 0.6) employment = 'part-time';
    else employment = 'impiego fisso';
  } else if (socialStatus === 'classe media') {
    if (employmentRoll < 0.1) employment = 'precario';
    else if (employmentRoll < 0.3) employment = 'part-time';
    else if (employmentRoll < 0.8) employment = 'impiego fisso';
    else employment = 'libero professionista';
  } else if (socialStatus === 'benestante') {
    if (employmentRoll < 0.3) employment = 'impiego fisso';
    else if (employmentRoll < 0.7) employment = 'libero professionista';
    else employment = 'imprenditore';
  } else {
    // Ricco o elite
    if (employmentRoll < 0.4) employment = 'libero professionista';
    else employment = 'imprenditore';
  }
  
  // Giovani più probabilmente single o conviventi
  const maritalRoll = Math.random();
  let maritalStatus: MaritalStatus;
  
  if (age < 25) {
    if (maritalRoll < 0.8) maritalStatus = 'single';
    else if (maritalRoll < 0.95) maritalStatus = 'convivente';
    else maritalStatus = 'sposato';
  } else if (age < 35) {
    if (maritalRoll < 0.5) maritalStatus = 'single';
    else if (maritalRoll < 0.7) maritalStatus = 'convivente';
    else if (maritalRoll < 0.9) maritalStatus = 'sposato';
    else maritalStatus = 'separato';
  } else {
    if (maritalRoll < 0.3) maritalStatus = 'single';
    else if (maritalRoll < 0.45) maritalStatus = 'convivente';
    else if (maritalRoll < 0.7) maritalStatus = 'sposato';
    else if (maritalRoll < 0.85) maritalStatus = 'divorziato';
    else if (maritalRoll < 0.95) maritalStatus = 'separato';
    else maritalStatus = 'vedovo';
  }
  
  // Probabilità di avere figli
  let hasChildrenProbability = 0.05; // probabilità base bassa per i giovani
  if (age >= 30) hasChildrenProbability += 0.15;
  if (maritalStatus === 'sposato') hasChildrenProbability += 0.3;
  else if (maritalStatus === 'divorziato' || maritalStatus === 'separato') hasChildrenProbability += 0.2;
  else if (maritalStatus === 'convivente') hasChildrenProbability += 0.15;
  
  const hasChildren = Math.random() < hasChildrenProbability;
  
  // Numero di figli
  let numberOfChildren = 0;
  if (hasChildren) {
    const childrenRoll = Math.random();
    if (childrenRoll < 0.6) numberOfChildren = 1;
    else if (childrenRoll < 0.9) numberOfChildren = 2;
    else numberOfChildren = 3 + Math.floor(Math.random() * 2);
  }
  
  // Livello di debito (i giovani spesso hanno più debiti)
  let debt: Debt;
  const debtRoll = Math.random();
  
  // Debito più probabile per i giovani
  const youngDebtModifier = age < 30 ? 0.2 : 0;
  
  if (debtRoll < (0.2 - youngDebtModifier)) debt = 'nessuno';
  else if (debtRoll < (0.5 - youngDebtModifier)) debt = 'piccolo';
  else if (debtRoll < (0.8 - youngDebtModifier)) debt = 'medio';
  else if (debtRoll < 0.95) debt = 'grande';
  else debt = 'schiacciante';
  
  // I figli ereditano in parte le dipendenze dei genitori
  let addiction = 'nessuna' as Addiction;
  let addictionSeverity = 0;
  const addictionRoll = Math.random();
  
  // Più probabilità di dipendenza se il genitore ne aveva una
  const parentAddictionModifier = parent.addiction !== 'nessuna' ? 0.2 : 0;
  
  if (addictionRoll < (0.7 - parentAddictionModifier)) {
    addiction = 'nessuna';
  } else if (addictionRoll < (0.8 - parentAddictionModifier)) {
    // Se il genitore aveva una dipendenza, il figlio ha il 50% di possibilità di ereditarla
    if (parent.addiction !== 'nessuna' && Math.random() < 0.5) {
      addiction = parent.addiction;
      addictionSeverity = Math.max(1, parent.addictionSeverity - 2); // Meno severa
    } else {
      addiction = 'gioco';
      addictionSeverity = 1 + Math.floor(Math.random() * 7);
    }
  } else if (addictionRoll < (0.9 - parentAddictionModifier)) {
    addiction = 'alcol';
    addictionSeverity = 1 + Math.floor(Math.random() * 8);
  } else if (addictionRoll < (0.95 - parentAddictionModifier)) {
    addiction = 'shopping';
    addictionSeverity = 1 + Math.floor(Math.random() * 8);
  } else if (addictionRoll < (0.98 - parentAddictionModifier)) {
    addiction = 'sigarette';
    addictionSeverity = 1 + Math.floor(Math.random() * 9);
  } else {
    addiction = 'più dipendenze';
    addictionSeverity = 2 + Math.floor(Math.random() * 7);
  }
  
  // Reddito settimanale basato su stato sociale e impiego
  let baseWeeklyIncome: number;
  
  if (employment === 'disoccupato') {
    baseWeeklyIncome = 50 + Math.floor(Math.random() * 70);
  } else {
    switch (socialStatus) {
      case 'indigente': baseWeeklyIncome = employment === 'precario' ? 100 + Math.floor(Math.random() * 50) : 80 + Math.floor(Math.random() * 40); break;
      case 'povero': baseWeeklyIncome = 150 + Math.floor(Math.random() * 100); break;
      case 'classe media-bassa': baseWeeklyIncome = 250 + Math.floor(Math.random() * 100); break;
      case 'classe media': baseWeeklyIncome = 350 + Math.floor(Math.random() * 150); break;
      case 'benestante': baseWeeklyIncome = 500 + Math.floor(Math.random() * 300); break;
      case 'ricco': baseWeeklyIncome = 1000 + Math.floor(Math.random() * 1000); break;
      case 'elite': baseWeeklyIncome = 2000 + Math.floor(Math.random() * 5000); break;
    }
    
    // Aggiustamenti per tipo di impiego
    if (employment === 'precario') baseWeeklyIncome *= 0.7;
    else if (employment === 'part-time') baseWeeklyIncome *= 0.8;
    else if (employment === 'libero professionista') baseWeeklyIncome *= 1.2;
    else if (employment === 'imprenditore') baseWeeklyIncome *= 1.5;
  }
  
  // Applicazione del costo della vita regionale
  const regionData = italianRegions[region] || { costMultiplier: 1.0 };
  const weeklyIncome = Math.round(baseWeeklyIncome * regionData.costMultiplier);
  
  // Reddito nascosto o in nero (più comune per certe categorie)
  let hiddenIncome = 0;
  const hiddenIncomeRoll = Math.random();
  
  if ((employment === 'disoccupato' || employment === 'precario') && hiddenIncomeRoll < 0.3) {
    hiddenIncome = 50 + Math.floor(Math.random() * 100);
  } else if (employment === 'part-time' && hiddenIncomeRoll < 0.2) {
    hiddenIncome = 70 + Math.floor(Math.random() * 100);
  } else if (employment === 'libero professionista' && hiddenIncomeRoll < 0.4) {
    hiddenIncome = 100 + Math.floor(Math.random() * 300);
  } else if (employment === 'imprenditore' && hiddenIncomeRoll < 0.5) {
    hiddenIncome = 200 + Math.floor(Math.random() * 500);
  } else if (hiddenIncomeRoll < 0.1) {
    hiddenIncome = 50 + Math.floor(Math.random() * 150);
  }
  
  // Spese fisse (con influenza del costo della vita regionale)
  let fixedExpensesRate: number;
  
  // Base percentuale che varia in base allo stato sociale
  switch (socialStatus) {
    case 'indigente': fixedExpensesRate = 0.6 + Math.random() * 0.3; break;
    case 'povero': fixedExpensesRate = 0.5 + Math.random() * 0.3; break;
    case 'classe media-bassa': fixedExpensesRate = 0.5 + Math.random() * 0.25; break;
    case 'classe media': fixedExpensesRate = 0.45 + Math.random() * 0.25; break;
    case 'benestante': fixedExpensesRate = 0.4 + Math.random() * 0.2; break;
    case 'ricco': fixedExpensesRate = 0.3 + Math.random() * 0.2; break;
    case 'elite': fixedExpensesRate = 0.2 + Math.random() * 0.2; break;
  }
  
  // I giovani hanno spese fisse più alte (affitti)
  if (age < 30) fixedExpensesRate += 0.1;
  
  // Aggiustamento per figli
  fixedExpensesRate += numberOfChildren * 0.05;
  
  // Aggiustamento per debiti
  switch (debt) {
    case 'piccolo': fixedExpensesRate += 0.05; break;
    case 'medio': fixedExpensesRate += 0.1; break;
    case 'grande': fixedExpensesRate += 0.15; break;
    case 'schiacciante': fixedExpensesRate += 0.25; break;
  }
  
  // Calcolo spese fisse
  const fixedExpenses = Math.floor((weeklyIncome + hiddenIncome) * fixedExpensesRate);
  
  // Spese variabili (tendenzialmente più alte per i giovani)
  let variableExpensesRate = 0.15; // Base 15% (più alta per i giovani)
  
  // Aggiustamento per dipendenze
  if (addiction !== 'nessuna') {
    variableExpensesRate += (addictionSeverity / 100);
  }
  
  // Aggiustamento per stato sociale
  if (socialStatus === 'ricco') variableExpensesRate += 0.1;
  else if (socialStatus === 'elite') variableExpensesRate += 0.2;
  
  const variableExpenses = Math.floor((weeklyIncome + hiddenIncome) * variableExpensesRate);
  
  // Eventi di vita che influenzano la situazione finanziaria
  const numLifeEvents = Math.floor(Math.random() * 2); // Meno eventi di vita rispetto al genitore
  const playerLifeEvents: string[] = [];
  let lifeEventBalanceModifier = 0;
  let lifeEventKarmaModifier = 0;
  
  for (let i = 0; i < numLifeEvents; i++) {
    const event = lifeEvents[Math.floor(Math.random() * lifeEvents.length)];
    playerLifeEvents.push(event.name);
    lifeEventBalanceModifier += event.financialImpact;
    lifeEventKarmaModifier += event.karmaImpact;
  }
  
  // Problemi di salute (meno probabili per i giovani)
  const healthIssueRoll = Math.random();
  const healthIssuesList: string[] = [];
  
  // Eredità di problemi di salute familiari
  if (parent.healthIssues && parent.healthIssues.length > 0 && parent.healthIssues[0] !== "Nessuno") {
    if (healthIssueRoll < 0.15) { // 15% di probabilità di ereditare problemi di salute
      const inheritedIssue = parent.healthIssues[0];
      healthIssuesList.push(inheritedIssue);
    }
  } else if (healthIssueRoll < 0.05) { // Solo 5% di probabilità di problemi di salute per i giovani
    const issue = healthIssues[Math.floor(Math.random() * (healthIssues.length - 1)) + 1];
    healthIssuesList.push(issue);
  }
  
  // Bilancio iniziale: eredità dal genitore + risparmio proprio
  // Il genitore trasmette una percentuale del suo bilancio
  let inheritancePercentage = 0.0;
  
  if (parent.balance > 0) {
    // La percentuale dipende dall'età del figlio e dal karma del genitore
    if (age < 25) {
      inheritancePercentage = 0.3; // I figli giovani ricevono meno
    } else if (age < 35) {
      inheritancePercentage = 0.4;
    } else {
      inheritancePercentage = 0.5;
    }
    
    // Karma del genitore influenza la generosità dell'eredità
    inheritancePercentage += (parent.karma - 5) * 0.02;
    
    // Limita la percentuale tra 0.1 e 0.8
    inheritancePercentage = Math.max(0.1, Math.min(0.8, inheritancePercentage));
  }
  
  const inheritedBalance = parent.balance * inheritancePercentage;
  
  // Risparmio personale basato sul reddito netto e l'età
  const weeklyNet = (weeklyIncome + hiddenIncome) - fixedExpenses - variableExpenses;
  let ownSavings = weeklyNet * (Math.max(0, age - 18)); // Risparmi proporzionali all'età lavorativa
  
  // Modifica in base agli eventi di vita
  ownSavings = Math.max(0, ownSavings * (1 + lifeEventBalanceModifier));
  
  // Aggiusta il risparmio in base ai debiti
  if (debt === 'grande') ownSavings = Math.max(0, ownSavings - 1000);
  else if (debt === 'schiacciante') ownSavings = Math.max(0, ownSavings - 5000);
  
  // Bilancio totale
  const balance = Math.round(inheritedBalance + ownSavings);
  
  // Karma iniziale (simile al genitore ma con variazione)
  let karma = parent.karma;
  
  // Variazione casuale (-2/+2)
  karma += Math.floor(Math.random() * 5) - 2;
  
  // Modifica in base agli eventi di vita
  karma += lifeEventKarmaModifier;
  
  // Limitazione 1-10
  karma = Math.max(1, Math.min(10, karma));
  
  // Modifica karma in base alle dipendenze
  if (addiction !== 'nessuna') {
    karma = Math.max(1, karma - Math.floor(addictionSeverity / 3));
  }
  
  return {
    name,
    age,
    city,
    socialStatus,
    maritalStatus,
    hasChildren,
    numberOfChildren,
    employment,
    debt,
    addiction,
    addictionSeverity,
    balance,
    weeklyIncome,
    fixedExpenses,
    variableExpenses,
    karma,
    playedTickets: 0,
    moneySpent: 0,
    moneyWon: 0,
    lifeEvents: playerLifeEvents,
    generation: (parent.generation || 1) + 1,
    hiddenIncome,
    healthIssues: healthIssuesList,
    region
  };
}

// Simulazione dell'impatto settimanale sul bilancio
export function simulateWeeklyImpact(profile: PlayerProfile): {
  balanceChange: number;
  events: string[];
  karmaChange: number;
} {
  const events: string[] = [];
  // Inizializza balanceChange con l'entrata settimanale meno le spese fisse
  let balanceChange = profile.weeklyIncome;
  let karmaChange = 0;
  
  // Aggiungi eventuale reddito nascosto alle entrate
  if (profile.hiddenIncome && profile.hiddenIncome > 0) {
    balanceChange += profile.hiddenIncome;
    events.push(`Entrate non dichiarate: +${profile.hiddenIncome.toFixed(2)}€`);
  }
  
  // Sottrai le spese fisse (sempre costanti)
  balanceChange -= profile.fixedExpenses;
  events.push(`Spese fisse: -${profile.fixedExpenses.toFixed(2)}€`);
  
  // Calcola e sottrai le spese variabili (possono fluttuare)
  const variationPercent = 0.8 + Math.random() * 0.4; // 80%-120% delle spese variabili normali
  const currentVariableExpenses = Math.round(profile.variableExpenses * variationPercent);
  balanceChange -= currentVariableExpenses;
  events.push(`Spese variabili: -${currentVariableExpenses.toFixed(2)}€`);
  
  // Entrate extra casuali
  const bonusRoll = Math.random();
  if (bonusRoll < 0.05) {
    // 5% di probabilità di piccole vincite o entrate extra
    const bonus = Math.round(profile.weeklyIncome * (0.1 + Math.random() * 0.3));
    balanceChange += bonus;
    events.push(`Entrata extra: +${bonus}€`);
  } else if (bonusRoll < 0.08 && profile.hiddenIncome && profile.hiddenIncome > 0) {
    // Rischio di controlli fiscali per chi ha reddito nascosto
    const penalty = Math.round(profile.hiddenIncome * (1 + Math.random()));
    balanceChange -= penalty;
    karmaChange -= 1;
    events.push(`Controllo fiscale: -${penalty}€`);
  }
  
  // Impatto delle dipendenze
  if (profile.addiction !== 'nessuna' && profile.addictionSeverity > 0) {
    const addictionCost = Math.round((profile.weeklyIncome * 0.05) * profile.addictionSeverity / 5);
    balanceChange -= addictionCost;
    
    if (profile.addiction === 'gioco') {
      // Piccola possibilità di vincita per dipendenza da gioco
      if (Math.random() < 0.1) {
        const gamblingWin = addictionCost * (1 + Math.random() * 3);
        balanceChange += gamblingWin;
        events.push(`Piccola vincita al gioco: +${Math.round(gamblingWin)}€`);
      } else {
        events.push(`Spese per dipendenza da gioco: -${addictionCost}€`);
      }
    } else {
      events.push(`Spese per dipendenza da ${profile.addiction}: -${addictionCost}€`);
    }
    
    // La dipendenza peggiora o migliora nel tempo
    if (Math.random() < 0.05) {
      if (Math.random() < 0.7) {
        // 70% delle volte peggiora
        profile.addictionSeverity = Math.min(10, profile.addictionSeverity + 1);
        events.push(`La tua dipendenza è peggiorata`);
        karmaChange -= 1;
      } else {
        // 30% delle volte migliora
        profile.addictionSeverity = Math.max(0, profile.addictionSeverity - 1);
        events.push(`Stai gestendo meglio la tua dipendenza`);
        karmaChange += 1;
        
        // Se la dipendenza scompare
        if (profile.addictionSeverity === 0) {
          profile.addiction = 'nessuna';
          events.push(`Hai superato la tua dipendenza!`);
          karmaChange += 2;
        }
      }
    }
  }
  
  // Eventi casuali basati sul debito
  if (profile.debt !== 'nessuno') {
    if (Math.random() < 0.08) {
      const debtStressEvent = {
        'piccolo': { cost: Math.round(profile.weeklyIncome * 0.1), desc: 'sollecito di pagamento' },
        'medio': { cost: Math.round(profile.weeklyIncome * 0.2), desc: 'interessi aggiuntivi' },
        'grande': { cost: Math.round(profile.weeklyIncome * 0.3), desc: 'visita degli esattori' },
        'schiacciante': { cost: Math.round(profile.weeklyIncome * 0.5), desc: 'minacce dai creditori' },
      };
      
      const event = debtStressEvent[profile.debt];
      balanceChange -= event.cost;
      events.push(`Problemi con i debiti (${event.desc}): -${event.cost}€`);
      karmaChange -= 1;
    }
    
    // Possibilità di migliorare o peggiorare la situazione debitoria
    if (Math.random() < 0.03) {
      const debts: Debt[] = ['nessuno', 'piccolo', 'medio', 'grande', 'schiacciante'];
      const currentIndex = debts.indexOf(profile.debt);
      
      if (balanceChange > 0 && Math.random() < 0.7 && currentIndex > 0) {
        // Migliora la situazione debitoria
        profile.debt = debts[currentIndex - 1];
        events.push(`Hai migliorato la tua situazione debitoria: ora il tuo debito è ${profile.debt}`);
        karmaChange += 1;
      } else if (balanceChange < 0 && currentIndex < debts.length - 1) {
        // Peggiora la situazione debitoria
        profile.debt = debts[currentIndex + 1];
        events.push(`La tua situazione debitoria è peggiorata: ora il tuo debito è ${profile.debt}`);
        karmaChange -= 1;
      }
    }
  }
  
  // Eventi casuali basati sui problemi di salute
  if (profile.healthIssues && profile.healthIssues.length > 0 && profile.healthIssues[0] !== "Nessuno") {
    if (Math.random() < 0.1) {
      const medicalCost = Math.round(profile.weeklyIncome * (0.1 + Math.random() * 0.3));
      balanceChange -= medicalCost;
      events.push(`Spese mediche per ${profile.healthIssues[0]}: -${medicalCost}€`);
    }
  }
  
  // Eventi casuali basati sullo stato sociale
  const socialEventRoll = Math.random();
  if (socialEventRoll < 0.05) {
    let event = "";
    let impact = 0;
    
    switch (profile.socialStatus) {
      case 'indigente':
        if (socialEventRoll < 0.03) {
          event = "Hai perso il tuo alloggio di emergenza";
          impact = -Math.round(profile.weeklyIncome * 0.5);
          karmaChange -= 1;
        } else {
          event = "Un'associazione ti ha fornito aiuti";
          impact = Math.round(profile.weeklyIncome * 0.3);
          karmaChange += 1;
        }
        break;
      case 'povero':
        if (socialEventRoll < 0.03) {
          event = "La tua auto si è rotta";
          impact = -Math.round(profile.weeklyIncome * 0.4);
        } else {
          event = "Hai ricevuto un sussidio sociale";
          impact = Math.round(profile.weeklyIncome * 0.2);
        }
        break;
      case 'classe media-bassa':
      case 'classe media':
        if (socialEventRoll < 0.03) {
          event = "Elettrodomestico da sostituire";
          impact = -Math.round(profile.weeklyIncome * 0.3);
        } else {
          event = "Piccolo rimborso fiscale";
          impact = Math.round(profile.weeklyIncome * 0.15);
        }
        break;
      case 'benestante':
        if (socialEventRoll < 0.03) {
          event = "Costosa riparazione alla casa";
          impact = -Math.round(profile.weeklyIncome * 0.4);
        } else {
          event = "Rendimento da investimenti";
          impact = Math.round(profile.weeklyIncome * 0.2);
        }
        break;
      case 'ricco':
      case 'elite':
        if (socialEventRoll < 0.03) {
          event = "Lussuosa festa sociale";
          impact = -Math.round(profile.weeklyIncome * 0.3);
        } else {
          event = "Dividendi aziendali";
          impact = Math.round(profile.weeklyIncome * 0.4);
        }
        break;
    }
    
    balanceChange += impact;
    if (impact > 0) {
      events.push(`${event}: +${impact}€`);
    } else {
      events.push(`${event}: ${impact}€`);
    }
  }
  
  // Impatto dei figli sul bilancio
  if (profile.hasChildren && profile.numberOfChildren > 0) {
    // Spese impreviste per i figli
    if (Math.random() < 0.1 * profile.numberOfChildren) {
      const childCost = Math.round(profile.weeklyIncome * (0.05 + (0.03 * profile.numberOfChildren)));
      balanceChange -= childCost;
      events.push(`Spese extra per i figli: -${childCost}€`);
    }
  }
  
  // Eventi catastrofici rari
  if (Math.random() < 0.01) {
    const catastrophes = [
      { name: "Furto in casa", impact: -0.2, karmaImpact: -1 },
      { name: "Infortunio sul lavoro", impact: -0.3, karmaImpact: -1 },
      { name: "Multa salata", impact: -0.15, karmaImpact: -1 },
      { name: "Guasto alla macchina", impact: -0.25, karmaImpact: 0 },
      { name: "Emergenza familiare", impact: -0.3, karmaImpact: -1 }
    ];
    
    const catastrophe = catastrophes[Math.floor(Math.random() * catastrophes.length)];
    const financialImpact = Math.round(profile.balance * catastrophe.impact);
    
    balanceChange += financialImpact;
    events.push(`Evento catastrofico - ${catastrophe.name}: ${financialImpact}€`);
    karmaChange += catastrophe.karmaImpact;
  }

  return {
    balanceChange,
    events,
    karmaChange
  };
}

// Salva il profilo nel localStorage (invariato)
export function savePlayerProfile(profile: PlayerProfile): void {
  localStorage.setItem('playerProfile', JSON.stringify(profile));
}

// Carica il profilo dal localStorage (invariato)
export function loadPlayerProfile(): PlayerProfile | null {
  const stored = localStorage.getItem('playerProfile');
  return stored ? JSON.parse(stored) : null;
}

// Funzioni di aggiornamento profilo (con miglioramenti)

// Modifica il karma del giocatore
export function updateKarma(profile: PlayerProfile, amount: number): PlayerProfile {
  // Arrotonda l'amount a un numero intero
  const roundedAmount = Math.round(amount);
  const newKarma = Math.max(0, Math.min(10, profile.karma + roundedAmount));
  
  // Effetti collaterali del karma
  const updatedProfile = { ...profile, karma: newKarma };
  
  // Il karma molto basso può portare a eventi negativi
  if (newKarma <= 2 && profile.karma > 2) {
    updatedProfile.lifeEvents = [...(profile.lifeEvents || []), "Sei caduto in disgrazia"];
  }
  
  // Il karma molto alto può portare a eventi positivi
  if (newKarma >= 9 && profile.karma < 9) {
    updatedProfile.lifeEvents = [...(profile.
lifeEvents || []), "La fortuna comincia a girarti a favore"];
  }
  
  return updatedProfile;
}

// Aggiorna il bilancio con eventi collaterali
export function updateBalance(profile: PlayerProfile, amount: number): PlayerProfile {
  const updatedProfile = { ...profile, balance: profile.balance + amount };
  
  // Eventi collaterali agli aggiornamenti di bilancio significativi
  if (amount >= profile.weeklyIncome * 10) {
    // Grande vincita o guadagno
    const eventRoll = Math.random();
    if (eventRoll < 0.1) {
      // Rischio di attirare l'attenzione di persone sbagliate
      updatedProfile.lifeEvents = [...(profile.lifeEvents || []), "La tua vincita ha attirato attenzioni indesiderate"];
      updatedProfile.karma = Math.max(1, profile.karma - 1);
    } else if (eventRoll < 0.2) {
      // Amici e parenti chiedono prestiti
      updatedProfile.lifeEvents = [...(profile.lifeEvents || []), "Amici e parenti ti chiedono prestiti"];
    }
  } else if (amount <= -profile.weeklyIncome * 5) {
    // Grande perdita
    updatedProfile.lifeEvents = [...(profile.lifeEvents || []), "Grave perdita finanziaria"];
    
    // Possibile deterioramento dello stato sociale
    if (Math.random() < 0.2) {
      const statuses: SocialStatus[] = ['indigente', 'povero', 'classe media-bassa', 'classe media', 'benestante', 'ricco', 'elite'];
      const currentIndex = statuses.indexOf(profile.socialStatus);
      
      if (currentIndex > 0) {
        updatedProfile.socialStatus = statuses[currentIndex - 1];
        updatedProfile.lifeEvents.push(`Declassamento sociale: ora sei ${statuses[currentIndex - 1]}`);
      }
    }
  }
  
  // Aggiornamento dello stato del debito in base al bilancio
  if (profile.balance < 0 && updatedProfile.balance >= 0) {
    // Uscita da debito negativo
    if (profile.debt !== 'nessuno') {
      const debts: Debt[] = ['nessuno', 'piccolo', 'medio', 'grande', 'schiacciante'];
      const currentIndex = debts.indexOf(profile.debt);
      
      if (currentIndex > 0) {
        updatedProfile.debt = debts[currentIndex - 1];
        updatedProfile.lifeEvents.push(`Hai migliorato la tua situazione debitoria`);
        updatedProfile.karma = Math.min(10, profile.karma + 1);
      }
    }
  } else if (profile.balance >= 0 && updatedProfile.balance < 0) {
    // Entrata in debito negativo
    if (profile.debt !== 'schiacciante') {
      const debts: Debt[] = ['nessuno', 'piccolo', 'medio', 'grande', 'schiacciante'];
      const currentIndex = debts.indexOf(profile.debt);
      
      if (currentIndex < debts.length - 1) {
        updatedProfile.debt = debts[currentIndex + 1];
        updatedProfile.lifeEvents.push(`La tua situazione debitoria è peggiorata`);
        updatedProfile.karma = Math.max(1, profile.karma - 1);
      }
    }
  }
  
  return updatedProfile;
}

// Aggiorna le statistiche dopo aver giocato
export function recordTicketPlayed(profile: PlayerProfile, cost: number): PlayerProfile {
  // Rischio di sviluppare dipendenza da gioco
  let updatedProfile = {
    ...profile,
    balance: profile.balance - cost,
    playedTickets: profile.playedTickets + 1,
    moneySpent: profile.moneySpent + cost
  };
  
  // Se il giocatore spende più del 20% del suo reddito settimanale in biglietti, rischia dipendenza
  if (cost > profile.weeklyIncome * 0.2 && profile.addiction === 'nessuna' && Math.random() < 0.1) {
    updatedProfile.addiction = 'gioco';
    updatedProfile.addictionSeverity = 1 + Math.floor(Math.random() * 3);
    updatedProfile.lifeEvents = [...(profile.lifeEvents || []), "Hai iniziato a sviluppare una dipendenza dal gioco"];
  } 
  // Se già ha dipendenza da gioco, può peggiorare
  else if (profile.addiction === 'gioco' && cost > profile.weeklyIncome * 0.1 && Math.random() < 0.2) {
    updatedProfile.addictionSeverity = Math.min(10, profile.addictionSeverity + 1);
    
    if (updatedProfile.addictionSeverity > profile.addictionSeverity) {
      updatedProfile.lifeEvents = [...(profile.lifeEvents || []), "La tua dipendenza dal gioco sta peggiorando"];
    }
  }
  
  // Impatto sul karma in base alla percentuale del reddito spesa in biglietti
  const spendingRatio = cost / profile.weeklyIncome;
  let karmaChange = 0;
  
  if (spendingRatio > 0.5) karmaChange = -2; // Spendere più del 50% del reddito
  else if (spendingRatio > 0.3) karmaChange = -1; // Spendere più del 30% del reddito
  
  if (karmaChange !== 0) {
    updatedProfile = updateKarma(updatedProfile, karmaChange);
  }
  
  return updatedProfile;
}

// Aggiorna le statistiche dopo una vincita
export function recordWinnings(profile: PlayerProfile, amount: number): PlayerProfile {
  let updatedProfile = {
    ...profile,
    balance: profile.balance + amount,
    moneyWon: profile.moneyWon + amount
  };
  
  // Impatto psicologico delle vincite
  const winRatio = amount / profile.weeklyIncome;
  
  // Piccole vincite aumentano leggermente il karma
  if (winRatio < 1 && Math.random() < 0.3) {
    updatedProfile = updateKarma(updatedProfile, 1);
  } 
  // Vincite medie hanno effetti vari
  else if (winRatio >= 1 && winRatio < 10) {
    // 50% di possibilità di fare beneficenza, aumentando il karma
    if (Math.random() < 0.5) {
      const donationAmount = Math.round(amount * 0.1); // Dona il 10%
      updatedProfile.balance -= donationAmount;
      updatedProfile.lifeEvents = [...(profile.lifeEvents || []), `Hai donato ${donationAmount}€ in beneficenza`];
      updatedProfile = updateKarma(updatedProfile, 2);
    }
  } 
  // Grandi vincite possono cambiare la vita
  else if (winRatio >= 10) {
    updatedProfile.lifeEvents = [...(profile.lifeEvents || []), "Grande vincita che ha cambiato la tua vita"];
    
    // Possibile miglioramento dello stato sociale
    const statuses: SocialStatus[] = ['indigente', 'povero', 'classe media-bassa', 'classe media', 'benestante', 'ricco', 'elite'];
    const currentIndex = statuses.indexOf(profile.socialStatus);
    
    if (currentIndex < statuses.length - 1 && winRatio >= 20) {
      updatedProfile.socialStatus = statuses[currentIndex + 1];
      updatedProfile.lifeEvents.push(`Promozione sociale: ora sei ${statuses[currentIndex + 1]}`);
    }
    
    // Ma c'è anche il rischio di attirare persone sbagliate
    if (Math.random() < 0.3) {
      updatedProfile.lifeEvents.push("La tua vincita ha attirato l'attenzione di persone sbagliate");
      updatedProfile = updateKarma(updatedProfile, -1);
    }
  }
  
  // Effetto della vincita sulla dipendenza da gioco
  if (profile.addiction === 'gioco') {
    // Grandi vincite possono peggiorare la dipendenza (rinforzo positivo)
    if (winRatio >= 5 && Math.random() < 0.7) {
      updatedProfile.addictionSeverity = Math.min(10, updatedProfile.addictionSeverity + 1);
      updatedProfile.lifeEvents = [...updatedProfile.lifeEvents, "La vincita ha rafforzato la tua dipendenza dal gioco"];
    }
  }
  
  return updatedProfile;
}

// Incrementa l'età del giocatore con eventi legati all'invecchiamento
export function incrementAge(profile: PlayerProfile): PlayerProfile {
  let updatedProfile = {
    ...profile,
    age: profile.age + 1
  };
  
  // Eventi legati all'età
  if (updatedProfile.age === 67 && updatedProfile.employment !== 'pensionato') {
    // Pensionamento
    const previousEmployment = updatedProfile.employment;
    updatedProfile.employment = 'pensionato';
    updatedProfile.lifeEvents = [...(profile.lifeEvents || []), `Sei andato in pensione dalla tua carriera come ${previousEmployment}`];
    
    // Riduzione del reddito per il pensionamento (tranne che per i ricchi)
    if (profile.socialStatus !== 'ricco' && profile.socialStatus !== 'elite') {
      updatedProfile.weeklyIncome = Math.round(profile.weeklyIncome * 0.7);
    }
  }
  
  // Problemi di salute aumentano con l'età
  if (updatedProfile.age >= 50 && (updatedProfile.healthIssues?.length === 0 || !updatedProfile.healthIssues)) {
    const healthRoll = Math.random();
    let healthProbability = 0.05; // Probabilità base a 50 anni
    
    // Aumenta con l'età
    healthProbability += (updatedProfile.age - 50) * 0.005;
    
    if (healthRoll < healthProbability) {
      const newIssue = healthIssues[Math.floor(Math.random() * (healthIssues.length - 1)) + 1];
      updatedProfile.healthIssues = [newIssue];
      updatedProfile.lifeEvents = [...(profile.lifeEvents || []), `Hai sviluppato ${newIssue}`];
      
      // Aumento delle spese fisse per problemi di salute
      updatedProfile.fixedExpenses = Math.round(profile.fixedExpenses * 1.1);
    }
  }
  
  // Peggioramento dei problemi di salute esistenti
  else if (updatedProfile.healthIssues && updatedProfile.healthIssues.length > 0 && updatedProfile.healthIssues[0] !== "Nessuno") {
    const worseningRoll = Math.random();
    let worseningProbability = 0.1 + ((updatedProfile.age - 40) * 0.005);
    
    if (worseningRoll < worseningProbability) {
      updatedProfile.lifeEvents = [...(profile.lifeEvents || []), `I tuoi problemi di salute sono peggiorati`];
      updatedProfile.fixedExpenses = Math.round(profile.fixedExpenses * 1.15);
    }
  }
  
  // Cambiamenti nei rapporti familiari con l'età
  if (updatedProfile.age === 75 && profile.hasChildren) {
    // I figli potrebbero aiutare finanziariamente
    if (Math.random() < 0.7) {
      const supportAmount = Math.round(profile.weeklyIncome * 0.2);
      updatedProfile.weeklyIncome += supportAmount;
      updatedProfile.lifeEvents = [...(profile.lifeEvents || []), `I tuoi figli hanno iniziato a sostenerti finanziariamente (+${supportAmount}€ settimanali)`];
    }
  }
  
  // Evento vedovanza (solo per sposati oltre i 65 anni)
  if (updatedProfile.maritalStatus === 'sposato' && updatedProfile.age >= 65) {
    // Probabilità aumenta con l'età
    const widowProbability = 0.02 + ((updatedProfile.age - 65) * 0.003);
    
    if (Math.random() < widowProbability) {
      updatedProfile.maritalStatus = 'vedovo';
      updatedProfile.lifeEvents = [...(profile.lifeEvents || []), "Hai perso il tuo coniuge"];
      updatedProfile = updateKarma(updatedProfile, -2);
      
      // Impatto finanziario della vedovanza
      updatedProfile.weeklyIncome = Math.round(profile.weeklyIncome * 0.8);
      updatedProfile.fixedExpenses = Math.round(profile.fixedExpenses * 0.9);
    }
  }
  
  return updatedProfile;
}

// Calcola la probabilità di morte basata sull'età, karma e altri fattori
export function calculateDeathProbability(profile: PlayerProfile): number {
  // Probabilità base basata sull'età
  let baseProbability = 0;
  
  if (profile.age < 30) {
    baseProbability = 0.001; // 0.1% per giovani
  } else if (profile.age < 50) {
    baseProbability = 0.002; // 0.2% per adulti
  } else if (profile.age < 70) {
    baseProbability = 0.005; // 0.5% per anziani
  } else if (profile.age < 85) {
    baseProbability = 0.01; // 1% per molto anziani
  } else {
    baseProbability = 0.02 + ((profile.age - 85) * 0.005); // Aumenta progressivamente oltre gli 85
  }
  
  // Modifica basata sul karma (0-10)
  // Karma basso aumenta la probabilità, karma alto la diminuisce
  const karmaModifier = (5 - profile.karma) / 40; // Range da -0.125 a +0.125
  
  // Modifiche per problemi di salute
  let healthModifier = 0;
  if (profile.healthIssues && profile.healthIssues.length > 0 && profile.healthIssues[0] !== "Nessuno") {
    healthModifier = 0.005; // +0.5% base per problemi di salute
  }
  
  // Modifiche per stato sociale (povertà aumenta il rischio, ricchezza lo diminuisce)
  let socialModifier = 0;
  switch (profile.socialStatus) {
    case 'indigente': socialModifier = 0.005; break;
    case 'povero': socialModifier = 0.002; break;
    case 'classe media-bassa': socialModifier = 0.001; break;
    case 'classe media': socialModifier = 0; break;
    case 'benestante': socialModifier = -0.001; break;
    case 'ricco': socialModifier = -0.002; break;
    case 'elite': socialModifier = -0.003; break;
  }
  
  // Modifiche per dipendenze
  let addictionModifier = 0;
  if (profile.addiction !== 'nessuna') {
    addictionModifier = (profile.addictionSeverity / 1000); // Da 0.001 a 0.01
  }
  
  // Modifiche per eventi di vita traumatici (conteggia eventi negativi)
  let traumaModifier = 0;
  const traumaticEvents = [
    "Hai perso il tuo coniuge", 
    "Grave perdita finanziaria", 
    "I tuoi problemi di salute sono peggiorati",
    "Sei caduto in disgrazia"
  ];
  
  if (profile.lifeEvents) {
    for (const event of profile.lifeEvents) {
      if (traumaticEvents.some(traumaEvent => event.includes(traumaEvent))) {
        traumaModifier += 0.001;
      }
    }
  }
  
  // Probabilità finale
  return Math.max(0.0001, baseProbability + karmaModifier + healthModifier + socialModifier + addictionModifier + traumaModifier);
}

// Eventi di morte casuali (manteniamo quelli originali e ne aggiungiamo nuovi)
export const deathEvents = [
  // Eventi originali
  {
    id: 'accident',
    title: 'Incidente stradale',
    description: 'Sei morto in un tragico incidente stradale mentre tornavi a casa dalla ricevitoria.',
    karmaThreshold: 10 // Può succedere a qualsiasi livello di karma
  },
  {
    id: 'illness',
    title: 'Malattia improvvisa',
    description: 'Una malattia improvvisa ti ha portato via nel sonno. Almeno non hai sofferto.',
    karmaThreshold: 10 // Può succedere a qualsiasi livello di karma
  },
  {
    id: 'robbery',
    title: 'Rapina finita male',
    description: 'Sei stato vittima di una rapina finita male mentre ritiravi la tua vincita.',
    karmaThreshold: 7 // Più probabile con karma medio-basso
  },
  {
    id: 'gambling_debt',
    title: 'Debiti di gioco',
    description: 'I tuoi debiti di gioco ti hanno messo nei guai con le persone sbagliate. Ti hanno trovato nel fiume con le scarpe di cemento.',
    karmaThreshold: 5 // Solo con karma basso
  },
  {
    id: 'largo_lagrande',
    title: 'Largo LaGrande',
    description: 'Sei stato gettato giù da un ponte da un certo Largo LaGrande. A quanto pare non gli piaceva il tuo stile di gioco.',
    karmaThreshold: 3 // Solo con karma molto basso
  },
  {
    id: 'lottery_curse',
    title: 'La maledizione della lotteria',
    description: 'Hai vinto il jackpot, ma la "maledizione della lotteria" ha colpito ancora. Sei stato trovato senza vita nella tua nuova villa.',
    karmaThreshold: 6, // Karma medio-basso
    onlyAfterJackpot: true // Solo dopo aver vinto il jackpot
  },
  {
    id: 'old_age',
    title: 'Vecchiaia',
    description: 'Dopo una lunga vita passata a inseguire il sogno della vincita, ti sei spento serenamente nel sonno.',
    karmaThreshold: 10, // Può succedere a qualsiasi livello di karma
    onlyForElders: true // Solo per anziani (>80 anni)
  },
  
  // Nuovi eventi di morte
  {
    id: 'health_complication',
    title: 'Complicazioni di salute',
    description: 'Le tue condizioni di salute sono peggiorate improvvisamente. I medici non hanno potuto fare nulla.',
    karmaThreshold: 10, // Può succedere a qualsiasi livello di karma
    requiresHealthIssues: true // Solo se ha problemi di salute
  },
  {
    id: 'addiction_overdose',
    title: 'Overdose',
    description: 'La tua dipendenza è diventata incontrollabile. Un mix letale di sostanze ha posto fine alla tua esistenza.',
    karmaThreshold: 5, // Solo con karma basso
    requiresAddiction: true, // Solo se ha dipendenze
    minAddictionSeverity: 7 // Dipendenza severa
  },
  {
    id: 'bankruptcy_suicide',
    title: 'Suicidio per bancarotta',
    description: 'I debiti schiaccianti e la vergogna della bancarotta ti hanno spinto a compiere un gesto estremo.',
    karmaThreshold: 4, // Solo con karma molto basso
    requiresDebt: 'schiacciante', // Solo con debiti schiaccianti
    requiresNegativeBalance: true // Solo con bilancio negativo
  },
  {
    id: 'bitter_despair',
    title: 'Amara disperazione',
    description: 'Anni di scommesse senza successo ti hanno consumato lentamente. Sei morto in solitudine, ancora stringendo il tuo ultimo biglietto non vincente.',
    karmaThreshold: 3, // Solo con karma bassissimo
    minPlayedTickets: 100, // Dopo molti biglietti
    maxWinRatio: 0.1 // Solo se ha vinto poco rispetto a quanto speso
  },
  {
    id: 'peaceful_ending',
    title: 'Fine serena',
    description: 'Circondato dalla tua famiglia e con la soddisfazione di una vita vissuta pienamente, hai chiuso gli occhi per l\'ultima volta con un sorriso.',
    karmaThreshold: 10, // Può succedere a qualsiasi livello di karma
    minKarma: 8, // Solo con karma alto
    onlyForElders: true, // Solo per anziani
    requiresChildren: true // Solo se ha figli
  },
  {
    id: 'corruption_scandal',
    title: 'Scandalo di corruzione',
    description: 'Il tuo coinvolgimento in un enorme scandalo di corruzione legato alla lotteria è stato scoperto. Non hai retto alla vergogna pubblica.',
    karmaThreshold: 4, // Solo con karma basso
    onlyForHighSocial: true, // Solo per classi sociali alte
    minWinAmount: 10000 // Solo dopo grandi vincite
  },
  {
    id: 'medical_malpractice',
    title: 'Errore medico',
    description: 'Un tragico errore durante un intervento di routine. La famiglia ha fatto causa all\'ospedale, ma ormai era troppo tardi.',
    karmaThreshold: 10, // Può succedere a qualsiasi livello di karma
    requiresHealthIssues: true // Solo se ha problemi di salute
  },
  {
    id: 'last_ticket',
    title: 'L\'ultimo biglietto',
    description: 'L\'emozione di scoprire di aver vinto il jackpot è stata letteralmente troppo forte per il tuo cuore.',
    karmaThreshold: 10, // Può succedere a qualsiasi livello di karma
    onlyAfterJackpot: true, // Solo dopo il jackpot
    onlyForElders: true // Solo per anziani
  }
];

// Ottieni un evento di morte casuale in base al karma e ad altri fattori
export function getRandomDeathEvent(profile: PlayerProfile, hasWonJackpot: boolean = false): any {
  // Filtra gli eventi in base al karma e ad altre condizioni
  const possibleEvents = deathEvents.filter(event => {
    // Verifica la soglia di karma
    if (profile.karma > event.karmaThreshold) return false;
    
    // Verifica se richiede un karma minimo
    if ((event as any).minKarma && profile.karma < (event as any).minKarma) return false;
    
    // Verifica condizioni speciali originali
    if (event.onlyAfterJackpot && !hasWonJackpot) return false;
    if (event.onlyForElders && profile.age < 80) return false;
    
    // Verifica nuove condizioni speciali
    // Problemi di salute
    if ((event as any).requiresHealthIssues && 
        (!profile.healthIssues || profile.healthIssues.length === 0 || profile.healthIssues[0] === "Nessuno")) {
      return false;
    }
    
    // Dipendenze
    if ((event as any).requiresAddiction && profile.addiction === 'nessuna') return false;
    if ((event as any).minAddictionSeverity && 
        (profile.addiction === 'nessuna' || profile.addictionSeverity < (event as any).minAddictionSeverity)) {
      return false;
    }
    
    // Debito specifico
    if ((event as any).requiresDebt && profile.debt !== (event as any).requiresDebt) return false;
    
    // Bilancio negativo
    if ((event as any).requiresNegativeBalance && profile.balance >= 0) return false;
    
    // Minimo di biglietti giocati
    if ((event as any).minPlayedTickets && profile.playedTickets < (event as any).minPlayedTickets) return false;
    
    // Rapporto vincite/spesa
    if ((event as any).maxWinRatio && 
        (profile.moneySpent === 0 || (profile.moneyWon / profile.moneySpent) > (event as any).maxWinRatio)) {
      return false;
    }
    
    // Solo per classi sociali alte
    if ((event as any).onlyForHighSocial && 
        (profile.socialStatus !== 'benestante' && profile.socialStatus !== 'ricco' && profile.socialStatus !== 'elite')) {
      return false;
    }
    
    // Minimo importo vincita
    if ((event as any).minWinAmount && profile.moneyWon < (event as any).minWinAmount) return false;
    
    // Richiede figli
    if ((event as any).requiresChildren && !profile.hasChildren) return false;
    
    return true;
  });
  
  // Se non ci sono eventi possibili, usa l'evento di vecchiaia o incidente come fallback
  if (possibleEvents.length === 0) {
    return profile.age >= 80 
      ? deathEvents.find(e => e.id === 'old_age') 
      : deathEvents.find(e => e.id === 'accident');
  }
  
  // Scegli un evento casuale tra quelli possibili
  return possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
}

// Verifica se il giocatore muore in base alla probabilità
export function checkForDeath(profile: PlayerProfile, hasWonJackpot: boolean = false): { died: boolean, event: any } {
  const probability = calculateDeathProbability(profile);
  const roll = Math.random();
  
  if (roll < probability) {
    const event = getRandomDeathEvent(profile, hasWonJackpot);
    return { died: true, event };
  }
  
  return { died: false, event: null };
}
