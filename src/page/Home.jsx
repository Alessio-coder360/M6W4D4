import {useAuth} from '../context/authContext';
import {Container, Row, Col, Card} from 'react-bootstrap';


const Home =()=>{
    const {user} = useAuth()
    return( 
        <Container>

            <Row className="justify-content-md-center mt-5">

                <Col xs={12} md={6}>
                
                <h2>Welcome to the Blog</h2>

                <Card>
                    <Card.Body>
                        <Card.Title> {user
                         ? `Welcome ${user?.username || user?.email || 'User'}`
                         : `Welcome to the Blog please login or register`}
                         </Card.Title>
                         <Card.Text>
                            {user 
                            ? "Explore our blog content or create your own post"
                            : "Join our community to share your thoughts and ideas"
                            }
                         </Card.Text>
                    </Card.Body>
                </Card>
                
                </Col>



            </Row>


        </Container>
    )

}


export default Home;