// Importiamo i moduli necessari per il nostro server



import dotenv from 'dotenv';          // Per gestire le variabili d'ambiente (.env)
import express from 'express';         // Framework per creare il server
import open from 'open';              // Per aprire automaticamente il browser
import mongoose from 'mongoose';       // Per connettere e gestire MongoDB
import cors from 'cors';              // Per permettere richieste cross-origin




 // Importiamo il modello item
// Modulo os: fornisce utility per interagire con il sistema operativo
// - os.cpus().length: numero di core CPU del sistema
// - os.totalmem(): memoria totale del sistema in bytes
// - os.platform(): nome del sistema operativo
import os from 'os';  


// importiamo i file che contengono le routers delle chiamate API 
import userRouter from './router/userRouter.js';
import postRouter from './router/postRouter.js';



// Disabilita la pluralizzazione automatica di Mongoose, in caso non volessi la s automatica al nome dei modelli che creo con Mongoose
//mongoose.pluralize(null);

 // ! ALCUNI PASSAGGI POSSONO RISULTARE CONFUSI MA SONO IN REALTà IL RISULTATO DI AVER USATO DEI COMPONENTI TUTTI SU UN UNICO FILE( ERANO LE LEZIONI PRINCIPALI)

// ! 1) Attiviamo dotenv per leggere il file .env
     dotenv.config();

// ! 2) Definiamo la porta. Se non trova PORT in .env, usa 5000
const PORT = process.env.PORT || 5000;  // se non trova PORT in .env, usa 5000

// ! 3) Creiamo l'istanza(varibile-oggetto) del server Express
const server = express();

// ! 4)Creiamo un router per gestire le routes
//const router = express.Router();




// ! 5) middleware

server.use(cors());    // Abilita CORS per tutte le richieste

//Versione estesa:
// server.use(cors({
//     origin: 'http://localhost:3000', // Solo il tuo frontend React
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metodi permessi
//     allowedHeaders: ['Content-Type'] // Headers permessi
// }));

// Versione avanzata:

// server.use(cors({
//     // 1. Origin: controlla da quali domini accettare richieste
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',  
    
//     // 2. Methods: quali operazioni HTTP sono permesse
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    
//     // 3. Headers: quali intestazioni HTTP sono accettate
//     allowedHeaders: ['Content-Type', 'Authorization'],
    
//     // 4. Credentials: permette l'invio di cookie e auth headers
//     credentials: true,
    
//     // 5. MaxAge: quanto tempo il browser memorizza il risultato preflight
//     maxAge: 3600  // in secondi (1 ora)
// }));


// Usa valori diversi per sviluppo e produzione
//maxAge: process.env.NODE_ENV === 'production' ? 86400 : 300













// Middleware per leggere JSON dal body delle richieste

server.use(express.json());           // Permette di leggere JSON dal body delle richieste
// ! 6) server.use(router); // Usa il router per gestire le routes, collega il router al server 
// !FATTA QUI IL COLLEGAMENTO DEL SERVER ALLE ROTTE DELLE API, INVECE CHE NEL FILE DELLE ROTTE( PRIME LEZIONI, MA VA FATTA IN UN ALTRO FILE)
//Oppure:
// server.use('/api', router); // Usa il router per gestire le routes, collega il router al server




// ! 6) Collegamento del server alle routes delle API, userRouter e postRouter file delle rotte importati in questo file 

server.use('/api/v3/blog/', userRouter); // Usa il router per gestire le routes, collega il router al server


server.use('/api/v3/blog/',postRouter); // Usa il router per gestire le routes, collega il router al server


// ! ATTENTO SE LA ROTTA DEL TUO SITO E' SCRITTA QUI PER ESTESO, NEL FILE DELLE ROTTE (postRouter.js, userRouter.js) , 

// ! nei file delle rotte assicurati di scrivere la forma /, e poi il tuo endpoint personalizzato (esempio: /posts), per / sta per http//:localhost:5000/api/v3/blog






// COMUNICAZIONE STATELESS VS STATEFUL:

// STATELESS (Frontend ↔️ Backend):
// - Non mantiene stato tra le richieste
// - Ogni richiesta è indipendente e contiene tutte le info necessarie
// - Il server non ricorda le richieste precedenti
// - Usa HTTP (protocollo stateless)
// - Più facile da scalare
// Esempio:
// const response = await fetch('/api/item') // Ogni chiamata è nuova e indipendente

// STATEFUL (Backend ↔️ MongoDB):
// - Mantiene una connessione persistente
// - Ricorda lo stato della connessione
// - Pool di connessioni gestito da Mongoose
// - Più efficiente per operazioni database
// - Richiede gestione dello stato
// Esempio:
// mongoose.connect() // Mantiene connessione attiva


// ! 7) Avviamo la connessione tra Mongoose a MongoDB:

//MongoDB connection

// Questo gestisce solo errori durante la connessione iniziale
mongoose.connect(process.env.MONGODB_CONNECTION_URI) // se mettevo dopo URI , {} era lo stesso
    .then(() => console.log('✅ Connesso'))
    .catch(err => console.error('❌ Errore:', err));

    //QUI :
    // Backend (Node.js) si connette direttamente a MongoDB

    //sPIEGAZIONE DI CONNESSIONE TRA FRONTEND E BACKEND E TRA BACKEND E MONGODB MERN:
    // Frontend (React) ←→ HTTP/fetch ←→ Backend (Node.js) ←→ Mongoose ←→ MongoDB
    // [localhost:3000]     requests     [localhost:5000]    connection  [localhost:27017]


    


    // in caso il server si arresta crasha, o vai offline,
    //  il server si riavvia automaticamente

mongoose.connection.on('connected', () => {  //'connected' tra apici è il nome dell'evento( event listener) che mongoose emette quando stabilisce la connessione. È uno dei tanti eventi che mongoose può emettere. e fa partire la funzione anonima
    console.log('✅ Connesso a MongoDB');
});

// Questo gestisce errori che possono verificarsi in qualsiasi momento
mongoose.connection.on('error', (err) => { // puoi anche evitare err fra parentesi e scrivere solo err
    console.error('❌ Errore MongoDB:', err); // err è l'errore che mongoose passa alla funzione è un parametro che contiene l'ogetto dell'errore
});


//mongoose.connect(...) stabilisce la connessione e il metodo .then() conferma che la connessione è avvenuta.
//mongoose.connection è l'oggetto che rappresenta quella connessione. Non devi specificare "MongoDB" nel nome perché Mongoose gestisce internamente il collegamento al database MongoDB; l'oggetto connection è già riferito al tuo database.


//mongoose.connect() è il comando che apre la connessione al database usando le informazioni (URI) che gli fornisci.
//mongoose.connection è l'oggetto che rappresenta quella connessione, e il suo metodo .on('error', ...) si assicura che ogni errore che si verifica venga catturato e gestit


//Se vuoi connetterti a più database all'interno della stessa applicazione, puoi usare mongoose.createConnection() per ogni database, definendo modelli specifici per ciascuna connessione.





// Avviamo il server sulla porta specificata

// senza questa rotta alla pagina principale, il server non risponderà a nessuna richiesta GET generica senza un percorso specifico o endpoint
// Questo è un endpoint di base per verificare che il server sia attivo

// router.get('/api/v3/blog', (req, res) => {
//     res.status(200).send('Server attivo');
//  });  // IMPORTATA IN userRouter.js





server.listen(PORT, async () => {
    console.clear();                                      // Puliamo il terminale
    console.log(`🚀 Server attivo su http://localhost:${PORT}/api/v3/blog`);  // Log di conferma
    
    // Verifichiamo che il server sia effettivamente attivo prima di aprire il browser
    try {
        // Tentiamo una richiesta al server per verificare che risponda
        const server = await fetch(`http://localhost:${PORT}/api/v3/blog`);
        
        // Se il server risponde correttamente (status 200-299)
        if (server.ok) {
            await open(`http://localhost:${PORT}/api/v3/blog`);              // Apriamo il browser solo se il server è attivo
        }
    } catch (error) {
        console.log('Server non attivo, browser non aperto');    // Log se il server non risponde
    }
    
    // Informazioni di sistema fornite dal modulo os
    console.log(`CPU cores: ${os.cpus().length}`);           // Mostra il numero di core CPU
    console.log(`Total memory: ${Math.floor(os.totalmem() / 1024 / 1024)} MB`); // Converte bytes in MB
    console.log(`Platform: ${os.platform()}`);               // Mostra il sistema operativo
});


//spiegazione codice di uscita del server:

// Se fai Ctrl+C, il server si ferma e la porta 5000 viene liberata, quindi non c'è nulla in ascolto su quella porta. La fetch fallirà perché:
// Nessun servizio ascolta sulla porta 5000.


//Versione abbreviata:

// server.listen(PORT, async () => {
//     console.clear();                                      // Puliamo il terminale
//     console.log(`🚀 Server attivo su http://localhost:${PORT}`);  // Log di conferma
//     await open(`http://localhost:${PORT}`);              // Apriamo il browser
    
//     // Informazioni di sistema fornite dal modulo os
//     console.log(`CPU cores: ${os.cpus().length}`);           // Mostra il numero di core CPU
//     console.log(`Total memory: ${Math.floor(os.totalmem() / 1024 / 1024)} MB`); // Converte bytes in MB
//     console.log(`Platform: ${os.platform()}`);               // Mostra il sistema operativo
// });



//commento di ogni riga di codice: 


// // Avvia il server e inizia ad ascoltare sulla porta specificata (PORT)
// // Questo significa che il server è attivo, riceve richieste sulla porta indicata e può rispondere.
// server.listen(PORT, async () => {
//     // Pulisce il terminale per avere un output pulito
//     console.clear();
    
//     // Stampa un messaggio di conferma che il server è attivo e in ascolto
//     console.log(`🚀 Server attivo su http://localhost:${PORT}`);
    
//     // Proviamo a verificare se il server risponde correttamente prima di aprire il browser
//     try {
//         // Effettuiamo una richiesta HTTP al server stesso usando fetch().
//         // La funzione fetch() restituisce subito una Promise che, una volta risolta, fornisce un oggetto Response.
//         // Questo oggetto Response contiene la proprietà 'status' (ad esempio 200) e 'ok' (true se status è tra 200 e 299).
//         const serverResponse = await fetch(`http://localhost:${PORT}`);
        
//         // A questo punto, il server ha risposto con un oggetto Response che contiene, ad esempio:
//         //   - serverResponse.status: 200 (se la risposta è OK)
//         //   - serverResponse.ok: true (perché 200 rientra nel range 200-299)
//         // Se la risposta del server è positiva, allora 'ok' sarà true e il codice entra nell'if.
//         if (serverResponse.ok) {
//             // Se il server risponde correttamente (ad esempio, con 200 OK),
//             // apriamo il browser all'indirizzo del server.
//             await open(`http://localhost:${PORT}`);
//         }
//     } catch (error) {
//         // Se si verifica un errore (ad esempio, il server non risponde),
//         // stampiamo un messaggio di errore nel terminale.
//         console.log('Server non attivo, browser non aperto');
//     }
    
//     // Informazioni di sistema ottenute dal modulo os:
//     // - Mostra il numero di core CPU disponibili
//     console.log(`CPU cores: ${os.cpus().length}`);
//     // - Mostra la memoria totale convertita da byte a megabyte
//     console.log(`Total memory: ${Math.floor(os.totalmem() / 1024 / 1024)} MB`);
//     // - Mostra la piattaforma (sistema operativo) in uso
//     console.log(`Platform: ${os.platform()}`);
// });

// Aggiungiamo un delay per assicurarci che il server sia pronto prima di procedere
// await new Promise(resolve => setTimeout(resolve, 1000));













// Una Promise è come una scatola in cui mettiamo il risultato di un’operazione asincrona che non è ancora completata. Risolvere una Promise significa che l’operazione è finita e la Promise ora contiene il suo risultato.

// Nel caso di fetch(), la Promise restituita non contiene ancora i dati trasformati in JSON. Quando la Promise si "risolve", il risultato è un oggetto Response che rappresenta la risposta HTTP del server. Se vuoi i dati in formato JSON, devi chiamare il metodo .json() su quell’oggetto Response, che a sua volta restituisce un’altra Promise che, una volta risolta, fornisce i dati in formato JSON.

// In sintesi:

// Risolvere una Promise significa ottenere il risultato finale dell’operazione asincrona (nel caso di fetch, l’oggetto Response).
// La Promise iniziale non contiene direttamente i dati in JSON; è l’oggetto Response che ti permette di accedere al corpo della risposta, e per trasformarlo in JSON usi .json().





















//TEST PER IL SERVER, SUL TERMINALE:

// //# Test GET - verifica se il server risponde
// curl http://localhost:5000

// //# Test POST - invia dati al server
// curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"test\",\"description\":\"test\",\"price\":99}" http://localhost:5000/api/item

// SCALING CON PM2:
// PM2 è un gestore di processi per Node.js che permette di:
// 1. Scalare l'applicazione su più core CPU
// 2. Mantenere l'app sempre attiva
// 3. Ricaricare l'app senza downtime
// 4. Monitorare le prestazioni

// COMANDI PRINCIPALI PM2:
// # Installa PM2 globalmente
// npm install -g pm2

// # Avvia l'app usando tutti i core disponibili
// pm2 start server.js -i max    // Nel tuo caso userà tutti i 12 core

// # Avvia con numero specifico di istanze
// pm2 start server.js -i 4      // Avvia 4 istanze

// # Comandi di gestione
// pm2 list                      // Lista delle app in esecuzione
// pm2 monit                     // Monitor real-time
// pm2 logs                      // Visualizza i log
// pm2 stop all                  // Ferma tutte le istanze
// pm2 delete all               // Rimuove tutte le istanze
// pm2 reload all               // Ricarica tutte le istanze

// NOTA: Il tuo server ha:
// - ${os.cpus().length} CPU cores disponibili
// - ${Math.floor(os.totalmem() / 1024 / 1024)} MB di RAM totale
// - Sistema operativo: ${os.platform()}

// BEST PRACTICES:
// 1. Non usare tutti i core, lasciarne alcuni per il sistema operativo
// 2. Monitora l'uso della memoria con 'pm2 monit'
// 3. Usa 'pm2 reload' invece di 'pm2 restart' per zero downtime
// 4. Considera di usare PM2 con Docker per una migliore portabilità




//Usa mkdir per creare nuove cartelle ( folder)

// npx create-react-app . con il . scarica direttamente l'app react nella cartella corrente, senza creare una cartella con il nome dell'app





// E' PIU VELOCE METTERE URL DI AVATAR IN BACK END INVECE CHE FRONT? 
// COME METTO L'ELEMENTO AVATAR IN BACK END? NELLO SCHEMA?
// PERCHPè METTI COVER NEL SINGLE ? DI UPLOAD? 
// MULTIPART CHIAMATA API PER IMMAGINI? 

//LA STRUTTURA DI CORS COME EVITARE I POP UP 


//req.query. perché in che caso ? che significa quella sintassi




// mongosh ?


// istanza? 




// non è un problema che si visualizzano i giri dell'hash?

 
//mailtrap