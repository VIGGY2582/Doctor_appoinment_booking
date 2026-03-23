import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      let url = '/doctors';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (specialization) params.append('specialization', specialization);
      if (params.toString()) url += `?${params.toString()}`;

      const { data } = await api.get(url);
      setDoctors(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDoctors();
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">Find a Specialist</h2>
          <p className="text-muted mb-0">Browse our network of top-rated doctors.</p>
        </div>
      </div>
      
      <Card className="mb-5 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
        <Card.Body className="p-4 bg-white" style={{ borderRadius: '16px' }}>
          <Form onSubmit={handleSearch}>
            <Row className="g-3 align-items-center">
              <Col md={5}>
                <div className="position-relative">
                  <i className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-muted"></i>
                  <Form.Control 
                    type="text" 
                    placeholder="Search doctors by name..." 
                    className="ps-5 py-2 border-0 bg-light"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderRadius: '12px' }}
                  />
                </div>
              </Col>
              <Col md={5}>
                <div className="position-relative">
                  <i className="bi bi-funnel position-absolute top-50 translate-middle-y ms-3 text-muted"></i>
                  <Form.Control 
                    type="text" 
                    placeholder="Filter by specialization..." 
                    className="ps-5 py-2 border-0 bg-light"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    style={{ borderRadius: '12px' }}
                  />
                </div>
              </Col>
              <Col md={2}>
                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold" style={{ borderRadius: '12px' }}>Search</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger" className="border-0 shadow-sm rounded-3">{error}</Alert>}
      
      {loading ? (
        <div className="text-center py-5 my-5">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-muted fw-medium">Loading specialists...</p>
        </div>
      ) : (
        <Row className="g-4">
          {doctors.length === 0 ? (
            <Col>
              <div className="text-center py-5 bg-white rounded-4 shadow-sm border-0">
                <i className="bi bi-search display-1 text-muted opacity-25 mb-3"></i>
                <h4 className="fw-bold text-dark">No Doctors Found</h4>
                <p className="text-muted">We couldn't find any specialists matching your criteria.</p>
                <Button variant="outline-primary" onClick={() => { setSearchTerm(''); setSpecialization(''); fetchDoctors(); }} className="mt-2 rounded-pill px-4">
                  Clear Filters
                </Button>
              </div>
            </Col>
          ) : (
            doctors.map(doctor => (
              <Col md={6} lg={4} key={doctor.id}>
                <Card className="h-100 shadow-sm border-0 template-card">
                  <Card.Body className="d-flex flex-column p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px' }}>
                        <span className="text-primary fw-bold" style={{ fontSize: '1.5rem' }}>{doctor.user.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <Badge bg="success" className="bg-opacity-10 text-success rounded-pill px-3 py-2 border border-success border-opacity-25">Available</Badge>
                    </div>
                    
                    <Card.Title className="fw-bold fs-4 mb-1">Dr. {doctor.user.name}</Card.Title>
                    <Card.Subtitle className="mb-4 text-primary fw-medium">{doctor.specialization}</Card.Subtitle>
                    
                    <div className="mt-auto">
                      <div className="d-flex align-items-center mb-2 text-muted">
                        <i className="bi bi-briefcase-fill me-2 text-primary"></i>
                        <span><strong>{doctor.experience}</strong> Years Experience</span>
                      </div>
                      <div className="d-flex align-items-center mb-4 text-muted">
                        <i className="bi bi-envelope-fill me-2 text-primary"></i>
                        <span className="text-truncate" title={doctor.user.email}>{doctor.user.email}</span>
                      </div>
                      
                      <Button as={Link} to={`/doctors/${doctor.id}`} variant="outline-primary" className="w-100 fw-bold py-2 rounded-3">
                        View Profile & Book
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
    </Container>
  );
};

export default DoctorList;
