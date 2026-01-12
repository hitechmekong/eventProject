import express from 'express';
import checkinRoutes from './routes/checkinRoutes';
import guestRoutes from './routes/guestRoutes';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - Updated to include Authorization header for JWT
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/checkin', checkinRoutes);
app.use('/api/guests', guestRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Serve Static Frontend (Updated for Deployment)
// __dirname in compiled code = /dist, so ./public = /dist/public
// extensions: ['html'] allows /admin to serve admin.html
import path from 'path';
app.use(express.static(path.join(__dirname, 'public'), {
    extensions: ['html']
}));

// SPA Fallback: Any request not handled by API or Static files returns index.html
// Express 5 requires Regex /.*/ instead of string '*'
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

export default app;
