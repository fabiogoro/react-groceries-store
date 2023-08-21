import Container from 'react-bootstrap/Container'

function Footer() {
  return (
    <Container fluid className="fixed-bottom bg-light p-0">
      <footer className="d-flex flex-wrap justify-content-between align-items-center p-4  border-top w-100">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary">
            Contact:<br/>
            +1 111 111111 1111<br/>
            groceries@internet.co
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-center list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary" href="/">Groceries store</a></li>
        </ul>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary" href="http://github.com/fabiogoro/react-groceries-store">Github</a></li>
        </ul>
      </footer>
    </Container>
  );
}

export default Footer;


