import express from 'express';
import checkinRoutes from './routes/checkinRoutes';
import guestRoutes from './routes/guestRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors (Add if needed given we are doing cross-origin from Next.js potentially if on different ports)
// For now assuming proxy or same origin dev
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Routes
app.use('/api/checkin', checkinRoutes);
app.use('/api/guests', guestRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

export default app;
