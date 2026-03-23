import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Alert, Badge } from 'react-bootstrap';
import api from '../services/api';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, docRes] = await Promise.all([
          api.get('/appointments'),
          api.get('/doctors')
        ]);
        setAppointments(appRes.data);
        setDoctors(docRes.data);
      } catch (err) {
        setError('Failed to fetch admin data');
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Admin Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="g-4 mb-5">
        <Col md={6}>
          <Card className="shadow-sm border-0 h-100 bg-primary text-white">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="mb-0">Total Doctors</h5>
                <h2 className="display-4 fw-bold mb-0">{doctors.length}</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm border-0 h-100 bg-success text-white">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="mb-0">Total Appointments</h5>
                <h2 className="display-4 fw-bold mb-0">{appointments.length}</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={12}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">All Appointments</h5>
            </Card.Header>
            <Card.Body>
              {appointments.length === 0 ? (
                <p className="text-muted">No appointments found.</p>
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(app => (
                      <tr key={app.id}>
                        <td>{app.date}</td>
                        <td>{app.time}</td>
                        <td>{app.patient?.name}</td>
                        <td>Dr. {app.doctor?.user?.name}</td>
                        <td>
                          <Badge bg={app.status === 'BOOKED' ? 'success' : 'secondary'}>
                            {app.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
