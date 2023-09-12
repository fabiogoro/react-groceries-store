import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Badge from 'react-bootstrap/Badge'
import { useUserContext } from '../contexts/UserContext'

function Header() {
  const queryParams = new URLSearchParams(window.location.search)
  const queryParam = queryParams.get('q')
  const user = useUserContext()

  function submitSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams(document.location.search)
    params.set('q', e.target.elements[0].value)
    document.location.replace(`/?${params}`)
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Groceries store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <form
            className="d-flex w-100 justify-content-center"
            role="search"
            onSubmit={submitSearch}
          >
            <input
              className="form-control me-2 w-25"
              aria-label="Search"
              placeholder="search"
              name="q"
              id="q"
              defaultValue={'' || queryParam}
              type="search"
            />{' '}
            <button className="btn btn-outline-secondary" type="submit">
              Search
            </button>
          </form>
          <Nav className="me-auto justify-content-end">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            {user.isLoggedIn ? (
              <>
                <Nav.Link href="/cart" className="text-nowrap">
                  Cart <Badge bg="secondary">{user.cart.totalItems}</Badge>
                </Nav.Link>
                <NavDropdown
                  menuVariant="dark"
                  title={`Hello, ${user.name}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/orders" className="text-nowrap">
                    My orders
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/profile" className="text-nowrap">
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={user.logoff()}>
                    Logoff
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/login" className="text-nowrap">
                  Log in
                </Nav.Link>
                <Nav.Link href="/signup" className="text-nowrap">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
