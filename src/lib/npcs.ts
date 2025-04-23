import { format, getDay, getDate } from 'date-fns';

// Tipi per il sistema di dialogo
export interface DialogueOption {
  text: string;
  response?: string;
  karmaEffect?: number;
  nextDialogue?: Dialogue;
}

export interface Dialogue {
  text: string;
  options: DialogueOption[];
}

export interface NPC {
  id: string;
  name: string;
  title: string;
  avatar: string;
  dialogue: Dialogue;
}

// Lista di NPC disponibili
const NPCs: NPC[] = [
  {
    id: 'cassiera-stanca',
    name: 'Cassiera stanca',
    title: 'Cassiera stanca',
    avatar: '/images/cassiera-stanca.png',
    dialogue: {
      text: "Sì, buongiorno... *sospiro* Vuole giocare i soliti numeri o ha deciso di buttare i suoi soldi in modo diverso oggi?",
      options: [
        {
          text: "Buongiorno! Oggi mi sento fortunato, penso che vincerò!",
          response: "*alza gli occhi al cielo* Certo, come tutti gli altri 20 milioni di italiani che giocano. Sa quante volte ho sentito questa frase? Comunque, buona fortuna... ne avrà bisogno.",
          karmaEffect: -1
        },
        {
          text: "In realtà so che le probabilità sono bassissime, gioco solo per divertimento.",
          response: "*accenna un sorriso* Finalmente qualcuno con i piedi per terra. Sa, lei è il primo oggi che non mi racconta di sogni premonitori o numeri 'sicuri'. Quasi quasi mi sta simpatico.",
          karmaEffect: 2
        },
        {
          text: "Mi scusi, sembra stanca. Giornata pesante?",
          response: "*sorpresa* Oh... grazie per chiedermelo. Sì, sono in piedi dalle 5 e ho ancora 4 ore di turno. Sa, ho due figli e un mutuo, e questo lavoro... beh, non è esattamente quello che sognavo da bambina.",
          karmaEffect: 1
        }
      ]
    }
  },
  {
    id: 'amico-derisore',
    name: 'Marco',
    title: 'Amico che ti deride',
    avatar: '/images/amico-che-ti-deride.png',
    dialogue: {
      text: "Ehi, guarda chi si vede! Ancora a giocare al lotto? *ride* Quanti milioni hai vinto questa settimana?",
      options: [
        {
          text: "Ridi pure, ma quando vincerò il jackpot non ti darò neanche un centesimo!",
          response: "*ride più forte* Certo, certo! E io diventerò astronauta la prossima settimana! Senti, le probabilità di vincere sono tipo una su seicento milioni. Hai più possibilità di essere colpito da un meteorite mentre vieni morso da uno squalo!",
          karmaEffect: -1
        },
        {
          text: "Lo so che è stupido, ma mi diverto e spendo poco. Qual è il problema?",
          response: "*si fa più serio* Beh, se la metti così... Finché non diventa un'ossessione e tieni sotto controllo quanto spendi, suppongo che non ci sia niente di male. Ma conosco gente che ci ha perso casa e famiglia.",
          karmaEffect: 1
        },
        {
          text: "*Ignoralo e cambia argomento* Piuttosto, hai visto la partita ieri?",
          response: "*sorride maliziosamente* Ah, tocco un nervo scoperto, eh? Va bene, va bene... Sì, la partita. Un disastro, come la tua strategia al lotto! *ride e ti dà una pacca sulla spalla*",
          karmaEffect: 0
        }
      ]
    }
  },
  {
    id: 'don-gennaro',
    name: 'Don Gennaro',
    title: 'Il pensionato filosofo',
    avatar: '/images/don-gennaro.png',
    dialogue: {
      text: "Il 47 è venuto a trovarmi stanotte. Mi ha chiesto un caffè. Poi abbiamo discusso del senso della vita.",
      options: [
        {
          text: "E il 6? L'hai mai visto?",
          response: "*guarda verso l'infinito* Il 6... è un numero timido. Si nasconde. Viene solo quando non lo cerchi. Come la felicità, o un parcheggio in centro.",
          karmaEffect: 0
        },
        {
          text: "Senti... ma li giochi sempre gli stessi?",
          response: "Cambiare? E perché? I numeri hanno sentimenti. Se li tradisci, se ne ricordano. Il 22 non mi parla più dal 1986. Gli ho preferito il 23 per l'anniversario di matrimonio.",
          karmaEffect: 1
        },
        {
          text: "Secondo me sei solo ubriaco.",
          response: "*sorride enigmaticamente* L'alcol è la porta, i numeri sono le chiavi. Tu sei ancora fuori, io sono entrato da tempo. *sorseggia da un thermos sospetto*",
          karmaEffect: -1
        }
      ]
    }
  },
  {
    id: 'uomo-giacca',
    name: "L'Uomo in Giacca",
    title: 'Il vincitore rovinato',
    avatar: '/images/uomo-in-giacca.png',
    dialogue: {
      text: "Ho fatto 6. Adesso vivo in un box auto con mia cugina. La fortuna è un'illusione con la cravatta.",
      options: [
        {
          text: "Ma hai ancora i numeri?",
          response: "*ride amaramente* I numeri? I numeri mi hanno tradito. Come mia moglie, il mio commercialista e il mio cane. Almeno il cane ha avuto la decenza di abbaiare prima di mordermi.",
          karmaEffect: 0
        },
        {
          text: "Se vinco io, sparisco.",
          response: "*ti guarda con pietà* Sparire? Credi sia così facile? La gente ti trova. Sempre. Il tuo zio morto da 15 anni resuscita per chiederti prestiti. Anche i tuoi organi interni ti chiedono soldi.",
          karmaEffect: 1
        },
        {
          text: "Fammi un bonifico e ne parliamo.",
          response: "*estrae un portafogli vuoto* Vuoi un bonifico? Ti cedo volentieri il mio debito con Equitalia. O preferisci le lettere di mio figlio che non vedo da quando ha scoperto che ho perso tutto su un'app di poker?",
          karmaEffect: -2
        }
      ]
    }
  },
  {
    id: 'commessa-diffidente',
    name: 'La Commessa',
    title: 'Diffidente cronica',
    avatar: '/placeholder.svg',
    dialogue: {
      text: "Ah, sei di nuovo tu. *sospira teatralmente* Che ci fai ancora qui? Pensi davvero che oggi cambierà qualcosa?",
      options: [
        {
          text: "Almeno stavolta sorridi.",
          response: "*accenna un sorriso forzato* Ecco, contento? Ho sorriso. Aggiungilo ai tuoi piccoli traguardi quotidiani, insieme a 'non ho vinto al lotto neanche oggi'. *timbra rumorosamente la schedina*",
          karmaEffect: -1
        },
        {
          text: "Anche tu ci credi in fondo.",
          response: "*abbassa la voce* Senti, io gioco da più tempo di te. Ho vinto 50 euro una volta nel 2011. Ho comprato una pianta. È morta dopo tre giorni. Questa è la verità sul SPRNLTT.",
          karmaEffect: 2
        },
        {
          text: "Va' a lavorare davvero, dai.",
          response: "*indica con lo sguardo il direttore* Credi che non vorrei? Questa è una prigione con aria condizionata e pensione. Mi laureo in lettere per questo? Per stampare sogni a gente disperata? *stampa la schedina con violenza*",
          karmaEffect: 0
        }
      ]
    }
  },
  {
    id: 'bambino-bendato',
    name: 'Il Bambino Bendato',
    title: 'Entità onirica',
    avatar: '/images/bambino-bendato.png',
    dialogue: {
      text: "Quaranta... e otto... morti che parlano. *fluttua leggermente* Tre galline, una luna, tuo zio con la valigia che corre.",
      options: [
        {
          text: "Cosa vuoi da me?",
          response: "*inclina la testa* Quello che la carta vuole dalla penna. Quello che il 27 vuole dal 90. *sussurra* Il tuo futuro è un numero dispari diviso per le tue paure. Calcola e gioca.",
          karmaEffect: 0
        },
        {
          text: "Dammi i numeri.",
          response: "*ride come un vecchio* I numeri sono già tuoi. Li porti come cicatrici invisibili. *indica* Il 16 è nel tuo orecchio sinistro. Il 42 sotto la lingua. Il 67 aspetta nel tuo portafogli, nascosto tra gli scontrini.",
          karmaEffect: 1
        },
        {
          text: "Torna nel mio sogno, ma portati una schedina.",
          response: "*svanisce lentamente* I sogni sono schedine già compilate. *voce distante* Cerca il 73... è caduto sotto il letto insieme alle tue speranze e a quella penna che non trovi più...",
          karmaEffect: -1
        }
      ]
    }
  },
  {
    id: 'vedova-numeri',
    name: 'La Vedova',
    title: 'Custode di numeri',
    avatar: '/placeholder.svg',
    dialogue: {
      text: "Mio marito giocava sempre 8-15-37-42-56-71. Poi è morto. Sei venuto a rubarmi i suoi numeri, vero? *stringe la borsetta*",
      options: [
        {
          text: "Mi dispiace per la sua perdita.",
          response: "*ammorbidisce lo sguardo* Grazie. È morto giocando. Infarto mentre controllavano l'estrazione. Non ha vinto nulla. Neanche nel momento più drammatico della sua vita è stato fortunato.",
          karmaEffect: 2
        },
        {
          text: "Funzionano questi numeri?",
          response: "*ride amaramente* In 47 anni, ha vinto 12 euro. Li ha spesi per comprarmi dei fiori appassiti. Però diceva che i numeri erano 'quasi maturi'. Come le banane. O la sua prostata.",
          karmaEffect: -1
        },
        {
          text: "Ha provato a giocarli al contrario?",
          response: "*ti guarda intensamente* Al contrario? *pausa* Interessante. Non ci ha mai pensato. Forse è per questo che mi appare nei sogni e ripete solo 'gira, gira'. Pensavo parlasse della lavatrice.",
          karmaEffect: 1
        }
      ]
    }
  },
  {
    id: 'matematico-fallito',
    name: 'Il Professore',
    title: 'Matematico fallito',
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*scribacchia formule su un tovagliolo* Ho sviluppato un algoritmo perfetto. *sussurra* La probabilità è solo un'opinione. I numeri mi parlano.",
      options: [
        {
          text: "Questo algoritmo funziona?",
          response: "*ride nervosamente* Funziona? Ho perso la casa, la cattedra, la moglie e tre dita per congelamento dormendo in auto. Ma ho vinto 4 euro martedì scorso. Un ritorno sull'investimento del -99.998%. Magnifico, no?",
          karmaEffect: 0
        },
        {
          text: "Mi sveli il suo segreto?",
          response: "*si guarda intorno paranoico* Il segreto è... *abbassa la voce* ignorare completamente le leggi della matematica. *torna normale* Funziona sempre, tranne quando non funziona. Che è sempre.",
          karmaEffect: 1
        },
        {
          text: "Lei è pazzo.",
          response: "*sorride sereno* La pazzia è relativa. Einstein era pazzo. Io sono... *conta sulle dita ma si confonde* sono statisticamente in linea con le aspettative di un sistema caotico basato su premesse illogiche. Come il fisco italiano.",
          karmaEffect: -1
        }
      ]
    }
  },
  {
    id: 'vecchio-bar',
    name: 'Il Vecchio',
    title: 'Oracolo del bar',
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*fissa il caffè freddo* Ho giocato gli stessi numeri per 43 anni. Martedì sono usciti tutti. *pausa* Proprio il martedì che non ho giocato.",
      options: [
        {
          text: "Non ci credo.",
          response: "*tira fuori un ritaglio di giornale ingiallito* Ecco la prova. *il ritaglio mostra i numeri dell'estrazione* L'ho incorniciato. Lo tengo vicino al water. Mi aiuta con la digestione.",
          karmaEffect: 0
        },
        {
          text: "Che numeri erano?",
          response: "*sorride senza denti* Credi che te lo dica? Sono ancora i miei. La ruota gira. Torneranno. Io sarò morto, ma loro torneranno. È matematica. O forse teologia. Non ricordo la differenza.",
          karmaEffect: 1
        },
        {
          text: "E adesso che numeri giochi?",
          response: "*ride amaro* Gli stessi. Per dispetto. È come continuare a chiamare l'ex moglie che ti ha tradito. Sai che non tornerà, ma ti piace farti del male. Siamo fatti così, noi italiani.",
          karmaEffect: -1
        }
      ]
    }
  },
  {
    id: 'prete-confessionale',
    name: 'Don Salvatore',
    title: 'Prete del gioco',
    avatar: '/placeholder.svg',
    dialogue: {
      text: "Il gioco d'azzardo è peccato, figliolo. *abbassa la voce* Ma se vinci, il 10% alla chiesa come ringraziamento non sarebbe male.",
      options: [
        {
          text: "Anche lei gioca, Padre?",
          response: "*tossisce imbarazzato* La diocesi ha... investimenti diversificati. *si sistema il colletto* Diciamo che la Madonna a volte suggerisce numeri. A scopo benefico, naturalmente. Per i poveri. E il nuovo tetto della canonica.",
          karmaEffect: 1
        },
        {
          text: "Mi suggerisce dei numeri per la salvezza?",
          response: "*si guarda intorno* L'Apocalisse, Giovanni 13:18. Il numero è 666. *serio* Non giocarlo mai! Porta sfortuna! *sussurra* Prova 6-18-66. Funzionano meglio e sono teologicamente più ambigui.",
          karmaEffect: -1
        },
        {
          text: "Le confesso che ho speso l'elemosina in gratta e vinci.",
          response: "*sospira* Cinque Ave Maria, tre Padre Nostro e fammi vedere quel gratta e vinci. *estrae gli occhiali* Se hai vinto, metà a me per assolverti. Se hai perso... beh, il Signore punisce subito i peccatori.",
          karmaEffect: 0
        }
      ]
    }
  }
];

// Funzione per ottenere un NPC in base alla data
export function getNPCForDate(date: Date): NPC | null {
  // Usa il giorno del mese come indice per selezionare un NPC
  // In questo modo ogni giorno avrà un NPC diverso in modo deterministico
  const dayOfMonth = getDate(date);
  const npcIndex = dayOfMonth % NPCs.length;
  
  return NPCs[npcIndex];
}
