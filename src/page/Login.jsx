import{useState} from 'react';  // Hook per gestire lo stato interno del componente
//import axios from 'axios';  // Libreria per effettuare richieste HTTP
import {Col, Form, Button, Container, Row, Alert} from 'react-bootstrap';  // Componenti UI da Bootstrap

import {useNavigate, Link, useLocation} from 'react-router-dom';  // Hook per la navigazione e componente per link
import {useAuth} from '../context/authContext';  // Hook personalizzato per accedere al contesto di autenticazione
import axiosInstance from '../api/axios';  // Importa l'istanza di axios personalizzata


const Login = () => { // creiamo un componente sempre con lettera maiuscola

        // ====== RELAZIONE TRA useLocation E URLSearchParams ======
    // useLocation: come un "GPS" che ti dice dove sei nell'app (l'URL attuale)
    // URLSearchParams: come un "traduttore" che decodifica i parametri nell'URL
    // Insieme: formano un sistema per leggere informazioni dall'URL
   

    // 1. useLocation cattura l'URL completo corrente (http://localhost:3000/login?registered=true)
    const location = useLocation();
    // location contiene: {
    //   pathname: "/login",          // Il percorso base (/login)
    //   search: "?registered=true",  // La query string (tutto dopo ?)
    //   hash: "",                    // Il frammento (dopo #)
    //   state: null,                 // Eventuali dati passati con navigate(url, {state})
    //   key: "abc123"                // Chiave unica per questa location
    // }


     // 2. URLSearchParams analizza i parametri query dalla stringa search
    // Funziona come un decodificatore: trasforma "?registered=true&source=homepage"
    // in valori utilizzabili separatamente
    const params = new URLSearchParams(location.search);



    // 3. Estrai il valore specifico del parametro "registered"
    // Se l'URL è: /login?registered=true   → justRegistered = "true"
    // Se l'URL è: /login                   → justRegistered = null
    const justRegistered = params.get('registered');


    const [email, setEmail] = useState('');  
    const [password, setPassword]= useState(''); 
    const [error, setError]= useState('') 

    const {login} = useAuth();  
    const navigate = useNavigate() 

    const handleSumbit = async (e) => { 

        e.preventDefault();  // Previene il comportamento predefinito di invio del form (ricarica pagina)
        try{
            // Richiesta POST con Axios - invia email e password al server
            // L'oggetto {email, password} diventa il corpo JSON della richiesta

            //SE IMPORTI DIRETTAMENTE QUI LA LIBRERIA AXIOS:
            //const response = await axios.post('http://localhost:5000/api/v3/blog/login', {email, password})

            //SE IMPORTI L'ISTANZA DI AXIOS PERSONALIZZATA:
            const response = await axiosInstance.post('/login',{email,password})  // axiosInstance è l'istanza di axios personalizzata ( è dinamico e già tutto nel componente axios.jsx, bisogna solo cambiare gli endpoint della rotta)


            login(response.data); // .data è un proprieta di axios che contiene i dati della risposta
            navigate('/');  // Reindirizza l'utente alla home page dopo login riuscito
        }catch(error){
            setError(error.response.data.message) // .data è un proprieta di axios che contiene i dati della risposta
        }

    }



    //http://localhost:3000/login?registered=true&source=register
                        //    👆      👆        👆
                        // inizio  parametro1  parametro2



// !useLocation() per ottenere tutto l'URL
// !new URLSearchParams(location.search) per estrarre i parametri
// !params.get('registered') per leggere il valore specifico
// !Mostriamo un Alert se quel valore esiste
// !Un'analogia chiara
// !Immagina di ricevere un messaggio in codice morse:

// !useLocation è come il dispositivo che riceve il segnale morse completo
// !URLSearchParams è il decodificatore che trasforma i "beep" in parole comprensibili
// !Insieme, questi strumenti permettono di creare flussi di interfaccia contestuali senza dover memorizzare lo stato attraverso diverse pagine.




    // SENZA AXIOS:

    // try {
    //     // Configurazione della richiesta fetch
    //     const response = await fetch('http://localhost:5000/api/v3/blog/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ email, password })
    //     });
        
    //     // Leggi e parsifica il corpo della risposta
    //     const data = await response.json();
        
    //     // Gestione errori - fetch non lancia errori per status codes 4xx/5xx
    //     if (!response.ok) {
    //         throw { response: { data } }; // Struttura simile ad axios per compatibilità
    //     }
        
    //     // Login riuscito
    //     login(data);
    //     navigate('/');
        
    // } catch (error) {
    //     // Gestione degli errori
    //     if (error.response) {
    //         setError(error.response.data.message || 'Errore durante il login');
    //     } else {
    //         setError('Errore di rete. Verifica la tua connessione.');
    //     }
    // }



    return(
       <Container>  {/* Container Bootstrap: contenitore principale che centra il contenuto e gestisce i margini */}
            <Row className = 'justify-content-md-center mt-5'>  {/* Row: sistema a griglia - justify-content-md-center: centra orizzontalmente, mt-5: margin-top grande */}
                <Col xs={12} md={6}>  {/* Col: colonna nella griglia - xs={12}: occupa tutta la larghezza su schermi piccoli, md={6}: occupa metà larghezza su schermi medi */}
                            <h3>Login</h3>  {/* Titolo della pagina */}


                            {/* 4. Usa il parametro justRegistered per mostrare il messaggio di successo */}
                             {/* L'operatore && in JSX mostra l'elemento solo se la condizione è true */}
                            {/* L'URL contiene "?registered=true" solo se l'utente arriva dalla registrazione */}
                                 {justRegistered && (
                                     <Alert variant="success">
                                        Registrazione completata con successo! Ora puoi effettuare il login.
                                     </Alert>
                                                                     )}
                            




                    <Form>  {/* 
                                        Form: Componente contenitore principale per costruire moduli
                                        - Può gestire eventi di invio con onSubmit={handleSubmit}
                                        - Previene automaticamente il comportamento di default del browser quando usi onSubmit
                                        - Supporta validazione nativa del browser con noValidate={false}
                                    
                                        Esempi di proprietà:
                                        - onSubmit: Funzione da chiamare quando il form viene inviato
                                        - className: Classi CSS personalizzate
                                        - validated: Attiva/disattiva stili di validazione (true/false)
                                    
                                        Esempi d'uso:
                                        <Form onSubmit={handleSubmit} validated={isValidated} className="my-custom-form">
                                        <Form noValidate> // Disattiva validazione nativa del browser
                                    */}

                                    {error && <Alert variant='danger'>{error}</Alert>}  
 

                            <Form.Group className="mb-3" controlId='email'>  
                                    {/* 
                                Form.Group: Contenitore che raggruppa logicamente elementi correlati del form
                                - Aggiunge spaziatura e margini appropriati tra gli elementi
                                - controlId: Associa Label e Control per accessibilità e focus automatico
                                - className: Stili personalizzati (mb-3 = margin-bottom di 3 unità)
                            
                                Il controlId:
                                1. Genera automaticamente attributi 'id' e 'htmlFor' per connettere Label e Control
                                2. Migliora l'accessibilità permettendo di cliccare sull'etichetta per attivare l'input
                                3. Facilita la navigazione da tastiera e screen reader
                            
                                Esempio: <Form.Group controlId="formBasicEmail"> // crea un'associazione tra label e input
                                                */}
  
                                <Form.Label>Email</Form.Label>  
 
                                <Form.Control type='email'  placeholder='Write your email' value={email} onChange={(e) => setEmail(e.target.value)} />   
    
                                                 { /* 
                                  type: Determina il tipo di input HTML
                                  Valori comuni:
                                  - 'text' (default): input testuale semplice
                                  - 'email': validazione email + tastiera email su mobile
                                  - 'password': nasconde i caratteri 
                                  - 'number': solo numeri + tastiera numerica su mobile
                                  - 'date', 'datetime', 'checkbox', 'radio', 'file', ecc.



                                Form.Control: Il campo di input vero e proprio
                                - Componente React Bootstrap che sostituisce gli elementi nativi <input>, <select>, ecc.
                                - Si adatta automaticamente al layout e stile Bootstrap

                                Altre proprietà importanti:
                                - as: Cambia l'elemento di base ("input", "textarea", "select")
                                - disabled: Disabilita l'input (true/false)
                                - readOnly: Rende l'input non modificabile ma selezionabile (true/false)
                                - isInvalid/isValid: Applica stili di validazione
                                - size: Dimensione dell'input ("sm" o "lg")

                                Esempi:
                                <Form.Control as="textarea" rows={3} /> // Area di testo multi-riga
                                <Form.Control as="select"><option>1</option><option>2</option></Form.Control> // Menu a tendina
                                <Form.Control isInvalid={!!errors.email} /> // Stile di errore con bordo rosso */}
  
  
                                <Form.Label>Password</Form.Label>
  
                                            <Form.Control type='password' placeholder='Write your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
  
                                          
  

                                 <Form.Text className='text-muted'>Don't have an account? <Link to='/register'>Register</Link></Form.Text>  
                                            {/* 
                                              Form.Text: Componente per testo di supporto/informativo sotto un campo
                                              - Utile per fornire istruzioni, requisiti o suggerimenti aggiuntivi
                                              - className='text-muted': Applica stile di testo grigio (meno enfatico)
                                              - Può contenere altri componenti come Link
                                            
                                              Utilizzi comuni:
                                              - Spiegazioni dei requisiti di password
                                              - Informazioni sui formati accettati
                                              - Link a risorse correlate o azioni alternative
                                            
                                              Esempi:
                                              <Form.Text className="text-muted">
                                                La password deve contenere almeno 8 caratteri, una lettera maiuscola e un numero.
                                              </Form.Text>
                                            
                                              <Form.Text className="text-danger">
                                                Questo username è già in uso.
                                              </Form.Text>
                                            */}
                        </Form.Group>
                        <Button variant='primary' type='submit' onClick={handleSumbit}>Login</Button>  
                    </Form>
                </Col> 

            </Row> 
        </Container>
    )  

}  


export default Login;  



// AXIOS: 






// Importa la libreria axios - necessaria per fare richieste HTTP

// #import axios from 'axios';

// Crea una nuova istanza di axios personalizzata
// È come creare una copia configurata di axios con impostazioni specifiche

// #const api = axios.create({
  // baseURL: Prefisso URL per tutte le richieste fatte con questa istanza
  // Invece di scrivere URL completi ogni volta, api.get('/posts') = http://localhost:5000/api/posts
 // # baseURL: 'http://localhost:5000/api'

// # });

// Interceptors = "intercettatori" di richieste
// Sono funzioni che vengono eseguite PRIMA che una richiesta venga inviata

// o DOPO che una risposta è stata ricevuta, ma PRIMA che il codice che ha fatto la chiamata la riceva

// #api.interceptors.request.use(
  
// Primo parametro: funzione che riceve l'oggetto "config" e lo modifica
  // "config" è l'oggetto di configurazione della richiesta che contiene:
  // - url: l'URL della richiesta
  // - method: GET, POST, ecc.
  // - headers: intestazioni HTTP
  // - data: dati inviati con la richiesta
  // - params: parametri URL
  
  // # (config) => {
   
    // Cerca nel localStorage le informazioni dell'utente, tra cui il token
    // localStorage è un database persistente del browser dove salviamo dati tra sessioni
    // JSON.parse converte la stringa JSON in un oggetto JavaScript
    
    // #const userInfo = JSON.parse(localStorage.getItem('user'));
    
    // Se troviamo un token nell'oggetto userInfo...
    // "?." è l'optional chaining - non dà errore se userInfo è null/undefined
    // #if (userInfo?.token) {
      // Aggiungi l'header "Authorization" con formato "Bearer [token]"
      // Gli headers sono informazioni aggiuntive inviate con la richiesta HTTP
      // "Authorization" è uno header standard per inviare credenziali
      // "Bearer" è lo schema di autenticazione più comune per token JWT
      // #config.headers.Authorization = `Bearer ${userInfo.token}`;
   // # }
    
    // Ritorna l'oggetto config modificato (ora con l'header Authorization se c'era un token)
    // #return config;
 // # }

// #);

// Esporta l'istanza di axios configurata per essere usata in altri file

// #export default api;






// ! Cosa sono gli interceptors e dove operano?
 
// ! Gli interceptors sono funzioni che operano esclusivamente nel frontend come parte della libreria Axios. Non sono:
 
// ! ❌ Non sono parte dei protocolli TCP/IP o HTTP
 
// ! ❌ Non sono componenti del backend
 
// ! ❌ Non sono memorizzati nel browser
 
// ! Dove si collocano esattamente:
 
// ! Sono parte del client (frontend) JavaScript
 
// ! Operano tra il tuo codice React/JavaScript e la rete
 
// ! Intercettano le richieste prima che lascino il browser
 
// ! Intercettano le risposte prima che raggiungano il tuo codice
 
// ! Analogia chiara: Immagina di scrivere una lettera (la tua richiesta). Un interceptor è come un assistente che:
 
// ! Legge la lettera prima che venga spedita
 
// ! Può aggiungere informazioni (come firmarla con il tuo nome)
 
// ! Può modificarla (correggere errori)
 
// ! Può decidere di non spedirla affatto
 
// ! Quando ricevi risposte, può leggerle prima di te e fare modifiche





// Tuo codice React → Interceptors → Internet → Server
// Server → Internet → Interceptors → Tuo codice React