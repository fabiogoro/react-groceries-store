import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { postLogoff } from '../util/Api'
import Badge from 'react-bootstrap/Badge'

function Header({user, setUser, cart}) {
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
            {user?.name?(
              <>
              <Nav.Link href="/cart" className="text-nowrap">Cart <Badge bg="secondary">{cart?.length === 0
                ? 0 : cart?.length === 1? cart[0].quantity
                  : cart?.reduce((c1, c2) =>
                      typeof c1 != 'number'
                        ? c1.quantity + c2.quantity
                        : c1 + c2.quantity
                    )}</Badge></Nav.Link>
              <NavDropdown menuVariant="dark" title={`Hello, ${user.name}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logoff}>Logoff</NavDropdown.Item>
              </NavDropdown>
              </>
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
