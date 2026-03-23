# Doctor Appointment Booking Platform

Complete, production-ready full-stack Doctor Appointment Booking system built with React, Vite, Node.js, Express, PostgreSQL, Prisma, and Bootstrap.

## Features
- **Patients**: Register, search for doctors by name or specialization, view profiles, and book available appointments. Manage (view/cancel) own appointments.
- **Doctors**: Register, manage availability time slots, view booked appointments.
- **Admin**: View all doctors and all appointments across the platform. (Use role: 'ADMIN' to login to this dashboard after manual db update).

## Prerequisites
- Node.js (v18+)
- PostgreSQL (running locally or a remote database URL)

## Setup Instructions

### 1. Database Configuration
Ensure PostgreSQL is running. Open `server/.env` and update the `DATABASE_URL` with your actual PostgreSQL credentials if needed.
`DATABASE_URL="postgresql://postgres:postgres@localhost:5432/doc_appointment?schema=public"`

### 2. Initialization
Install global and specific project dependencies:
```bash
cd server
npm install
cd ../client
npm install
```

### 3. Setup Database Schema
Initialize the database tables by running Prisma's db push command:
```bash
cd server
npx prisma db push
```

### 4. Running the Application
Return to root directory and run dev command or if it fails do it individually:

**Client:**
```bash
cd client
npm run dev
```

**Server:**
```bash
cd server
npm run dev
```

## Access
- Frontend: [http://localhost:5173/](http://localhost:5173/)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)
