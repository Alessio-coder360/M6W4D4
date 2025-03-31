import {Nav, Navbar, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../context/authContext';

const NavBar = () => {
    const {user, logout} = useAuth()

    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href='/'>The Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className='nav-link'>Home</Link>
                        <Link to="/posts" className='nav-link'>Posts</Link>
                        <Link to="/authors" className='nav-link'>Authors</Link>
                    </Nav>
                    {user ? (
                        <Nav>
                            { <Link to="/profile" className='nav-link'>{user?.username || 'Who are you?'}</Link> 
                            /* Prova a visualizzare user.username Se user.username è null, undefined o una stringa vuota "", mostra "Who are you?" invece */}
                            <Link to="/" className='nav-link' onClick={logout}>Logout</Link>
                            {/* <Nav.Link onClick={logout}>Logout</Nav.Link> */}
                        </Nav>
                    ) : (
                        <Nav>
                            <Link to="/login" className='nav-link'>Login</Link>
                            <Link to="/register" className='nav-link'>Register</Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;