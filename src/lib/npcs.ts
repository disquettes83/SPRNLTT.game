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
    avatar: '/images/cassiera-stanca-2.png',
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
    avatar: '/images/la-commessa.png',
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
    avatar: '/images/la-vedova.png',
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
    avatar: '/images/il-professore.png',
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
    avatar: '/images/il-vecchio.png',
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
    avatar: '/images/don-salvatore.png',
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
  },
  {
    id: 'notaio-ansioso',
    name: 'Dr. Anselmi',
    title: 'Notaio con tic nervoso',
    avatar: '/images/dr-anselmi.png',
    dialogue: {
      text: "*controlla nervosamente l'orologio* Ho quattro minuti e trentasette secondi prima di tornare in studio. *tamburella le dita* Devo giocare questi numeri o perdo l'occasione della vita.",
      options: [
        {
          text: "Perché ha così fretta?",
          response: "*parla rapidamente* Fretta? Non ho fretta. Ho calcolato precisamente che posso perdere sei minuti ogni giorno per giocare. Non uno di più. *mostra un'agenda fitta di appuntamenti* Vede? Ogni momento della mia vita è schedulato con precisione assoluta. Tranne quando devo fare la cacca, quello è imprevedibile.",
          karmaEffect: 1,
          moneyEffect: 5
        },
        {
          text: "Le consiglio di rilassarsi un po'.",
          response: "*occhi spalancati* Rilassarmi? *ride istericamente* L'ultima volta che mi sono rilassato era il 1998. Ho perso 12 minuti e ho dovuto rimandare il matrimonio. *si asciuga il sudore* Mia moglie ancora me lo rinfaccia. E ora ho perso... *controlla l'orologio* ...ventidue secondi a parlare con lei!",
          karmaEffect: 0
        },
        {
          text: "Mi faccia vedere questi numeri 'fortunati'.",
          response: "*tira fuori una cartellina con calcoli elaborati* Sono i numeri basati sulle occorrenze statistiche, modificati dagli indicatori lunari, divisi per il tasso di umidità e moltiplicati per il numero di piccioni che ho visto stamattina. *sussurra* Matematica pura. Non posso sbagliare.",
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
      text: "*parla al telefono* No, credimi, questa volta ho la combinazione giusta! Devo solo convincere qualcuno a prestarmi venti euro... *ti nota* Ehi, ciao! *chiude la chiamata* Ti stavo proprio cercando!",
      options: [
        {
          text: "Non ci conosciamo.",
          response: "*sorride con troppi denti* Dettagli! Sai chi sono, vero? Vanessa, 200.000 follower! *abbassa la voce* Beh, erano 200.000. Prima che il mio ex mi cancellasse l'account per vendetta. *si ricompone* Comunque, potresti prestarmi venti euro? Ti taggo nella storia quando vinco, promesso!",
          karmaEffect: 0
        },
        {
          text: "Ecco venti euro, ma non aspettarti nulla in cambio.",
          response: "*afferra i soldi* Grazie! Sei un tesoro! *inizia a filmare con il telefono* Ciao followers! Guardate chi ho incontrato oggi, il mio angelo custode! *sussurra* Come ti chiami? *non aspetta la risposta* Vi presento... uhm, il mio nuovo BFF! E ora andiamo a vincere milioni! *corre via*",
          karmaEffect: 2,
          moneyEffect: -20
        },
        {
          text: "Lavorare no?",
          response: "*offesa* Lavorare? Io lavoro durissimo! Sai quanto è difficile mantenere un profilo di lifestyle quando vivi in un monolocale con tre coinquilini e mangi pasta in bianco? *si emoziona* La gente pensa che sia facile, ma devo truccarmi per ore solo per far credere che non sto piangendo! *singhiozza* Il mio ultimo sponsor è stato un negozio di detersivi sfusi!",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*vestita con dodici amuleti* I miei gatti hanno predetto l'estrazione di stasera. *ti mostra una foto con 17 gatti* Vedi come sono disposti? È un segno!",
      options: [
        {
          text: "Non credo che i gatti possano predire numeri.",
          response: "*sussulta indignata* I miei gatti non sono normali! Morgana è la reincarnazione di mia nonna, e nonna aveva vinto tre volte al lotto! *accarezza un amuletto* E Fufi? Fufi è nato durante un'eclissi con sette dita per zampa. Coincidenza? Non credo proprio!",
          karmaEffect: -1
        },
        {
          text: "Quali numeri suggeriscono i suoi gatti?",
          response: "*guarda nervosamente a destra e sinistra* Non posso dirtelo così... *estrae un foglietto* Ma per 5 euro ti vendo questo talismano di pelo di gatto. Se lo metti sotto il cuscino, i numeri ti appariranno in sogno. *abbassa la voce* Funziona solo se hai almeno tre calzini spaiati nel cassetto.",
          karmaEffect: 0,
          moneyEffect: -5,
          requirements: {
            minBalance: 5
          }
        },
        {
          text: "Quanti gatti ha in totale?",
          response: "*sorride con orgoglio* Beh, dipende da cosa intendi per 'avere'. Se parliamo di quelli che vivono in casa, sono 23. Se contiamo quelli del giardino, 41. *pensierosa* Poi ci sono i gatti astrali che mi visitano durante la meditazione, e i gatti delle vite passate che mi seguono. *conta sulle dita* In totale saranno... *si confonde* ...tanti! I numeri sono importanti, sai?",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*distribuisce biglietti da visita* Gioca al lotto? Perfetto! *sorride* Io sono specializzato in divorzi causati dal gioco d'azzardo. Il 68% dei miei clienti ha perso famiglia e casa per colpa di una schedina!",
      options: [
        {
          text: "Non sono sposato.",
          response: "*annuisce vigorosamente* Ancora meglio! Può giocare quanto vuole senza rischiare di perdere metà della casa! *si avvicina* Ma se dovesse incontrare qualcuno, mi tenga presente. Offro un pacchetto 'fidanzamento-matrimonio-divorzio' a prezzo fisso. Sa, prevenire è meglio che curare!",
          karmaEffect: 0
        },
        {
          text: "Mi sembra un po' cinico il suo approccio.",
          response: "*fa spallucce* Cinico? Sono un realista! In vent'anni di carriera ho visto di tutto. *conta sulle dita* Case vendute di nascosto, nonni che ipotecano la pensione, madri che vendono l'auto del figlio... *sorride* La gente impazzisce per una sestina! Io offro solo un servizio... inevitabile.",
          karmaEffect: 1
        },
        {
          text: "Ma lei gioca?",
          response: "*scoppia a ridere* Io? Mai! Conosco troppo bene i rischi. *abbassa la voce* Però investo in ricevitorie. Tre nel quartiere sono mie. *ammiccamento* L'unico modo per vincere al gioco è possedere il banco, lo sanno tutti. Il mio prossimo investimento? Un'agenzia immobiliare specializzata in case pignorate!",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*parlano all'unisono* Noi giochiamo sempre gli stessi numeri ma al contrario l'uno dall'altro. *il primo gemello* Io gioco 13, 27, 38... *il secondo gemello* E io 31, 72, 83...",
      options: [
        {
          text: "E funziona questa strategia?",
          response: "*si guardano e rispondono alternandosi* Mai - vinto - nulla - insieme. *primo gemello* Ma la probabilità che vinciamo entrambi... *secondo gemello* ...è così bassa che se succedesse... *insieme* L'universo collasserebbe! *ridono identicamente*",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*compila freneticamente una schedina mentre controlla il telefono* Devo vincere oggi. DEVO. *guarda l'orologio* Ho ventisette minuti prima che la Guardia di Finanza trovi le cartelle che ho perso.",
      options: [
        {
          text: "Posso aiutarla in qualche modo?",
          response: "*ti guarda con speranza* Sì! Hai un jet privato e un passaporto falso? *ride nervosamente* Sto scherzando! *abbassa la voce* Non sto scherzando. *normale* Diciamo che ho... ottimizzato troppo alcuni bilanci. *si asciuga il sudore* Chi poteva immaginare che 17 società offshore a nome del mio gatto dessero nell'occhio?",
          karmaEffect: 1
        },
        {
          text: "Forse dovrebbe costituirsi.",
          response: "*sembra scioccato* Costituirmi? *riflette* Mmm, interessante strategia... *prende appunti* 'Confessare prima che scoprano tutto...' *alza lo sguardo* Ma se vinco al lotto posso ripagare tutto e fuggire alle Maldive prima del processo! *calcola velocemente* Mi servono solo... sette miliardi e quattro euro!",
          karmaEffect: 0
        },
        {
          text: "Mi faccia vedere i numeri che gioca.",
          response: "*copre la schedina* No! Sono i numeri perfetti! Li ho calcolati in base alle mie dichiarazioni dei redditi degli ultimi 10 anni. *sussurra* Il trucco è sottrarre il reddito dichiarato da quello reale, dividere per il numero di società fantasma e aggiungere l'età del mio gatto. *mostra orgoglioso* Matematica creativa!",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*ti osserva attentamente* Tu hai bisogno di giocare 17, 22 e 44. Li vedo chiaramente sopra la tua testa. *annusa l'aria* E un po' di 8, ma solo il martedì.",
      options: [
        {
          text: "Come fa a saperlo?",
          response: "*sorride con saggezza* Quando arrivi alla mia età, vedi cose che gli altri non vedono. *indica il suo occhio* Questo ha la cataratta, ma vede i numeri fortunati. *indica l'altro* Questo vede il futuro, ma solo fino a mercoledì. *sospira* Giovedì è sempre una sorpresa.",
          karmaEffect: 1
        },
        {
          text: "Lei ha mai vinto?",
          response: "*ride dolcemente* Oh, certo! Nel '68 ho vinto abbastanza per comprare quella che ora è diventata la casa di riposo dove vivo. *abbassa la voce* Non lo sanno, credono che sia dello Stato. *fa l'occhiolino* Quando morirò la lascerò a mio nipote. O al gatto. Dipende da chi mi viene a trovare più spesso questo mese.",
          karmaEffect: 0,
          moneyEffect: 5
        },
        {
          text: "I suoi numeri sembrano casuali.",
          response: "*si offende* Casuali? *si fa il segno della croce* Ogni numero ha un significato! Il 17 è tuo padre che non ti parla da tre mesi. Il 22 è quel debito che fingi di aver dimenticato. E il 44? *ti fissa intensamente* Il 44 è quella cosa che hai fatto nel 2018 e speri che nessuno scopra mai! *sorride* Indovinato, vero?",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*indossa un completo costoso ma visibilmente consumato* Sto per lanciare una ICO basata sulla blockchain del lotto. *si sistema la cravatta macchiata* Cerco investitori visionari.",
      options: [
        {
          text: "Mi spieghi di più di questa... blockchain del lotto?",
          response: "*si anima* È rivoluzionario! Immagina: ogni numero estratto diventa un token non fungibile, un LottoCoin! *gesticola* Usiamo algoritmi di machine learning per prevedere le estrazioni future basandoci su big data raccolti da sogni e premonizioni degli utenti! *abbassa la voce* Ho già bruciato tre startup e la fiducia di mia moglie, ma questa è la volta buona!",
          karmaEffect: 0
        },
        {
          text: "Non sembra una truffa?",
          response: "*finge shock* Truffa? *ride nervosamente* È disruptive innovation! *si asciuga il sudore* D'accordo, lo ammetto... *sospira* Ho perso tutto con la mia ultima startup, 'UberForDogs - passeggiate per cani on demand'. *triste* Chi poteva immaginare che i cani non sanno usare le app? Ora devo fingere di avere ancora successo o mio padre mi costringerà a lavorare nel suo negozio di ferramenta.",
          karmaEffect: 2
        },
        {
          text: "Ti presto 50€ se la smetti di parlare.",
          response: "*occhi illuminati* Cinquanta euro? *afferra i soldi* Grazie per aver creduto nel progetto! Sei ufficialmente un angel investor! *ti dà un biglietto da visita sgualcito* Ti garantisco un ROI del 10.000% entro... *controlla l'orologio* ...martedì prossimo! *si allontana rapidamente* Ti manderò gli NFT per email!",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*ti fissa attraverso occhiali enormi* Le stelle mi hanno svegliata alle 3:47 stanotte per dirti che devi giocare i numeri della tua anima. *drammatica* Il tuo spirito guida è inquieto!",
      options: [
        {
          text: "Come si chiamano questi spiriti guida?",
          response: "*chiude gli occhi* Mi connetto con l'aldilà... *strano accento* Il tuo spirito principale si chiama... *pausa* Giorgino! *apre un occhio* Ti suona familiare? *chiude di nuovo gli occhi* E c'è anche... Peppino! E... *esita* Franceschino! *apre gli occhi* Tutti i tuoi spiriti guida hanno i nomi che finiscono in 'ino'. È un segno potentissimo!",
          karmaEffect: 0,
          moneyEffect: -2
        },
        {
          text: "Preferirei numeri basati su dati statistici.",
          response: "*offesa* Statistiche? *ride* Le statistiche sono per chi non ha accesso alla conoscenza cosmica! *si avvicina* Ma va bene, capisco, sei un tipo razionale. *sussurra* Anche l'universo ama i numeri. *estrae dei fogli* Ecco le mie statistiche spirituali: incrocio le fasi lunari con il numero di piccioni visti al mattino e il colore del semaforo quando starnutisco. *orgogliosa* Infallibile!",
          karmaEffect: 1
        },
        {
          text: "Lei ha vinto qualcosa con questi metodi?",
          response: "*cambia espressione* Ehm... i soldi sono energia. E l'energia non si crea né si distrugge, si trasforma. *filosofica* La mia vincita è la consapevolezza, il mio jackpot è l'illuminazione. *pratica* E comunque non ho mai giocato perché i miei spiriti guida mi dicono sempre che vincerò 'la prossima volta'. *sospira* Sono decenni che aspetto questa 'prossima volta'.",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*circondato da pile di taccuini pieni di numeri* Ho sviluppato un sistema infallibile basato su 47 anni di estrazioni. *ti mostra un taccuino* Guarda questi pattern! Non possono essere casuali!",
      options: [
        {
          text: "Quanto tempo ha dedicato a questi calcoli?",
          response: "*con orgoglio* Diciotto ore al giorno per quarantasette anni! *conta sulle dita* Sono... *si confonde* ...tante ore! Ho perso due mogli, un figlio non mi parla più, e ho sviluppato una fusione vertebrale a forza di stare chino sui numeri. *sorride* Ma ne è valsa la pena! *abbassa la voce* Sono a un passo dal crackare il sistema. Lo so dal 1987.",
          karmaEffect: 2
        },
        {
          text: "Mi mostri questo sistema.",
          response: "*esitante* Mmm, non dovrei... *si guarda intorno* Va bene, ma solo un'anteprima. *apre un taccuino* Vedi? Quando un numero esce tre volte in un anno, il suo simmetrico rispetto a 45 ha una probabilità del 0.0043% in più di uscire nei giorni di luna crescente, ma solo se il mese ha una 'r' nel nome! *chiude il taccuino di scatto* Mi offri un caffè e ti dico di più.",
          karmaEffect: 0,
          moneyEffect: -3,
          requirements: {
            minBalance: 3
          }
        },
        {
          text: "Il lotto è completamente casuale, sa?",
          response: "*risata sprezzante* Casuale? CASUALE? *ti fissa* È quello che VOGLIONO farti credere! *sussurra* L'uomo non è arrivato davvero sulla Luna, e il lotto non è casuale. *serio* Sai quante persone hanno provato a rubarmi le mie formule? Tre agenti dei servizi segreti, un matematico del MIT e il mio idraulico... *sospettoso* Anche tu lavori per LORO, vero?",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*non stacca gli occhi dal laptop* Ho quasi finito di hackerare l'algoritmo del lotto. *digita freneticamente* Con questo script Python posso prevedere il 43% delle estrazioni con una deviazione standard del 7%.",
      options: [
        {
          text: "Questo non è illegale?",
          response: "*alza lo sguardo per la prima volta* Illegale? *risata nervosa* Sto solo... analizzando dati pubblici! *sussurra* E poi ho mascherato il mio IP con sette proxy e un router modificato che passa attraverso il wifi della biblioteca comunale. *normale* In teoria sto solo facendo i compiti di statistica! *digita ancora più velocemente* Anche se la professoressa Bianchi non apprezza il mio genio e mi ha dato 4 all'ultimo compito.",
          karmaEffect: 0
        },
        {
          text: "Mi puoi mostrare i risultati?",
          response: "*esitante* Mmm, è altamente sperimentale e... *guarda lo schermo* Oh no! *si dispera* Il programma dice che la combinazione vincente sarà 1, 2, 3, 4, 5, 6! Questo è impossibile! *controlla il codice* Ah, ho capito. Ho dimenticato di convertire la matrice di correlazione temporale. *imbarazzato* Dammi solo... tre o quattro mesi per aggiustare il bug.",
          karmaEffect: 1
        },
        {
          text: "Ti pago per i numeri di stasera.",
          response: "*interessato* Davvero? *controlla rapidamente qualcosa* Okay, l'algoritmo prevede per stasera... *legge dallo schermo* 8, 14, 22, 47, 53, 84. *prende i soldi* Ma ricorda, c'è un margine di errore del... *controlla* ...98%. *sorride* In pratica è quasi una certezza! *sussurra* PS: Con questi soldi mi compro Red Dead Redemption 3, non dirlo a mia madre.",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*osserva delle zucchine* Le mie verdure parlano, sa? *accarezza una zucchina* Questa mi ha detto che oggi escono il 13 e il 42. Non mente mai. *annusa un pomodoro* Questo invece non dice niente di utile.",
      options: [
        {
          text: "Quali altre verdure le danno numeri?",
          response: "*serissimo* Le carote sono ottime per i numeri bassi, sotto il 30. *pensieroso* I broccoli vedono il futuro ma sono pessimisti, predicono sempre numeri che non escono. *abbassa la voce* Le melanzane sono le più precise, ma parlano solo di lunedì. *sospira* Il problema è che le mangio sempre di domenica, non resisto. Mia moglie dice che è per questo che non vinco mai.",
          karmaEffect: 1
        },
        {
          text: "Posso comprare qualche sua verdura fortunata?",
          response: "*illuminandosi* Certo! *seleziona con cura* Questa patata ha l'energia del 27, lo vedi questo bitorzolo? È la forma esatta della Sicilia! *sceglie un peperone* E questo ti darà il 64, garantito! *fa un pacchetto* Sono 15 euro. *sussurra mentre ti dà il sacchetto* Mangia la patata solo dopo l'estrazione, altrimenti il numero cambia.",
          karmaEffect: 0,
          moneyEffect: -15,
          requirements: {
            minBalance: 15
          }
        },
        {
          text: "Lei è completamente pazzo.",
          response: "*ride di gusto* Pazzo? Può darsi! *sereno* Sa cosa disse mio nonno prima di morire? 'Le verdure sanno, noi no.' E morì un'ora dopo aver mangiato un cavolfiore che gli aveva predetto la morte. *ti punta contro una carota* Non sottovalutare mai il potere profetico dell'orto, giovane. *morde la carota* Mmm, dice che tu non vincerai mai con quell'atteggiamento.",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*vestito elegante ma con cravatta allentata* Devo vincere per potermi licenziare. *consulta nervosamente lo smartphone* Ho una call tra 4 minuti, un meeting tra 17 e devo licenziare 6 persone prima di pranzo.",
      options: [
        {
          text: "Non sembra felice del suo lavoro.",
          response: "*ride amaramente* Felice? *allenta ulteriormente la cravatta* Sono l'Executive Vice President of Happiness Optimization! *ironico* Ottimizziamo la felicità riducendola a zero per massimizzare i profitti. *guarda l'orologio* Ho esattamente 12 minuti allocati settimanalmente per le mie crisi esistenziali. *controlla il telefono* E ne ho appena usati 2. Devo essere più efficiente anche nella disperazione.",
          karmaEffect: 1
        },
        {
          text: "Perché non si licenzia e basta?",
          response: "*scioccato* Licenziarmi? Senza un piano? *panico* Ho un mutuo di 750.000 euro, due ex mogli, tre figli in college privati, un Porsche in leasing e una barca che uso due giorni l'anno! *si calma* Il mio piano è chiaro: vincere 10 milioni, comprare un'isola e fingere la mia morte. *professionale* Ho fatto un PowerPoint con 47 slide su questa exit strategy.",
          karmaEffect: 0
        },
        {
          text: "Mi passi i numeri che gioca, sembrano promettenti.",
          response: "*guarda la schedina* Te li vendo per 200 euro. *business mode* È un investimento con un ROI potenziale del 5000%. *estrae un contratto* Ho preparato un accordo di non divulgazione e una clausola di revenue sharing in caso di vincita. *penna pronta* Posso addebitarti anche con carta di credito, PayPal o crypto.",
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
    avatar: '/placeholder.svg',
    dialogue: {
      text: "*con forte accento tedesco* In Germania non giochiamo così! *consulta una guida* Ma secondo mio libro, il lotto italiano è esperienza culturale autentica, come pizza e mandolino!",
      options: [
        {
          text: "È in vacanza?",
          response: "*estrae una dettagliata pianificazione* Vacanza molto organizzata! *mostra il programma* 9:00-9:15 foto al Colosseo. 9:16-9:22 selfie con gladiatore finto. 9:23-9:47 gelato autentico. 9:48-10:14 giocare al lotto come veri italiani! *orgoglioso* Sono in anticipo di due minuti sul programma! Efficienza tedesca!",
          karmaEffect: 0,
          moneyEffect: 5
        },
        {
          text: "Come sceglie i numeri da giocare?",
          response: "*apre un'app sul telefono* Ho creato software che combina date importanti della storia italiana con coordinate GPS dei monumenti e ingredienti della pizza! *mostra una serie di calcoli* Oggi software dice di giocare 14, 33, 42 perché combina anno nascita Michelangelo con numero ingredienti pizza Margherita moltiplicato per altezza pendente torre di Pisa in metri! *preoccupato* Sto facendo italiano corretto?",
          karmaEffect: 1
        },
        {
          text: "Il lotto è solo una perdita di soldi.",
          response: "*confuso* Ma mia guida turistica dice che italiani autentici giocano al lotto! *controlla il libro* Pagina 58: 'L'italiano medio passa tre ore al giorno gesticolando, due ore mangiando pasta e un'ora giocando al lotto.' *chiude il libro* Se non gioco al lotto, come posso avere esperienza italiana completa? *preoccupato* Ho già imparato a gesticolare e mangiato sette piatti di pasta ieri!",
          karmaEffect: -1
        }
      ]
    },
    socialStatus: 'benestante'
  }
];

// Funzione per ottenere un NPC
export function getNPCForDate(date: Date): NPC | null {
  // Usa il giorno del mese come indice per selezionare un NPC
  // In questo modo ogni giorno avrà un NPC diverso in modo deterministico
  const dayOfMonth = getDate(date);
  const npcIndex = dayOfMonth % NPCs.length;
  
  return NPCs[npcIndex];
}
