import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Alert, Badge, Button } from 'react-bootstrap';
import api from '../services/api';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

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

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  return (
    <Container>
      <h2 className="mb-4">My Appointments</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card className="shadow-sm border-0">
        <Card.Body>
          {appointments.length === 0 ? (
            <p className="text-muted">You have no booked appointments.</p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(app => (
                  <tr key={app.id}>
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                    <td>Dr. {app.doctor.user.name}</td>
                    <td>{app.doctor.specialization}</td>
                    <td>
                      <Badge bg={app.status === 'BOOKED' ? 'success' : 'secondary'}>
                        {app.status}
                      </Badge>
                    </td>
                    <td>
                      {app.status === 'BOOKED' && (
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => handleCancel(app.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientDashboard;
