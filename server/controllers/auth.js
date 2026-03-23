const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res) => {
    try {
        const { name, email, password, role, specialization, experience } = req.body;
        
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'PATIENT'
            }
        });

        if (user.role === 'DOCTOR') {
            await prisma.doctor.create({
                data: {
                    userId: user.id,
                    specialization: specialization || 'General',
                    experience: experience ? parseInt(experience) : 0
                }
            });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).send({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.send({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = { register, login };
