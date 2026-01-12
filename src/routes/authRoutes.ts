import { Router, Response } from 'express';
import User, { UserRole } from '../models/User';
import { AuthRequest, authenticate, generateToken } from '../middleware/authMiddleware';

const router = Router();

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id.toString());

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/auth/me - Get current user
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        res.json({
            user: {
                id: req.user!._id,
                username: req.user!.username,
                role: req.user!.role,
                assigned_events: req.user!.assigned_events
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/auth/init - Create initial admin (one-time setup)
router.post('/init', async (req, res) => {
    try {
        // Check if any admin exists
        const adminExists = await User.findOne({ role: UserRole.ADMIN });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const admin = new User({
            username,
            password,
            role: UserRole.ADMIN
        });

        await admin.save();

        const token = generateToken(admin._id.toString());

        res.status(201).json({
            message: 'Admin created successfully',
            token,
            user: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Init error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
