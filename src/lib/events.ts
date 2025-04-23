import { PlayerProfile, SocialStatus, MaritalStatus, Employment, Debt, Addiction } from './player';

// Helper per creare eventi tipizzati correttamente
function createGameEvent<T extends Partial<GameEvent>>(event: T): GameEvent {
  return event as unknown as GameEvent;
}

// Definizione del tipo di evento espanso
export interface GameEvent {
  id: string;
  title: string;
  description: string;
  // Effetti base
  karmaEffect?: number;
  moneyEffect?: number;
  // Nuovi effetti
  healthEffect?: {
    type: 'new' | 'worsen' | 'improve';
    condition?: string;
  };
  debtEffect?: {
    type: 'increase' | 'decrease';
    amount: Debt; // Nuovo livello di debito
  };
  addictionEffect?: {
    type: 'new' | 'worsen' | 'improve';
    addictionType?: Addiction;
    severityChange?: number;
  };
  socialStatusEffect?: {
    type: 'improve' | 'worsen';
    newStatus?: SocialStatus;
  };
  employmentEffect?: {
    type: 'lose' | 'improve' | 'new';
    newEmployment?: Employment;
  };
  maritalStatusEffect?: {
    type: 'change';
    newStatus: MaritalStatus;
  };
  // Eventi di vita generati
  lifeEvents?: string[];
  // La probabilità è espressa come numero da 0 a 100
  probability: number;
  // Condizione opzionale che deve essere soddisfatta perché l'evento si verifichi
  condition?: (profile: PlayerProfile) => boolean;
  // Opzionale: numeri suggeriti per la schedina
  suggestedNumbers?: number[];
  // Opzionale: tipo di evento speciale
  specialType?: 'dream' | 'regular' | 'economic' | 'health' | 'social';
}

// Eventi positivi
export const positiveEvents: GameEvent[] = [
  {
    id: 'found_money',
    title: 'Hai trovato dei soldi per strada',
    description: 'Camminando per strada hai trovato una banconota caduta da qualche portafoglio.',
    moneyEffect: 20,
    karmaEffect: -1,
    probability: 5
  },
  {
    id: 'helped_elderly',
    title: 'Hai aiutato un anziano',
    description: 'Hai aiutato un anziano a portare la spesa fino a casa. Ti ha ringraziato calorosamente.',
    karmaEffect: 1,
    probability: 8
  },
  {
    id: 'tax_refund',
    title: 'Rimborso fiscale',
    description: 'Hai ricevuto un rimborso fiscale inaspettato.',
    moneyEffect: 100,
    probability: 3,
    specialType: 'economic',
    condition: (profile) => profile.socialStatus !== 'indigente' && profile.socialStatus !== 'povero'
  },
  {
    id: 'work_bonus',
    title: 'Bonus lavorativo',
    description: 'Il tuo datore di lavoro ti ha concesso un bonus per i buoni risultati.',
    moneyEffect: 200,
    probability: 2,
    specialType: 'economic',
    condition: (profile) => profile.employment !== 'disoccupato' && profile.employment !== 'pensionato' && profile.karma > 5
  },
  {
    id: 'lucky_scratch_card',
    title: 'Grattino fortunato',
    description: 'Hai comprato un grattino per strada e hai vinto una piccola somma. La statistica dice che i prossimi 50 saranno perdenti.',
    moneyEffect: 50,
    probability: 6,
    specialType: 'economic',
    lifeEvents: ['Piccola vincita con un grattino']
  },
  {
    id: 'neighbor_help',
    title: 'Vicino riconoscente',
    description: 'Hai aiutato il tuo vicino a riparare la sua auto. Per ringraziarti ti ha dato dei soldi che avrebbe comunque speso dal meccanico.',
    moneyEffect: 80,
    karmaEffect: 2,
    probability: 4
  },
  {
    id: 'relative_gift',
    title: 'Regalo inaspettato',
    description: 'Un parente lontano si è ricordato del tuo compleanno e ti ha mandato un regalo in denaro. Probabilmente si sente in colpa per qualcosa.',
    moneyEffect: 150,
    probability: 3,
    specialType: 'economic'
  },
  {
    id: 'street_performance',
    title: 'Esibizione improvvisata',
    description: 'Ti sei esibito per strada con la tua chitarra e qualcuno ha apprezzato abbastanza da lasciarti delle monete. Forse per farti smettere.',
    moneyEffect: 30,
    probability: 3,
    condition: (profile) => profile.socialStatus === 'indigente' || profile.socialStatus === 'povero'
  },
  {
    id: 'health_improvement',
    title: 'Miglioramento della salute',
    description: 'Dopo mesi di medicine e controlli, il tuo stato di salute è finalmente migliorato.',
    karmaEffect: 1,
    probability: 2,
    specialType: 'health',
    healthEffect: {
      type: 'improve'
    },
    lifeEvents: ['Condizioni di salute migliorate'],
    condition: (profile) => profile.healthIssues && profile.healthIssues.length > 0 && profile.healthIssues[0] !== "Nessuno"
  },
  {
    id: 'debt_reduction',
    title: 'Riduzione del debito',
    description: 'Grazie ad una ristrutturazione del debito, sei riuscito a migliorare la tua situazione finanziaria.',
    probability: 3,
    specialType: 'economic',
    debtEffect: {
      type: 'decrease',
      amount: 'piccolo'
    },
    lifeEvents: ['Riduzione significativa del debito'],
    condition: (profile) => profile.debt !== 'nessuno' && profile.debt !== 'piccolo'
  },
  {
    id: 'addiction_recovery',
    title: 'Recupero dalla dipendenza',
    description: 'I tuoi sforzi per superare la tua dipendenza stanno finalmente dando frutti. Ti senti meglio e più in controllo.',
    karmaEffect: 2,
    probability: 2,
    specialType: 'health',
    addictionEffect: {
      type: 'improve',
      severityChange: -2
    },
    lifeEvents: ['Progressi nel superare la dipendenza'],
    condition: (profile) => profile.addiction !== 'nessuna'
  },
  {
    id: 'job_promotion',
    title: 'Promozione lavorativa',
    description: 'Hai ottenuto una promozione al lavoro! Questo si tradurrà in un aumento del tuo reddito settimanale.',
    probability: 2,
    specialType: 'economic',
    employmentEffect: {
      type: 'improve'
    },
    lifeEvents: ['Promozione al lavoro'],
    condition: (profile) => profile.employment !== 'disoccupato' && profile.employment !== 'pensionato' && profile.employment !== 'imprenditore'
  },
  {
    id: 'new_job',
    title: 'Nuovo lavoro',
    description: 'Dopo mesi di ricerca, hai finalmente trovato un lavoro! La tua situazione economica migliorerà presto.',
    probability: 3,
    specialType: 'economic',
    employmentEffect: {
      type: 'new',
      newEmployment: 'part-time'
    },
    lifeEvents: ['Trovato un nuovo lavoro'],
    condition: (profile) => profile.employment === 'disoccupato'
  },
  {
    id: 'social_mobility',
    title: 'Mobilità sociale',
    description: 'Grazie al tuo duro lavoro e un po\' di fortuna, la tua posizione nella società è migliorata.',
    probability: 1,
    specialType: 'social',
    socialStatusEffect: {
      type: 'improve'
    },
    lifeEvents: ['Miglioramento del tuo status sociale'],
    condition: (profile) => profile.socialStatus !== 'elite' && profile.karma > 7
  },
  {
    id: 'hidden_income',
    title: 'Entrata extra',
    description: 'Hai trovato un modo per guadagnare un po\' di soldi extra "in nero". Meglio non dire a nessuno da dove vengono.',
    probability: 3,
    specialType: 'economic',
    karmaEffect: -1,
    lifeEvents: ['Nuova fonte di reddito non dichiarato'],
    condition: (profile) => !profile.hiddenIncome || profile.hiddenIncome === 0
  }
];

// Eventi negativi
export const negativeEvents: GameEvent[] = [
  {
    id: 'parking_ticket',
    title: 'Multa per divieto di sosta',
    description: 'Hai parcheggiato in divieto di sosta e hai preso una multa.',
    moneyEffect: -40,
    probability: 5,
    specialType: 'economic',
    condition: (profile) => profile.socialStatus !== 'indigente' && profile.socialStatus !== 'povero'
  },
  {
    id: 'broke_item',
    title: 'Oggetto rotto',
    description: 'Si è rotto un elettrodomestico e hai dovuto ripararlo.',
    moneyEffect: -180,
    probability: 6,
    specialType: 'economic',
    condition: (profile) => profile.socialStatus !== 'indigente' && profile.socialStatus !== 'povero'
  },
  {
    id: 'medical_expense',
    title: 'Spesa medica imprevista',
    description: 'Hai dovuto sostenere una spesa medica imprevista.',
    moneyEffect: -220,
    probability: 4,
    specialType: 'health',
    healthEffect: {
      type: 'new',
      condition: 'Problema temporaneo'
    },
    lifeEvents: ['Problema di salute temporaneo'],
    condition: (profile) => profile.balance >= 220
  },
  {
    id: 'bad_investment',
    title: 'Investimento sbagliato',
    description: 'Hai fatto un piccolo investimento che si è rivelato un fallimento.',
    moneyEffect: -550,
    probability: 3,
    specialType: 'economic',
    lifeEvents: ['Perdita di un investimento'],
    condition: (profile) => (profile.socialStatus === 'benestante' || profile.socialStatus === 'ricco' || profile.socialStatus === 'elite') && profile.balance >= 550
  },
  {
    id: 'argument',
    title: 'Litigio con un vicino',
    description: 'Hai litigato con un vicino per futili motivi.',
    karmaEffect: -2,
    probability: 7,
    specialType: 'social'
  },
  {
    id: 'phone_broken',
    title: 'Smartphone rotto',
    description: 'Il tuo smartphone è caduto nel water. Ora dovrai comprarne uno nuovo e accontentarti di quello economico.',
    moneyEffect: -250,
    probability: 5,
    specialType: 'economic',
    condition: (profile) => profile.socialStatus !== 'indigente' && profile.socialStatus !== 'povero' && profile.balance >= 250
  },
  {
    id: 'tax_audit',
    title: 'Controllo fiscale',
    description: 'L\'Agenzia delle Entrate ha trovato irregolarità nella tua dichiarazione dei redditi. Coincidenza: hai iniziato a giocare al lotto.',
    moneyEffect: -400,
    probability: 2,
    specialType: 'economic',
    lifeEvents: ['Controllo fiscale con sanzioni'],
    condition: (profile) => profile.balance > 500 && profile.hiddenIncome && profile.hiddenIncome > 0
  },
  {
    id: 'car_repair',
    title: 'Guasto all\'auto',
    description: 'La tua auto si è guastata proprio quando avevi più bisogno di usarla. Il meccanico ti ha fatto un preventivo che sembra più un mutuo.',
    moneyEffect: -350,
    probability: 4,
    specialType: 'economic',
    condition: (profile) => profile.socialStatus !== 'indigente' && profile.socialStatus !== 'povero' && profile.balance >= 350
  },
  {
    id: 'relative_loan',
    title: 'Prestito familiare',
    description: 'Tuo cugino ti ha chiesto un prestito per "un\'emergenza". Sai che non rivedrai mai quei soldi, ma non hai potuto dire di no.',
    moneyEffect: -100,
    karmaEffect: 1,
    probability: 6,
    specialType: 'economic',
    condition: (profile) => profile.balance >= 100
  },
  {
    id: 'bad_weather_damage',
    title: 'Danni maltempo',
    description: 'Un temporale ha danneggiato il tuo tetto. L\'assicurazione naturalmente ha trovato una clausola per non pagare.',
    moneyEffect: -280,
    probability: 3,
    specialType: 'economic',
    condition: (profile) => profile.socialStatus !== 'indigente' && profile.socialStatus !== 'povero' && profile.balance >= 280
  },
  {
    id: 'illness_onset',
    title: 'Insorgenza di un problema di salute',
    description: 'Non ti sei sentito bene ultimamente e dopo una visita medica, hai scoperto di avere un problema di salute che richiederà cure regolari.',
    probability: 3,
    specialType: 'health',
    healthEffect: {
      type: 'new',
      condition: 'Problema cronico'
    },
    lifeEvents: ['Diagnosi di un problema di salute cronico'],
    condition: (profile) => (!profile.healthIssues || profile.healthIssues.length === 0 || profile.healthIssues[0] === "Nessuno") && profile.age > 40
  },
  {
    id: 'health_deterioration',
    title: 'Peggioramento delle condizioni di salute',
    description: 'Le tue condizioni di salute sono peggiorate, richiedendo cure più costose e frequenti.',
    probability: 4,
    specialType: 'health',
    healthEffect: {
      type: 'worsen'
    },
    lifeEvents: ['Peggioramento delle condizioni di salute'],
    condition: (profile) => profile.healthIssues && profile.healthIssues.length > 0 && profile.healthIssues[0] !== "Nessuno"
  },
  {
    id: 'new_debt',
    title: 'Nuovo debito',
    description: 'Le tue spese hanno superato le entrate e sei stato costretto a contrarre un nuovo debito per far fronte alle necessità.',
    probability: 4,
    specialType: 'economic',
    debtEffect: {
      type: 'increase',
      amount: 'medio'
    },
    lifeEvents: ['Contratto un nuovo debito'],
    condition: (profile) => profile.debt === 'nessuno' || profile.debt === 'piccolo'
  },
  {
    id: 'increased_debt',
    title: 'Debito aumentato',
    description: 'I tuoi debiti sono cresciuti a causa degli interessi e delle penali per i ritardi nei pagamenti.',
    probability: 5,
    specialType: 'economic',
    debtEffect: {
      type: 'increase',
      amount: 'grande'
    },
    lifeEvents: ['Aumento significativo del debito'],
    condition: (profile) => profile.debt === 'medio' || profile.debt === 'piccolo'
  },
  {
    id: 'crushing_debt',
    title: 'Debito schiacciante',
    description: 'La tua situazione debitoria è completamente fuori controllo. Gli interessi ora superano la tua capacità di pagamento.',
    probability: 3,
    specialType: 'economic',
    debtEffect: {
      type: 'increase',
      amount: 'schiacciante'
    },
    karmaEffect: -2,
    lifeEvents: ['Debito diventato insostenibile'],
    condition: (profile) => profile.debt === 'grande'
  },
  {
    id: 'addiction_development',
    title: 'Sviluppo di una dipendenza',
    description: 'Hai iniziato a rifugiarti sempre più spesso in comportamenti che ti danno conforto temporaneo, ma che stanno diventando una dipendenza.',
    probability: 3,
    specialType: 'health',
    addictionEffect: {
      type: 'new',
      addictionType: 'alcol',
      severityChange: 3
    },
    karmaEffect: -1,
    lifeEvents: ['Sviluppo di una dipendenza'],
    condition: (profile) => profile.addiction === 'nessuna' && profile.karma < 6
  },
  {
    id: 'gambling_addiction_start',
    title: 'Dipendenza dal gioco',
    description: 'Hai notato che stai pensando al gioco d\'azzardo sempre più spesso. I piccoli "svaghi" stanno diventando un\'ossessione.',
    probability: 4,
    specialType: 'health',
    addictionEffect: {
      type: 'new',
      addictionType: 'gioco',
      severityChange: 3
    },
    karmaEffect: -1,
    lifeEvents: ['Inizio di una dipendenza dal gioco'],
    condition: (profile) => profile.addiction === 'nessuna' && profile.playedTickets > 10
  },
  {
    id: 'worsening_addiction',
    title: 'Peggioramento della dipendenza',
    description: 'La tua dipendenza sta diventando sempre più difficile da controllare, causando problemi nella tua vita quotidiana.',
    probability: 5,
    specialType: 'health',
    addictionEffect: {
      type: 'worsen',
      severityChange: 2
    },
    karmaEffect: -1,
    lifeEvents: ['Peggioramento della dipendenza'],
    condition: (profile) => profile.addiction !== 'nessuna' && profile.addictionSeverity < 8
  },
  {
    id: 'job_loss',
    title: 'Perdita del lavoro',
    description: 'Sei stato licenziato dal tuo lavoro. Ora dovrai cercare una nuova occupazione in un mercato del lavoro difficile.',
    probability: 3,
    specialType: 'economic',
    employmentEffect: {
      type: 'lose',
      newEmployment: 'disoccupato'
    },
    karmaEffect: -2,
    lifeEvents: ['Perdita del lavoro'],
    condition: (profile) => profile.employment !== 'disoccupato' && profile.employment !== 'pensionato' && profile.karma < 6
  },
  {
    id: 'social_downgrade',
    title: 'Declassamento sociale',
    description: 'A causa delle difficoltà economiche, hai dovuto ridurre drasticamente il tuo stile di vita, con conseguente perdita di status sociale.',
    probability: 2,
    specialType: 'social',
    socialStatusEffect: {
      type: 'worsen'
    },
    karmaEffect: -1,
    lifeEvents: ['Declassamento dello status sociale'],
    condition: (profile) => profile.socialStatus !== 'indigente' && profile.balance < 0
  },
  {
    id: 'divorce',
    title: 'Divorzio',
    description: 'Il tuo matrimonio è finito. Oltre al dolore emotivo, ci sono anche conseguenze finanziarie da affrontare.',
    probability: 2,
    specialType: 'social',
    moneyEffect: -500,
    maritalStatusEffect: {
      type: 'change',
      newStatus: 'divorziato'
    },
    karmaEffect: -2,
    lifeEvents: ['Divorzio'],
    condition: (profile) => profile.maritalStatus === 'sposato' && profile.karma < 5
  },
  {
    id: 'separation',
    title: 'Separazione',
    description: 'Tu e il tuo coniuge avete deciso di separarvi. È un periodo difficile con molte incertezze.',
    probability: 3,
    specialType: 'social',
    maritalStatusEffect: {
      type: 'change',
      newStatus: 'separato'
    },
    karmaEffect: -1,
    lifeEvents: ['Separazione dal coniuge'],
    condition: (profile) => profile.maritalStatus === 'sposato' && profile.karma < 6
  }
];

// Eventi neutri
export const neutralEvents: GameEvent[] = [
  {
    id: 'met_friend',
    title: 'Incontro casuale',
    description: 'Hai incontrato un vecchio amico per strada.',
    karmaEffect: 1,
    probability: 10
  },
  {
    id: 'newspaper_article',
    title: 'Articolo interessante',
    description: 'Hai letto un articolo interessante sul giornale riguardo alla probabilità nelle lotterie.',
    probability: 5,
    specialType: 'regular'
  },
  {
    id: 'strange_cloud',
    title: 'Nuvola particolare',
    description: 'Hai notato una nuvola con una forma che sembrava un numero. Forse è un segno?',
    probability: 8,
    specialType: 'regular',
    suggestedNumbers: [Math.floor(Math.random() * 90) + 1]
  },
  {
    id: 'overheard_conversation',
    title: 'Conversazione captata',
    description: 'Hai sentito due persone parlare di numeri fortunati al bar. Non sembravano particolarmente fortunati, però.',
    probability: 9,
    specialType: 'regular',
    suggestedNumbers: [
      Math.floor(Math.random() * 90) + 1,
      Math.floor(Math.random() * 90) + 1
    ]
  },
  {
    id: 'lotto_winner_news',
    title: 'Notizia di una vincita',
    description: 'Al telegiornale hanno parlato di qualcuno che ha vinto una grossa somma al lotto. Pensavi: "Perché non io?"',
    probability: 7,
    specialType: 'regular'
  },
  {
    id: 'fortune_cookie',
    title: 'Biscotto della fortuna',
    description: 'Hai aperto un biscotto della fortuna con un messaggio criptico e alcuni numeri sul retro.',
    probability: 6,
    specialType: 'regular',
    suggestedNumbers: [
      Math.floor(Math.random() * 90) + 1,
      Math.floor(Math.random() * 90) + 1,
      Math.floor(Math.random() * 90) + 1
    ]
  },
  {
    id: 'old_receipt',
    title: 'Vecchio scontrino',
    description: 'Hai trovato un vecchio scontrino nel portafoglio con una sequenza di numeri che ti ha colpito.',
    probability: 5,
    specialType: 'regular',
    suggestedNumbers: [
      Math.floor(Math.random() * 90) + 1,
      Math.floor(Math.random() * 90) + 1
    ]
  },
  {
    id: 'change_job',
    title: 'Cambio di lavoro',
    description: 'Hai deciso di cambiare lavoro. Non guadagnerai di più, ma almeno l\'ambiente sarà migliore.',
    probability: 3,
    specialType: 'economic',
    lifeEvents: ['Cambio di lavoro'],
    condition: (profile) => profile.employment !== 'disoccupato' && profile.employment !== 'pensionato'
  },
  {
    id: 'moving',
    title: 'Trasloco',
    description: 'Hai deciso di trasferirti in un altro quartiere. Stessa città, ambiente diverso.',
    probability: 4,
    specialType: 'social',
    lifeEvents: ['Trasloco in un nuovo quartiere']
  },
  {
    id: 'new_hobby',
    title: 'Nuovo hobby',
    description: 'Hai iniziato un nuovo hobby che ti tiene occupato nei fine settimana.',
    probability: 6,
    specialType: 'regular',
    moneyEffect: -30
  },
  {
    id: 'health_check',
    title: 'Controllo medico',
    description: 'Hai fatto un controllo medico di routine. Tutto sembra a posto, per ora.',
    probability: 5,
    specialType: 'health',
    moneyEffect: -50,
    condition: (profile) => profile.balance >= 50
  },
  {
    id: 'mild_illness',
    title: 'Malattia lieve',
    description: 'Hai avuto l\'influenza e sei stato a casa dal lavoro per qualche giorno. Niente di grave.',
    probability: 7,
    specialType: 'health',
    moneyEffect: -30
  },
  {
    id: 'friendship',
    title: 'Nuova amicizia',
    description: 'Hai stretto amicizia con una persona interessante che ha una prospettiva diversa sulla vita.',
    probability: 5,
    specialType: 'social',
    karmaEffect: 1
  }
];

// Eventi di sogni con numeri
export const dreamEvents: GameEvent[] = [
  {
    id: 'dream_dead_relative',
    title: 'Sogno premonitore',
    description: 'Hai sognato tuo nonno defunto che ti suggeriva di giocare il numero 48. "Fidati di me, nipote mio" ti ha detto con un sorriso.',
    probability: 8,
    specialType: 'dream',
    suggestedNumbers: [48]
  },
  {
    id: 'dream_classmate',
    title: 'Sogno del passato',
    description: 'Hai sognato il tuo ex compagno di banco delle elementari, scomparso anni fa. Ti ha dato i numeri 17, 23 e 56, dicendo che ti porteranno fortuna.',
    probability: 6,
    specialType: 'dream',
    suggestedNumbers: [17, 23, 56]
  },
  {
    id: 'dream_famous_person',
    title: 'Visita illustre',
    description: 'Nel sogno, un famoso attore recentemente scomparso ti ha visitato e ti ha suggerito di giocare i numeri 9, 31 e 72. "Sono i numeri che mi hanno sempre portato fortuna" ti ha confidato.',
    probability: 5,
    specialType: 'dream',
    suggestedNumbers: [9, 31, 72]
  },
  {
    id: 'dream_old_friend',
    title: 'Amico dall\'aldilà',
    description: 'Un vecchio amico, scomparso troppo presto, è apparso nei tuoi sogni. "Gioca il 42 e il 64, fidati di me" ti ha sussurrato prima di svanire.',
    probability: 7,
    specialType: 'dream',
    suggestedNumbers: [42, 64]
  },
  {
    id: 'dream_mysterious_figure',
    title: 'Figura misteriosa',
    description: 'Una figura avvolta nell\'ombra ti ha visitato in sogno, sussurrando i numeri 13, 27 e 89. Non hai riconosciuto chi fosse, ma la sua voce sembrava familiare.',
    probability: 4,
    specialType: 'dream',
    suggestedNumbers: [13, 27, 89]
  },
  {
    id: 'dream_lottery_win',
    title: 'Vincita onirica',
    description: 'Nel sogno, stavi festeggiando una grossa vincita al lotto. I numeri sulla schedina erano 3, 19, 46, 54 e 88. Ti sei svegliato sudato e deluso.',
    probability: 6,
    specialType: 'dream',
    suggestedNumbers: [3, 19, 46, 54, 88]
  },
  {
    id: 'dream_talking_numbers',
    title: 'Numeri parlanti',
    description: 'Hai sognato dei numeri che parlavano tra loro. Il 7, il 22 e il 39 erano particolarmente rumorosi e insistevano che li giocassi al lotto.',
    probability: 5,
    specialType: 'dream',
    suggestedNumbers: [7, 22, 39]
  },
  {
    id: 'dream_deceased_neighbor',
    title: 'Visita dal vicino',
    description: 'Il tuo ex vicino di casa, defunto da anni, è apparso nel tuo sogno. Ti ha dato il numero 51 e ha detto che gli dispiaceva per tutte le volte che ha fatto rumore di notte.',
    probability: 4,
    specialType: 'dream',
    suggestedNumbers: [51]
  },
  {
    id: 'dream_heavenly_voice',
    title: 'Voce celestiale',
    description: 'Una voce celestiale nel sogno ti ha suggerito i numeri 11, 29 e 67, promettendoti che cambieranno la tua vita. Non ha specificato in che modo, però.',
    probability: 3,
    specialType: 'dream',
    suggestedNumbers: [11, 29, 67]
  },
  {
    id: 'dream_addiction',
    title: 'Incubo della dipendenza',
    description: 'Hai sognato di essere intrappolato in una stanza piena di biglietti della lotteria. Più ne giocavi, più la stanza diventava piccola. I numeri 6, 16 e 66 lampeggiavano sulle pareti.',
    probability: 5,
    specialType: 'dream',
    suggestedNumbers: [6, 16, 66],
    condition: (profile) => profile.addiction === 'gioco' && profile.addictionSeverity > 5
  },
  {
    id: 'dream_financial_ruin',
    title: 'Sogno della rovina',
    description: 'Nel sogno, eri in piedi di fronte a una montagna di debiti che ti seppelliva lentamente. Una mano misteriosa ti offriva i numeri 4, 44 e 84 come via d\'uscita.',
    probability: 4,
    specialType: 'dream',
    suggestedNumbers: [4, 44, 84],
    condition: (profile) => profile.debt === 'grande' || profile.debt === 'schiacciante'
  },
  {
    id: 'dream_health_warning',
    title: 'Avvertimento sulla salute',
    description: 'Hai sognato un medico che ti avvisava di un peggioramento della tua salute. Ti ha consegnato una ricetta con i numeri 7, 21 e 77 scritti sopra.',
    probability: 4,
    specialType: 'dream',
    suggestedNumbers: [7, 21, 77],
    condition: (profile) => profile.healthIssues && profile.healthIssues.length > 0 && profile.healthIssues[0] !== "Nessuno"
  }
];

// Eventi speciali (nuova categoria)
export const specialEvents: GameEvent[] = [
  {
    id: 'lottery_addiction',
    title: 'Sintomi di dipendenza',
    description: 'Hai notato che stai pensando al lotto un po\' troppo spesso. Magari dovresti farti delle domande.',
    karmaEffect: -1,
    probability: 7,
    specialType: 'health',
    condition: (profile) => profile.socialStatus === 'indigente' || profile.socialStatus === 'povero' || profile.socialStatus === 'classe media-bassa',
    addictionEffect: {
      type: 'new',
      addictionType: 'gioco',
      severityChange: 2
    },
    lifeEvents: ['Primi segni di dipendenza dal gioco']
  },
  {
    id: 'ricevitoria_gossip',
    title: 'Pettegolezzo in ricevitoria',
    description: 'Il gestore della ricevitoria ti ha raccontato di un cliente che ha giocato gli stessi numeri per 30 anni e poi ha vinto proprio il giorno in cui ha deciso di cambiarli.',
    probability: 6,
    specialType: 'regular',
    suggestedNumbers: [
      Math.floor(Math.random() * 90) + 1,
      Math.floor(Math.random() * 90) + 1,
      Math.floor(Math.random() * 90) + 1
    ]
  },
  {
    id: 'relative_criticism',
    title: 'Critica familiare',
    description: 'Un tuo parente ti ha criticato per il tuo "vizio del gioco". Hai provato a spiegare che è solo un passatempo, ma non sembrava convinto.',
    karmaEffect: -1,
    probability: 5,
    specialType: 'social',
    condition: (profile) => profile.balance < 0 || profile.addiction === 'gioco',
    lifeEvents: ['Critica familiare sul gioco d\'azzardo']
  },
  {
    id: 'lucky_charm',
    title: 'Portafortuna',
    description: 'Hai trovato un vecchio portafortuna che avevi dimenticato. Chissà se funziona davvero...',
    probability: 4,
    specialType: 'regular',
    suggestedNumbers: [
      Math.floor(Math.random() * 90) + 1
    ]
  },
  {
    id: 'numerology_book',
    title: 'Libro di numerologia',
    description: 'Hai comprato un libro di numerologia ed esoterica. Scientificamente è tutto una sciocchezza, ma non si sa mai...',
    moneyEffect: -15,
    probability: 3,
    specialType: 'regular',
    suggestedNumbers: [
      Math.floor(Math.random() * 90) + 1,
      Math.floor(Math.random() * 90) + 1
    ]
  },
  {
    id: 'near_miss',
    title: 'Quasi vincita',
    description: 'Hai scoperto che la settimana scorsa sono usciti numeri molto simili a quelli che giochi di solito. La fortuna si è presa gioco di te.',
    probability: 5,
    specialType: 'regular'
  },
  {
    id: 'astrology_reading',
    title: 'Lettura astrologica',
    description: 'Hai consultato il tuo oroscopo che prevedeva una vincita imminente. Non specificava quando, però.',
    probability: 4,
    specialType: 'regular',
    moneyEffect: -10,
    suggestedNumbers: [
      Math.floor(Math.random() * 90) + 1,
      Math.floor(Math.random() * 90) + 1
    ]
  },
  {
    id: 'debt_collector',
    title: 'Visita dell\'esattore',
    description: 'Un esattore è venuto a trovarti a casa per ricordarti dei tuoi debiti in sospeso. La situazione sta diventando seria.',
    probability: 4,
    specialType: 'economic',
    karmaEffect: -1,
    lifeEvents: ['Visita di un esattore a casa'],
    condition: (profile) => profile.debt === 'grande' || profile.debt === 'schiacciante'
  },
  {
    id: 'family_help',
    title: 'Aiuto familiare',
    description: 'Un parente ha notato la tua difficile situazione economica e si è offerto di aiutarti, a patto che tu smetta di giocare.',
    probability: 3,
    specialType: 'economic',
    moneyEffect: 200,
    karmaEffect: 1,
    condition: (profile) => profile.balance < 0 && profile.playedTickets > 10 && (profile.socialStatus === 'indigente' || profile.socialStatus === 'povero'),
    lifeEvents: ['Aiuto economico da parte della famiglia']
  },
  {
    id: 'gambling_support_group',
    title: 'Gruppo di supporto',
    description: 'Hai trovato un volantino di un gruppo di supporto per persone con dipendenza dal gioco. Stai pensando di andarci.',
    probability: 3,
    specialType: 'health',
    condition: (profile) => profile.addiction === 'gioco' && profile.addictionSeverity > 5,
    addictionEffect: {
      type: 'improve',
      severityChange: -1
    },
    lifeEvents: ['Considerato di unirsi a un gruppo di supporto']
  },
  {
    id: 'loan_shark',
    title: 'Strozzino',
    description: 'A corto di liquidi e disperato, hai contattato uno strozzino. I suoi tassi d\'interesse sono altissimi, ma almeno non fa domande.',
    probability: 3,
    specialType: 'economic',
    moneyEffect: 300,
    karmaEffect: -2,
    debtEffect: {
      type: 'increase',
      amount: 'grande'
    },
    lifeEvents: ['Prestito da uno strozzino'],
    condition: (profile) => profile.balance < 100 && profile.karma < 5
  },
  {
    id: 'selling_valuables',
    title: 'Vendita di oggetti di valore',
    description: 'Hai venduto alcuni oggetti di valore per racimolare denaro per le spese quotidiane... e forse per qualche schedina.',
    probability: 4,
    specialType: 'economic',
    moneyEffect: 150,
    karmaEffect: -1,
    lifeEvents: ['Vendita di oggetti personali per necessità'],
    condition: (profile) => profile.balance < 200
  },
  {
    id: 'social_benefits',
    title: 'Sussidi sociali',
    description: 'Hai fatto domanda per i sussidi sociali. Non è molto, ma ti aiuterà a tirare avanti per un po\'.',
    probability: 3,
    specialType: 'economic',
    moneyEffect: 100,
    condition: (profile) => profile.socialStatus === 'indigente' || profile.socialStatus === 'povero' || profile.employment === 'disoccupato',
    lifeEvents: ['Ottenuto sussidi sociali']
  },
  {
    id: 'mental_health_decline',
    title: 'Peggioramento della salute mentale',
    description: 'Stress, ansia e preoccupazioni finanziarie stanno iniziando a influire sulla tua salute mentale. Dovresti cercare aiuto.',
    probability: 3,
    specialType: 'health',
    karmaEffect: -1,
    condition: (profile) => profile.balance < 0 || profile.debt === 'grande' || profile.debt === 'schiacciante' || profile.addiction !== 'nessuna',
    lifeEvents: ['Problemi di salute mentale legati allo stress']
  },
  {
    id: 'reconciliation',
    title: 'Riconciliazione',
    description: 'Hai fatto pace con un familiare o amico con cui avevi litigato. È un piccolo passo verso una vita più serena.',
    probability: 3,
    specialType: 'social',
    karmaEffect: 2,
    lifeEvents: ['Riconciliazione con un familiare o amico']
  }
];

// Eventi economici complessi
export const economicEvents: GameEvent[] = [
  {
    id: 'economic_crisis',
    title: 'Crisi economica',
    description: 'Una nuova crisi economica ha colpito il paese. Tutti ne risentono, ma soprattutto le classi più basse.',
    probability: 1,
    specialType: 'economic',
    condition: (profile) => profile.socialStatus === 'indigente' || profile.socialStatus === 'povero' || profile.socialStatus === 'classe media-bassa',
    moneyEffect: -100,
    lifeEvents: ['Colpito dalla crisi economica']
  },
  {
    id: 'inflation',
    title: 'Inflazione',
    description: 'L\'inflazione continua a crescere, erodendo il potere d\'acquisto. Le tue spese fisse sono aumentate.',
    probability: 2,
    specialType: 'economic',
    lifeEvents: ['Aumento del costo della vita per l\'inflazione']
  },
  {
    id: 'rent_increase',
    title: 'Aumento dell\'affitto',
    description: 'Il proprietario di casa ha aumentato l\'affitto. Dice che è colpa del mercato immobiliare.',
    probability: 3,
    specialType: 'economic',
    moneyEffect: -50,
    condition: (profile) => profile.socialStatus !== 'ricco' && profile.socialStatus !== 'elite',
    lifeEvents: ['Aumento dell\'affitto']
  },
  {
    id: 'tax_increase',
    title: 'Aumento delle tasse',
    description: 'Il governo ha aumentato le tasse. Come sempre, chi ha di meno paga di più in proporzione.',
    probability: 2,
    specialType: 'economic',
    moneyEffect: -80,
    lifeEvents: ['Aumento delle tasse']
  },
  {
    id: 'stock_market_crash',
    title: 'Crollo in borsa',
    description: 'I mercati finanziari hanno subito un crollo improvviso. I tuoi piccoli investimenti sono stati colpiti duramente.',
    probability: 1,
    specialType: 'economic',
    moneyEffect: -400,
    condition: (profile) => profile.socialStatus === 'benestante' || profile.socialStatus === 'ricco' || profile.socialStatus === 'elite',
    lifeEvents: ['Perdite negli investimenti per crollo di borsa']
  },
  {
    id: 'unexpected_inheritance',
    title: 'Eredità inaspettata',
    description: 'Un lontano parente è venuto a mancare e ti ha lasciato un\'eredità inaspettata. Non era ricco, ma è comunque un aiuto.',
    probability: 1,
    specialType: 'economic',
    moneyEffect: 500,
    lifeEvents: ['Ricevuta una piccola eredità']
  },
  {
    id: 'failed_business',
    title: 'Fallimento dell\'attività',
    description: 'La tua piccola attività ha dovuto chiudere i battenti. Il mercato è troppo competitivo e le spese erano insostenibili.',
    probability: 2,
    specialType: 'economic',
    moneyEffect: -600,
    socialStatusEffect: {
      type: 'worsen'
    },
    employmentEffect: {
      type: 'lose',
      newEmployment: 'disoccupato'
    },
    condition: (profile) => profile.employment === 'imprenditore',
    lifeEvents: ['Fallimento della propria attività']
  },
  {
    id: 'successful_investment',
    title: 'Investimento riuscito',
    description: 'Un piccolo investimento che avevi fatto tempo fa si è rivelato sorprendentemente redditizio.',
    probability: 1,
    specialType: 'economic',
    moneyEffect: 300,
    condition: (profile) => profile.socialStatus !== 'indigente' && profile.socialStatus !== 'povero',
    lifeEvents: ['Successo di un investimento precedente']
  }
];

// Funzione per ottenere un evento casuale
export function getRandomEvent(profile: PlayerProfile): GameEvent | null {
  // Combinare tutti gli eventi
  const allEvents = [
    ...positiveEvents, 
    ...negativeEvents, 
    ...neutralEvents, 
    ...dreamEvents, 
    ...specialEvents,
    ...economicEvents
  ];
  
  // Filtriamo gli eventi in base alle condizioni
  const possibleEvents = allEvents.filter(event => {
    // Se c'è una condizione, la verifichiamo
    if (event.condition) {
      return event.condition(profile);
    }
    return true;
  });
  
  // Calcoliamo la somma totale delle probabilità
  const totalProbability = possibleEvents.reduce((sum, event) => sum + event.probability, 0);
  
  // Generare un numero casuale tra 0 e la somma delle probabilità
  const randomValue = Math.random() * totalProbability;
  
  // Troviamo l'evento corrispondente al valore casuale
  let cumulativeProbability = 0;
  
  for (const event of possibleEvents) {
    cumulativeProbability += event.probability;
    if (randomValue <= cumulativeProbability) {
      return event;
    }
  }
  
  // Se arriviamo qui, è un caso in cui non si verifica nessun evento
  return null;
}

// Funzione per ottenere specificamente un evento di sogno
export function getRandomDreamEvent(profile: PlayerProfile): GameEvent | null {
  if (dreamEvents.length === 0) return null;
  
  // Filtriamo gli eventi di sogno in base alle condizioni
  const possibleDreamEvents = dreamEvents.filter(event => {
    if (event.condition) {
      return event.condition(profile);
    }
    return true;
  });
  
  if (possibleDreamEvents.length === 0) return null;
  
  // Calcoliamo la somma totale delle probabilità
  const totalProbability = possibleDreamEvents.reduce((sum, event) => sum + event.probability, 0);
  
  // Generare un numero casuale tra 0 e la somma delle probabilità
  const randomValue = Math.random() * totalProbability;
  
  // Troviamo l'evento corrispondente al valore casuale
  let cumulativeProbability = 0;
  
  for (const event of possibleDreamEvents) {
    cumulativeProbability += event.probability;
    if (randomValue <= cumulativeProbability) {
      return event;
    }
  }
  
  // Se arriviamo qui e nessun evento è stato selezionato, prendiamo uno a caso
  const randomIndex = Math.floor(Math.random() * possibleDreamEvents.length);
  return possibleDreamEvents[randomIndex];
}

// Funzione per applicare un evento al profilo del giocatore
export function applyEventToProfile(profile: PlayerProfile, event: GameEvent): {
  updatedProfile: PlayerProfile,
  appliedEffects: {
    karmaEffect?: number;
    moneyEffect?: number;
    healthEffect?: boolean;
    debtEffect?: string;
    addictionEffect?: number;
    socialEffect?: string;
    lifeEvents?: string[];
  }
} {
  let updatedProfile = { ...profile };
  const appliedEffects: any = {};
  
  // Applicare l'effetto sul karma se presente
  if (event.karmaEffect) {
    updatedProfile.karma = Math.max(0, Math.min(10, updatedProfile.karma + event.karmaEffect));
    appliedEffects.karmaEffect = event.karmaEffect;
  }
  
  // Applicare l'effetto sul bilancio se presente
  if (event.moneyEffect) {
    updatedProfile.balance += event.moneyEffect;
    appliedEffects.moneyEffect = event.moneyEffect;
  }
  
  // Applicare effetti sulla salute
  if (event.healthEffect) {
    // Creiamo una lista di problemi di salute se non esiste
    if (!updatedProfile.healthIssues) {
      updatedProfile.healthIssues = [];
    }
    
    if (event.healthEffect.type === 'new') {
      // Aggiungi un nuovo problema di salute
      if (updatedProfile.healthIssues.length === 0 || updatedProfile.healthIssues[0] === "Nessuno") {
        updatedProfile.healthIssues = [event.healthEffect.condition || "Problema generico"];
      } else {
        // Se già ci sono problemi di salute, ne aggiungiamo un altro
        updatedProfile.healthIssues.push(event.healthEffect.condition || "Problema aggiuntivo");
      }
      
      // Aumenta le spese fisse per le cure mediche
      updatedProfile.fixedExpenses = Math.round(updatedProfile.fixedExpenses * 1.1);
      
      appliedEffects.healthEffect = true;
    } 
    else if (event.healthEffect.type === 'worsen' && updatedProfile.healthIssues && updatedProfile.healthIssues.length > 0 && updatedProfile.healthIssues[0] !== "Nessuno") {
      // Peggioramento delle condizioni di salute esistenti
      updatedProfile.fixedExpenses = Math.round(updatedProfile.fixedExpenses * 1.15);
      
      appliedEffects.healthEffect = true;
    }
    else if (event.healthEffect.type === 'improve' && updatedProfile.healthIssues && updatedProfile.healthIssues.length > 0 && updatedProfile.healthIssues[0] !== "Nessuno") {
      // Miglioramento delle condizioni di salute
      updatedProfile.healthIssues = ["In via di guarigione"];
      
      // Riduzione delle spese mediche
      updatedProfile.fixedExpenses = Math.round(updatedProfile.fixedExpenses * 0.95);
      
      appliedEffects.healthEffect = true;
    }
  }
  
  // Applicare effetti sui debiti
  if (event.debtEffect) {
    if (event.debtEffect.type === 'increase') {
      updatedProfile.debt = event.debtEffect.amount;
      
      // Aumenta le spese fisse per i pagamenti del debito
      if (event.debtEffect.amount === 'grande' || event.debtEffect.amount === 'schiacciante') {
        updatedProfile.fixedExpenses = Math.round(updatedProfile.fixedExpenses * 1.2);
      } else {
        updatedProfile.fixedExpenses = Math.round(updatedProfile.fixedExpenses * 1.1);
      }
      
      appliedEffects.debtEffect = `Aumentato a ${event.debtEffect.amount}`;
    } 
    else if (event.debtEffect.type === 'decrease') {
      // Diminuzione del livello di debito
      const debtLevels: Debt[] = ['nessuno', 'piccolo', 'medio', 'grande', 'schiacciante'];
      const currentIndex = debtLevels.indexOf(updatedProfile.debt);
      
      if (currentIndex > 0) {
        // Riduci di un livello
        updatedProfile.debt = debtLevels[currentIndex - 1];
        
        // Riduci le spese fisse
        updatedProfile.fixedExpenses = Math.round(updatedProfile.fixedExpenses * 0.95);
        
        appliedEffects.debtEffect = `Ridotto a ${updatedProfile.debt}`;
      }
    }
  }
  
  // Applicare effetti sulle dipendenze
  if (event.addictionEffect) {
    if (event.addictionEffect.type === 'new' && updatedProfile.addiction === 'nessuna') {
      // Nuova dipendenza
      updatedProfile.addiction = event.addictionEffect.addictionType || 'gioco';
      updatedProfile.addictionSeverity = event.addictionEffect.severityChange || 3;
      
      // Aumenta le spese variabili
      updatedProfile.variableExpenses = Math.round(updatedProfile.variableExpenses * (1 + updatedProfile.addictionSeverity / 20));
      
      appliedEffects.addictionEffect = updatedProfile.addictionSeverity;
    } 
    else if (event.addictionEffect.type === 'worsen' && updatedProfile.addiction !== 'nessuna') {
      // Peggioramento della dipendenza
      updatedProfile.addictionSeverity = Math.min(10, updatedProfile.addictionSeverity + (event.addictionEffect.severityChange || 1));
      
      // Aumenta le spese variabili
      updatedProfile.variableExpenses = Math.round(updatedProfile.variableExpenses * (1 + (event.addictionEffect.severityChange || 1) / 20));
      
      appliedEffects.addictionEffect = event.addictionEffect.severityChange || 1;
    }
    else if (event.addictionEffect.type === 'improve' && updatedProfile.addiction !== 'nessuna') {
      // Miglioramento della dipendenza
      updatedProfile.addictionSeverity = Math.max(0, updatedProfile.addictionSeverity - (event.addictionEffect.severityChange || 1));
      
      // Se la dipendenza è completamente guarita
      if (updatedProfile.addictionSeverity === 0) {
        updatedProfile.addiction = 'nessuna';
      }
      
      // Riduzione delle spese variabili
      updatedProfile.variableExpenses = Math.round(updatedProfile.variableExpenses * (1 - (event.addictionEffect.severityChange || 1) / 20));
      
      appliedEffects.addictionEffect = -(event.addictionEffect.severityChange || 1);
    }
  }
  
  // Applicare effetti sullo status sociale
  if (event.socialStatusEffect) {
    const statusLevels: SocialStatus[] = [
      'indigente', 'povero', 'classe media-bassa', 'classe media', 
      'benestante', 'ricco', 'elite'
    ];
    
    const currentIndex = statusLevels.indexOf(updatedProfile.socialStatus);
    
    if (event.socialStatusEffect.type === 'improve' && currentIndex < statusLevels.length - 1) {
      // Miglioramento dello status sociale
      const newIndex = currentIndex + 1;
      const newStatus = event.socialStatusEffect.newStatus || statusLevels[newIndex];
      
      updatedProfile.socialStatus = newStatus;
      
      // Adegua il reddito e le spese
      updatedProfile.weeklyIncome = Math.round(updatedProfile.weeklyIncome * 1.2);
      updatedProfile.fixedExpenses = Math.round(updatedProfile.fixedExpenses * 1.15);
      
      appliedEffects.socialEffect = `Miglioramento a ${newStatus}`;
    }
    else if (event.socialStatusEffect.type === 'worsen' && currentIndex > 0) {
      // Peggioramento dello status sociale
      const newIndex = currentIndex - 1;
      const newStatus = event.socialStatusEffect.newStatus || statusLevels[newIndex];
      
      updatedProfile.socialStatus = newStatus;
      
      // Adegua il reddito e le spese
      updatedProfile.weeklyIncome = Math.round(updatedProfile.weeklyIncome * 0.8);
      updatedProfile.fixedExpenses = Math.round(updatedProfile.fixedExpenses * 0.9);
      
      appliedEffects.socialEffect = `Declassamento a ${newStatus}`;
    }
  }
  
  // Applicare effetti sull'occupazione
  if (event.employmentEffect) {
    if (event.employmentEffect.type === 'lose') {
      // Perdita del lavoro
      updatedProfile.employment = event.employmentEffect.newEmployment || 'disoccupato';
      
      // Riduzione drastica del reddito
      updatedProfile.weeklyIncome = Math.round(updatedProfile.weeklyIncome * 0.3);
      
      // Event già registrato tramite lifeEvents
    }
    else if (event.employmentEffect.type === 'improve') {
      // Miglioramento dell'occupazione
      if (updatedProfile.employment === 'disoccupato') {
        updatedProfile.employment = 'part-time';
      } else if (updatedProfile.employment === 'part-time') {
        updatedProfile.employment = 'impiego fisso';
      } else if (updatedProfile.employment === 'precario') {
        updatedProfile.employment = 'part-time';
      } else if (updatedProfile.employment === 'impiego fisso') {
        updatedProfile.employment = 'libero professionista';
      }
      
      // Aumento del reddito
      updatedProfile.weeklyIncome = Math.round(updatedProfile.weeklyIncome * 1.3);
      
      // Event già registrato tramite lifeEvents
    }
    else if (event.employmentEffect.type === 'new') {
      // Nuovo lavoro
      updatedProfile.employment = event.employmentEffect.newEmployment || 'part-time';
      
      // Impostazione del reddito in base al nuovo impiego
      if (updatedProfile.employment === 'part-time') {
        updatedProfile.weeklyIncome = 250;
      } else if (updatedProfile.employment === 'impiego fisso') {
        updatedProfile.weeklyIncome = 400;
      } else if (updatedProfile.employment === 'libero professionista') {
        updatedProfile.weeklyIncome = 500;
      }
      
      // Event già registrato tramite lifeEvents
    }
  }
  
  // Applicare effetti sullo stato civile
  if (event.maritalStatusEffect) {
    updatedProfile.maritalStatus = event.maritalStatusEffect.newStatus;
    // Event già registrato tramite lifeEvents
  }
  
  // Aggiungere eventi di vita significativi
  if (event.lifeEvents && event.lifeEvents.length > 0) {
    if (!updatedProfile.lifeEvents) {
      updatedProfile.lifeEvents = [];
    }
    
    updatedProfile.lifeEvents = [...updatedProfile.lifeEvents, ...event.lifeEvents];
    appliedEffects.lifeEvents = event.lifeEvents;
  }
  
  return { updatedProfile, appliedEffects };
}

// Costante per controllare la probabilità complessiva che si verifichi un evento
export const EVENT_OCCURRENCE_PROBABILITY = 40; // 40% di probabilità che si verifichi un evento

// Funzione per determinare se un evento deve verificarsi
export function shouldEventOccur(): boolean {
  return Math.random() * 100 <= EVENT_OCCURRENCE_PROBABILITY;
}

// Funzione per determinare se un evento di sogno deve verificarsi
export const DREAM_EVENT_PROBABILITY = 15; // 15% di probabilità che si verifichi un evento di sogno

export function shouldDreamEventOccur(): boolean {
  return Math.random() * 100 <= DREAM_EVENT_PROBABILITY;
}

// Funzione per generare un evento basato sullo stato attuale del giocatore
export function generateTargetedEvent(profile: PlayerProfile): GameEvent | null {
  // Verifichiamo lo stato attuale del giocatore per generare eventi mirati
  
  // Giocatore con dipendenza dal gioco
  if (profile.addiction === 'gioco' && profile.addictionSeverity > 5 && Math.random() < 0.7) {
    const gamblingEvents = [
      ...specialEvents.filter(e => e.id === 'gambling_support_group'),
      ...negativeEvents.filter(e => e.id === 'worsening_addiction'),
      ...dreamEvents.filter(e => e.id === 'dream_addiction'),
      createGameEvent({
        id: 'intervention',
        title: 'Intervento familiare',
        description: 'La tua famiglia ha organizzato un intervento per la tua dipendenza dal gioco. Sono preoccupati per te.',
        probability: 10,
        specialType: 'social',
        karmaEffect: 1,
        addictionEffect: {
          type: 'improve',
          severityChange: 2
        },
        lifeEvents: ['Intervento familiare per la dipendenza dal gioco']
      })
    ];

    // Filtriamo quelli disponibili secondo le condizioni
    const availableEvents = gamblingEvents.filter(e => !e.condition || e.condition(profile));
    
    if (availableEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableEvents.length);
      return availableEvents[randomIndex];
    }
  }
  
  // Giocatore con debiti elevati
  if ((profile.debt === 'grande' || profile.debt === 'schiacciante') && Math.random() < 0.6) {
    const debtEvents = [
      ...specialEvents.filter(e => e.id === 'debt_collector'),
      ...specialEvents.filter(e => e.id === 'loan_shark'),
      ...negativeEvents.filter(e => e.id === 'increased_debt' || e.id === 'crushing_debt'),
      ...dreamEvents.filter(e => e.id === 'dream_financial_ruin'),
      createGameEvent({
        id: 'debt_restructuring',
        title: 'Ristrutturazione del debito',
        description: 'La banca ti ha offerto un piano di ristrutturazione del debito. Non è ideale, ma è meglio di niente.',
        probability: 10,
        specialType: 'economic',
        debtEffect: {
          type: 'decrease',
          amount: 'medio'
        },
        lifeEvents: ['Ristrutturazione del debito con la banca']
      })
    ];

    // Filtriamo quelli disponibili secondo le condizioni
    const availableEvents = debtEvents.filter(e => !e.condition || e.condition(profile));
    
    if (availableEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableEvents.length);
      return availableEvents[randomIndex];
    }
  }
  
  // Giocatore con problemi di salute
  if (profile.healthIssues && profile.healthIssues.length > 0 && profile.healthIssues[0] !== "Nessuno" && Math.random() < 0.5) {
    const healthEvents = [
      ...positiveEvents.filter(e => e.id === 'health_improvement'),
      ...negativeEvents.filter(e => e.id === 'health_deterioration'),
      ...dreamEvents.filter(e => e.id === 'dream_health_warning'),
      createGameEvent({
        id: 'new_treatment',
        title: 'Nuova terapia',
        description: 'Il medico ti ha proposto una nuova terapia per il tuo problema di salute. Costa di più, ma potrebbe essere più efficace.',
        probability: 10,
        specialType: 'health',
        moneyEffect: -150,
        healthEffect: {
          type: 'improve'
        },
        lifeEvents: ['Iniziato una nuova terapia medica']
      })
    ];

    // Filtriamo quelli disponibili secondo le condizioni
    const availableEvents = healthEvents.filter(e => !e.condition || e.condition(profile));
    
    if (availableEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableEvents.length);
      return availableEvents[randomIndex];
    }
  }
  
  // Giocatore disoccupato
  if (profile.employment === 'disoccupato' && Math.random() < 0.4) {
    const jobEvents = [
      ...positiveEvents.filter(e => e.id === 'new_job'),
      createGameEvent({
        id: 'job_interview',
        title: 'Colloquio di lavoro',
        description: 'Hai finalmente ottenuto un colloquio di lavoro dopo mesi di ricerca. Speri che vada bene.',
        probability: 10,
        specialType: 'economic',
        lifeEvents: ['Partecipato a un colloquio di lavoro']
      }),
      createGameEvent({
        id: 'unemployment_benefits',
        title: 'Sussidio di disoccupazione',
        description: 'Hai ottenuto un sussidio di disoccupazione. Non è molto, ma ti aiuterà a sopravvivere per un po\'.',
        probability: 10,
        specialType: 'economic',
        moneyEffect: 120,
        lifeEvents: ['Ottenuto sussidio di disoccupazione']
      })
    ];

    // Filtriamo quelli disponibili secondo le condizioni
    const availableEvents = jobEvents.filter(e => !e.condition || e.condition(profile));
    
    if (availableEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableEvents.length);
      return availableEvents[randomIndex];
    }
  }
  
  // Giocatore con molte giocate e poche vincite
  if (profile.playedTickets > 20 && profile.moneyWon < profile.moneySpent * 0.2 && Math.random() < 0.3) {
    return createGameEvent({
      id: 'gambling_reflection',
      title: 'Momento di riflessione',
      description: 'Guardando quanto hai speso in biglietti della lotteria rispetto a quanto hai vinto, ti chiedi se ne valga davvero la pena.',
      probability: 10,
      specialType: 'regular',
      karmaEffect: 1,
      lifeEvents: ['Momento di riflessione sulle abitudini di gioco']
    });
  }
  
  // Se non abbiamo generato eventi mirati, torniamo null e si userà getRandomEvent
  return null;
}