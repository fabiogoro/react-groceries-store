import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Header({user}) {
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
              <Nav.Link href="/" className="text-nowrap">Hello, {user.name}</Nav.Link>
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
