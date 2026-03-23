const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addAvailability = async (req, res) => {
    try {
        const { date, timeSlot } = req.body;
        
        const doctor = await prisma.doctor.findUnique({
            where: { userId: req.user.id }
        });
        
        if (!doctor) {
            return res.status(404).send({ error: 'Doctor profile not found' });
        }
        
        const availability = await prisma.availability.create({
            data: {
                doctorId: doctor.id,
                date,
                timeSlot
            }
        });
        
        res.status(201).send(availability);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAvailability = async (req, res) => {
    try {
        const doctorId = parseInt(req.params.doctorId);
        const { date } = req.query;
        
        let whereClause = { doctorId };
        if (date) {
            whereClause.date = date;
        }
        
        const availabilities = await prisma.availability.findMany({
            where: whereClause,
            orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }]
        });
        
        // Filter out booked slots
        const bookedAppointments = await prisma.appointment.findMany({
            where: {
                doctorId,
                date: date || undefined,
                status: 'BOOKED'
            }
        });
        
        const bookedTimeSlots = bookedAppointments.map(app => `${app.date}-${app.time}`);
        
        const availableSlots = availabilities.filter(
            slot => !bookedTimeSlots.includes(`${slot.date}-${slot.timeSlot}`)
        );
        
        res.send(availableSlots);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { addAvailability, getAvailability };
