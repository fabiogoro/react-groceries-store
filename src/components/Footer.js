import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <Container fluid className="fixed-bottom bg-light p-0 d-none d-lg-block">
      <footer className="d-flex flex-wrap justify-content-between align-items-center p-4  border-top w-100">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 me-4 pe-4 mb-md-0 text-body-secondary">
            Contact:<br/>
            +1 111 111111 1111<br/>
            groceries@internet.co
          </span>

          <span className="mb-3 ms-4 mb-md-0 text-body-secondary">
            Links:<br/>
            <a href="about" className="text-body-secondary">About us</a><br/>
            <a href="contact" className="text-body-secondary">Contact us</a><br/>
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-center list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary logo" href="/"><FontAwesomeIcon icon={faBasketShopping} /> Groceries store</a></li>
        </ul>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary fs-2" href="http://github.com/fabiogoro/react-groceries-store"><FontAwesomeIcon icon={faGithub} /></a></li>
        </ul>
      </footer>
    </Container>
  );
}

export default Footer;


