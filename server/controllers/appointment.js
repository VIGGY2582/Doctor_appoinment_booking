const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAppointment = async (req, res) => {
    try {
        const { doctorId, date, time } = req.body;
        
        // Ensure the slot is free
        const existingAppointment = await prisma.appointment.findFirst({
            where: { doctorId: parseInt(doctorId), date, time, status: 'BOOKED' }
        });
        
        if (existingAppointment) {
            return res.status(400).send({ error: 'Time slot already booked' });
        }
        
        const appointment = await prisma.appointment.create({
            data: {
                patientId: req.user.id,
                doctorId: parseInt(doctorId),
                date,
                time,
                status: 'BOOKED'
            }
        });
        
        res.status(201).send(appointment);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAppointments = async (req, res) => {
    try {
        let whereClause = {};
        
        if (req.user.role === 'PATIENT') {
            whereClause.patientId = req.user.id;
        } else if (req.user.role === 'DOCTOR') {
            const doctor = await prisma.doctor.findUnique({ where: { userId: req.user.id } });
            if (doctor) {
                whereClause.doctorId = doctor.id;
            }
        }
        // Admin gets all appointments
        
        const appointments = await prisma.appointment.findMany({
            where: whereClause,
            include: {
                patient: { select: { name: true, email: true } },
                doctor: { 
                    include: { 
                        user: { select: { name: true, email: true } } 
                    } 
                }
            },
            orderBy: [{ date: 'asc' }, { time: 'asc' }]
        });
        
        res.send(appointments);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const appointmentId = parseInt(req.params.id);
        
        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId }
        });
        
        if (!appointment) {
            return res.status(404).send({ error: 'Appointment not found' });
        }
        
        // Authorize cancellation
        if (req.user.role === 'PATIENT' && appointment.patientId !== req.user.id) {
            return res.status(403).send({ error: 'Not authorized' });
        }
        
        const updatedAppointment = await prisma.appointment.update({
            where: { id: appointmentId },
            data: { status: 'CANCELLED' }
        });
        
        res.send(updatedAppointment);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { createAppointment, getAppointments, cancelAppointment };
