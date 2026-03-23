import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const BookingModal = ({ show, onHide, doctor, availability }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Group availability by date
  const slotsByDate = availability.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  const handleBook = async () => {
    if (!selectedSlot) {
      setError('Please select a time slot.');
      return;
    }
    
    const [date, time] = selectedSlot.split('|');
    
    setLoading(true);
    setError('');
    
    try {
      await api.post('/appointments', {
        doctorId: doctor.id,
        date,
        time
      });
      setSuccess('Appointment booked successfully!');
      setTimeout(() => {
        onHide();
        navigate('/patient/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Appointment with Dr. {doctor?.user?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        
        {availability.length === 0 ? (
          <Alert variant="warning">No available slots at the moment.</Alert>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Available Time Slots</Form.Label>
              <Form.Select 
                value={selectedSlot} 
                onChange={(e) => setSelectedSlot(e.target.value)}
                disabled={loading || success}
              >
                <option value="">-- Select a Date & Time --</option>
                {Object.keys(slotsByDate).map(date => (
                  <optgroup key={date} label={date}>
                    {slotsByDate[date].map(slot => (
                      <option key={slot.id} value={`${slot.date}|${slot.timeSlot}`}>
                        {slot.timeSlot}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button 
          variant="primary" 
          onClick={handleBook} 
          disabled={!selectedSlot || loading || success || availability.length === 0}
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
