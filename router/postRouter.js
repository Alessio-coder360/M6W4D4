import { Router } from "express";

import Post from '../models/post.js';  

const router = Router();



//BACK END DANIELE : 

router.get('/', async (request, response) => {
    try {
        // Questo è il punto chiave per la relazione tra Post e User:
        // 1. Post.find() recupera tutti i post dal database
        // 2. .populate('author', 'firstName lastName') fa queste operazioni:
        //    - Per ogni post, legge l'ID salvato nel campo 'author' 
        //    - Cerca nella collezione User il documento con quell'ID
        //    - Estrae solo i campi 'firstName' e 'lastName' da quel documento User
        //    - Sostituisce l'ID con l'oggetto {firstName: "...", lastName: "..."}
        //
        // Questo processo avviene DOPO che i post sono stati creati.
        // Durante la creazione del post, viene salvato solo l'ID dell'utente loggato.
        // La "magia" di populate() è che risolve dinamicamente questa relazione
        // tra il post e il suo autore usando l'ID come ponte tra le due collezioni(Post e User).
        const posts = await Post.find().populate('author', 'firstName lastName');
        response.status(200).json(posts);
    } catch(err) {
        response.status(500).json({message: 'Errore nel server'});
    }
});

// La proprietà ref: "User" nel modello Post dove si trova author è cruciale - dice a Mongoose: "questo ID è collegato a un documento nel modello User"

// IMPORTANTE NON ESISTE POPULATE SE PRIMA NON C'è STATA UN REGISTRAZIONE DELL'USER CON UN ID DA ASSOCIARE AL POST
// QUINDI PRIMA BISOGNA CREARE UN UTENTE(USER) E POI UN POST CHE SI COLLEGA A QUELL'UTENTE. REF: "User" IN MODELLO POST.JS




// Ordine di creazione necessario:

// Prima devi creare un utente (che riceve un _id)
// Solo dopo puoi creare un post usando quell'ID come author
// Impossibilità di popolare dati inesistenti:

// Se provi a fare populate() su un ID che non esiste, riceverai null
// Non puoi ottenere nome e cognome di un utente che non esiste nel database
// Relazione unidirezionale:

// Il post "sa" chi è il suo autore tramite l'ID
// L'utente non sa quali post ha scritto (a meno di fare una query inversa)
// Importanza di ref: "User":

// Questa proprietà è essenziale per dire a Mongoose dove cercare
// Questo commento sintetizza bene il concetto fondamentale delle relazioni per riferimento in MongoDB.










// CHE SI INTENDE CON SOSTITUISCI: 

// Nel database:

// { title: "Post", author: "abc123" }

// Dopo populate(), solo nella risposta JSON:

// { title: "Post", author: { firstName: "Mario", lastName: "Rossi" } }





// Processo in memoria:

// Mongoose esegue una query secondaria per trovare l'utente
// Costruisce un nuovo oggetto JSON con i dati combinati
// Invia questo oggetto arricchito come risposta



// Get post by ID

router.get('/:id', async( request, response)=>{
    try{
        const {id}=request.params; // destrutturo , cioè estraggo dalla request il parametro id 
        const post = await Post.findById(id).populate('author', 'firstName lastName');
        !post ? response.status(404).json({message: "Post non trovato"}) : response.status(200).json(post)
    }catch(err){
        response.status(500).json({message:'Errore nel server'})}

    })


// Post per creare un nuovo post

router.post('/newPost', async(request, response)=>{
    try{
        const {title,category,cover,readTime} = request.body // estraiamo i dati ricevuti e le inseriamo nelle variabili in parentesi {}, DESTRUTTURAZIONE
        const AddnewPost = new Post({
            title,
            category,
            cover,
            readTime

        });


        const result= await AddnewPost.save();
        (result && response.status(201).json(result) ) || response.status(400).json({message:'Errore nella creazione del post'})
        
        }

    catch(err){
        response.status(500).json({message:'Errore nel server'})
    }
})






export default router;

// se usi deafult puoi rinominare il componente che importi in un altro file senza usare import { nomeOginaleComponente  as nuovoNome } from './..., 
// se non usi default devi usare il nome esatto del componente che importi oppure la modalità con as 