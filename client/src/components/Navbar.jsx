import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavbarComponent = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="mb-5 sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <i className="bi bi-heart-pulse-fill text-primary" style={{ fontSize: '1.8rem' }}></i>
          <span>DocBooking</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-4">
            <Nav.Link as={Link} to="/doctors">Find Doctors</Nav.Link>
            {user && user.role === 'PATIENT' && (
              <Nav.Link as={Link} to="/patient/dashboard">My Dashboard</Nav.Link>
            )}
            {user && user.role === 'DOCTOR' && (
              <Nav.Link as={Link} to="/doctor/dashboard">Doctor Dashboard</Nav.Link>
            )}
            {user && user.role === 'ADMIN' && (
              <Nav.Link as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center me-4 bg-light px-3 py-2 rounded-pill shadow-sm">
                  <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2" style={{width: '32px', height: '32px', fontSize: '14px', fontWeight: 'bold'}}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-dark fw-bold" style={{fontSize: '14px'}}>{user.name}</span>
                </div>
                <Button variant="outline-danger" onClick={handleLogoutClick} className="rounded-pill px-4" style={{ fontWeight: '600' }}>Logout</Button>
              </div>
            ) : (
              <div className="d-flex gap-3">
                <Button as={Link} to="/login" variant="outline-primary" className="rounded-pill px-4">Login</Button>
                <Button as={Link} to="/register" variant="primary" className="rounded-pill px-4">Get Started</Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
