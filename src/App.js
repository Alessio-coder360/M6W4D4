import './App.css';

// ho rimosso Col, e Row e Container da react bootsrap se ti servono rimettili
//import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/authContext';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';

function App() {
  // !const API = process.env.REACT_APP_API_URL;
  
  // ! const [items, setItems] = useState([]);
  // ! const [name, setName] = useState('');
  // ! const [description, setDescription] = useState('');
  // ! const [price, setPrice] = useState('');
  // ! const [editId, setEditId] = useState(null);

  // GET
 // !  const fetchItems = async () => {
// ! 
 // !    try {
 // !      const response = await fetch(API);
// ! 
 // !      if (response.ok) {
// ! 
 // !        const data = await response.json();
// ! 
 // !        setItems(data);
 // !      }
// ! 
 // !    } catch (error) {
 // !      
 // !      console.log(error);
 // !    }
 // !  };

  // useEffect al livello principale del componente

  // !useEffect(() => {

    // !fetchItems();

 // ! }, []);

  // POST
  // !const addItem = async () => {

    // !try {
      
      // !const response = await fetch(API, {
        // !method: 'POST',

        // !headers: {
          // !'Content-Type': 'application/json',
        // !},

       // ! body: JSON.stringify({ name, description, price }),
      // !});
      // !if (response.ok) {

        // !const data = await response.json();

        // Aggiungi il nuovo elemento all'array items
        // !setItems((prev) => [...prev, data]);

        // setItems((prev) => [
        //   ...prev,  // 'prev' contiene il valore corrente di 'items' (lo stato aggiornato) al momento dell'update.
        //   data   // Aggiunge 'data1' alla fine del nuovo array, mantenendo tutti gli elementi già presenti.
        // ]);
        // Questo callback garantisce che l'aggiornamento si basi sempre sull'ultima versione di 'items',
        // evitando problemi di "stale state" che possono verificarsi se si usasse direttamente la variabile 'items' catturata al render.
        // In sostanza, se 'items' era [item1, item2, item3], dopo l'update diventerà [item1, item2, item3, data].
        



        // Resetta i campi del form
       // ! setName('');
        // !setDescription('');
        // !setPrice('');
     // ! }
    // !} catch (error) {
      // !console.log(error);
    // !}
 // ! };

  // PUT
 // ! const editItem = async (id) => {
 // !   try {
 // !     const response = await fetch(`${API}/${id}`, {
 // !       method: 'PUT',
 // !       headers: {
 // !         'Content-Type': 'application/json',
 // !       },
 // !       body: JSON.stringify({ name, description, price }),
 // !     });
 // !     if (response.ok) {
 // !       const data = await response.json();
 // !       setItems((prev) => prev.map((item) => (item._id === id ? data : item)));

// !Aggiorno lo stato "items" (che contiene una lista di documenti già caricati dal server).
// ?Uso la funzione setItems con una callback che prende lo stato precedente (prev).
// !"prev" è un array JavaScript di oggetti (ottenuto da dati JSON convertiti precedentemente).
// ?Uso .map per scorrere ogni elemento di prev, chiamando ogni elemento "item":
// !Per ogni "item", controllo se l'id di MongoDB ("_id") è esattamente uguale all'id passato alla funzione (cioè quello del documento modificato). 
// Perché questa riga(setItems((prev)).... eccc) è dopo la response della verbo Put, quindi l'id è già stato aggiornato nel database.
// ?Se l'id è uguale, sostituisco questo item con "data", cioè il documento aggiornato ricevuto dal server.
// !Se non è uguale, mantengo l'item originale (non aggiornato).
// ?Il risultato finale è un nuovo array con solo l'oggetto desiderato aggiornato, mentre tutti gli altri restano invariati.


// ho commentato il codice sottostante perchè mi serviva che appare nel input il value per la funzione modifica. 
// sono prove. 
        
      //   setName('');
      //   setDescription('');
      //   setPrice('');
      //   setEditId(null);
      // 
     // ! }
   // ! } catch (error) {
   // !   console.log(error);
   // ! }
    // Implementa la logica di edit qui
  // !};  // Rimossa parentesi graffa extra

// !
//  return (
// !    <Container>
// !      <Row>
// !        <Col>
// !          <h1>Lista Prodotti</h1>
// !          <ul>
// !            {items.map((item) => (
// !              <li key={item._id}>
// !                {item.name} - {item.description} - {item.price}
// !                <button onClick={// creo un bottone in cui la call back anonima al click mi permette di prendere i valori correnti attuali dell'id, nome, descrizione e prezzo, 
// !                  ()=>{
// !                    setEditId(item._id);// valore corrente attuale dell'id
// !                    setName(item.name);// valore corrente attuale del nome
// !                    setDescription(item.description);// valore corrente attuale della descrizione
// !                    setPrice(item.price);// valore corrente attuale del prezzo
// !              
// !
// !                  }}>Seleziona</button>
// !              </li>
// !            ))}
// !          </ul>
// !        </Col>
// !      </Row>
// !      <Row>
// !        <Col>
// !          <h1>Aggiungi Prodotto</h1>
// !          <input
// !            type="text"
// !            placeholder="Nome"
// !            value={name}
// !            onChange={(e) => setName(e.target.value)}
// !          />
// !          <input
// !            type="text"
// !            placeholder="Descrizione"
// !            value={description}
// !            onChange={(e) => setDescription(e.target.value)}
// !          />
// !          <input
// !            type="text"
// !            placeholder="Prezzo"
// !            value={price}
// !            onChange={(e) => setPrice(e.target.value)}
// !          />
// !          <button onClick={addItem}>Aggiungi</button>
// !

  /* 
          SPIEGAZIONE DETTAGLIATA prima c'era 
          <button onClick={ {
            editId && editItem(editId); e dava errore perché  :

          1. CON ARROW FUNCTION: onClick={() => editId && editItem(editId)}
            - Questa sintassi crea una FUNZIONE ANONIMA che verrà MEMORIZZATA
            - La funzione NON viene eseguita durante il rendering della pagina
            - Viene eseguita SOLO QUANDO l'utente clicca il pulsante
            - Al click, controlla se editId esiste e solo allora chiama editItem(editId)
            - onClick riceve una funzione, che è esattamente ciò che si aspetta

          2. SENZA ARROW FUNCTION: onClick={editId && editItem(editId)}
            - Durante il rendering, React valuta IMMEDIATAMENTE l'espressione editId && editItem(editId)
            - Se editId esiste, chiama subito editItem(editId) PRIMA del click
            - Il risultato di editItem(editId) è una Promise (perché è async)
            - Questo risultato (l'oggetto Promise) viene assegnato a onClick
            - React si aspetta che onClick sia una funzione, ma riceve un oggetto
            - Questo genera l'errore: "Expected `onClick` listener to be a function..."

          È come la differenza tra dire:
          - "Ecco le istruzioni da seguire quando premo il pulsante" (corretto)
          - "Esegui subito queste istruzioni e assegna il risultato al pulsante" (sbagliato)
          */



//           <button onClick={() => {
//             // Usa l'operatore && per eseguire la funzione solo se editId esiste
//             editId && editItem(editId);
            
//             // Svuota i campi dopo la modifica (solo se editId esiste)
//             editId && setName('');
//             editId && setDescription('');
//             editId && setPrice('');
//             editId && setEditId(null);
//           }}>Modifica</button>

// {/* 
// senza svuotare i campi per ricordarti come si annidano più comandi se ()=> rimanda solo ad una funzione, e io qui volevo che al click
// faccesse più cose, come svuotare i campi.

// Sintassi breve (senza graffe) - solo per UNA espressione:

// onClick={() => espressione}

// esempio:

// <button className='fs-2' onClick={() => editId && editItem(editId)}>Modifica</button>

// . Sintassi con blocco di codice (con graffe) - per MULTIPLE istruzioni

// onClick={() => {
//   istruzione1;
//   istruzione2;
//   // ...altre istruzioni
// }}

// 1)Sintassi breve: () => espressione

// Restituisce AUTOMATICAMENTE il risultato dell'espressione
// Es: const doppio = x => x * 2; (restituisce implicitamente x * 2)

// 2)Sintassi con blocco: () => { ... }

// Richiede return ESPLICITO se vuoi restituire qualcosa
// Es: const doppio = x => { return x * 2; };

// PERò:

// Gli event handler (come onClick) sono un caso speciale:

// React ignora qualsiasi valore restituito da un event handler
// Gli event handler vengono eseguiti per i loro effetti collaterali (come modificare lo stato), non per il loro valore di ritorno
// Il valore di ritorno di un onClick non viene utilizzato da nessuna parte



// 3)la regola delle graffe: 

// È una regola generale di JavaScript per tutte le arrow function, non solo per gli handler di eventi.


// */}


      
//         </Col>
//       </Row>
//     </Container>
//   );  // Aggiunto punto e virgola

return(

  // Questa è la tua casa, che permette di navigare tra le pagine senza ricaricare il browser
  <Router>
{/*     
     AuthProvider è come la corrente elettrica che funziona in tutta la casa */}
    <AuthProvider>
      
       {/* Navbar è come il soffitto che rimane sempre visibile, non importa in quale stanza vai */}
      <Navbar/>
      
       {/* Routes è come il corridoio che decide quale stanza (pagina) mostrare in base all'URL */}
      <Routes>
{/* 
       Questa Route è la porta principale, con l'etichetta "/" (homepage)
       È come l'ingresso principale della casa */}

        <Route path="/" element={<Home/>} />

         {/* Questa Route è come una porta con l'etichetta "/login"
         Quando vai a www.tuosito.com/login, ti fa entrare nella stanza "Login" */}
       
       <Route path="/login" element={<Login/>}/>
        
         {/* Questa Route è come una porta con l'etichetta "/register"
         Quando vai a www.tuosito.com/register, ti fa entrare nella stanza "Register" */}
        <Route path="/register" element={<Register/>}/>
        
      
        
      
        
      </Routes>
      
    </AuthProvider>
    
  </Router>

);

}

 export default App;



// ricorda di entrare nella cartella del front end , dove hai installato react : cd ecc, se vuoi installare axios. 


// ! Aggiornamenti regolari:

// # Controlla quali pacchetti possono essere aggiornati
// npm outdated

// # Aggiorna i pacchetti minori e le patch (più sicuro)
// npm update

// ! Controllo manuale delle vulnerabilità:

// # Visualizza tutte le vulnerabilità senza modifiche
// npm audit

// # Aggiorna le dipendenze di sviluppo (meno rischiose)
// npm update --save-dev


// ! Approccio più sicuro per create-react-app:


// # Aggiorna react-scripts (soluzione a molte vulnerabilità)
// npm install react-scripts@latest



// ! Come vedere cosa occupa la porta 3000 (Windows)

// # Comando per vedere tutti i processi sulla porta 3000
// netstat -ano | findstr :3000

// # Output esempio: TCP    127.0.0.1:3000    0.0.0.0:0    LISTENING    12345

// # L'ultimo numero (12345) è l'ID del processo (PID)



// # Poi puoi vedere quale processo ha quel PID
// tasklist /fi "PID eq 12345"

// # Per terminare il processo:
// taskkill /F /PID 12345


// # Processi Node.js: Spiegazione completa

// # Cosa è node.exe e cosa fa

// # node.exe è l'eseguibile del runtime di Node.js per Windows. In parole semplici:

// # È il motore JavaScript che esegue il tuo codice JavaScript al di fuori del browser

// # Alimenta sia il frontend React (server di sviluppo) che il backend Express

// # Funziona come processo di sistema allocando memoria e risorse

// # Come funzionano i processi "orfani"

// # Ecco esattamente cosa succede quando un processo rimane "orfano":
 
// # Scenario normale:

// # Avvii React con npm start in un terminale

// # Il terminale diventa il "processo padre" di node.exe

// # Quando chiudi il terminale con Ctrl+C, invia un segnale al processo node.exe per terminare

// # Scenario con processo orfano:
 
// # Avvii React con npm start in un terminale

// # Chiudi il terminale cliccando sulla X (senza Ctrl+C)

// # Il processo padre (terminale) muore senza inviare il segnale di terminazione

// # node.exe continua a funzionare senza un "genitore" (= orfano)

// # Continua a occupare la porta 3000 e consumare memoria

// # Comportamento allo spegnimento

// # Spegnimento ordinato: I processi node.exe dovrebbero terminare

// # Spegnimento forzato/crash: Possono rimanere registrati nel sistema e riavviarsi

// # Verifica se la porta è libera

// # Sì, se netstat -ano | findstr :3000 non mostra risultati, significa che:
 
// # Nessun processo sta ascoltando sulla porta 3000

// # La porta è libera e può essere utilizzata dalla tua app React
