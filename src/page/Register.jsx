import{useState} from 'react';  // Hook per gestire lo stato interno del componente
import axiosInstance from '../api/axios' // Libreria per effettuare richieste HTTP
import {Col, Form, Button, Container, Row, Alert} from 'react-bootstrap';  // Componenti UI da Bootstrap
import {useNavigate} from 'react-router-dom';  // Hook per la navigazione e componente per link

const Register = () => {

const [firstName, setName]=useState("");

//  Daniele ha fatto cosi invece che ogni useState const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: ""
// });


// nel form value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})}

// faccio in value formData.firstName per accedere alla proprietà firstName dell'oggetto formData

const [lastName, setSurname] = useState("");
const [email,setEmail] = useState("");
const [password, setPassword]=useState("");
const [error, setError]=useState("");

const navigate = useNavigate(); // Hook per la navigazione;

const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Invio al server:', {firstName, lastName, email, password});

    try {
         await axiosInstance.post("/register", // lo metti in una costante per poterlo riutilizzare devi richiamare la constante magari 
            //        setSuccessMessage(response.data.message || 'Registrazione completata con successo!');
            {
                firstName,
                lastName,
                email,
                password
            })

            //  se fai come Daniele await axiosInstance.post("/register", formData) 


            
        
           
            
            navigate("/login?regisered=true") // !ritorno alla pagina di login dopo essersi registrato per inserire i dati utente e fare il login + 
            // !passo in più una query string , da usare con useLocation + new SearchParams ; un parametro per mostrare un messaggio di conferma
        
        } catch(error){
                setError(error.response?.data?.message || "Errore nella registrazione") // se c'è un errore nella registrazione, mostra il messaggio di errore
            }
    }

return(
<Container>
    <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
        <h2>Register</h2>
        {error && <Alert variant ="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={firstName} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            
                     

            <Form.Group className="mb-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" placeholder="Enter surname" value={lastName} onChange={(e) => setSurname(e.target.value)}/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            
            <Button variant="success" type="submit">Register</Button>
            
            <Form.Text className="text-muted d-block mt-2">
                We'll never share your name with anyone else.
            </Form.Text>
        </Form>
        </Col>
    </Row>
</Container>
)}

export default Register;


















