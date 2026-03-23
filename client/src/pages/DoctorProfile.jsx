import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import api from '../services/api';
import BookingModal from '../components/BookingModal';

const DoctorProfile = ({ user }) => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await api.get(`/doctors/${id}`);
        setDoctor(data);
        
        // Fetch available slots
        const { data: slots } = await api.get(`/availability/${id}`);
        setAvailability(slots);
      } catch (err) {
        setError('Failed to load doctor profile');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return (
    <div className="text-center py-5 my-5">
      <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
      <p className="mt-3 text-muted fw-medium">Loading profile...</p>
    </div>
  );
  if (error) return <Container className="py-5"><Alert variant="danger" className="border-0 shadow-sm rounded-3">{error}</Alert></Container>;
  if (!doctor) return <Container className="py-5"><Alert variant="warning" className="border-0 shadow-sm rounded-3">Doctor not found</Alert></Container>;

  return (
    <Container className="py-4">
      <Link to="/doctors" className="btn btn-link text-decoration-none text-muted mb-4 px-0">
        <i className="bi bi-arrow-left me-2"></i>Back to Specialists
      </Link>
      
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0 mb-4 overflow-hidden" style={{ borderRadius: '24px' }}>
            {/* Header Banner */}
            <div className="bg-primary text-white p-5 text-center position-relative hero-gradient" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
              <div className="bg-white text-primary rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3 shadow" style={{ width: '100px', height: '100px', fontSize: '2.5rem', border: '4px solid rgba(255,255,255,0.2)' }}>
                <span className="fw-bold">{doctor.user.name.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="fw-bold mb-1">Dr. {doctor.user.name}</h2>
              <h5 className="opacity-75 mb-0 fw-normal">{doctor.specialization}</h5>
            </div>
            
            <Card.Body className="p-5 bg-white">
              <Row className="mb-5 g-4">
                <Col sm={6}>
                  <div className="d-flex align-items-center p-3 bg-light rounded-4 h-100 border-0">
                    <div className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow-sm me-3 text-primary" style={{ width: '48px', height: '48px' }}>
                      <i className="bi bi-award-fill fs-5"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Experience</h6>
                      <h5 className="mb-0 fw-bold">{doctor.experience} Years</h5>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center p-3 bg-light rounded-4 h-100 border-0">
                    <div className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow-sm me-3 text-primary" style={{ width: '48px', height: '48px' }}>
                      <i className="bi bi-envelope-fill fs-5"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Contact</h6>
                      <h5 className="mb-0 fw-bold text-truncate" title={doctor.user.email} style={{ maxWidth: '180px' }}>{doctor.user.email}</h5>
                    </div>
                  </div>
                </Col>
              </Row>
              
              <div className="text-center">
                <div className="mb-4">
                  <Badge bg="success" className="bg-opacity-10 text-success rounded-pill px-4 py-2 border border-success border-opacity-25 fs-6">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Accepting New Patients
                  </Badge>
                </div>

                {!user ? (
                  <Alert variant="info" className="border-0 shadow-sm rounded-3 py-3">
                    <i className="bi bi-info-circle me-2"></i>
                    Please <Link to="/login" className="fw-bold text-decoration-none">log in</Link> as a patient to book an appointment.
                  </Alert>
                ) : user.role === 'PATIENT' ? (
                  <Button variant="primary" size="lg" className="w-100 rounded-pill py-3 fw-bold shadow-sm" onClick={() => setShowModal(true)}>
                    <i className="bi bi-calendar-plus me-2"></i> Book Appointment
                  </Button>
                ) : null}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <BookingModal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        doctor={doctor}
        availability={availability}
      />
    </Container>
  );
};

export default DoctorProfile;
