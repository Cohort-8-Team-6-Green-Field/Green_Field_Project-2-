import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NaveBaree = () => {
  function handleDisconnect() {
    window.location.replace('/');
    localStorage.setItem('user', JSON.stringify({}));
  }
  const user =JSON.parse(localStorage.getItem('user'))
 
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/landingPage">E-education</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/profile'>Profile</Nav.Link>
           { user.user_type==="teacher"&& <Nav.Link href="/addCours">Add Course </Nav.Link>}
            <Nav.Link href="/container">Courses</Nav.Link>
         
          </Nav>
          <Nav>
          <NavDropdown title="My learning" id="collasible-nav-dropdown">
     
              <NavDropdown.Item href="/mylist">My List</NavDropdown.Item>
              <NavDropdown.Item  onClick={handleDisconnect}>Disconnect</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NaveBaree
