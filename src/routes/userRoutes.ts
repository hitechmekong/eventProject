import { Router, Response } from 'express';
import User, { UserRole } from '../models/User';
import { AuthRequest, authenticate, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// GET /api/users - List all users (Admin only)
router.get('/', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const users = await User.find()
            .select('-password')
            .populate('assigned_events', 'name')
            .sort({ created_at: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/users/:id - Get single user (Admin only)
router.get('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('assigned_events', 'name');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ data: user });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/users - Create Mod user (Admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const { username, password, role, assigned_events } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if username exists
        const existingUser = await User.findOne({ username: username.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = new User({
            username,
            password,
            role: role || UserRole.MOD,
            assigned_events: assigned_events || []
        });

        await user.save();

        const userResponse = await User.findById(user._id)
            .select('-password')
            .populate('assigned_events', 'name');

        res.status(201).json({ message: 'User created', data: userResponse });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/users/:id - Update user (Admin only)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { username, password, role, assigned_events } = req.body;

        if (username) {
            // Check if new username conflicts with existing
            const existingUser = await User.findOne({
                username: username.toLowerCase(),
                _id: { $ne: req.params.id as string }
            });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            user.username = username;
        }
        if (password) user.password = password; // Will be hashed by pre-save hook
        if (role) user.role = role;
        if (assigned_events !== undefined) user.assigned_events = assigned_events;

        await user.save();

        const userResponse = await User.findById(user._id)
            .select('-password')
            .populate('assigned_events', 'name');

        res.json({ message: 'User updated', data: userResponse });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/users/:id - Delete user (Admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        // Prevent deleting yourself
        if (req.params.id === req.user!._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete yourself' });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/users/:id/assign-events - Assign events to user (Admin only)
router.put('/:id/assign-events', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const { event_ids } = req.body;
        if (!Array.isArray(event_ids)) {
            return res.status(400).json({ message: 'event_ids must be an array' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.assigned_events = event_ids;
        await user.save();

        const userResponse = await User.findById(user._id)
            .select('-password')
            .populate('assigned_events', 'name');

        res.json({ message: 'Events assigned', data: userResponse });
    } catch (error) {
        console.error('Assign events error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
