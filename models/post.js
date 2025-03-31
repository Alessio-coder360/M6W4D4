import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    category:{ // categoria del post
        type:String,
        required:true
    },
    cover:{ // il link dell'immagine di copertina del post
        type:String,
        required:true
    },

readTime:{
    value:{
        type:Number,
        required:true},
        unit :{
            type: String,
            enum: ["minutes","hours"],
            required:true
        },
    },

    // A cosa serve:
//Informazione per gli utenti: Mostra quanto tempo richiederà la lettura dell'articolo
//Migliora l'esperienza utente: Permette ai lettori di decidere se hanno tempo per leggere l'articolo
//Filtro contenuti: Gli utenti possono filtrare articoli brevi o lunghi
//Analisi contenuti: Consente di analizzare quali lunghezze di articolo generano più engagement


author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:"User",    // ← Questo dice a Mongoose quale modello cercare
    required:true
// A cosa serve: 

//Indica a Mongoose che questo ObjectId fa riferimento al modello "User".
// Permette l'uso di .populate() per "unire" i dati correlati
//Consente di associare un post a un utente specifico

// Quando e perché usarlo:
//Usalo quando: Hai relazioni uno-a-molti o molti-a-molti (un utente può scrivere molti post)
//Vantaggi:
//Flessibilità nello schema
//Query più efficienti con .populate()
//Mantiene documenti più piccoli (memorizza solo l'ID, non tutti i dati)
//Alternativa: Incorporare documenti nidificati quando i dati sono strettamente correlati e non cambiano spesso
 
},

content: {
    type: String,
    required:true
},

likes: {
    type: Number,
    default: 0
},

},

{timestamps:true})

export default mongoose.model("Post",PostSchema);


// Daniele dopo la configurazione del back end con le librerie e i componenti da importare
//parte dalla costruzione dei modelli per il database, per la gestione dei dati che il back end andrà a gestire
// poi si inizia a creare tutte le route delle API, 
//dopo di che passa al front end e inizia a collegare e a fare i test 