import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

//meglio iniziale minuscola degli attributi dello schema, per convenzione.
//nella documentazione ufficiale di mongoose, gli attributi dello schema sono inizializzati con camelCase.

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Editor","Admin"],
        default:"Editor"
    },

},
    {timestamps:true} // permette di salvare nel database la data di creazione e la data di modifica, ad esempio di un elemento ad esempio post

// aggiunge automaticamente due campi al tuo schema: 
// createdAt: Data di creazione del documento
// updatedAt: Data che viene aggiornata automaticamente a ogni modifica
// Utilizzo pratico:

// Ordinamento contenuti: "Mostra i contenuti più recenti"
// Filtraggio temporale: "Mostra solo i contenuti degli ultimi 7 giorni"
// Audit trail: Tenere traccia di quando i dati sono stati modificati
// Cache invalidation: Aggiornare cache quando i dati cambiano
// Analytics: Analisi su frequenza di creazione e aggiornamen


// nelle chiamate post combacierà la data di creazione e modifica, mentre nelle chiamate put cambierà solo la data di modifica

);

export default mongoose.model("User",UserSchema); 