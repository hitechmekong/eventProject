"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importStar(require("../models/User"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// GET /api/users - List all users (Admin only)
router.get('/', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find()
            .select('-password')
            .populate('assigned_events', 'name')
            .sort({ created_at: -1 });
        res.json({ data: users });
    }
    catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// GET /api/users/:id - Get single user (Admin only)
router.get('/:id', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id)
            .select('-password')
            .populate('assigned_events', 'name');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ data: user });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// POST /api/users - Create Mod user (Admin only)
router.post('/', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role, assigned_events } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        // Check if username exists
        const existingUser = yield User_1.default.findOne({ username: username.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const user = new User_1.default({
            username,
            password,
            role: role || User_1.UserRole.MOD,
            assigned_events: assigned_events || []
        });
        yield user.save();
        const userResponse = yield User_1.default.findById(user._id)
            .select('-password')
            .populate('assigned_events', 'name');
        res.status(201).json({ message: 'User created', data: userResponse });
    }
    catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// PUT /api/users/:id - Update user (Admin only)
router.put('/:id', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { username, password, role, assigned_events } = req.body;
        if (username) {
            // Check if new username conflicts with existing
            const existingUser = yield User_1.default.findOne({
                username: username.toLowerCase(),
                _id: { $ne: req.params.id }
            });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            user.username = username;
        }
        if (password)
            user.password = password; // Will be hashed by pre-save hook
        if (role)
            user.role = role;
        if (assigned_events !== undefined)
            user.assigned_events = assigned_events;
        yield user.save();
        const userResponse = yield User_1.default.findById(user._id)
            .select('-password')
            .populate('assigned_events', 'name');
        res.json({ message: 'User updated', data: userResponse });
    }
    catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// DELETE /api/users/:id - Delete user (Admin only)
router.delete('/:id', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Prevent deleting yourself
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete yourself' });
        }
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// PUT /api/users/:id/assign-events - Assign events to user (Admin only)
router.put('/:id/assign-events', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_ids } = req.body;
        if (!Array.isArray(event_ids)) {
            return res.status(400).json({ message: 'event_ids must be an array' });
        }
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.assigned_events = event_ids;
        yield user.save();
        const userResponse = yield User_1.default.findById(user._id)
            .select('-password')
            .populate('assigned_events', 'name');
        res.json({ message: 'Events assigned', data: userResponse });
    }
    catch (error) {
        console.error('Assign events error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
