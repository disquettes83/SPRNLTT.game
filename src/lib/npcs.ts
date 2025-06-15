import { format, getDay, getDate } from 'date-fns';

// Tipi per il sistema di dialogo
export interface DialogueOption {
  text: string;
  response?: string;
  karmaEffect?: number;
  moneyEffect?: number;
  nextDialogue?: Dialogue;
  requirements?: {
    socialStatus?: string | string[];
    minKarma?: number;
    minBalance?: number;
    noAddictions?: boolean;
    maxDebt?: string;
  };
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
  socialStatus?: string;
}

// Lista di NPC disponibili
const NPCs: NPC[] = [
  {
    id: 'cassiera-stanca',
    name: 'Cassiera stanca',
    title: 'Cassiera stanca',
    avatar: '/images/cassiera-stanca.png',
    dialogue: {
      text: "Sì, buongiorno... Vuole giocare i soliti numeri o ha deciso di buttare i suoi soldi in modo diverso oggi?",
      options: [
        {
          text: "Buongiorno! Oggi mi sento fortunato, penso che vincerò!",
          response: "Certo, come tutti gli altri 20 milioni di italiani che giocano. Sa quante volte ho sentito questa frase? Comunque, buona fortuna... ne avrà bisogno.",
          karmaEffect: -1
        },
        {
          text: "In realtà so che le probabilità sono bassissime, gioco solo per divertimento.",
          response: "Finalmente qualcuno con i piedi per terra. Sa, lei è il primo oggi che non mi racconta di sogni premonitori o numeri 'sicuri'. Quasi quasi mi sta simpatico.",
          karmaEffect: 2
        },
        {
          text: "Mi scusi, sembra stanca. Giornata pesante?",
          response: "Oh... grazie per chiedermelo. Sì, sono in piedi dalle 5 e ho ancora 4 ore di turno. Sa, ho due figli e un mutuo, e questo lavoro... beh, non è esattamente quello che sognavo da bambina.",
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
      text: "Ehi, guarda chi si vede! Ancora a giocare al lotto? Quanti milioni hai vinto questa settimana?",
      options: [
        {
          text: "Ridi pure, ma quando vincerò il jackpot non ti darò neanche un centesimo!",
          response: "Certo, certo! E io diventerò astronauta la prossima settimana! Senti, le probabilità di vincere sono tipo una su seicento milioni. Hai più possibilità di essere colpito da un meteorite mentre vieni morso da uno squalo!",
          karmaEffect: -1
        },
        {
          text: "Lo so che è stupido, ma mi diverto e spendo poco. Qual è il problema?",
          response: "Beh, se la metti così... Finché non diventa un'ossessione e tieni sotto controllo quanto spendi, suppongo che non ci sia niente di male. Ma conosco gente che ci ha perso casa e famiglia.",
          karmaEffect: 1
        },
        {
          text: "Piuttosto, hai visto la partita ieri?",
          response: "Ah, tocco un nervo scoperto, eh? Va bene, va bene... Sì, la partita. Un disastro, come la tua strategia al lotto!",
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
          response: "Il 6... è un numero timido. Si nasconde. Viene solo quando non lo cerchi. Come la felicità, o un parcheggio in centro.",
          karmaEffect: 0
        },
        {
          text: "Senti... ma li giochi sempre gli stessi?",
          response: "Cambiare? E perché? I numeri hanno sentimenti. Se li tradisci, se ne ricordano. Il 22 non mi parla più dal 1986. Gli ho preferito il 23 per l'anniversario di matrimonio.",
          karmaEffect: 1
        },
        {
          text: "Secondo me sei solo ubriaco.",
          response: "L'alcol è la porta, i numeri sono le chiavi. Tu sei ancora fuori, io sono entrato da tempo. *sorseggia da un thermos sospetto*",
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
          response: "I numeri? I numeri mi hanno tradito. Come mia moglie, il mio commercialista e il mio cane. Almeno il cane ha avuto la decenza di abbaiare prima di mordermi.",
          karmaEffect: 0
        },
        {
          text: "Se vinco io, sparisco.",
          response: "Sparire? Credi sia così facile? La gente ti trova. Sempre. Il tuo zio morto da 15 anni resuscita per chiederti prestiti. Anche i tuoi organi interni ti chiedono soldi.",
          karmaEffect: 1
        },
        {
          text: "Fammi un bonifico e ne parliamo.",
          response: "Vuoi un bonifico? Ti cedo volentieri il mio debito con Equitalia. O preferisci le lettere di mio figlio che non vedo da quando ha scoperto che ho perso tutto su un'app di poker?",
          karmaEffect: -2
        }
      ]
    }
  },
  {
    id: 'commessa-diffidente',
    name: 'La Commessa',
    title: 'Diffidente cronica',
    avatar: '/images/la-commessa.png',
    dialogue: {
      text: "Ah, sei di nuovo tu. Che ci fai ancora qui? Pensi davvero che oggi cambierà qualcosa?",
      options: [
        {
          text: "Almeno stavolta sorridi.",
          response: "Ecco, contento? Ho sorriso. Aggiungilo ai tuoi piccoli traguardi quotidiani, insieme a 'non ho vinto al lotto neanche oggi'.",
          karmaEffect: -1
        },
        {
          text: "Anche tu ci credi in fondo.",
          response: "Senti, io gioco da più tempo di te. Ho vinto 50 euro una volta nel 2011. Ho comprato una pianta. È morta dopo tre giorni. Questa è la verità sul SPRNLTT.",
          karmaEffect: 2
        },
        {
          text: "Va' a lavorare davvero, dai.",
          response: "Credi che non vorrei? Questa è una prigione con aria condizionata e pensione. Mi laureo in lettere per questo? Per stampare sogni a gente disperata?",
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
      text: "Quaranta... e otto... morti che parlano. Tre galline, una luna, tuo zio con la valigia che corre.",
      options: [
        {
          text: "Cosa vuoi da me?",
          response: "Quello che la carta vuole dalla penna. Quello che il 27 vuole dal 90. Il tuo futuro è un numero dispari diviso per le tue paure. Calcola e gioca.",
          karmaEffect: 0
        },
        {
          text: "Dammi i numeri.",
          response: "I numeri sono già tuoi. Li porti come cicatrici invisibili. Il 16 è nel tuo orecchio sinistro. Il 42 sotto la lingua. Il 67 aspetta nel tuo portafogli, nascosto tra gli scontrini.",
          karmaEffect: 1
        },
        {
          text: "Torna nel mio sogno, ma portati una schedina.",
          response: "I sogni sono schedine già compilate. Cerca il 73... è caduto sotto il letto insieme alle tue speranze e a quella penna che non trovi più...",
          karmaEffect: -1
        }
      ]
    }
  },
  {
    id: 'vedova-numeri',
    name: 'La Vedova',
    title: 'Custode di numeri',
    avatar: '/images/la-vedova.png',
    dialogue: {
      text: "Mio marito giocava sempre 8-15-37-42-56-71. Poi è morto. Sei venuto a rubarmi i suoi numeri, vero?",
      options: [
        {
          text: "Mi dispiace per la sua perdita.",
          response: "Grazie. È morto giocando. Infarto mentre controllavano l'estrazione. Non ha vinto nulla. Neanche nel momento più drammatico della sua vita è stato fortunato.",
          karmaEffect: 2
        },
        {
          text: "Funzionano questi numeri?",
          response: "In 47 anni, ha vinto 12 euro. Li ha spesi per comprarmi dei fiori appassiti. Però diceva che i numeri erano 'quasi maturi'. Come le banane. O la sua prostata.",
          karmaEffect: -1
        },
        {
          text: "Ha provato a giocarli al contrario?",
          response: "Al contrario? Interessante. Non ci ha mai pensato. Forse è per questo che mi appare nei sogni e ripete solo 'gira, gira'. Pensavo parlasse della lavatrice.",
          karmaEffect: 1
        }
      ]
    }
  },
  {
    id: 'matematico-fallito',
    name: 'Il Professore',
    title: 'Matematico fallito',
    avatar: '/images/il-professore.png',
    dialogue: {
      text: "Ho sviluppato un algoritmo perfetto. La probabilità è solo un'opinione. I numeri mi parlano.",
      options: [
        {
          text: "Questo algoritmo funziona?",
          response: "Funziona? Ho perso la casa, la cattedra, la moglie e tre dita per congelamento dormendo in auto. Ma ho vinto 4 euro martedì scorso. Un ritorno sull'investimento del -99.998%. Magnifico, no?",
          karmaEffect: 0
        },
        {
          text: "Mi sveli il suo segreto?",
          response: "Il segreto è... ignorare completamente le leggi della matematica. Funziona sempre, tranne quando non funziona. Che è sempre.",
          karmaEffect: 1
        },
        {
          text: "Lei è pazzo.",
          response: "La pazzia è relativa. Einstein era pazzo. Io sono... sono statisticamente in linea con le aspettative di un sistema caotico basato su premesse illogiche. Come il fisco.",
          karmaEffect: -1
        }
      ]
    }
  },
  {
    id: 'vecchio-bar',
    name: 'Il Vecchio',
    title: 'Oracolo del bar',
    avatar: '/images/il-vecchio.png',
    dialogue: {
      text: "Ho giocato gli stessi numeri per 43 anni. Martedì sono usciti tutti. Proprio il martedì che non ho giocato.",
      options: [
        {
          text: "Non ci credo.",
          response: "Ecco la prova. L'ho incorniciato. Lo tengo vicino al water. Mi aiuta con la digestione.",
          karmaEffect: 0
        },
        {
          text: "Che numeri erano?",
          response: "Credi che te lo dica? Sono ancora i miei. La ruota gira. Torneranno. Io sarò morto, ma loro torneranno. È matematica. O forse teologia. Non ricordo la differenza.",
          karmaEffect: 1
        },
        {
          text: "E adesso che numeri giochi?",
          response: "Gli stessi. Per dispetto. È come continuare a chiamare l'ex moglie che ti ha tradito. Sai che non tornerà, ma ti piace farti del male. Siamo fatti così.",
          karmaEffect: -1
        }
      ]
    }
  },
  {
    id: 'prete-confessionale',
    name: 'Don Salvatore',
    title: 'Prete del gioco',
    avatar: '/images/don-salvatore.png',
    dialogue: {
      text: "Il gioco d'azzardo è peccato, figliolo. Ma se vinci, il 10% alla chiesa come ringraziamento non sarebbe male.",
      options: [
        {
          text: "Anche lei gioca, Padre?",
          response: "La diocesi ha... investimenti diversificati. Diciamo che la Madonna a volte suggerisce numeri. A scopo benefico, naturalmente. Per i poveri. E il nuovo tetto della canonica.",
          karmaEffect: 1
        },
        {
          text: "Mi suggerisce dei numeri per la salvezza?",
          response: "L'Apocalisse, Giovanni 13:18. Il numero è 666. Non giocarlo mai! Porta sfortuna! Prova 6-18-66. Funzionano meglio e sono teologicamente più ambigui.",
          karmaEffect: -1
        },
        {
          text: "Le confesso che ho speso l'elemosina in gratta e vinci.",
          response: "Cinque Ave Maria, tre Padre Nostro e fammi vedere quel gratta e vinci. Se hai vinto, metà a me per assolverti. Se hai perso... beh, il Signore punisce subito i peccatori.",
          karmaEffect: 0
        }
      ]
    }
  },
  {
    id: 'notaio-ansioso',
    name: 'Dr. Anselmi',
    title: 'Notaio con tic nervoso',
    avatar: '/images/dr-anselmi.png',
    dialogue: {
      text: "Ho quattro minuti e trentasette secondi prima di tornare in studio. Devo giocare questi numeri o perdo l'occasione della vita.",
      options: [
        {
          text: "Perché ha così fretta?",
          response: "Fretta? Non ho fretta. Ho calcolato precisamente che posso perdere sei minuti ogni giorno per giocare. Non uno di più. Vede? Ogni momento della mia vita è schedulato con precisione assoluta. Tranne quando devo fare la cacca, quello è imprevedibile.",
          karmaEffect: 1,
          moneyEffect: 5
        },
        {
          text: "Le consiglio di rilassarsi un po'.",
          response: "Rilassarmi? L'ultima volta che mi sono rilassato era il 1998. Ho perso 12 minuti e ho dovuto rimandare il matrimonio. Mia moglie ancora me lo rinfaccia. E ora ho perso... ...ventidue secondi a parlare con lei!",
          karmaEffect: 0
        },
        {
          text: "Mi faccia vedere questi numeri 'fortunati'.",
          response: "Sono i numeri basati sulle occorrenze statistiche, modificati dagli indicatori lunari, divisi per il tasso di umidità e moltiplicati per il numero di piccioni che ho visto stamattina. Matematica pura. Non posso sbagliare.",
          karmaEffect: -1,
          requirements: {
            minKarma: 4
          }
        }
      ]
    },
    socialStatus: 'benestante'
  },
  {
    id: 'influencer-fallita',
    name: 'Vanessa',
    title: 'Ex-influencer disperata',
    avatar: '/images/vanessa.png',
    dialogue: {
      text: "No, credimi, questa volta ho la combinazione giusta! Devo solo convincere qualcuno a prestarmi venti euro... Ehi, ciao! Ti stavo proprio cercando!",
      options: [
        {
          text: "Non ci conosciamo.",
          response: "Dettagli! Sai chi sono, vero? Vanessa, 200.000 follower! Beh, erano 200.000. Prima che il mio ex mi cancellasse l'account per vendetta. Comunque, potresti prestarmi venti euro? Ti taggo nella storia quando vinco, promesso!",
          karmaEffect: 0
        },
        {
          text: "Ecco venti euro, ma non aspettarti nulla in cambio.",
          response: "Grazie! Sei un tesoro! Ciao followers! Guardate chi ho incontrato oggi, il mio angelo custode! *sussurra* Come ti chiami? *non aspetta la risposta* Vi presento... uhm, il mio nuovo BFF! E ora andiamo a vincere milioni!",
          karmaEffect: 2,
          moneyEffect: -20
        },
        {
          text: "Lavorare no?",
          response: "Lavorare? Io lavoro durissimo! Sai quanto è difficile mantenere un profilo di lifestyle quando vivi in un monolocale con tre coinquilini e mangi pasta in bianco? La gente pensa che sia facile, ma devo truccarmi per ore solo per far credere che non sto piangendo! Il mio ultimo sponsor è stato un negozio di detersivi sfusi!",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'povero'
  },
  {
    id: 'signora-gatti',
    name: 'Signora Gattoni',
    title: 'Gattara superstiziosa',
    avatar: '/images/signora-gattoni.png',
    dialogue: {
      text: "I miei gatti hanno predetto l'estrazione di stasera. *ti mostra una foto con 17 gatti* Vedi come sono disposti? È un segno!",
      options: [
        {
          text: "Non credo che i gatti possano predire numeri.",
          response: "I miei gatti non sono normali! Morgana è la reincarnazione di mia nonna, e nonna aveva vinto tre volte al lotto! E Fufi? Fufi è nato durante un'eclissi con sette dita per zampa. Coincidenza? Non credo proprio!",
          karmaEffect: -1
        },
        {
          text: "Quali numeri suggeriscono i suoi gatti?",
          response: "Non posso dirtelo così... Ma per 5 euro ti vendo questo talismano di pelo di gatto. Se lo metti sotto il cuscino, i numeri ti appariranno in sogno. Funziona solo se hai almeno tre calzini spaiati nel cassetto.",
          karmaEffect: 0,
          moneyEffect: -5,
          requirements: {
            minBalance: 5
          }
        },
        {
          text: "Quanti gatti ha in totale?",
          response: "Beh, dipende da cosa intendi per 'avere'. Se parliamo di quelli che vivono in casa, sono 23. Se contiamo quelli del giardino, 41. Poi ci sono i gatti astrali che mi visitano durante la meditazione, e i gatti delle vite passate che mi seguono. In totale saranno... ...tanti! I numeri sono importanti, sai?",
          karmaEffect: 1
        }
      ]
    },
    socialStatus: 'classe media'
  },
  {
    id: 'avvocato-divorzista',
    name: 'Avv. Separati',
    title: 'Avvocato divorzista entusiasta',
    avatar: '/images/avvocato.png',
    dialogue: {
      text: "Gioca al lotto? Perfetto! Io sono specializzato in divorzi causati dal gioco d'azzardo. Il 68% dei miei clienti ha perso famiglia e casa per colpa di una schedina!",
      options: [
        {
          text: "Non sono sposato.",
          response: "Ancora meglio! Può giocare quanto vuole senza rischiare di perdere metà della casa! Ma se dovesse incontrare qualcuno, mi tenga presente. Offro un pacchetto 'fidanzamento-matrimonio-divorzio' a prezzo fisso. Sa, prevenire è meglio che curare!",
          karmaEffect: 0
        },
        {
          text: "Mi sembra un po' cinico il suo approccio.",
          response: "Cinico? Sono un realista! In vent'anni di carriera ho visto di tutto. Case vendute di nascosto, nonni che ipotecano la pensione, madri che vendono l'auto del figlio... La gente impazzisce per una sestina! Io offro solo un servizio... inevitabile.",
          karmaEffect: 1
        },
        {
          text: "Ma lei gioca?",
          response: "Io? Mai! Conosco troppo bene i rischi. Però investo in ricevitorie. Tre nel quartiere sono mie. L'unico modo per vincere al gioco è possedere il banco, lo sanno tutti. Il mio prossimo investimento? Un'agenzia immobiliare specializzata in case pignorate!",
          karmaEffect: -1,
          moneyEffect: 10,
          requirements: {
            minKarma: 3
          }
        }
      ]
    },
    socialStatus: 'ricco'
  },
  {
    id: 'gemelli-identici',
    name: 'Gemelli Speculari',
    title: 'Scommettitori sincroni',
    avatar: '/images/gemelli.png',
    dialogue: {
      text: "Noi giochiamo sempre gli stessi numeri ma al contrario l'uno dall'altro. *il primo gemello* Io gioco 13, 27, 38... *il secondo gemello* E io 31, 72, 83...",
      options: [
        {
          text: "E funziona questa strategia?",
          response: "Mai - vinto - nulla - insieme. *primo gemello* Ma la probabilità che vinciamo entrambi... *secondo gemello* ...è così bassa che se succedesse... *insieme* L'universo collasserebbe!",
          karmaEffect: 0
        },
        {
          text: "Come fate a essere così coordinati?",
          response: "*il primo gemello* Non siamo coordinati... *il secondo gemello* ...siamo mentalmente connessi. *primo gemello* Dividiamo tutto... *secondo gemello* ...anche le perdite al lotto. *insieme* Anche il nostro conto in banca è in negativo speculare! *si danno il cinque*",
          karmaEffect: 1
        },
        {
          text: "Mi sembrate due idioti.",
          response: "*il primo gemello diventa rosso* Come - osi - insultarci? *il secondo gemello sorride* Io - invece - apprezzo - la tua - sincerità. *si guardano confusi* *primo gemello* Abbiamo opinioni diverse? *secondo gemello, scioccato* Impossibile! *il primo sviene mentre il secondo lo guarda perplesso* Strano, di solito svengo io.",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media-bassa'
  },
  {
    id: 'commercialista-disperato',
    name: 'Dott. Evasori',
    title: 'Commercialista al limite',
    avatar: '/images/commercialista.png',
    dialogue: {
      text: "Devo vincere oggi. DEVO. Ho ventisette minuti prima che la Guardia di Finanza trovi le cartelle che ho perso.",
      options: [
        {
          text: "Posso aiutarla in qualche modo?",
          response: "Sì! Hai un jet privato e un passaporto falso? Sto scherzando! *abbassa la voce* Non sto scherzando. Diciamo che ho... ottimizzato troppo alcuni bilanci. Chi poteva immaginare che 17 società offshore a nome del mio gatto dessero nell'occhio?",
          karmaEffect: 1
        },
        {
          text: "Forse dovrebbe costituirsi.",
          response: "Costituirmi? Mmm, interessante strategia... 'Confessare prima che scoprano tutto...' Ma se vinco al lotto posso ripagare tutto e fuggire alle Maldive prima del processo! Mi servono solo... sette milioni e quattro euro!",
          karmaEffect: 0
        },
        {
          text: "Mi faccia vedere i numeri che gioca.",
          response: "No! Sono i numeri perfetti! Li ho calcolati in base alle mie dichiarazioni dei redditi degli ultimi 10 anni. Il trucco è sottrarre il reddito dichiarato da quello reale, dividere per il numero di società fantasma e aggiungere l'età del mio gatto. Matematica creativa!",
          karmaEffect: -1,
          moneyEffect: -5,
          requirements: {
            minBalance: 5
          }
        }
      ]
    },
    socialStatus: 'benestante'
  },
  {
    id: 'nonna-intuitiva',
    name: 'Nonna Fortuna',
    title: 'Anziana dalle premonizioni',
    avatar: '/images/nonna.png',
    dialogue: {
      text: "Tu hai bisogno di giocare 17, 22 e 44. Li vedo chiaramente sopra la tua testa. E un po' di 8, ma solo il martedì.",
      options: [
        {
          text: "Come fa a saperlo?",
          response: "Quando arrivi alla mia età, vedi cose che gli altri non vedono. *indica il suo occhio* Questo ha la cataratta, ma vede i numeri fortunati. *indica l'altro* Questo vede il futuro, ma solo fino a mercoledì. Giovedì è sempre una sorpresa.",
          karmaEffect: 1
        },
        {
          text: "Lei ha mai vinto?",
          response: "Oh, certo! Nel '68 ho vinto abbastanza per comprare quella che ora è diventata la casa di riposo dove vivo. Non lo sanno, credono che sia dello Stato. Quando morirò la lascerò a mio nipote. O al gatto. Dipende da chi mi viene a trovare più spesso questo mese.",
          karmaEffect: 0,
          moneyEffect: 5
        },
        {
          text: "I suoi numeri sembrano casuali.",
          response: "Casuali? *si fa il segno della croce* Ogni numero ha un significato! Il 17 è tuo padre che non ti parla da tre mesi. Il 22 è quel debito che fingi di aver dimenticato. E il 44? Il 44 è quella cosa che hai fatto nel 2018 e speri che nessuno scopra mai! Indovinato, vero?",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media'
  },
  {
    id: 'imprenditore-fallito',
    name: 'Ex CEO',
    title: 'Startup master rovinato',
    avatar: '/images/ceo.png',
    dialogue: {
      text: "Sto per lanciare una ICO basata sulla blockchain del lotto. Cerco investitori visionari.",
      options: [
        {
          text: "Mi spieghi di più di questa... blockchain del lotto?",
          response: "È rivoluzionario! Immagina: ogni numero estratto diventa un token non fungibile, un LottoCoin! Usiamo algoritmi di machine learning per prevedere le estrazioni future basandoci su big data raccolti da sogni e premonizioni degli utenti! Ho già bruciato tre startup e la fiducia di mia moglie, ma questa è la volta buona!",
          karmaEffect: 0
        },
        {
          text: "Non sembra una truffa?",
          response: "Truffa? È disruptive innovation! D'accordo, lo ammetto... Ho perso tutto con la mia ultima startup, 'UberForDogs - passeggiate per cani on demand'. Chi poteva immaginare che i cani non sanno usare le app? Ora devo fingere di avere ancora successo o mio padre mi costringerà a lavorare nel suo negozio di ferramenta.",
          karmaEffect: 2
        },
        {
          text: "Ti presto 50€ se la smetti di parlare.",
          response: "Cinquanta euro? Grazie per aver creduto nel progetto! Sei ufficialmente un angel investor! Ti garantisco un ROI del 10.000% entro... ...martedì prossimo! Ti manderò gli NFT per email!",
          karmaEffect: -1,
          moneyEffect: -50,
          requirements: {
            minBalance: 50
          }
        }
      ]
    },
    socialStatus: 'povero'
  },
  {
    id: 'sensitiva-metropolitana',
    name: 'Madame Astral',
    title: 'Medium del pendolare',
    avatar: '/images/medium.png',
    dialogue: {
      text: "Le stelle mi hanno svegliata alle 3:47 stanotte per dirti che devi giocare i numeri della tua anima. Il tuo spirito guida è inquieto!",
      options: [
        {
          text: "Come si chiamano questi spiriti guida?",
          response: "Mi connetto con l'aldilà... Il tuo spirito principale si chiama... Giorgino! Ti suona familiare? E c'è anche... Peppino! E... Franceschino! Tutti i tuoi spiriti guida hanno i nomi che finiscono in 'ino'. È un segno potentissimo!",
          karmaEffect: 0,
          moneyEffect: -2
        },
        {
          text: "Preferirei numeri basati su dati statistici.",
          response: "Statistiche? Le statistiche sono per chi non ha accesso alla conoscenza cosmica! Ma va bene, capisco, sei un tipo razionale. Anche l'universo ama i numeri. Ecco le mie statistiche spirituali: incrocio le fasi lunari con il numero di piccioni visti al mattino e il colore del semaforo quando starnutisco. Infallibile!",
          karmaEffect: 1
        },
        {
          text: "Lei ha vinto qualcosa con questi metodi?",
          response: "Ehm... i soldi sono energia. E l'energia non si crea né si distrugge, si trasforma. La mia vincita è la consapevolezza, il mio jackpot è l'illuminazione. E comunque non ho mai giocato perché i miei spiriti guida mi dicono sempre che vincerò 'la prossima volta'. Sono decenni che aspetto questa 'prossima volta'.",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media-bassa'
  },
  {
    id: 'pensionato-sistema',
    name: 'Ingegner Sistemi',
    title: 'Studioso di combinazioni',
    avatar: '/images/ingegnere.png',
    dialogue: {
      text: "Ho sviluppato un sistema infallibile basato su 47 anni di estrazioni. Guarda questi pattern! Non possono essere casuali!",
      options: [
        {
          text: "Quanto tempo ha dedicato a questi calcoli?",
          response: "Diciotto ore al giorno per quarantasette anni! Sono... ...tante ore! Ho perso due mogli, un figlio non mi parla più, e ho sviluppato una fusione vertebrale a forza di stare chino sui numeri. Ma ne è valsa la pena! Sono a un passo dal crackare il sistema. Lo so dal 1987.",
          karmaEffect: 2
        },
        {
          text: "Mi mostri questo sistema.",
          response: "Mmm, non dovrei... Va bene, ma solo un'anteprima. Vedi? Quando un numero esce tre volte in un anno, il suo simmetrico rispetto a 45 ha una probabilità del 0.0043% in più di uscire nei giorni di luna crescente, ma solo se il mese ha una 'r' nel nome! Mi offri un caffè e ti dico di più.",
          karmaEffect: 0,
          moneyEffect: -3,
          requirements: {
            minBalance: 3
          }
        },
        {
          text: "Il lotto è completamente casuale, sa?",
          response: "Casuale? CASUALE? È quello che VOGLIONO farti credere! L'uomo non è arrivato davvero sulla Luna, e il lotto non è casuale. Sai quante persone hanno provato a rubarmi le mie formule? Tre agenti dei servizi segreti, un matematico del MIT e il mio idraulico... Anche tu lavori per LORO, vero?",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media-bassa'
  },
  {
    id: 'studente-algoritmo',
    name: 'Hacker Kevin',
    title: 'Programmatore del caos',
    avatar: '/images/hacker.png',
    dialogue: {
      text: "Ho quasi finito di hackerare l'algoritmo del lotto. Con questo script Python posso prevedere il 43% delle estrazioni con una deviazione standard del 7%.",
      options: [
        {
          text: "Questo non è illegale?",
          response: "Illegale? Sto solo... analizzando dati pubblici! E poi ho mascherato il mio IP con sette proxy e un router modificato che passa attraverso il wifi della biblioteca comunale. In teoria sto solo facendo i compiti di statistica! Anche se la professoressa Bianchi non apprezza il mio genio e mi ha dato 4 all'ultimo compito.",
          karmaEffect: 0
        },
        {
          text: "Mi puoi mostrare i risultati?",
          response: "Mmm, è altamente sperimentale e... Oh no! Il programma dice che la combinazione vincente sarà 1, 2, 3, 4, 5, 6! Questo è impossibile! Ah, ho capito. Ho dimenticato di convertire la matrice di correlazione temporale. Dammi solo... tre o quattro mesi per aggiustare il bug.",
          karmaEffect: 1
        },
        {
          text: "Ti pago per i numeri di stasera.",
          response: "Davvero? Okay, l'algoritmo prevede per stasera... 8, 14, 22, 47, 53, 84. Ma ricorda, c'è un margine di errore del... ...98%. In pratica è quasi una certezza! PS: Con questi soldi mi compro Red Dead Redemption 3, non dirlo a mia madre.",
          karmaEffect: -1,
          moneyEffect: -20,
          requirements: {
            minBalance: 20
          }
        }
      ]
    },
    socialStatus: 'classe media'
  },
  {
    id: 'contadino-veggente',
    name: 'Zio Germano',
    title: 'Agricoltore sensitivo',
    avatar: '/images/contadino.png',
    dialogue: {
      text: "Le mie verdure parlano, sa? *accarezza una zucchina* Questa mi ha detto che oggi escono il 13 e il 42. Non mente mai. *annusa un pomodoro* Questo invece non dice niente di utile.",
      options: [
        {
          text: "Quali altre verdure le danno numeri?",
          response: "Le carote sono ottime per i numeri bassi, sotto il 30. I broccoli vedono il futuro ma sono pessimisti, predicono sempre numeri che non escono. Le melanzane sono le più precise, ma parlano solo di lunedì. Il problema è che le mangio sempre di domenica, non resisto. Mia moglie dice che è per questo che non vinco mai.",
          karmaEffect: 1
        },
        {
          text: "Posso comprare qualche sua verdura fortunata?",
          response: "Certo! Questa patata ha l'energia del 27, lo vedi questo bitorzolo? È la forma esatta della Sicilia! *sceglie un peperone* E questo ti darà il 64, garantito! Sono 15 euro. Mangia la patata solo dopo l'estrazione, altrimenti il numero cambia.",
          karmaEffect: 0,
          moneyEffect: -15,
          requirements: {
            minBalance: 15
          }
        },
        {
          text: "Lei è completamente pazzo.",
          response: "Pazzo? Può darsi! Sa cosa disse mio nonno prima di morire? 'Le verdure sanno, noi no.' E morì un'ora dopo aver mangiato un cavolfiore che gli aveva predetto la morte. Non sottovalutare mai il potere profetico dell'orto, giovane. Mmm, questa carota dice che tu non vincerai mai con quell'atteggiamento.",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media-bassa'
  },
  {
    id: 'manager-esaurito',
    name: 'Dott. Carriera',
    title: 'Executive in burnout',
    avatar: '/images/manager.png',
    dialogue: {
      text: "Devo vincere per potermi licenziare. Ho una call tra 4 minuti, un meeting tra 17 e devo licenziare 6 persone prima di pranzo.",
      options: [
        {
          text: "Non sembra felice del suo lavoro.",
          response: "Felice? Sono l'Executive Vice President of Happiness Optimization! Ottimizziamo la felicità riducendola a zero per massimizzare i profitti. Ho esattamente 12 minuti allocati settimanalmente per le mie crisi esistenziali. E ne ho appena usati 2. Devo essere più efficiente anche nella disperazione.",
          karmaEffect: 1
        },
        {
          text: "Perché non si licenzia e basta?",
          response: "Licenziarmi? Senza un piano? Ho un mutuo di 750.000 euro, due ex mogli, tre figli in college privati, un Porsche in leasing e una barca che uso due giorni l'anno! Il mio piano è chiaro: vincere 10 milioni, comprare un'isola e fingere la mia morte. Ho fatto un PowerPoint con 47 slide su questa exit strategy.",
          karmaEffect: 0
        },
        {
          text: "Mi passi i numeri che gioca, sembrano promettenti.",
          response: "Te li vendo per 200 euro. È un investimento con un ROI potenziale del 5000%. Ho preparato un accordo di non divulgazione e una clausola di revenue sharing in caso di vincita. Posso addebitarti anche con carta di credito, PayPal o crypto.",
          karmaEffect: -1,
          moneyEffect: -200,
          requirements: {
            minBalance: 200,
            socialStatus: ['benestante', 'ricco', 'elite']
          }
        }
      ]
    },
    socialStatus: 'ricco'
  },
  {
    id: 'turista-fanatico',
    name: 'Mr. Schmidt',
    title: 'Turista ossessionato',
    avatar: '/images/tourist.png',
    dialogue: {
      text: "In Germania non giochiamo così! Ma secondo mio libro, il lotto italiano è esperienza culturale autentica, come pizza e mandolino!",
      options: [
        {
          text: "È in vacanza?",
          response: "Vacanza molto organizzata! 9:00-9:15 foto al Colosseo. 9:16-9:22 selfie con gladiatore finto. 9:23-9:47 gelato autentico. 9:48-10:14 giocare al lotto come veri italiani! Sono in anticipo di due minuti sul programma! Efficienza tedesca!",
          karmaEffect: 0,
          moneyEffect: 5
        },
        {
          text: "Come sceglie i numeri da giocare?",
          response: "Ho creato software che combina date importanti della storia italiana con coordinate GPS dei monumenti e ingredienti della pizza! Oggi software dice di giocare 14, 33, 42 perché combina anno nascita Michelangelo con numero ingredienti pizza Margherita moltiplicato per altezza pendente torre di Pisa in metri! Sto facendo italiano corretto?",
          karmaEffect: 1
        },
        {
          text: "Il lotto è solo una perdita di soldi.",
          response: "Ma mia guida turistica dice che italiani autentici giocano al lotto! Pagina 58: 'L'italiano medio passa tre ore al giorno gesticolando, due ore mangiando pasta e un'ora giocando al lotto.' Se non gioco al lotto, come posso avere esperienza italiana completa? Ho già imparato a gesticolare e mangiato sette piatti di pasta ieri!",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'benestante'
  },
  {
    id: 'pescatore-lunare',
    name: 'Don Ciro',
    title: 'Pescatore lunare',
    avatar: '/images/pescatore.png',
    dialogue: {
      text: "Uagliò, 'a luna m'ha parlato stanotte. M'ha ritt ca 'o 17 è 'nu nummero 'e sfurtuna. Ma 'o 17 arriverso è 71, e chillo porta ricchezza!",
      options: [
        {
          text: "Non parlo napoletano, mi può tradurre?",
          response: "Ah, forestiero! La luna mi ha parlato ieri notte. Mi ha confidato che il 17 porta sfortuna. Ma il 17 al contrario è 71, e quello porta ricchezza! La matematica della fortuna non mente mai, uagliò!",
          karmaEffect: 0
        },
        {
          text: "Lei pesca numeri o pesci?",
          response: "Pesco numeri dal mare e pesci dal cielo! L'ultima volta che ho lanciato la rete nelle stelle ho pescato un 42 ancora vivo, si dibatteva! L'ho tenuto tre giorni in una bacinella prima che evaporasse. Mia moglie ancora non mi crede, ma il gatto ha visto tutto!",
          karmaEffect: 1
        },
        {
          text: "Mi faccia vedere la sua schedina.",
          response: "'A schedina mia è sacra! L'ho battezzata, tiene 'o nome: Speranza Inutile! Teng' 'e stessi nummere 'a quann' Maradona steva 'o Napule. Nun aggio mai vinto, ma si cambio, 'o spirito 'e Maradona me vene a tirà 'e piede 'a notte!",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media-bassa'
  },
  {
    id: 'banchiere-disperato',
    name: 'Dott. Conti',
    title: 'Banchiere in crisi esistenziale',
    avatar: '/images/banchiere.png',
    dialogue: {
      text: "Trent'anni a negare prestiti a gente disperata e ora sono qui, a giocare i numeri di mia nonna morta. L'ironia non le sfugge, vero?",
      options: [
        {
          text: "Non le sembra un po' ipocrita?",
          response: "Ipocrita? Sono ben oltre l'ipocrisia! Ho una laurea in economia, due master, e credo che lo spirito di mia nonna mi suggerisca numeri attraverso il mio toast bruciato la mattina. Ho rifiutato un mutuo a un uomo perché voleva comprare casa vicino a un cimitero. 'Energie negative', gli dissi. E ora sono qui che cerco di interpretare macchie di caffè.",
          karmaEffect: 2
        },
        {
          text: "Ci sono stati segni premonitori?",
          response: "Oh sì, chiarissimi! Il mio caveau si è allagato tre volte quest'anno. Un cliente ha vomitato sulla mia scrivania mentre gli spiegavo gli interessi del suo prestito. E il mio pappagallo, che non aveva mai parlato in cinque anni, ha improvvisamente detto 'sei rovinato' in perfetto italiano. L'ho venduto il giorno stesso.",
          karmaEffect: 0
        },
        {
          text: "Quanto ha investito in biglietti finora?",
          response: "Investito? INVESTITO? Si usa questo termine quando si butta denaro in un tritarifiuti? Ho 'investito' 46.780 euro in due anni. Potrei mostrare il mio estratto conto come esempio di salute mentale deteriorata. Sa cosa c'è di peggio? Ho negato finanziamenti a persone che volevano aprire un'attività perché 'il business plan non era solido'. Il mio business plan è pregare Santa Lucia con una schedina in mano!",
          karmaEffect: -1,
          moneyEffect: 100,
          requirements: {
            minKarma: 5,
            socialStatus: ['ricco', 'elite']
          }
        }
      ]
    },
    socialStatus: 'benestante'
  },
  {
    id: 'fantasma-ricevitoria',
    name: 'Lo Spettro',
    title: 'Fantasma della ricevitoria',
    avatar: '/images/fantasma.png',
    dialogue: {
      text: "Sono morto nel 1987 proprio mentre stavano estraendo i miei numeri. Non ho mai saputo se ho vinto. Sono bloccato qui per l'eternità.",
      options: [
        {
          text: "Posso controllare per lei?",
          response: "Davvero lo farebbe? I numeri erano 6, 13, 27, 42, 55, 88. Li ho giocati ogni settimana per 43 anni. Mia moglie diceva che erano stupidi. Era il nostro anniversario, il suo compleanno, l'età in cui ci siamo conosciuti, il numero di baci che le ho dato il primo giorno, gli anni che avremmo voluto vivere insieme, e... non ricordo l'ultimo. Ah, aspetti, sono morto, non posso più sapere se ho vinto.",
          karmaEffect: 2
        },
        {
          text: "I fantasmi possono giocare al lotto?",
          response: "Ho provato a compilare una schedina per 36 anni. Le mie dita attraversano la carta. Ho tentato di possedere persone, ma funziona solo nei film. Una volta sono riuscito a far cadere una penna e segnare un 4, ma sembrava più un 1, e comunque il commesso ha pulito considerandola una macchia. L'aldilà è sopravvalutato, sa? Niente lotto, niente caffè, niente calcio.",
          karmaEffect: 0
        },
        {
          text: "Io non credo ai fantasmi.",
          response: "E io non credevo alle tasse, eppure eccoci qui. Sa qual è la cosa peggiore dell'essere un fantasma in una ricevitoria? Vedere persone che vincono con i MIEI numeri! La settimana scorsa una signora ha vinto 20.000 euro con la mia combinazione. Ho passato la notte a sussurrarle all'orecchio la lista dei miei rimpianti.",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media'
  },
  {
    id: 'medico-scommettitore',
    name: 'Dott. Diagnosi',
    title: 'Chirurgo scommettitore',
    avatar: '/images/chirurgo.png',
    dialogue: {
      text: "Scommetto sulle mie operazioni, perché non sul lotto? Ieri ho dato al fegato del paziente in coma il 45% di possibilità. Oggi punto sul 45 secco.",
      options: [
        {
          text: "Questo mi sembra poco etico.",
          response: "Etico? Ho passato sette anni a studiare l'etica medica. Poi ho scoperto che potevo guadagnare più in borsa che in sala operatoria. Ora faccio entrambe le cose: opero e investo contemporaneamente! Sa quanti pazienti ho 'perso' durante il crollo del 2008? Dovrebbero vietare gli smartphone in sala operatoria...",
          karmaEffect: 1
        },
        {
          text: "I suoi pazienti lo sanno?",
          response: "I miei pazienti? Crede che dica loro: 'Buongiorno, oggi le sostituirò l'anca e scommetterò 500 euro sul fatto che sopravviverà'? Anche se... non sarebbe male come idea. Potremmo fare un pool di scommesse! Il paziente potrebbe vincere soldi se sopravvive, compensando le spese mediche! Mi scusi, devo brevettare questa idea prima che la rubi Big Pharma!",
          karmaEffect: -1
        },
        {
          text: "Quali sono le sue statistiche di vincita?",
          response: "Vincite al lotto: zero in 15 anni. Vincite in sala operatoria: 92% di sopravvivenza! Sa che ho una teoria? Il corpo umano ha 37 trilioni di cellule. Se ognuna esprimesse un desiderio numerico, la media sarebbe il numero perfetto da giocare! Sto cercando di estrarre questo dato, ma l'ospedale mi ha negato l'uso del supercomputer dopo l'incidente con le cartelle cliniche e quel sito di scommesse clandestino.",
          karmaEffect: 0,
          moneyEffect: 10
        }
      ]
    },
    socialStatus: 'ricco'
  },
  {
    id: 'barista-esistenzialista',
    name: 'Gianni',
    title: 'Barista esistenzialista',
    avatar: '/images/barista.png',
    dialogue: {
      text: "Sa cosa mi chiedo mentre servo caffè e stampo schedine? Se in qualche universo parallelo esiste un me che ha vinto al SuperEnalotto e ora vive a Bali circondato da modelle.",
      options: [
        {
          text: "Lei gioca sempre?",
          response: "Come il sole sorge a est, così io gioco il mercoledì e il sabato. È la mia religione: il culto della speranza statistica. In 27 anni ho vinto 12 euro. Ho comprato una pianta grassa per celebrare. È l'unica cosa viva che possiedo, a parte i batteri nel mio microbioma intestinale e il mio gatto depresso.",
          karmaEffect: 0
        },
        {
          text: "Forse il suo 'io' parallelo è ancora più infelice.",
          response: "Prospettiva interessante... forse il Gianni di Terra-7 ha vinto 300 milioni ed è morto soffocato da un'oliva nel Martini celebrativo. O forse ha scoperto che i soldi non comprano la felicità, solo divanetti bianchi in pelle e macchine sportive che si rompono in modi costosi. O peggio: forse è felice, e io sono condannato a non saperlo mai!",
          karmaEffect: 1
        },
        {
          text: "Questi pensieri non la distraggono dal lavoro?",
          response: "Distrazioni? Questo lavoro È una distrazione! Dalla morte, dalle tasse, dall'entropia universale! Sa quante combinazioni casuali di atomi servono per formare un essere senziente che serve caffè e stampa schedine mentre contempla il vuoto esistenziale? Eppure eccomi qui. E lei mi chiede se sono distratto mentre verso latte a forma di cuore nel suo cappuccino. Sì, sono distratto. Ecco perché il suo cappuccino ha la forma di un buco nero che inghiotte le sue speranze.",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media-bassa'
  },
  {
    id: 'suora-scommettitrice',
    name: 'Suor Fortuna',
    title: 'Religiosa del rischio',
    avatar: '/images/suora.png',
    dialogue: {
      text: "Non dica niente alla Madre Superiora. Gioco per la parrocchia, sa? Il Signore lavora in modi misteriosi, e a volte ha bisogno di un tetto nuovo per la sua casa.",
      options: [
        {
          text: "Ma non è un po' come peccare, Sorella?",
          response: "Oh, figliolo! Non è peccato se i soldi vanno alla chiesa! Ho discusso ampiamente la teologia del caso con Padre Anselmo. Dopo la sesta grappa, ha convenuto che persino Gesù trasformò l'acqua in vino, che è una forma di valore aggiunto, no? E poi, Dio creò i numeri. Li conosce tutti. Perché non dovrebbe suggerirmi i giusti?",
          karmaEffect: 0
        },
        {
          text: "Cosa fa con le eventuali vincite?",
          response: "L'ultima volta che ho vinto 50 euro, ho comprato minestre per i senzatetto. E una piccola statuetta di Santa Pancrazia, patrona dei giocatori d'azzardo. La tengo nascosta nel reggiseno. Non giudicarmi! Anche le suore possono essere creative con le tasche! Se vincessi il jackpot, rifarei il tetto della chiesa, comprerei un organo nuovo, e forse... non dirlo a nessuno... un piccolo viaggio a Las Vegas. Per studiare il peccato da vicino, ovviamente.",
          karmaEffect: 1
        },
        {
          text: "Le dirò un segreto: io invece gioco numeri... diabolici.",
          response: "Il 666? Oh cielo! ...Ma funziona? No, non dirmelo! Non voglio saperlo! Dimmi solo questo: con quale frequenza escono? Chiedo per un'amica suora. Anzi, per un esorcismo preventivo. Sì, è per quello.",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'povero'
  },
  {
    id: 'ragioniere-cospiratore',
    name: 'Rag. Complotti',
    title: 'Teorico della cospirazione',
    avatar: '/images/ragioniere.png',
    dialogue: {
      text: "Non si è mai chiesto perché il SuperEnalotto ha 90 numeri e non 89 o 91? E perché le estrazioni sono il martedì, giovedì e sabato? Seguendo la sequenza di Fibonacci al contrario, tutto porta al codice dei Templari!",
      options: [
        {
          text: "Mi spieghi questa teoria.",
          response: "È tutto collegato! 90 numeri = 9+0 = 9. Nove sono i cavalieri originali del Tempio! Il martedì è il terzo giorno della settimana, il giovedì il quinto, il sabato il settimo: 3, 5, 7 sono tutti numeri primi! Sa chi usava i numeri primi per comunicare? Gli alieni di Proxima Centauri che hanno costruito le piramidi e inventato il gelato alla stracciatella! Ho 47 lavagne a casa piene di calcoli. L'FBI mi spia attraverso il mio pesce rosso!",
          karmaEffect: 0
        },
        {
          text: "Lei sembra una persona... interessante.",
          response: "Interessante? Sono l'unico ragioniere in Italia bandito dalle conferenze di matematica per aver dimostrato che Pi greco è un messaggio in codice degli Illuminati! Lo sapeva che se prende tutti i numeri estratti dal 1997, li divide per il peso in grammi di un gatto siamese e li converte in lettere, viene fuori 'Siamo controllati dalle lucertole'? L'ho provato! Non mi fido neanche delle mie calze, potrebbero essere microfoniate!",
          karmaEffect: 1
        },
        {
          text: "Lei dovrebbe farsi vedere da uno specialista.",
          response: "Gli psichiatri fanno parte del complotto! Sa che il mio ultimo dottore aveva una pianta a forma di triangolo nel suo ufficio? TRIANGOLO! Come la piramide sul dollaro americano! Gli ho detto che sapevo tutto e lui ha cercato di prescrivermi delle 'pillole'. Pillole che cancellano la memoria degli incontri con gli alieni! Ho mangiato solo cibi bianchi per sei mesi per purificarmi. Il caciocavallo è l'unico formaggio non controllato dal governo ombra!",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media'
  },
  {
    id: 'poeta-decerebrato',
    name: 'Vate',
    title: 'Poeta dei numeri',
    avatar: '/images/poeta.png',
    dialogue: {
      text: "Il sei danza col nove, mentre il tredici piange la morte della sestina. La ruota gira, gira... come i pensieri nel labirinto dell'anima!",
      options: [
        {
          text: "È una metafora per la vita?",
          response: "La vita! Cos'è la vita se non una schedina compilata male? Nasciamo, scegliamo numeri che pensiamo ci rappresentino, e alla fine scopriamo che era uscito il 47 mentre noi avevamo puntato tutto sul 46! Ho scritto tre raccolte di poesie sui numeri non estratti. Si intitolano 'Sussurri Numerici', 'L'Eco del Sette' e 'Il Rumore del Due quando Nessuno lo Ascolta'. Ho venduto due copie. Entrambe a mia madre.",
          karmaEffect: 1
        },
        {
          text: "Che numeri suggerisce oggi?",
          response: "I numeri non si suggeriscono, si sentono! Sente il battito? Quello è il 23 che chiama. C'è profumo di 47 stamattina, con note di 19. E l'81... l'81 è timido oggi, si nasconde dietro le nuvole dei suoi dubbi esistenziali. Ma il 36! Oh, il 36 oggi canta come un usignolo in primavera!",
          karmaEffect: 0
        },
        {
          text: "Queste sono solo sciocchezze senza senso.",
          response: "Sciocchezze? SCIOCCHEZZE? I numeri piangono per la sua insensibilità! Sa cosa disse il grande Fibonacci sul letto di morte? 'I numeri sono le uniche stelle che possiamo toccare'! In realtà non lo disse, l'ho inventato io per il mio podcast sulla numerologia quantistica. Ho tre iscritti. Tutti bot. Ma mi capiscono meglio di lei!",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'povero'
  },
  {
    id: 'hikikomori-statistico',
    name: 'Otaku dei Numeri',
    title: 'Recluso probabilistico',
    avatar: '/images/otaku.png',
    dialogue: {
      text: "Non esco di casa da 4 anni, 7 mesi e 12 giorni. Ma ho sviluppato un modello statistico che predice le estrazioni con una precisione del 0.0031% superiore al caso.",
      options: [
        {
          text: "Come fa a sopravvivere senza uscire?",
          response: "Internet! Faccio consegnare tutto a domicilio. Cibo, vestiti, medicine... anche l'acqua, non mi fido dell'impianto idraulico, potrebbe alterare le mie onde cerebrali! La mia stanza è tappezzata di monitor che analizzano dati 24/7. Dormo 18 minuti ogni 4 ore per massimizzare l'efficienza. Il mio corpo è quasi interamente sostenuto da energy drink e patatine al formaggio. La mia pelle non vede il sole dal 2019. Sono praticamente un vampiro statistico!",
          karmaEffect: 0
        },
        {
          text: "Quel 0.0031% è statisticamente insignificante.",
          response: "Insignificante? INSIGNIFICANTE? Su un periodo di 278 anni, questo si traduce in una vincita garantita di almeno 14 euro! Scusi, l'interazione umana mi destabilizza. Ho parlato solo con il mio frigorifero negli ultimi 16 mesi. Gli ho anche dato un nome: Friedrich. Mi dà meno ansia sociale dei corrieri che consegnano la spesa. L'ultimo mi ha chiesto 'Come va?' e sono svenuto per 40 minuti.",
          karmaEffect: 1
        },
        {
          text: "Quanto hai vinto finora con questo sistema?",
          response: "Beh, tecnicamente... nulla. Ma il sistema richiede un campione di almeno 750.000 estrazioni per diventare statisticamente rilevante. Al ritmo attuale, vedrò i primi risultati concreti tra 384 anni. Sono quasi a metà strada! O almeno lo sarà il mio pronipote, se decidessi di riprodurmi. Ma ciò richiederebbe interazione umana e probabilmente toccare qualcuno, quindi no.",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media-bassa'
  },
  {
    id: 'becchino-numeri',
    name: 'Signor Feretri',
    title: 'Necroforo dei numeri',
    avatar: '/images/becchino.png',
    dialogue: {
      text: "I morti... mi suggeriscono numeri. Il signor Esposito, sepolto giovedì, mi ha detto di giocare la sua età alla morte e l'anno in cui si è rotto il femore sinistro. Mai deludere un cliente.",
      options: [
        {
          text: "Non è un po' macabro?",
          response: "Macabro? È un servizio post-mortem! Sa quanti rimpianti hanno i morti? 'Avrei dovuto giocare il 47' è la frase che sento più spesso durante le veglie funebri. Li aiuto a trovare pace. Una volta ho vinto 200 euro grazie al nonno Arturo. Ho comprato fiori per la sua tomba. Gli ho anche messo una piccola tv che trasmette le estrazioni. I parenti hanno protestato, ma lui apprezza.",
          karmaEffect: -1
        },
        {
          text: "Come comunicano esattamente questi... defunti?",
          response: "Oh, in molti modi! Alcuni lasciano numeri visibili nell'arrangiamento delle rughe sul viso. Altri fanno rumori alle 3:33 di notte - il classico orario delle comunicazioni dall'aldilà. La signora Bianchi comunica attraverso la sua dentiera, che scricchiola in codice Morse. Il professor Neri, matematico, fa apparire formule sullo specchio del bagno quando faccio la doccia. All'inizio era spaventoso, ora gli chiedo anche consigli per gli investimenti.",
          karmaEffect: 0
        },
        {
          text: "Questo è il metodo più inquietante e creativo che abbia mai sentito.",
          response: "Grazie! L'industria funeraria è ripetitiva, bisogna trovare modi per renderla interessante. Ho un quaderno con tutti i numeri suggeriti dai clienti negli ultimi 23 anni. L'ho intitolato 'Suggerimenti dall'Oltretomba - Volume 7'. Lo sa che la temperatura a cui si conserva un corpo influenza i numeri che suggerisce? Sotto i 4 gradi preferiscono i numeri bassi, mentre a temperatura ambiente amano numeri alti. Fisica dell'aldilà, affascinante!",
          karmaEffect: 1,
          moneyEffect: 10
        }
      ]
    },
    socialStatus: 'classe media'
  },
  {
    id: 'barbone-filosofo',
    name: 'Diogene',
    title: 'Clochard visionario',
    avatar: '/images/clochard.png',
    dialogue: {
      text: "Uè guagliò, teng' 'o numm'r ca t'fa ricch'! L'aggio sunnato mentre durmevo dint' 'a cassonett'! M'è venuto 'a Madonna cu 'na schedina 'nmano!",
      options: [
        {
          text: "Mi scusi, non capisco bene...",
          response: "Ah, non parli la lingua della strada! Ti traduco: ho avuto una visione mistica mentre dormivo nel cassonetto dell'immondizia! La Madonna mi è apparsa con una schedina vincente. Mi ha detto: 'Diogè, chisti nummere so' pe' chi tene 'o core pulito'. Ma siccome il mio cuore è stato corrotto da quattro birre e una focaccia trovata per terra, posso venderti i numeri per una piccola offerta. O un panino. Preferibilmente con salame.",
          karmaEffect: 0,
          moneyEffect: -5,
          requirements: {
            minBalance: 5
          }
        },
        {
          text: "Lei si chiama davvero Diogene?",
          response: "Diogene, Socrate, Einstein... a seconda del quartiere e dell'ufficiale che mi fa la multa per 'occupazione abusiva di suolo pubblico'! Prima ero professore di filosofia antica. Poi ho capito che Diogene aveva ragione: la civiltà è una prigione! Ora vivo in una botte moderna - il cassonetto dell'AMSA. La differenza tra me e voi schiavi del sistema? Io perdo solo gli spiccioli al lotto, voi perdete l'anima ogni giorno in ufficio!",
          karmaEffect: 1
        },
        {
          text: "Perché non gioca lei questi numeri, se sono così buoni?",
          response: "Perché il denaro corrompe! E perché ho perso i documenti nell'incendio doloso della mia precedente residenza... un cassonetto di cartone vicino alla stazione. E poi, cosa me ne farei dei milioni? Comprerei un cassonetto più grande? Più bottiglie di vino? Il vero ricco è chi ha bisogno di poco. Però, se insisti nel voler essere povero spiritualmente, ti vendo i numeri per 10 euro. O cinque. O quello che hai in tasca. Anche mezzo tramezzino va bene.",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'povero'
  },
  {
    id: 'nonna-malandrella',
    name: 'Nonna Carmela',
    title: 'Vecchietta del vicolo',
    avatar: '/images/nonna-carmela.png',
    dialogue: {
      text: "Uagliò, 'a nonnina toja sape 'e nummere buone! Settant'anne 'e scuorno e lacrime, sette mariti sotterrati, cientotrenta nepute... 'e nummere meje teneno 'o sangue 'ncuollo!",
      options: [
        {
          text: "Ma quanti mariti ha avuto davvero?",
          response: "Sette ufficiali, quatto ufficiosi e uno ca nun s'è maje accorto c'aggio fatto 'a vedova pe' quinnece anne! 'O primmo è ghiuto sotterr' c''o stesso vestito c'ha usato p''o matrimonio. Risparmio! 'O sicondo ha avut' nu malanno strano... 'o fungo 'ncoppa 'o 'nzalata mia, chilli stessi funghi c'aggio cucinato pe' isso seie vote 'a settimana. Coincidenze!",
          karmaEffect: 0
        },
        {
          text: "Mi può tradurre i numeri che vede?",
          response: "Ah, 'o forestiero! Te dico tutte cose: 'o 13 è 'a morte, ma è pure 'na benedizione si 'o saje giocà! 'O 27 è 'e figlie ca te tradiscono. 'O 81 è 'a vecchiaia ca te piglia 'e cervelle. 'O 6 è 'e solde ca nun tiene maje abbastanza. E 'o 90, guagliò, 'o 90 è 'a paura ca tutte tenimmo 'e restà sule. Gioca chisti nummere e penza a nonna Carmela quanne vince!",
          karmaEffect: 1
        },
        {
          text: "Lei crede davvero nella fortuna?",
          response: "'A fortuna? *sputa per terra* 'A fortuna è comm' 'e mutande: quanno nun 'e tiene, 'o destino te fotte! Aggia campato ottantasett'anne e saje che t'dico? 'A furtuna è pe' chi aspetta. 'A sfurtuna è pe' chi s'addorme. 'O lotto? È pe' chi nun tene niente 'a perdere. Comme a me, ca tengo solo 'o tiempo 'e aspettà 'a morte e 'sta pensione 'e miseria ca me basta pe' giocà tre vote 'a settimana!",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'povero'
  },
  {
    id: 'sanguinario-lotto',
    name: "Zi' Salvatore",
    title: 'Ex camorrista in pensione',
    avatar: '/images/camorrista.png',
    dialogue: {
      text: "Guagliò, primm' facevo rispettà 'e nummere c''a lupara. Mo' rispetto 'e nummere d''o lotto. Sempre a numerologia, sempe trattammo.",
      options: [
        {
          text: "Lei è stato davvero un camorrista?",
          response: "Camorrista? Io ero 'a Morte d''a Sanità! Duiciento cristiani hanno visto 'o Padreterno primma d''o tiempo grazie a me! Ma po' è arrivato 'o diabete, 'a prostata e 'a pensione. E saje che t'dico? È cchiù difficile azzeccà sei nummere ca sparà a n'uomo a dieci metri. C''a lupara sbagliavo una vota 'e mille. C''o lotto, mille vote su mille!",
          karmaEffect: -2
        },
        {
          text: "Ma non è illegale quello che faceva?",
          response: "Illegale? Tu si' troppo giovane. 'Na vota 'a legge era chella ca decidevo io! 'O maresciallo stesso veniva a domandarme 'e permesse! Ma 'o tiempo passa... Mo' m'accontento 'e minaccià 'o tabaccaio si me stampa male 'a schedina. L'aggio ditto: 'Si 'o 47 nun esce, t'aggia tagliare n'aricchia'. Steva scherza'... forse.",
          karmaEffect: 0
        },
        {
          text: "Ha mai usato i suoi metodi per vincere al lotto?",
          response: "Uagliò, si c''a minaccia se vincess' 'o lotto, io tenesse tre ville a Posillipo e nu yacht! 'A vecchiaia m'ha 'nsignato ca cierti cose nun se ponno corrompere: 'a morte, 'e femmene oneste e 'a sfaccimma 'e pallina d''o lotto! 'Na vota aggia pruvato a sequestra' 'o figlio d''o direttore d''o lotto. Aggio vinciuto? No! 'O guaglione s'è affezionato, ancora me telefona a Natale ca me chiamma 'nonno'!",
          karmaEffect: 1,
          moneyEffect: 10
        }
      ]
    },
    socialStatus: 'classe media-bassa'
  },
  {
    id: 'guappo-sfortunato',
    name: 'Gennarino',
    title: 'Scugnizzo dei numeri',
    avatar: '/images/gennarino.png',
    dialogue: {
      text: "Ue uagliò, io tengo 'a ciorta ca suda sangue! Vintiquatt'anne e già aggio jucato 'o stipendio 'e n'anno. Ma 'a prossima vota vence, t''o giuro 'ncopp'a capa 'e mammà!",
      options: [
        {
          text: "Sei molto giovane per essere così accanito.",
          response: "Giovane? 'O lotto m'ha fatto 'nvecchià comm'a nu viecchio! A tridice anne già jucavo 'e nummere d''a tombola d''a nonna. A quinnece, 'o primo stipendio d''o cantiere l'aggio jucato tutto 'ncoppa a nu sogno: 'na vacca ca parlava napoletano e me riceva '8, 14, 72'. Aggio vinciuto? No! Ma 'a vacca m'è venuta 'nzuonno n'ata vota e m'ha ditto: 'Si' proprio scemo, io stevo pazzianno!'",
          karmaEffect: 0
        },
        {
          text: "Non dovresti cercare aiuto?",
          response: "Aiuto? Ma qua' aiuto? 'O vero aiuto è 'na cinquina sicura! Aggio pruvato tutto: 'e carte, 'e maghe, 'e fantasme, persino 'o psicologo! M'ha ditto ca tengo 'na dipendenza. L'aggio risposto: 'E tu tiene 'na faccia 'e scemo, ma almeno io me pozzo curà!' Mammà chiagne tutte 'e ssere, dice ca me sto arruinanno. Ma quanno vinco, 'a porto a Miami Beach e ce facimmo 'e selfie cu Leonardo Di Caprio!",
          karmaEffect: 1
        },
        {
          text: "Quanto hai perso finora?",
          response: "Tutte cose... 'A machina, 'o telefono, 'o stipendio, 'a dignità, 'a fidanzata... Carmela m'ha lasciato quanno ha saputo c'aggio vennuto 'o suo anello 'e fidanzamento pe' jucà 'a combinazione d''o compleanno suojo. Chi puteva sapè ca nasceva 'o 13 'e nu mese sfurtunato? L'aggio pure mannato nu piezzo 'e schedina quann'è stato 'o compleanno suojo. Nun l'è piaciuto, pare... Ieri aggio vennuto 'o sangue pe' jucà n'ata vota. E ogge aggio visto 'o Gesù Cristo ca me guardava stuorto!",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'povero'
  },
  {
    id: 'pizzaiolo-veggente',
    name: 'Mastro Ciro',
    title: 'Pizzaiolo delle premonizioni',
    avatar: '/images/pizzaiolo.png',
    dialogue: {
      text: "Uagliò, 'e nummere stanno scritte 'ncoppa 'a pizza! 'A muzzarella me parla, 'o basilico me canta 'e combinazione. 'A farina è 'a neve ca te porta 'a ricchezza!",
      options: [
        {
          text: "Come fa a vedere i numeri nelle pizze?",
          response: "È n'arte antica! Quanno 'a muzzarella se scioglie, forma 'e figure. 'O 7 è quanno fa 'a lacrema a destra. 'O 22 è quanno 'o pummarola forma nu cerchietto. 'O 81 è 'a forma d''o basilico arricciato! L'aggio 'mparato 'a nonno mio, ca faceva 'e pizze p''o Re. Diceva: 'Cirù, 'a pizza vera tene 'o sapore d''o destino!' Po' è morto povero comm' a nu pescatore, ma almeno teneva 'a panza chiena!",
          karmaEffect: 0
        },
        {
          text: "Mi consiglia dei numeri per oggi?",
          response: "Oggi 'a farina m'ha parlato chiaro chiaro! Aggio visto 'o 24, ca è 'o juorno 'e San Gennaro terremotato. Po' 'o 56, ca rappresenta 'e scarpune 'e mammà quanno te correva appriesso. 'O 17 è sempe 'a disgrazia, ma si 'o mitte vicino 'o 33, ca è l'anne 'e Cristo, te porta ricchezza! E 'o 90... 'o 90 è 'a paura, ma pure 'a fine d''e problemi! Joca chisti numeri e penza a Mastro Ciro mentre 'a pallina d''o lotto abballa!",
          karmaEffect: 1,
          moneyEffect: 5
        },
        {
          text: "Secondo me stai solo improvvisando.",
          response: "Improvvisanno? Uagliò, staje parlanno cu l'urdemo pizzaiolo medium 'e Napule! 'A gente fa 'a fila fora 'o locale mio no pe' magnà 'a pizza, ma pe' sapè 'e numeri! 'O Commissario 'e Pulizia vene ogni martedì e me porta 'e multa, ma po' me chiede: 'Cirù, che numeri escono sabbato?' S'ha accattato 'na casa a Posillipo cu 'e numeri miei! 'O fatto è ca io nun pozzo vencere. È 'o malocchio d''a nonna mia, ca vuleva ca facevo 'o dottore. Dice: 'Si vinci, te levo 'a capacità 'e vedè 'e nummere dint'a pizza!'",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'classe media'
  },
  {
    id: 'pulcinella-lotto',
    name: 'Pulcinella',
    title: 'Maschera della fortuna',
    avatar: '/images/placeholder.png',
    dialogue: {
      text: "Uè uè uè! Pulcinella porta fortuna a chi 'o sape ascoltà! 'E nummere stanno 'ncuorpo a me comme 'e maccarune! Quanno parlo, esceno 'e nummere 'nvece d''e parole!",
      options: [
        {
          text: "Ma sei un Pulcinella vero o un tipo vestito da Pulcinella?",
          response: "Chi 'o sape! Io stesso nun 'o ssaccio cchiù! Sono nato cu 'sta faccia o m'ha cresciuto accussì mammà? 'A gente pensa ca Pulcinella è 'na maschera, ma 'a verità è ca tutte quante site maschere e io songo l'unico overo! 'O lotto è comme a me: bianco e nero, fortuna e sfurtuna, famme e ricchezza! Tutto sta a comme abballate cu destino!",
          karmaEffect: 0
        },
        {
          text: "Quali sono i numeri che hai nella pancia oggi?",
          response: "Uuuuh, stanno sbullenno ogge! Tengo 'o 13 vicino 'o stommaco, 'o 45 'ncoppa 'o fegato, e 'o 67 m'è sciso fino 'e rignuni! Siente comme sonano? È 'a smorfia viva, so' 'e numeri ca nascono d''o popolo! 'A morte, 'o cafè, 'o cazone strutto, 'a femmena nuda, 'o ciuccio ca vola... tutto tene 'o nummero suojo, e tutte 'e nummere stanno dint'a panza 'e Pulcinella!",
          karmaEffect: 1
        },
        {
          text: "Smettila con questa sceneggiata.",
          response: "Uagliò, e fammə campà! Tengo tre figlie, 'na mugliera ca me fotte 'e sorde, e cinqueciento euro 'e piggione arretrato! 'A pensione 'e nonno nun basta cchiù, e 'stu costume me fa sudà comm'a 'na fontana a luglio! Ma 'a fortuna è pe' chi crede! Si tu nun cride, Pulcinella se ne torna dinto 'o teatro... e tu te pierde 'a combinazione vincente ca tengo annascosta sotto 'o cappelluccio!",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'povero'
  }
];

// Funzione per ottenere un NPC
export function getNPCForDate(date: Date): NPC | null {
  // Creiamo un seed basato sulla data attuale (anno, mese, giorno)
  // In questo modo lo stesso NPC sarà selezionato per l'intera giornata
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  
  // Funzione semplice per trasformare una stringa in un numero (pseudo-casuale ma deterministico)
  const getNumericHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Converti in un intero a 32 bit
    }
    // Assicuriamoci che sia positivo
    return Math.abs(hash);
  };
  
  // Genera un indice basato sulla data (sarà lo stesso per tutta la giornata)
  const numericSeed = getNumericHash(dateString);
  const npcIndex = numericSeed % NPCs.length;
  
  return NPCs[npcIndex];
}