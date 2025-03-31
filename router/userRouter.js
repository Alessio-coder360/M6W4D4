import { Router } from 'express';
import Item from '../models/item.js';  

import User from '../models/user.js';

const router= Router();

/* 
 * REGOLE IMPORTANTI PER IL ROUTING EXPRESS:
 * 
 * 1. PERCORSI ENDPOINT:
 *    - Personalizza SEMPRE il percorso dell'endpoint in base alla risorsa/azione
 *    - Express usa SOLO la parte prima del "?" per determinare quale handler( UESTO È L'HANDLER -> function(req, res) Codice che gestisce la richiesta )  eseguire
 *    - Endpoint: L'URL a cui viene fatta la richiesta (es. /api/v3/blog/items) Handler: La funzione che viene eseguita quando una richiesta arriva a quell'endpoint
 * 
 * 
 *    - Se più rotte hanno lo stesso percorso (/api/v3/blog), solo l'ultima sarà attiva!
 * 
 * 2. PARAMETRI QUERY:
 *    - I parametri query (dopo "?") non influenzano quale rotta viene selezionata
 *    - Es: /api/v3/blog/posts?author=mario&sortBy=date → handler di /api/v3/blog/posts
 *    - Accessibili tramite req.query (es: req.query.author, req.query.sortBy)
 *    - NON c'è confusione anche se il nome del parametro query è uguale a un segmento del percorso!
 *      Es: '/api/v3/blog/items' (endpoint) e '?model=items' (query) sono gestiti separatamente
 * 
 * BEST PRACTICES:
 *    - Endpoint plurali per collezioni: /posts, /users, /items
 *    - Endpoint singolari con ID per risorse specifiche: /posts/:id
 *    - Utilizzare nomi descrittivi: /api/v3/blog/latest, /api/v3/blog/popular
 */

// ! ATTENZIONE : Express gestisce le rotte in modo sequenziale e quando trova più definizioni con lo stesso percorso esatto (/api/v3/blog), 
// ! solo l'ultima definita sarà attiva. QUINDI PERSONALIZZA LE ROTTE. 


// ! RICORDAA http://localhost:5000/api/v3/blog/posts?author=mario&sortBy=date
// !                                                 ↑    ↑     ↑     ↑
// !                                              inizio nome  valore altro
// !                                              query param  param  param
// !                                               (?)


// ! → Marca l'inizio della sezione dei parametri di query
// ! author → Nome del parametro (chiave)
// ! = → Separatore tra nome e valore
// ! mario → Valore del parametro
// ! & → Separatore tra parametri multipli

















//ROUTES

//GET



// Avviamo il server sulla porta specificata

// senza questa rotta alla pagina principale, il server non risponderà a nessuna richiesta GET generica senza un percorso specifico o endpoint
// Questo è un endpoint di base per verificare che il server sia attivo

// VERSIONE CORRETTA

router.get('/', (req, res) => {
        // ⚠️ NON serve 'async' qui perché:
    // 1. Non ci sono operazioni asincrone (Promise) all'interno della funzione
    // 2. Il metodo res.send() è SINCRONO - esegue immediatamente, non ritorna Promise
    // 3. Non usiamo 'await' da nessuna parte nella funzione
   
    res.status(200).send('Server attivo');
        // ⚠️ NON serve 'await' qui perché:
    // 1. res.status().send() NON restituisce una Promise
    // 2. È un'operazione di I/O che Express gestisce internamente
    // 3. L'operazione si completa senza bisogno di attendere
});




//Rotta per ottenere tutti gli item

router.get('/api/v3/blog/items', async (req, res) => {    
    // /         -> root del server (http://localhost:5000/)
    // api/      -> namespace/prefisso per distinguere le route API
    // item      -> risorsa specifica che stiamo richiedendo
    try {
       
        const datas = await Item.find({}); // Spiegazione: Usare {} significa non applicare alcun filtro...
        
        // Se arriviamo qui, non c'è stato errore
        res.status(200).json(datas); // Invia i dati trovati
        
    } catch(err) {

        // Gestisce qualsiasi errore durante la query
        res.status(500).json({message: 'Errore nel server'});
    }
   
});

//Rotta per ottenere tutti i Posts eccetto la password: 

// router.get('/api/v3/blog/posts', async (request,response) => {
//     try{
//         const datas=await Post.find({}).select('-password'); // Spiegazione: select('-password') esclude il campo "password" dai risultati
//         response.status(200).json(datas); // Invia i dati trovati 
//     }
//     catch(err){
//         response.status(500).json({message: 'Errore nel server'});

//     }
// })


// ! qui abbiamo fatto una get, una semplice chiamata get ma personalizzata con l'endopoint posts, l'importante qui è la struttura interna, 
// ! in quanto abbiamo selezionato tutto con find e {}, ma abbiamo escluso il campo password con select('-password'). 
 



//SE VOGLIO CREARE UN ROTTA CHE RESTITUISCE TUTTO O PIù DATI  IN UNA SINGOLA GET , ANZICHE FARE PIù ROTTE SEPARATE POSSO:


// router.get('/api/v3/blog/all', async (req, res) => {
//     try {
//         // Esegui query parallele per ottimizzare la performance:

//         const [items, posts] = await Promise.all([
//             Item.find({}),
//             Post.find({})
//         ]);
        
//         // Combina in un unico oggetto di risposta:

//         res.status(200).json({
//             items,
//             posts
//         });
//     } catch(err) {
//         res.status(500).json({message: 'Errore nel server'});
//     }
// });




//ALTRO MODO SE UsI parametri di query per richiedere dati specifici: 


// router.get('/api/v3/blog/mixed', async (req, res) => { // ? mixed è un endpoint personalizzato solo per distinguerlo dalle altre rotte per non confondermi
//     try {
//         const { model } = req.query; // ?model=posts o ?model=items destrutturazione di req.query
        
//         let data; // ! la variabile per adesso è undefined
//         if (model === 'posts') {
//             data = await Post.find({}); // ! lo assegni qui 
//         } else if (model === 'items') {
//             data = await Item.find({}); // ! o qui 
//         } else {
//             return res.status(400).json({message: 'Modello non supportato'});
//         }
        
//         res.status(200).json(data);
//     } catch(err) {
//         res.status(500).json({message: 'Errore nel server'});
//     }
// });







//POST


// router.post('/api/v3/blog/item', async (req, res) => {
//     try{
//         const newItem = new item(req.body); // Creiamo un nuovo oggetto item con i dati ricevuti
//         await newItem.save();               // Salviamo il nuovo oggetto nel database
//         res.status(201).json(newItem);      // Rispondiamo con il nuovo oggetto creato
//     }catch(err){
//         res.status(500).json({message: 'Errore nel server'}); // Rispondiamo con un errore 500 in caso di problemi
//     }
// });


//meglio questa versione:

router.post('/api/v3/blog/item', async (req, res) => {
    try{
        const {name, description, price}= req.body; // Estraiamo i dati ricevuti
        const newItem = new Item({name, description, price}); // Creiamo un nuovo oggetto item con i dati ricevuti
        await newItem.save();               // Salviamo il nuovo oggetto nel database
        res.status(201).json(newItem);      // Rispondiamo con il nuovo oggetto creato
    }catch(err){
        res.status(500).json({message: 'Errore nel server'}); // Rispondiamo con un errore 500 in caso di problemi
    }
})


//PUT

router.put('/api/v3/blog/:id', async (req, res)=>{
    try{
        const {name, description, price} = req.body; // Estraiamo i dati ricevuti
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, {name, description, price}, {new: true}); // Cerchiamo l'oggetto da aggiornare e lo aggiorniamo /  item.findByIdAndUpdate / item: rappresenta il modello Mongoose (o un altro ORM) che interagisce con il database, relativo alla collezione o tabella "item". findByIdAndUpdate: È un metodo fornito da Mongoose che permette di cercare un documento nel database tramite il suo ID e aggiornarlo in un'unica operazione.
        
        //La chiamata a findByIdAndUpdate ha tre parametri:
        // Primo: req.params.id – l’identificativo del documento da aggiornare.( coordinata dell'oggetto da aggiornare)
        //Secondo: {name, description, price} – l’oggetto contenente i nuovi valori che devono essere applicati al documento.( target dell'aggiornamento)
        //Terzo: {new: true} – un oggetto di opzioni che dice a Mongoose di restituire il documento aggiornato. Se non specifichi questa opzione, Mongoose restituirà il documento prima che sia stato aggiornato, il che non è molto utile. (opzione di configurazione dell'aggiornamento)
        

        if(!updatedItem) return res.status(404).json({message: 'Oggetto non trovato'}); // Se l'oggetto non esiste, restituiamo un errore 404   
        
        
        
        res.status(200).json(updatedItem); // Rispondiamo con l'oggetto aggiornato
    }catch(err){
        res.status(500).json({message: 'Errore nel server'}); // Rispondiamo con un errore 500 in caso di problemi
    }
});


//DELETE

router.delete('/api/v3/blog/:id', async (req, res)=>{
    try{
        const deletedItem = await Item.findByIdAndDelete(req.params.id); // Cerchiamo l'oggetto da eliminare e lo eliminiamo
        if(!deletedItem) return res.status(404).json({message: 'Oggetto non trovato'}); // Se l'oggetto non esiste, restituiamo un errore 404       
        res.status(200).json(deletedItem); // Rispondiamo con l'oggetto eliminato
    }catch(err){
        res.status(500).json({message: 'Errore nel server'}); // Rispondiamo con un errore 500 in caso di problemi
    }
});







//BACK END DANIELE : 


// Rotta POST per la registrazione : 

router.post('/register', async(request,response) => 
{
    try{   
const {firstName, lastName, email, password} = request.body; // Estraiamo i dati ricevuti
const newUser = new User ({firstName, lastName,email,password}); // Creiamo un nuovo oggetto User con i dati ricevuti ed poi estratti 
await newUser.save(); // Salviamo il nuovo oggetto nel database
response.status(201).json(newUser);} // Rispondiamo con il nuovo oggetto creato
catch(err){
    console.error('Errore durante la registrazione:', err);
    response.status(500).json({message: err.message || 'Errore nel server'});
    // response.status(500).json({message: 'Errore nel server'}); // Rispondiamo con un errore 500 in caso di problemi
}


})

// Rotta POST per il login :

router.post('/login', async(request,response) =>
    {
    try {
        const {email, password} = request.body // Estraiamo i dati ricevuti}
        const user= await User.findOne({email});        

        !user                                             // Condizione 1: L'utente NON esiste?
        ? response.status(404).json({message: 'Utente non trovato'})   // Se true: Utente non trovato (404)
        : (password === user.password                 // Altrimenti, Condizione 2: Password corretta?
            ? response.status(200).json(user)         // Se true: Login con successo (200)
            : response.status(400).json({message: 'Password errata'}) // Se false: Password errata (400)

            //Con il ternaro puoi usare le parentesi per raggruppare condizioni multiple:

            // (user && password === user.password) ? response.status(200).json(user) : response.status(400).json({message: 'Credenziali errate'});
    
              // Qui le parentesi ( ) raggruppano le due condizioni con AND(&&) logico L'intera espressione è true solo se entrambe le condizioni sono vere:
              // 1) condizione: user 
              // 2) condizione: password === user.password)
              //Non distingue tra utente non trovato e password errata (un solo messaggio di errore)




             // Usando && :


        //!user && response.status(404).json({message: 'Utente non trovato'});   
        // ↑ Se !user è TRUE (utente non esiste), esegue la parte dopo &&
        
        // user && password !== user.password && response.status(400).json({message: 'Password errata'});
        // ↑ Se user esiste (TRUE) E password è sbagliata (TRUE), esegue la risposta di errore
        
        // user && password === user.password && response.status(200).json(user);
        // ↑ Se user esiste (TRUE) E password è corretta (TRUE), esegue il login


        // && + || : 

        // (!user && response.status(404).json({message: 'Utente non trovato'})) || 
        // (user && password !== user.password && response.status(400).json({message: 'Password errata'})) ||
        // (user && password === user.password && response.status(200).json(user));

        //Le parentesi aiutano a raggruppare correttamente l'espressione e rendono il codice più leggibile.

         
         

        // If/else tradizionale
        // if (!user) {                                      // Se l'utente NON esiste
        //     return response.status(404).json({message: 'Utente non trovato'});
        //     // ↑ return interrompe l'esecuzione della funzione qui
        // }
        
        // if (password !== user.password) {                 // Se la password è sbagliata
        //     return response.status(400).json({message: 'Password errata'});
        //     // ↑ return interrompe l'esecuzione della funzione qui
        // }
        
        // Se arriviamo qui, sia l'utente che la password sono corretti
        // return response.status(200).json(user); 
         
         
    
         
        )}
           
        catch(error){
            response.status(500).json({message: 'Errore nel server'}); // Rispondiamo con un errore 500 in caso di problemi
        }
        
        

    })




//Rotta GET per ottenere tutti gli users eccetto la password: 

router.get('/posts', async (request,response) => {
    try{
        const datas=await User.find({}).select('-password'); // Spiegazione: select('-password') esclude il campo "password" dai risultati
        response.status(200).json(datas); // Invia i dati trovati 
    }
    catch(err){
        response.status(500).json({message: 'Errore nel server'});
    }
})















    
// Rotta PUT per aggiornare un utente :

router.put('/:id', async (req, res)=> {

try{
    
    const {firstName, lastName, email, password}= req.body; // Estraiamo i dati ricevuti
    
    const updateUser = await User.findByIdAndUpdate({_id: req.params.id}, {firstName, lastName, email, password}, {new: true});
   
    res.status(200).json(updateUser); // Rispondiamo con l'oggetto aggiornato

}

catch (err){ 
    response.status(500).json({message:'Errore nel server'}); // Rispondiamo con un errore 500 in caso di problemi

}
})



  // Altro Approccio (migliore) per il put:


  router.put('/:id', async (req, res)=> {

    try{

// 1. Inizializzazione: Creiamo un oggetto vuoto che conterrà solo i campi da aggiornare
const updateFieldsUser = {};


// 2. Verifica e assegnazione condizionale per firstName


if (req.body.firstName) updateFieldsUser.firstName = req.body.firstName;

//Condizione: if (req.body.firstName) verifica se esiste un campo firstName nella richiesta

//Logica: Se la proprietà esiste (è truthy - non undefined, non null, non stringa vuota)

//Assegnazione: Solo in questo caso, copia il valore dall'input (req.body.firstName) nell'oggetto updateFields cioè updateFieldsUser.firstName = req.body.firstName;

if (req.body.lastName) updateFieldsUser.lastName = req.body.lastName;
if (req.body.email) updateFieldsUser.email = req.body.email;
// Nota: potresti voler gestire la password in modo diverso per motivi di sicurezza

// 5. Esecuzione dell'aggiornamento con i soli campi specificati

// la const updateUser serve come oggetto da restituire in response: 

const updateUser = await User.findByIdAndUpdate( 
    req.params.id,     // ID dell'utente da aggiornare
    updateFieldsUser,      // Oggetto che contiene SOLO i campi da modificare
    {new: true}        // Opzione per ricevere il documento aggiornato
);

res.status(200).json(updateUser); // Rispondiamo con l'oggetto aggiornato

}

catch (err){ 
    response.status(500).json({message:'Errore nel server'}); // Rispondiamo con un errore 500 in caso di problemi

}
})


// la funzione findByIdAndUpdate Operazione atomica: findByIdAndUpdate() esegue l'aggiornamento in un'unica operazione a livello database
// perciò se lo si usa non serve .save().
//Il parametro {new: true} dice a Mongoose di restituire il documento DOPO che è stato aggiornato

// .findById ha bisogno di .save().


    










// Aggiungi questo export alla fine del file, dopo tutte le route



export default router;


// se usi deafult puoi rinominare il componente che importi in un altro file senza usare import { nomeOginaleComponente  as nuovoNome } from './..., 
// se non usi default devi usare il nome esatto del componente che importi oppure la modalità con as 













// la differenza tra LA QUERY DEL GET ( PRESENTE NELL'URL ) E LA QUERY DEL POST ( PRESENTE NEL BODY ) è che la query del get è visibile nell'url, mentre la query del post è nascosta nel body della richiesta.



// la configurazione del middleware: Nel tuo server.js, hai questa riga: server.use(express.json());

// Questo middleware dice a Express di cercare dati JSON nel corpo di ogni richiesta Quando arriva una richiesta POST, Express vede che è una richiesta di tipo POST (non GET) Nota gli header Content-Type: application/json

// 1) Il middleware express.json() legge il corpo della richiesta; 2) Converte automaticamente quel JSON in un oggetto JavaScript ; Mette questo oggetto in req.body

//Il corpo della richiesta è una parte standard di HTTP, non è un'aggiunta di Express. Express fornisce solo strumenti per lavorare più facilmente con questi dati.


//Le richieste GET possono avere molti altri headers (cookie, autenticazione, caching, ecc.), ma non hanno tipicamente quelli relativi al contenuto del corpo, perché non hanno un corpo.


// la differenza tra GET e POST spiegata semplicemente:
// Immagina che stai mandando messaggi al server in due modi diversi: Richieste GET: Cartolina postale 📬, Tutto ciò che scrivi è visibile a tutti
// Il tuo messaggio è scritto direttamente sulla cartolina (nell'URL dopo il ?), C'è poco spazio - puoi scrivere solo messaggi brevi
// Esempio: http://sito.com/gelati?gusto=cioccolato&panna=si


// Richieste POST: Lettera in busta chiusa 📨 : Il tuo messaggio è dentro la busta (il corpo della richiesta)
// Nessuno vede cosa c'è dentro tranne il destinatario. C'è molto più spazio - puoi scrivere messaggi lunghi
// L'indirizzo sulla busta è solo http://sito.com/ordina-gelato (senza dati visibili)

// Come funziona una richiesta POST
// Quando mandi una lettera (POST), scrivi:

// Sull'esterno della busta: L'indirizzo del destinatario (/api/v3/blog/register)
// Sull'esterno della busta: Che tipo di lettera è (Content-Type: application/json)
// Dentro la busta: Il tuo messaggio ({"firstName": "Mario", "password": "segreto"})
// Il postino (TCP) consegna la busta al palazzo (server)

// Il portiere (Express) vede che è una lettera importante e la passa all'ufficio giusto

// L'assistente (express.json()) apre la busta, legge il messaggio e lo mette sulla scrivania (req.body)

// Finalmente, il tuo codice può leggere facilmente il messaggio dalla scrivania

// Anche se i dati non sono nell'URL, arrivano comunque al server - sono solo in una "busta" separata!


// Una richiesta HTTP (il messaggio che invia il tuo browser al server) è composta da due parti principali:

// Header (Intestazioni): contengono informazioni tecniche, come il tipo di contenuto e la lungata dei dati.
// Body (Corpo): contiene i dati veri e propri, cioè il messaggio che stai inviando.
// Queste due parti sono separate da una linea completamente vuota.

// Esempio di richiesta POST semplice:

// POST /login HTTP/1.1

// Host: esempio.com
// Content-Type: application/x-www-form-urlencoded
// Content-Length: 29

// utente=mario&password=segreta
// Come puoi vedere, dopo la linea vuota ci sono i dati veri e propri che vogliamo mandare al server.

// 3. Flusso di dati sulla rete (come raggiungono il server)?
// I dati viaggiano così:

// Quando clicchi "Invia", il browser mette tutti i dati che hai scritto in un messaggio HTTP.
// Poi, il browser impacchetta questo messaggio HTTP dentro una connessione TCP.
// Il TCP è come un tubo affidabile e sicuro che collega il tuo browser al server. È come un tunnel sicuro che garantisce che i dati arrivino correttamente e in ordine.
// Attraverso questo tubo (TCP), il messaggio HTTP viaggia da un computer (il tuo) fino al server. Il percorso esatto attraversa varie reti e dispositivi, ma il tubo (TCP) fa sì che il messaggio rimanga sicuro e ordinato.
// Quando il server riceve questo messaggio, vede prima le intestazioni (headers), poi incontra la linea vuota e sa che tutto ciò che arriva dopo sono i dati importanti della richiesta.
// Il server legge quindi questi dati e li usa per fare qualcosa, ad esempio controllare il login, salvare il commento, ecc.
// 4. Come sono organizzati i dati POST?
// I dati possono essere organizzati in vari modi, a seconda del tipo di informazione:

// application/x-www-form-urlencoded: È il formato più comune per moduli semplici. Le informazioni vengono inviate come coppie di valori separati da & (come: utente=mario&password=segreta).
// multipart/form-data: Si usa quando si inviano file (esempio foto, documenti). Ogni informazione o file viene suddiviso chiaramente in parti separate all’interno del corpo del messaggio.
// application/json: Usato spesso nelle app moderne. I dati sono inviati in formato JSON, molto leggibile sia per umani che computer.







// Hai detto:
// quindi la linea vuota nel protocollo http o https, tramita comunicazione TCP, come si chiama in programmazione ?  

// Questa progettazione del server che riesci a leggere e notare questa linea vuota, nascosta a tutti, ma dove sotto di essa ci sono i dati. 

// SPiega bene e aggiorna memoria 


//
// Immagina di scrivere una lettera in cui, prima ci sono le informazioni sulla busta (cioè l'intestazione o header) e poi, dopo una linea vuota, trovi il vero messaggio (cioè il body). In HTTP questa "linea vuota" è fondamentale perché indica al server che ha finito di leggere le informazioni tecniche e che ora deve elaborare i dati veri e propri.

// 1. Come viene rappresentata questa linea vuota
// Nei messaggi HTTP la linea vuota non è altro che una sequenza di caratteri di fine linea (in genere CRLF, che sta per "Carriage Return Line Feed").
// In pratica:

// CRLF si rappresenta con \r\n in molti linguaggi.
// Quando il server legge la richiesta, cerca la sequenza \r\n\r\n (due CRLF consecutivi).
// Questa sequenza vuota indica la fine degli header e l'inizio del body.
// 2. Come viene chiamata in programmazione
// In programmazione, questa parte viene comunemente definita:

// "Separatore header-body" oppure
// "CRLF CRLF delimiter"
// È proprio questo delimitatore che permette al parser HTTP (il componente che legge e interpreta il messaggio) di sapere dove finiscono le informazioni di controllo (header) e dove inizia il contenuto dei dati (body).

// 3. Come funziona nel flusso dati
// Creazione del messaggio:
// Il browser o client costruisce il messaggio HTTP includendo:

// Una riga di richiesta (o di stato, nel caso di risposta).
// Le intestazioni, che descrivono il contenuto e altre informazioni (come Content-Type e Content-Length).
// Una linea vuota (cioè la sequenza \r\n\r\n).
// Il corpo del messaggio, che contiene i dati veri (ad esempio, i dati di un form inviato via POST).
// Invio tramite TCP:
// Il messaggio completo viene inviato sulla rete tramite una connessione TCP, che garantisce l’ordine e l’integrità dei dati.

// Ricezione e parsing dal server:
// Il server riceve il messaggio e, grazie al delimitatore \r\n\r\n, capisce dove finiscono le intestazioni e dove iniziano i dati. In questo modo può:

// Processare le informazioni degli header.
// Leggere correttamente il body della richiesta per usare i dati (ad esempio per effettuare il login o salvare un commento).


// Costruzione del Messaggio:
// Il browser o il client API crea un messaggio HTTP che include:

// La riga di richiesta (che contiene il metodo come POST, e l'endpoint relativo, ad esempio /api/submit).
// Gli header (informazioni tecniche come Content-Type e Content-Length).
// Una linea vuota (CRLF CRLF) che separa gli header dal body.
// Il body (dati veri, ad esempio i campi del form o il JSON con i dati da inviare).
// Invio tramite TCP:
// Tutte queste parti vengono "incollate" insieme in un unico pacchetto che viaggia sulla rete tramite una connessione TCP. Quindi, l'URL (o meglio, l'endpoint) e il body viaggiano insieme, ma in sezioni ben distinte del messaggio.


// HTTP/HTTPS:
// Questi protocolli sono l’insieme delle regole e delle istruzioni che definiscono come il messaggio deve essere formato, inviato e interpretato. Non sono il "postino" vero e proprio, ma il "libro delle istruzioni" che tutti devono seguire.

// Il Browser:
// È il componente che crea il messaggio HTTP (la "lettera"). Il browser costruisce questo messaggio seguendo le regole stabilite dal protocollo HTTP/HTTPS.

// Il Canale di Trasporto (TCP/TLS):
// Questo è il vero "postino" o "mezzo" che trasporta il messaggio dal tuo browser al server. Nel caso di HTTPS, il canale è sicuro grazie a TLS.

// In sintesi, il browser è come lo scrittore della lettera che usa il manuale (le regole di HTTP/HTTPS) per formare correttamente il messaggio, e poi il postino (la connessione di rete) consegna la lettera al destinatario (il server).

// Riassunto conclusivo 

// La struttura di una richiesta HTTP POST
// Riga di richiesta (Request Line):
// Specifica il metodo (es. POST) e l’endpoint (la parte dell’URL che indica la risorsa, per esempio /api/submit).

// Header:
// Una serie di informazioni tecniche (es. Content-Type, Content-Length) che descrivono il messaggio.

// Separatore (Linea vuota):
// Una riga vuota, rappresentata tipicamente come \r\n\r\n (due CRLF consecutivi), che delimita la fine degli header e l’inizio del body.

// Body:
// Il contenuto vero e proprio (ad esempio i dati di un form) che non compare nell’URL, ma viene incluso nel messaggio.

// 2. Il ruolo e la natura del Body
// Il Body non è visibile nell’URL:
// Mentre l’URL viene usato per specificare la destinazione (l’endpoint), il body contiene i dati inviati ed è "nascosto" perché fa parte del messaggio HTTP che non viene mostrato nella barra degli indirizzi.

// Creazione e invio:
// Il browser crea dinamicamente l’intero messaggio HTTP in memoria, includendo riga di richiesta, header, separatore e body, e lo invia come un unico flusso di dati.

// 3. Il trasporto della richiesta
// Flusso Unico:
// L’intero messaggio HTTP (con URL, header e body) viene inviato insieme tramite una connessione TCP, che assicura che tutti i dati arrivino integri e nell’ordine corretto.

// Connessione sicura (HTTPS):
// Se si utilizza HTTPS, il messaggio passa attraverso un canale cifrato (TLS), garantendo sicurezza durante il trasporto.

// 4. Dove "viene salvato" il Body e come viene processato
// Memoria Temporanea nel Browser:
// Al momento dell’invio, il messaggio HTTP viene costruito in memoria dal browser. Non viene scritto in una cache visibile come l’URL, ma rimane temporaneamente nella struttura interna del browser fino al suo invio.

// Elaborazione dal Server:
// Quando il server riceve il messaggio, usa il delimitatore (\r\n\r\n) per separare gli header dal body. In questo modo:

// Legge l’URL (o endpoint) dalla riga di richiesta per determinare a quale risorsa indirizzare la richiesta.
// Processa gli header per comprendere il formato e le dimensioni del body.
// Infine, legge il body per ottenere i dati da elaborare.
// 5. Il ruolo dei protocolli HTTP/HTTPS e del canale di trasporto
// HTTP/HTTPS – Il “Libro delle Istruzioni”:
// Questi protocolli definiscono le regole per formare, inviare e interpretare il messaggio. Non sono il “postino”, ma l’insieme delle istruzioni che tutti devono seguire per comunicare correttamente.

// Il Browser – Lo Scrittore della Lettera:
// È responsabile di costruire il messaggio HTTP, seguendo le regole del protocollo. In pratica, il browser prepara la “lettera” con tutte le sue parti (riga di richiesta, header, separatore e body).

// Il Canale di Trasporto (TCP/TLS) – Il Postino:
// È il mezzo fisico e logico che trasporta il messaggio dalla macchina dell’utente al server. Nel caso di HTTPS, TLS garantisce che il canale sia sicuro e cifrato.

// 6. Sintesi con la Metafora della Lettera
// Il Messaggio HTTP (la Lettera):
// Comprende:

// Riga di richiesta: Come l’indirizzo sulla busta, indica dove deve andare la lettera.
// Header: Come le informazioni aggiuntive sulla busta (tipo di spedizione, etichetta, ecc.).
// Separatore (Linea vuota): Come il confine che separa le informazioni sulla busta dal contenuto della lettera.
// Body: Il contenuto segreto e dettagliato della lettera (i dati del form), che non è visibile dall’esterno.
// Il Protocollo HTTP/HTTPS:
// È il manuale delle regole che dice come scrivere e spedire la lettera, ma non è il mezzo di trasporto.

// Il Browser:
// È lo scrittore che compone la lettera seguendo le regole.

// Il Canale di Trasporto (TCP/TLS):
// È il postino che consegna la lettera al destinatario (il server).

// Conclusione
// Il processo di invio di una richiesta POST è il seguente:

// Costruzione del messaggio: Il browser crea la richiesta HTTP composta da riga di richiesta, header, separatore (linea vuota) e body.
// Invio tramite TCP/TLS: L’intero messaggio viene spedito come un flusso unico dal browser al server.
// Elaborazione dal server: Il server usa il separatore per distinguere gli header dal body, identifica l’endpoint dall’URL e processa i dati contenuti nel body.
// Questo riassunto integra tutte le spiegazioni discusse, evidenziando come il messaggio HTTP (con il body nascosto) venga creato e trasportato seguendo le regole del protocollo, e come il canale di trasporto agisca da “postino” per consegnarlo al server.








// Il Parser e il Middleware
// Il Parser HTTP:
// Il parser è il componente che legge la richiesta HTTP "grezza" (cioè il flusso di dati ricevuto via rete) e la trasforma in una struttura utile, separando gli header dal body grazie al delimitatore (CRLF CRLF). In altre parole, è il "lettore" che interpreta il formato del messaggio.

// Il Middleware:
// Nei moderni framework e server web, esistono componenti detti middleware che elaborano la richiesta dopo che il parser ha già effettuato la sua analisi iniziale. Ad esempio, in un'applicazione Node.js, un middleware come "body-parser" si occupa di leggere il body della richiesta e di renderlo accessibile in un formato più semplice (come un oggetto JavaScript).
// Quindi: il parser è il componente fondamentale che decodifica il messaggio HTTP, mentre il middleware può essere considerato come una serie di passaggi intermedi che trasformano o arricchiscono la richiesta una volta che è stata parsata. Non sono esattamente la stessa cosa, ma il middleware spesso include funzionalità di parsing.


// ? POST /api/v3/blog/register HTTP/1.1   <-- Request Line (contiene il verbo HTTP)
// ! Host: localhost:5000                   |
// ! Content-Type: application/json         |-- Headers
// ! Content-Length: 123                    |

// ? {"firstName":"Mario","lastName":"Rossi"}  <-- Body