import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <Container className="text-center py-5 mt-5">
        <Row className="justify-content-center mb-5 pb-5">
          <Col md={10} lg={9}>
            <div className="d-inline-flex align-items-center gap-2 bg-white px-4 py-2 rounded-pill fw-bold mb-4 shadow-sm" style={{ color: 'var(--primary)', border: '1px solid rgba(124,58,237,0.1)' }}>
              <span className="spinner-grow spinner-grow-sm text-secondary" role="status" aria-hidden="true"></span>
              Welcome to the Next Generation of Healthcare
            </div>
            <h1 className="display-2 fw-black mb-4 hero-gradient" style={{ letterSpacing: '-2px', lineHeight: '1.1', fontWeight: '900' }}>
              Book Your Doctor<br/>In a Heartbeat
            </h1>
            <p className="lead text-muted mb-5 px-xl-5" style={{ fontSize: '1.35rem', lineHeight: '1.8' }}>
              Connect with top-rated medical specialists globally. Enjoy a flawless, vibrant, and personalized booking experience that puts your health front and center.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-4 mt-2">
              <Button as={Link} to="/doctors" variant="primary" size="lg" className="px-5 py-3 fs-5">
                <i className="bi bi-search me-2"></i> Find a Specialist
              </Button>
              <Button as={Link} to="/register" variant="outline-primary" size="lg" className="px-5 py-3 fs-5">
                Join the Platform
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      
      <div className="py-5 position-relative">
        <Container className="mb-5">
          <Row className="text-center mb-5 pb-3">
            <Col>
              <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--text-main)' }}>Experience Excellence</h2>
              <p className="text-muted mx-auto fs-5" style={{ maxWidth: '600px' }}>
                We've revolutionized how you interact with healthcare providers.
              </p>
            </Col>
          </Row>
          <Row className="g-5 text-center pb-5">
            <Col md={4}>
              <Card className="h-100 p-4 template-card glass-panel">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="icon-circle shadow-sm">
                    <i className="bi bi-lightning-charge-fill"></i>
                  </div>
                  <h3 className="h4 fw-bold mb-3">Lightning Fast</h3>
                  <p className="text-muted fs-6" style={{ lineHeight: '1.7' }}>Book your appointments instantly without any friction. Our systems are optimized for absolute speed.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 p-4 template-card glass-panel">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="icon-circle shadow-sm">
                    <i className="bi bi-stars"></i>
                  </div>
                  <h3 className="h4 fw-bold mb-3">Premium Care</h3>
                  <p className="text-muted fs-6" style={{ lineHeight: '1.7' }}>Discover elite, verified specialists. Every doctor in our network passes a rigorous verification process.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 p-4 template-card glass-panel">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="icon-circle shadow-sm">
                    <i className="bi bi-shield-lock-fill"></i>
                  </div>
                  <h3 className="h4 fw-bold mb-3">Ironclad Privacy</h3>
                  <p className="text-muted fs-6" style={{ lineHeight: '1.7' }}>Your health data is sacred. We use state-of-the-art encryption to keep your records entirely private.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
