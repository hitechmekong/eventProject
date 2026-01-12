import { Router, Response } from 'express';
import Event from '../models/Event';
import { AuthRequest, authenticate, requireAdmin, requireMod } from '../middleware/authMiddleware';
import { UserRole } from '../models/User';

const router = Router();

// GET /api/events - List events (Admin: all, Mod: assigned only)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        let events;
        if (req.user!.role === UserRole.ADMIN) {
            events = await Event.find().populate('created_by', 'username').sort({ created_at: -1 });
        } else {
            // Mod sees only assigned events
            events = await Event.find({ _id: { $in: req.user!.assigned_events } })
                .populate('created_by', 'username')
                .sort({ created_at: -1 });
        }
        res.json({ data: events });
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/events/:id - Get single event
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const event = await Event.findById(req.params.id).populate('created_by', 'username');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check access for mods
        if (req.user!.role === UserRole.MOD) {
            const hasAccess = req.user!.assigned_events.some(
                (id) => id.toString() === event._id.toString()
            );
            if (!hasAccess) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }

        res.json({ data: event });
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/events - Create event (Admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, time, location, max_guests, table_count, checkin_mechanism, background_image } = req.body;

        if (!name || !time || !location) {
            return res.status(400).json({ message: 'Name, time, and location are required' });
        }

        const event = new Event({
            name,
            description,
            time,
            location,
            max_guests: max_guests || 100,
            table_count: table_count || 10,
            checkin_mechanism: checkin_mechanism || 'organizer_scan',
            background_image,
            created_by: req.user!._id
        });

        await event.save();
        res.status(201).json({ message: 'Event created', data: event });
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/events/:id - Update event
router.put('/:id', authenticate, requireMod, async (req: AuthRequest, res: Response) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check access for mods
        if (req.user!.role === UserRole.MOD) {
            const hasAccess = req.user!.assigned_events.some(
                (id) => id.toString() === event._id.toString()
            );
            if (!hasAccess) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }

        const { name, description, time, location, max_guests, table_count, checkin_mechanism, is_checkin_open, background_image } = req.body;

        if (name) event.name = name;
        if (description !== undefined) event.description = description;
        if (time) event.time = time;
        if (location) event.location = location;
        if (max_guests) event.max_guests = max_guests;
        if (table_count) event.table_count = table_count;
        if (checkin_mechanism) event.checkin_mechanism = checkin_mechanism;
        if (is_checkin_open !== undefined) event.is_checkin_open = is_checkin_open;
        if (background_image !== undefined) event.background_image = background_image;

        await event.save();
        res.json({ message: 'Event updated', data: event });
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/events/:id - Delete event (Admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted' });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
