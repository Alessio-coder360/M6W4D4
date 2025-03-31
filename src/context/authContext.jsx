// Importiamo funzioni specifiche dalla libreria React:
// createContext: una funzione che crea un "contenitore" per condividere dati tra componenti
// useContext: una funzione che permette ai componenti di "leggere" dal contenitore
// useState: una funzione che permette ai componenti di memorizzare e modificare dati interni
import { createContext, useContext, useState, useEffect} from "react";

// Creiamo un nuovo contenitore vuoto chiamato AuthContext
// Questo è come una scatola etichettata "informazioni sull'utente" che sarà accessibile ovunque nell'app
const AuthContext = createContext();

// Definiamo un componente speciale AuthProvider che:
// 1. Accetta un parametro chiamato "children" attraverso la destrutturazione {children}
// 2. "children" rappresenta qualsiasi componente React che sarà avvolto dentro AuthProvider
export const AuthProvider = ({children}) => {
    // Creiamo una variabile di stato "user" inizializzata a null (nessun utente loggato)
    // setUser è una funzione che possiamo chiamare per cambiare il valore di "user"
    // Questi due elementi vengono creati dalla funzione useState
    
    const [user, setUser] = useState(null); 

 // ! ATTENZIONE IMPORTANTE: 

 // ! React considera null un valore non controllato per gli input, causando warning.
 // ! const [items, setItems] = useState(null); NON CORRETTO (causa warning)




// # Perché inizializziamo user a null?
// # - null è il valore ideale per rappresentare "nessun dato ancora disponibile"
// # - Inizializzare a null permette di rappresentare chiaramente lo stato "non autenticato"
// # - A differenza di {} (oggetto vuoto), null permette facili controlli con: if(user) {...}
// # - JavaScript permette di sostituire null con qualsiasi tipo di dato:
// #   - Possiamo impostare user a un oggetto complesso: {id: 1, name: "Mario", roles: ["admin"]}
// #   - Possiamo controllare facilmente lo stato di autenticazione con: {user ? <LoggedIn/> : <NotLoggedIn/>}
 
// # Vantaggi di inizializzare con null:
// # - Chiarezza semantica: null significa specificamente "nessun valore ancora"
// # - Versatilità di tipo: può essere sostituito da qualsiasi tipo (oggetto, array, stringa)
// # - Facilita i controlli condizionali con operatori ternari e circuiti logici
// # - È una convenzione standard in React per dati che inizialmente non esistono
 
// # Potenziali problemi nei controlli if con null:
// # - Attenzione: if(user.property) causerebbe errore se user è null → usa if(user?.property) invece
// # - null è falsy, quindi if(!user) è true quando user è null, ma anche quando è 0 o "" o false
// # - Confronti come if(user === undefined) non catturano null, serve if(user == null) o if(user === null)
// # - Se un API restituisce {} invece di null, un semplice if(user) potrebbe dare falsi positivi
 
// # Tipi di dati assegnabili a una variabile inizializzata con null:
// # - Oggetti: user = {id: 1, name: "Alice", permissions: ["read", "write"]}
// # - Array: user = ["Alice", "Bob", "Charlie"]
// # - Stringhe: user = "alice@example.com"
// # - Numeri: user = 12345
// # - Booleani: user = true
// # - Altri valori: user = undefined, user = null (riassegnare null)
// # - Funzioni: user = () => console.log("Hello")
 
// # In altri casi si potrebbero usare altri valori iniziali:
// # - Array vuoto [] → quando si lavora con liste di elementi
// # - Oggetto vuoto {} → per form o dati strutturati dove alcune proprietà potrebbero esistere
// # - Stringa vuota "" → per input di testo
// # - 0 → per contatori
// # - false → per stati binari (es. isLoading, isVisible)


// !  puoi assolutamente cambiare non solo il valore ma anche il tipo di una variabile in JavaScript! 

// ! &&&&) Questo è ciò che si intende con "tipizzazione dinamica".

// !cioè : 

// # Inizializzato come stringa vuota

// # const [user, setUser] = useState('');


// ? Tutti questi cambiamenti di tipo sono TECNICAMENTE possibili:

// # setUser({id: 123, name: 'Mario'});  // Ora è un oggetto

// # setUser(['admin', 'editor']);       // Ora è un array

// # setUser(42);                        // Ora è un numero

// # setUser(true);                      // Ora è un booleano
    

// ! io ho settato User a null, ma se lo settavo come stringa vuota non mi avrebbe dato errore nel componente Login, quando gli avrei passato 

// ! un oggetto ovvero la response del server. Perché vedi punto (&&&&) sopra riga 68. Ma per logica meglio settare la variabile per il tipo di dato che conterrà 

    // Definiamo una funzione "login" con user che:
    // 1. Accetta un parametro "user" (le informazioni dell'utente che ha effettuato l'accesso)
    // 2. Chiama setUser per memorizzare queste informazioni nello stato
    // Questa è una funzione freccia (arrow function), una sintassi compatta per definire funzioni


    // const login = (user) => {setUser(user);
    //     localStorage.setItem("user",JSON.stringify(user))}
    
    


// Definiamo una funzione "login" con userData che:
// 1. Accetta un parametro "userData" (le informazioni dell'utente che ha effettuato l'accesso)
//    Nota: Usiamo "userData" invece di "user" per evitare confusione con la variabile di stato omonima.
//    Questo previene il "variable shadowing" (quando un parametro nasconde una variabile esterna)
//    e rende il codice più chiaro, mostrando che stiamo ricevendo dati da elaborare.
// 2. Chiama setUser per memorizzare queste informazioni nello stato
// Questa è una funzione freccia (arrow function), una sintassi compatta per definire funzioni

    const login = (userData) => {setUser(userData);
    localStorage.setItem("user",JSON.stringify(user))}




    // !Usa nomi diversi per i parametri delle funzioni che manipolano lo(stesso),
    // ?stato quando potresti aver bisogno di accedere contemporaneamente:
    // # sia al valore corrente dello stato, che al nuovo valore


    // Come recuperare i dati (non presente nel codice attuale):




    useEffect(() => {
        // Verifica se esiste un utente salvato nel localStorage
        const savedUser = localStorage.getItem("user");
        
        // Se esiste, recuperalo e convertilo da stringa a oggetto
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []); // Array vuoto = esegui solo all'avvio del componente
    


        // Vantaggi del localStorage per l'autenticazione:
// Persistenza: L'utente rimane loggato anche dopo la chiusura del browser
// Semplicità: Facile da implementare e usare
// Universalità: Supportato da tutti i browser moderni
// Questo approccio crea una "sessione persistente", migliorando notevolmente l'esperienza utente che non deve inserire le credenziali ad ogni visita.







// che cos'è localStorage?
// È un "deposito di dati permanente" del browser
// Funziona come un "mini database" accessibile solo dal tuo sito
// I dati rimangono memorizzati anche quando:
// L'utente aggiorna la pagina
// L'utente chiude e riapre il browser
// L'utente spegne e riaccende il computer
// Come viene utilizzato nell'autenticazione:
// Durante il login:

// localStorage.setItem("user", JSON.stringify(user))
// Tradotto: "Salva l'oggetto user convertendolo in testo"
// Questo permette all'app di "ricordare" l'utente anche se il browser viene chiuso
// Durante il logout:

// localStorage.removeItem("user")
// Tradotto: "Cancella completamente i dati dell'utente dal deposito"
// Rimuove l'utente memorizzato, impedendo l'accesso automatico successivo
// Perché è necessaria la conversione JSON.stringify?
// localStorage può memorizzare solo stringhe di testo
// JSON.stringify() converte oggetti JavaScript in stringhe
// Quando leggiamo i dati, useremo JSON.parse() per convertirli di nuovo in oggetti
// Come recuperare i dati (non presente nel codice attuale):
// Vantaggi del localStorage per l'autenticazione:
// Persistenza: L'utente rimane loggato anche dopo la chiusura del browser
// Semplicità: Facile da implementare e usare
// Universalità: Supportato da tutti i browser moderni
// Questo approccio crea una "sessione persistente", migliorando notevolmente l'esperienza utente che non deve inserire le credenziali ad ogni visita.
    



    // Definiamo una funzione "logout" che:
    // 1. NON ha bisogno di parametri (il parametro "user" qui è superfluo e andrebbe rimosso)
    // 2. Chiama setUser(null) per indicare che nessun utente è loggato
    const logout = () => {setUser(null);
    localStorage.removeItem("user")}

    // Restituiamo un componente JSX che:
    // 1. Usa AuthContext.Provider per "avvolgere" i componenti figli
    // 2. Fornisce un oggetto "value" contenente i dati che vogliamo rendere disponibili
    return(
        // value è un oggetto con chiavi e valori che saranno accessibili a tutti i componenti figli
        // NOTA: mancano login e logout nel value, quindi non saranno accessibili ai componenti figli
        <AuthContext.Provider value={{user, setUser, login, logout}}> 
                                 {/* ⇧ */}
                              {/* Questo è il "contenitore" di dati È il "distributore di informazioni" creato dal createContext()
                              Funziona come una stazione radio che trasmette dati a tutti i componenti nella sua area */}
                              {/* La prop value È il "pacchetto di dati" che viene trasmesso a tutti i componenti figli
                              Contiene tutto ciò che vuoi rendere accessibile ovunque nell'app
                              Qualsiasi modifica a questi valori aggiorna automaticamente tutti i componenti che li usano */}
                              {/* In termini pratici:
                              Qualsiasi componente nell'app che usa useAuth() avrà accesso a queste quattro entità e potrà:

                              Vedere se un utente è loggato (user !== null)
                              Leggere le informazioni dell'utente (user.name, user.id, ecc.)
                              Far accedere un utente (login(userData))
                              Far uscire un utente (logout())
                              Questa è una potente implementazione del pattern "Context" di React che centralizza la gestione dell'autenticazione. */}
            {/* Qui vengono renderizzati tutti i componenti figli */}
            {/* È come dire "qualsiasi componente passato come figlio a AuthProvider" */}
            {children}
        </AuthContext.Provider>
    );
};

// Creiamo e esportiamo una funzione di utilità che facilita l'accesso al contesto
// Questa funzione permette ai componenti di accedere facilmente ai dati dell'autenticazione
export const useAuth = () => useContext(AuthContext);

// quindi il AutohcontextProvider wrappa (ingloba) tutti i componenti figli che sono passati come parametro
// children, e gli passa il value ai loro figli, le informazioni  le variabili insomma i dati in value, sono accessibii a tutti i componenti figli