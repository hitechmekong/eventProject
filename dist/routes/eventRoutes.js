"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Event_1 = __importDefault(require("../models/Event"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// GET /api/events - List events (Admin: all, Mod: assigned only)
router.get('/', authMiddleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let events;
        if (req.user.role === User_1.UserRole.ADMIN) {
            events = yield Event_1.default.find().populate('created_by', 'username').sort({ created_at: -1 });
        }
        else {
            // Mod sees only assigned events
            events = yield Event_1.default.find({ _id: { $in: req.user.assigned_events } })
                .populate('created_by', 'username')
                .sort({ created_at: -1 });
        }
        res.json({ data: events });
    }
    catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// GET /api/events/:id - Get single event
router.get('/:id', authMiddleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findById(req.params.id).populate('created_by', 'username');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // Check access for mods
        if (req.user.role === User_1.UserRole.MOD) {
            const hasAccess = req.user.assigned_events.some((id) => id.toString() === event._id.toString());
            if (!hasAccess) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }
        res.json({ data: event });
    }
    catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// POST /api/events - Create event (Admin only)
router.post('/', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, time, location, max_guests, table_count, checkin_mechanism, background_image } = req.body;
        if (!name || !time || !location) {
            return res.status(400).json({ message: 'Name, time, and location are required' });
        }
        const event = new Event_1.default({
            name,
            description,
            time,
            location,
            max_guests: max_guests || 100,
            table_count: table_count || 10,
            checkin_mechanism: checkin_mechanism || 'organizer_scan',
            background_image,
            created_by: req.user._id
        });
        yield event.save();
        res.status(201).json({ message: 'Event created', data: event });
    }
    catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// PUT /api/events/:id - Update event
router.put('/:id', authMiddleware_1.authenticate, authMiddleware_1.requireMod, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // Check access for mods
        if (req.user.role === User_1.UserRole.MOD) {
            const hasAccess = req.user.assigned_events.some((id) => id.toString() === event._id.toString());
            if (!hasAccess) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }
        const { name, description, time, location, max_guests, table_count, checkin_mechanism, is_checkin_open, background_image } = req.body;
        if (name)
            event.name = name;
        if (description !== undefined)
            event.description = description;
        if (time)
            event.time = time;
        if (location)
            event.location = location;
        if (max_guests)
            event.max_guests = max_guests;
        if (table_count)
            event.table_count = table_count;
        if (checkin_mechanism)
            event.checkin_mechanism = checkin_mechanism;
        if (is_checkin_open !== undefined)
            event.is_checkin_open = is_checkin_open;
        if (background_image !== undefined)
            event.background_image = background_image;
        yield event.save();
        res.json({ message: 'Event updated', data: event });
    }
    catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// DELETE /api/events/:id - Delete event (Admin only)
router.delete('/:id', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted' });
    }
    catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
