import mongoose from 'mongoose';

// Schema base originale
const basicItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Item', basicItemSchema, 'item');

//in Common js :
//module.exports = mongoose.model('Item',basicItemSchema,'item'); // Item(primo parametro) fra apici puoi chiamarlo come vuoi , il nome del modello che si andrà a creare in MongoDB, ultimo parametro è per evitare l'aggiunta della s default diMongoose che implementa la logica di pluralizzazione e MongoDB: crea effettivamente la collection con il nome fornito da Mongoose.

// const advancedItemSchema = new mongoose.Schema({
//     // === INFORMAZIONI BASE PRODOTTO ===
//     name: {
//         type: String,                                     // Definisce il tipo di dato come testo
//         required: [true, 'Nome prodotto obbligatorio'],   // Campo obbligatorio con messaggio di errore
//         trim: true,                                       // Rimuove gli spazi bianchi all'inizio e alla fine
//         minLength: [3, 'Nome troppo corto'],             // Nome deve essere almeno 3 caratteri
//         maxLength: [50, 'Nome troppo lungo']             // Nome non può superare 50 caratteri
//     },

//     description: {
//         type: String,                                     // Campo di testo per la descrizione
//         required: [true, 'Descrizione obbligatoria'],     // Descrizione è obbligatoria
//         trim: true,                                       // Rimuove spazi extra
//         minLength: [10, 'Descrizione troppo corta'],      // Minimo 10 caratteri
//         maxLength: [1000, 'Descrizione troppo lunga']     // Massimo 1000 caratteri
//     },
    
//     // === GESTIONE PREZZI E SCONTI ===
//     price: {
//         current: {
//             type: Number,                                 // Prezzo attuale come numero
//             required: [true, 'Prezzo obbligatorio'],      // Prezzo deve essere specificato
//             min: [0, 'Il prezzo non può essere negativo'] // Non accetta prezzi negativi
//         },
//         original: {
//             type: Number,                                 // Prezzo originale prima dello sconto
//             validate: {                                   // Validazione personalizzata
//                 validator: function(v) {
//                     return v >= this.price.current;       // Verifica che originale sia >= attuale
//                 },
//                 message: 'Prezzo originale deve essere maggiore o uguale al prezzo corrente'
//             }
//         },
//         discount: {
//             percentage: {
//                 type: Number,                            // Percentuale di sconto
//                 min: 0,                                  // Minimo 0%
//                 max: 100                                 // Massimo 100%
//             },
//             validUntil: Date                            // Data di scadenza dello sconto
//         },
//         currency: {
//             type: String,                               // Tipo di valuta
//             default: 'EUR',                            // Euro come valuta predefinita
//             enum: ['EUR', 'USD', 'GBP']               // Lista delle valute accettate
//         }
//     },

//     // === CATEGORIZZAZIONE PRODOTTO ===
//     category: {
//         type: String,                                  // Categoria come testo
//         required: true,                                // Campo obbligatorio
//         enum: ['Electronics', 'Clothing', 'Books', 'Food', 'Other'] // Categorie permesse
//     },
//     tags: [{                                          // Array di tag per il prodotto
//         type: String,                                 // Ogni tag è una stringa
//         lowercase: true                               // Converte automaticamente in minuscolo
//     }],
    
//     // === GESTIONE MAGAZZINO ===
//     stock: {
//         quantity: {
//             type: Number,                             // Quantità come numero
//             required: true,                           // Campo obbligatorio
//             min: [0, 'Quantità non può essere negativa'], // No quantità negative
//             default: 0                                // Parte da 0 se non specificato
//         },
//         reserved: {
//             type: Number,                            // Quantità riservata per ordini
//             default: 0                               // Inizia da 0
//         },
//         status: {
//             type: String,                            // Stato del magazzino
//             enum: ['In Stock', 'Low Stock', 'Out of Stock'], // Stati possibili
//             default: 'In Stock'                      // Stato predefinito
//         }
//     },

//     // === IMMAGINI E MEDIA ===
//     images: [{                                       // Array di oggetti immagine
//         url: {
//             type: String,                           // URL dell'immagine
//             required: true                          // Obbligatorio per ogni immagine
//         },
//         alt: String,                               // Testo alternativo per accessibilità
//         isPrimary: Boolean                         // Flag per immagine principale
//     }],

//     // === SISTEMA RECENSIONI ===
//     ratings: {
//         average: {
//             type: Number,                          // Media delle recensioni
//             min: 0,                                // Minimo 0 stelle
//             max: 5,                                // Massimo 5 stelle
//             default: 0                             // Parte da 0
//         },
//         count: {
//             type: Number,                          // Numero totale recensioni
//             default: 0                             // Inizia da 0
//         }
//     },

//     // === STATO PRODOTTO ===
//     status: {
//         type: String,                             // Stato del prodotto
//         enum: ['draft', 'published', 'archived'], // Stati possibili
//         default: 'draft'                          // Parte come bozza
//     },
//     featured: {
//         type: Boolean,                            // Prodotto in evidenza
//         default: false                            // Non in evidenza di default
//     }
// }, {
//     // === OPZIONI SCHEMA ===
//     timestamps: true,                             // Aggiunge createdAt e updatedAt
//     toJSON: { virtuals: true },                   // Include campi virtuali in JSON
//     toObject: { virtuals: true }                  // Include campi virtuali negli oggetti
// });

// // Virtual per calcolare se il prodotto è in sconto
// advancedItemSchema.virtual('isOnSale').get(function() {
//     return this.price.original > this.price.current;
// });

// // Middleware pre-save per aggiornare lo status dello stock
// advancedItemSchema.pre('save', function(next) {
//     if (this.stock.quantity === 0) {
//         this.stock.status = 'Out of Stock';
//     } else if (this.stock.quantity <= 5) {
//         this.stock.status = 'Low Stock';
//     } else {
//         this.stock.status = 'In Stock';
//     }
//     next();
// });

// const AdvancedItem = mongoose.model('AdvancedItem', advancedItemSchema);
// export default AdvancedItem;




//Appunti:


// 1. Cos'è uno Schema in Mongoose

// Uno schema è il "progetto" o il "modello" che definisce la struttura dei documenti (record) che andrai a salvare in MongoDB. Con uno schema, specifichi:


// Quali campi sono presenti

// I tipi di dati di ciascun campo

// Regole di validazione e configurazione (ad esempio, se un campo è obbligatorio, il valore predefinito, limiti numerici, ecc.)

// 2. Cosa si Può Includere in uno Schema

// a. Tipi di Dati (type)

// Essenziale Dichiarare il Tipo:

// Per ogni campo, è importante dichiarare il tipo (String, Number, Date, Boolean, ecc.) perché:

// Aiuta Mongoose a validare i dati.

// Permette ad Mongoose di effettuare conversioni automatiche se necessario.

// Tipi Comuni:

// String: per testi.
// Number: per numeri.
// Date: per date.
// Boolean: per valori true/false.
// Array: per elenchi di valori.
// ObjectId: per riferimenti ad altri documenti.
// Mixed: per dati di tipo non strutturato (meglio evitarlo se possibile perché perde i benefici della validazione).

// b. Opzioni di Validazione e Configurazione

// Queste opzioni ti permettono di controllare l’integrità e la qualità dei dati:

// required: Indica se il campo è obbligatorio.
// default: Specifica un valore predefinito se non viene fornito.
// unique: Garantisce che il valore sia unico nel database (utile per username, email, ecc.).
// enum: Restringe i valori possibili a un insieme definito.
// min / max: Definisce i limiti per numeri o date.
// match: Usa espressioni regolari per validare stringhe.
// trim: Rimuove gli spazi bianchi iniziali e finali in una stringa.
// index: Permette di creare indici per migliorare le performance delle query.

// Esempio:


// const basicItemSchema = new mongoose.Schema({
//   name: {
//     type: String,      // Tipo: stringa
//     required: true,    // Campo obbligatorio
//     trim: true         // Rimuove spazi iniziali e finali
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0             // Non ammette numeri negativi
//   },
//   date: {
//     type: Date,
//     default: Date.now  // Se non specificata, imposta la data corrente
//   }
// });


// c. Middleware e Hook

// Middleware (Hook): Funzioni che vengono eseguite prima o dopo certe operazioni (come save, validate, remove). Sono utili per:
// Validazioni complesse.
// Modifiche sui dati prima di salvarli (ad esempio, hash delle password).
// Logging e auditing.


// Esempio:



// basicItemSchema.pre('save', function(next) {
//   // Logica da eseguire prima di salvare il documento
//   next();
// });

// d. Virtuals
// Virtuals: Sono proprietà non salvate nel database, ma calcolate al volo quando accedi al documento. Possono essere utili per combinare dati o esporre informazioni derivanti dai campi esistenti.

// e. Indici

// Gli indici sono fondamentali per migliorare le performance delle query. Possono essere definiti a livello di campo (es. index: true) o a livello di schema.

// 3. Aspetti Fondamentali per la Sicurezza dei Dati

// a. Validazione e Sanitizzazione
// Validazione: Usa tutte le opzioni (required, match, min, max, ecc.) per assicurarti che i dati siano nel formato corretto.
// Sanitizzazione: Oltre a validare, pulisci i dati in ingresso. Questo può includere la rimozione di caratteri indesiderati o la normalizzazione degli input, specialmente se provengono da fonti esterne (es. tramite librerie come express-validator).

// b. Protezione da Injection
// Anche se MongoDB non è vulnerabile alla SQL injection, devi comunque controllare e validare i dati per evitare che query manipolate o dati non validi entrino nel database.

// c. Gestione delle Password e Dati Sensibili
// Non salvare mai password o dati sensibili in chiaro. Usa tecniche di hashing (ad esempio, bcrypt) e, se necessario, imposta select: false sul campo per impedirne l’esposizione in query standard.

// d. Rigidità dello Schema
// Definire uno schema stretto aiuta a prevenire che dati indesiderati vengano salvati. Evita l’uso eccessivo di tipi "liberi" (come Mixed) che disabilitano la validazione automatica.

// 4. Cosa è Superfluo o da Evitare

// Campi non necessari: Non includere campi che non utilizzi, per mantenere lo schema semplice e ridurre i possibili punti di errore.
// Uso eccessivo di Mixed: Il tipo Mixed è utile per dati non strutturati, ma usa questo tipo solo se veramente necessario, perché non offre la stessa sicurezza di validazione degli altri tipi.
// Opzioni non necessarie: Se un'opzione non aggiunge valore (es. dichiarare required: false quando è il valore di default), puoi ometterla.

// 5. Approfondimenti per Diventare Bravissimo nel Backend

// Conoscenza di Mongoose e MongoDB

// Documentazione Ufficiale: Studia approfonditamente la documentazione di Mongoose.

// Schema Design: Impara a progettare schemi scalabili ed efficienti. Comprendi la differenza tra embedding e referencing nei dati.

// Validazioni e Custom Validators: Approfondisci come creare validazioni personalizzate per requisiti specifici.

// Middleware: Sperimenta con pre e post hook per gestire logiche complesse.

// Indici e Performance: Comprendi come gli indici influenzano le performance e come configurarli correttamente.

// Sicurezza dei Dati e Best Practices

// Sanitizzazione degli Input: Studia tecniche e librerie per sanitizzare i dati in ingresso.

// Gestione degli Errori: Impara a gestire gli errori in modo da evitare che informazioni sensibili vengano esposte.

// Autenticazione e Autorizzazione: Approfondisci come proteggere le API e i dati, ad esempio integrando JWT o OAuth.

// Crittografia: Informati su come criptare dati sensibili prima di salvarli.

// Testing: Implementa test automatici (unit, integration) per garantire che il tuo schema e le tue validazioni funzionino correttamente.
// Strumenti e Tecnologie Complementari

// Express.js: Per creare API e integrare Mongoose nel tuo backend.

// TypeScript: Per ottenere una tipizzazione statica che riduca errori e migliori la manutenzione del codice.

// Librerie di Validazione: Come Joi o express-validator per ulteriori controlli sui dati in ingresso.


// Conclusioni

// Per eccellere nel backend e garantire la sicurezza dei dati, devi:



// Comprendere e padroneggiare Mongoose: Definire schemi robusti, utilizzare validazioni, middleware, virtuals e indici.

// Implementare misure di sicurezza: Validare, sanitizzare e proteggere i dati in ingresso.

// Studiare le best practices: Non solo in Mongoose, ma anche nelle architetture backend, gestione degli errori, autenticazione e testing.

// Approfondisci ogni aspetto, sperimenta con progetti reali e rimani aggiornato sulle nuove funzionalità e tecniche per garantire applicazioni sicure e performanti. Questo approccio ti permetterà di diventare un vero esperto nel backend e nella gestione sicura dei dati.











//PANORAMICA DEI CAMPI COMUNI NEGLI SCHEMI MONGOOSE



// Ecco una panoramica dei campi più comuni che gli sviluppatori usano negli schemi Mongoose, con una breve spiegazione del significato e dell'utilità di ciascuno:

// _id

// Significato: Identificatore univoco per ogni documento.
// Utilità: Viene creato automaticamente da MongoDB; serve per distinguere in modo univoco ogni record nel database.
// createdAt / updatedAt

// Significato: Timestamp per la creazione e l'ultimo aggiornamento del documento.
// Utilità: Permettono di tenere traccia di quando il documento è stato creato e modificato; sono utili per log, auditing e operazioni basate sul tempo.
// Nota: Mongoose offre un'opzione timestamps per aggiungerli automaticamente allo schema.
// name

// Significato: Nome descrittivo dell'elemento (ad es. nome utente, nome prodotto).
// Utilità: Campo comunemente usato per identificare o etichettare l'entità gestita.
// description

// Significato: Testo descrittivo che spiega le caratteristiche o la funzione dell'elemento.
// Utilità: Utile per fornire ulteriori dettagli che non possono essere riassunti in un semplice nome.
// email

// Significato: Indirizzo email.
// Utilità: Spesso usato negli account utente, per la comunicazione o per login; normalmente accompagnato da validazioni (come pattern regex) per assicurare la correttezza del formato.
// password

// Significato: Credenziale di accesso (generalmente l'hash della password, non la password in chiaro).
// Utilità: Fondamentale per la sicurezza e l'autenticazione degli utenti; va sempre gestito con attenzione (hashing, salatura, ecc.) e spesso impostato su select: false per evitare che venga restituito nelle query.
// address

// Significato: Informazioni sull'indirizzo, che possono essere strutturate come oggetto (ad es. street, city, zip).
// Utilità: Permette di organizzare dati di localizzazione in modo gerarchico e chiaro.
// Esempio:
// js
// Copia
// address: {
//   street: { type: String, required: true },
//   city: { type: String, required: true },
//   zip: { type: Number }
// }
// phone

// Significato: Numero di telefono.
// Utilità: Utilizzato per contatti o verifiche; spesso sottoposto a validazione per formati specifici.
// tags

// Significato: Array di etichette o parole chiave.
// Utilità: Aiuta a categorizzare o raggruppare documenti (ad es. tag per articoli o prodotti).
// Nota: Non è un campo predefinito di Mongoose, ma è comunemente usato perché utile per la ricerca e l'organizzazione dei dati.
// status

// Significato: Stato attuale dell'elemento (ad es. "attivo", "in attesa", "completato").
// Utilità: Permette di gestire il flusso e il ciclo di vita di un record; spesso definito come enum per limitare i possibili valori.
// price

// Significato: Prezzo (numerico).
// Utilità: Essenziale per applicazioni di e-commerce o sistemi di gestione di prodotti, dove occorre trattare valori monetari.
// quantity / stock

// Significato: Quantità disponibile o in stock.
// Utilità: Utile per tenere traccia dell'inventario in applicazioni di vendita al dettaglio.
// image

// Significato: URL o percorso dell'immagine.
// Utilità: Usato per salvare riferimenti a immagini associate al documento, come foto di prodotti o profili utente.
// Note Generali
// Personalizzazione:
// I nomi dei campi (come name, address, zip, ecc.) non sono imposti da Mongoose o Express. Sono scelti in base alle esigenze della tua applicazione e possono essere scritti in inglese o in qualsiasi altra lingua, purché siano chiari e coerenti con il front end.

// Tipizzazione:
// È buona pratica dichiarare sempre il type per ogni campo per sfruttare la validazione e la conversione automatica di Mongoose.

// Singolo tipo: Es. type: String o type: Number per un singolo valore.
// Array di tipo: Es. type: [String] per indicare una lista di stringhe.
// Validazioni e Regole:
// Oltre al tipo, puoi specificare opzioni come required, default, unique, min, max, enum e altro, per garantire l'integrità e la sicurezza dei dati.





//Esempio PANORAMICA DEI CAMPI COMUNI NEGLI SCHEMI MONG:



// const exampleSchema = new mongoose.Schema(
//   {
//     // _id: Viene creato automaticamente da MongoDB come identificatore univoco per ogni documento.

//     // createdAt e updatedAt: Gestiti automaticamente grazie all'opzione timestamps (vedi sotto).

//     // name: Nome dell'elemento (es. nome utente o nome prodotto).
//     name: {
//       type: String,
//       required: true
//     },

//     // description: Descrizione dettagliata dell'elemento.
//     description: {
//       type: String,
//       required: true
//     },

//     // email: Indirizzo email, utile per identificare l'utente o per contatti.
//     email: {
//       type: String,
//       required: true,
//       unique: true  // Garantisce che non ci siano email duplicate nel database.
//     },

//     // password: Password dell'utente (meglio memorizzare l'hash della password, non il testo in chiaro).
//     password: {
//       type: String,
//       required: true,
//       select: false  // Non viene restituito nelle query per motivi di sicurezza.
//     },

//     // address: Oggetto che contiene dettagli dell'indirizzo.
//     address: {
//       // street: Via e numero.
//       street: { type: String, required: true },
//       // city: Città.
//       city: { type: String, required: true },
//       // zip: Codice postale (numero).
//       zip: { type: Number }
//     },

//     // phone: Numero di telefono per contatti.
//     phone: {
//       type: String
//     },

//     // tags: Array di parole chiave per categorizzare l'elemento (es. "elettronica", "novità").
//     tags: {
//       type: [String],
//       default: []  // Se non specificato, parte da un array vuoto.
//     },

//     // status: Stato attuale dell'elemento (es. "active", "pending", "completed").
//     status: {
//       type: String,
//       enum: ['active', 'pending', 'completed'],  // Limita i valori possibili.
//       default: 'active'
//     },

//     // price: Prezzo dell'elemento, importante per prodotti o servizi.
//     price: {
//       type: Number,
//       required: true
//     },

//     // quantity: Quantità disponibile o stock dell'elemento.
//     quantity: {
//       type: Number,
//       required: true
//     },

//     // image: URL dell'immagine rappresentativa dell'elemento.
//     image: {
//       type: String
//     }
//   },
//   {
//     // L'opzione timestamps aggiunge automaticamente i campi createdAt e updatedAt.
//     timestamps: true
//   }
// );

// // Se desideri esportare il modello, ad esempio come 'Product':
// export default mongoose.model('Product', exampleSchema);






//DESCRIZIONE DI OGNUNO:




// _id
// Non specificato nel codice: MongoDB crea automaticamente questo campo come identificatore univoco per ogni documento.

// createdAt / updatedAt
// Gestiti automaticamente: Grazie all'opzione timestamps, Mongoose aggiunge e aggiorna questi campi per tenere traccia della creazione e delle modifiche del documento.

// name
// Il nome dell'elemento (es. nome di un prodotto o di un utente). È un campo obbligatorio.

// description
// Una descrizione che fornisce più dettagli sull'elemento. Anche questo campo è obbligatorio.

// email
// Indirizzo email usato per identificare l'utente o per comunicazioni. È unico e obbligatorio.

// password
// La password dell'utente. In pratica, si dovrebbe salvare l'hash della password per motivi di sicurezza, e impostare select: false evita di restituirla nelle query.

// address
// Un oggetto che raccoglie informazioni relative all'indirizzo:

// street: Via e numero.
// city: Città.
// zip: Codice postale.
// phone
// Numero di telefono per contatti. Non è obbligatorio, ma utile se devi contattare l'utente.

// tags
// Un array di etichette o parole chiave che possono servire a categorizzare l'elemento, ad esempio per la ricerca.




//Status : ti fornisce informazioni sullo stato attuale o sul progresso del documento, utile per gestire processi e flussi di lavoro.

// Status:
// indica lo stato corrente del documento o dell'entità.

// Utilità:
// Serve per monitorare il ciclo di vita o il progresso di un elemento.
// Ad esempio, in un sistema di gestione degli ordini, lo status può essere "in attesa", "in lavorazione", "spedito" o "consegnato".
// In un'applicazione di task management, lo status potrebbe essere "da fare", "in corso" o "completato", aiutando a capire rapidamente a che punto è ogni attività.


//UTILITà E SPIEGAZIONE TAGS:

// Immagina di avere un e-commerce o un blog: i tags sono come delle etichette che permettono di classificare i contenuti. Ecco alcuni usi pratici:

// Facilitare la ricerca e il filtraggio:
// Se ogni prodotto o articolo ha dei tag, gli utenti possono cliccare su "elettronica", "novità", o "in offerta" per vedere solo gli elementi che corrispondono a quella categoria. Ad esempio, in un negozio online, i tag aiutano a filtrare i prodotti in base a caratteristiche comuni.

// Organizzare e raggruppare i contenuti:
// I tag servono per raggruppare elementi simili. Se un blog ha articoli con i tag "tecnologia", "innovazione" e "startup", un lettore interessato a questi argomenti può facilmente trovare tutti gli articoli correlati.

// Migliorare l’esperienza utente:
// Offrendo opzioni di filtraggio basate sui tag, gli utenti possono navigare il sito in modo più intuitivo, trovando più rapidamente ciò che cercano.

// In sostanza, i tags non sono solo un attributo di un JSON: sono strumenti utili per organizzare, cercare e filtrare i dati all'interno della tua applicazione, migliorando l'usabilità e la navigazione per gli utenti.


/* 
{
    "name": "Prodotto X",
    "description": "Descrizione qui...",
    "price": 99.99,
    "tags": ["novità", "elettronica"],
    ...
  }
  
 */


