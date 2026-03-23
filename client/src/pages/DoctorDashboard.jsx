import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Alert, Badge, Form, Button } from 'react-bootstrap';
import api from '../services/api';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  
  // Availability form state
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [addMsg, setAddMsg] = useState('');

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments');
      setAppointments(data);
    } catch (err) {
      setError('Failed to fetch appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      await api.post('/availability', { date, timeSlot });
      setAddMsg('Slot added successfully');
      setDate('');
      setTimeSlot('');
      setTimeout(() => setAddMsg(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add slot');
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Doctor Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="g-4">
        <Col lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Add Availability</h5>
            </Card.Header>
            <Card.Body>
              {addMsg && <Alert variant="success">{addMsg}</Alert>}
              <Form onSubmit={handleAddSlot}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Time Slot</Form.Label>
                  <Form.Control type="time" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Add Slot</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">My Appointments</h5>
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
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(app => (
                      <tr key={app.id}>
                        <td>{app.date}</td>
                        <td>{app.time}</td>
                        <td>{app.patient.name}</td>
                        <td>{app.patient.email}</td>
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

export default DoctorDashboard;
