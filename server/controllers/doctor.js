const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDoctors = async (req, res) => {
    try {
        const { search, specialization } = req.query;
        let whereClause = {};
        
        if (specialization) {
            whereClause.specialization = { contains: specialization, mode: 'insensitive' };
        }
        
        // Also support search by name
        if (search) {
            whereClause.user = {
                name: { contains: search, mode: 'insensitive' }
            };
        }
        
        const doctors = await prisma.doctor.findMany({
            where: whereClause,
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });
        
        res.send(doctors);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const doctor = await prisma.doctor.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                user: {
                    select: { name: true, email: true }
                },
                availability: true
            }
        });
        
        if (!doctor) {
            return res.status(404).send({ error: 'Doctor not found' });
        }
        
        res.send(doctor);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { getDoctors, getDoctorById };
