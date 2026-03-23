import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import api from '../services/api';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({ 
    name: '', email: '', password: '', role: 'PATIENT', specialization: '', experience: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/auth/register', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      
      if (data.user.role === 'PATIENT') navigate('/patient/dashboard');
      else if (data.user.role === 'DOCTOR') navigate('/doctor/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Register</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={handleChange} required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>I am a...</Form.Label>
                  <Form.Select name="role" value={formData.role} onChange={handleChange}>
                    <option value="PATIENT">Patient</option>
                    <option value="DOCTOR">Doctor</option>
                  </Form.Select>
                </Form.Group>

                {formData.role === 'DOCTOR' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Specialization</Form.Label>
                      <Form.Control type="text" name="specialization" onChange={handleChange} required={formData.role === 'DOCTOR'} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Years of Experience</Form.Label>
                      <Form.Control type="number" name="experience" onChange={handleChange} required={formData.role === 'DOCTOR'} min="0" />
                    </Form.Group>
                  </>
                )}

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </Form>
              <div className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
