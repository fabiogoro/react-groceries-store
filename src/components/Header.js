import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { postLogoff } from '../util/Api'

function Header({user, setUser, navigate}) {

  function logoff(){
    postLogoff()
    setUser(undefined)
    window.location.replace('/')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Groceries store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <form className="d-flex w-100 justify-content-center"
            role="search">
            <input className="form-control me-2 w-25"
              aria-label="Search"
              placeholder="Search"
              type="search"/> <button className="btn btn-outline-secondary"
                type="submit">Search</button>
          </form>
          <Nav className="me-auto justify-content-end">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            {user?(
              <NavDropdown menuVariant="dark" title={`Hello, ${user.name}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logoff}>Logoff</NavDropdown.Item>
              </NavDropdown>
            ):(
              <>
                <Nav.Link href="/login" className="text-nowrap">Log in</Nav.Link>
                <Nav.Link href="/signup" className="text-nowrap">Sign up</Nav.Link>
              </>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
