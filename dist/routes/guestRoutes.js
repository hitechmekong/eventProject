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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const XLSX = __importStar(require("xlsx"));
const Guest_1 = __importStar(require("../models/Guest"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const User_1 = require("../models/User");
const ticketGenerator_1 = require("../utils/ticketGenerator");
const qrGenerator_1 = require("../utils/qrGenerator");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// GET /api/guests - List guests (filtered by event for mods)
router.get('/', authMiddleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id } = req.query;
        let query = {};
        if (event_id) {
            query.event_id = event_id;
        }
        // Mods can only see guests from their assigned events
        if (req.user.role === User_1.UserRole.MOD && event_id) {
            const hasAccess = req.user.assigned_events.some((id) => id.toString() === event_id);
            if (!hasAccess) {
                return res.status(403).json({ message: 'Access denied to this event' });
            }
        }
        const guests = yield Guest_1.default.find(query)
            .populate('event_id', 'name')
            .sort({ created_at: -1 });
        res.json({ data: guests });
    }
    catch (error) {
        console.error('Get guests error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// POST /api/guests - Create single guest
router.post('/', authMiddleware_1.authenticate, authMiddleware_1.requireMod, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, email, company, event_id, seat_location, is_vip } = req.body;
        if (!name || !event_id) {
            return res.status(400).json({ message: 'Name and event_id are required' });
        }
        // Generate unique ticket code
        const existingCodes = yield Guest_1.default.find({ event_id }).distinct('ticket_code');
        const ticketCode = (0, ticketGenerator_1.generateTicketCode)({ length: 8, uppercase: true });
        const guest = new Guest_1.default({
            name,
            phone,
            email,
            company,
            event_id,
            seat_location,
            ticket_code: ticketCode,
            checkin_status: Guest_1.CheckinStatus.PENDING,
            metrics: { is_vip: is_vip || false }
        });
        yield guest.save();
        res.status(201).json({ message: 'Guest created', data: guest });
    }
    catch (error) {
        console.error('Create guest error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Ticket code already exists, please try again' });
        }
        res.status(500).json({ message: 'Server error' });
    }
}));
// POST /api/guests/import - Import guests from Excel
router.post('/import', authMiddleware_1.authenticate, authMiddleware_1.requireMod, upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id } = req.body;
        if (!event_id) {
            return res.status(400).json({ message: 'event_id is required' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Excel file is required' });
        }
        // Parse Excel file
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Excel file is empty' });
        }
        // Get existing codes
        const existingCodes = yield Guest_1.default.find({ event_id }).distinct('ticket_code');
        // Generate unique codes for all new guests
        const newCodes = yield (0, ticketGenerator_1.generateUniqueCodes)(rows.length, existingCodes, { length: 8, uppercase: true });
        // Map rows to guest documents
        const guests = rows.map((row, index) => ({
            name: row['Họ tên'] || row['Name'] || row['name'] || '',
            phone: row['SĐT'] || row['Phone'] || row['phone'] || '',
            email: row['Email'] || row['email'] || '',
            company: row['Công ty'] || row['Company'] || row['company'] || '',
            seat_location: row['Bàn'] || row['Seat'] || row['seat_location'] || '',
            event_id,
            ticket_code: newCodes[index],
            checkin_status: Guest_1.CheckinStatus.PENDING,
            metrics: {
                is_vip: (row['VIP'] === 'x' || row['VIP'] === true || row['is_vip'] === true)
            }
        })).filter(g => g.name); // Filter out empty rows
        if (guests.length === 0) {
            return res.status(400).json({ message: 'No valid guest data found. Required column: "Họ tên" or "Name"' });
        }
        // Bulk insert
        const result = yield Guest_1.default.insertMany(guests);
        res.json({
            message: `Imported ${result.length} guests successfully`,
            data: { imported: result.length }
        });
    }
    catch (error) {
        console.error('Import guests error:', error);
        res.status(500).json({ message: error.message || 'Import failed' });
    }
}));
// POST /api/guests/generate-codes - Generate ticket codes for guests without codes
router.post('/generate-codes', authMiddleware_1.authenticate, authMiddleware_1.requireMod, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id, code_length = 8, include_letters = true, include_numbers = true, uppercase = true } = req.body;
        if (!event_id) {
            return res.status(400).json({ message: 'event_id is required' });
        }
        // Find guests without ticket codes or with placeholder codes
        const guestsToUpdate = yield Guest_1.default.find({
            event_id,
            $or: [
                { ticket_code: { $exists: false } },
                { ticket_code: '' },
                { ticket_code: null }
            ]
        });
        if (guestsToUpdate.length === 0) {
            return res.json({ message: 'All guests already have ticket codes', data: { updated: 0 } });
        }
        // Get existing codes
        const existingCodes = yield Guest_1.default.find({ event_id }).distinct('ticket_code');
        // Generate unique codes
        const newCodes = yield (0, ticketGenerator_1.generateUniqueCodes)(guestsToUpdate.length, existingCodes, { length: code_length, includeLetters: include_letters, includeNumbers: include_numbers, uppercase });
        // Update each guest
        for (let i = 0; i < guestsToUpdate.length; i++) {
            guestsToUpdate[i].ticket_code = newCodes[i];
            yield guestsToUpdate[i].save();
        }
        res.json({
            message: `Generated codes for ${guestsToUpdate.length} guests`,
            data: { updated: guestsToUpdate.length }
        });
    }
    catch (error) {
        console.error('Generate codes error:', error);
        res.status(500).json({ message: error.message || 'Generation failed' });
    }
}));
// POST /api/guests/generate-qr - Generate QR codes for guests
router.post('/generate-qr', authMiddleware_1.authenticate, authMiddleware_1.requireMod, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id, base_url } = req.body;
        if (!event_id || !base_url) {
            return res.status(400).json({ message: 'event_id and base_url are required' });
        }
        const guests = yield Guest_1.default.find({ event_id });
        const qrCodes = yield Promise.all(guests.map((guest) => __awaiter(void 0, void 0, void 0, function* () {
            return ({
                guest_id: guest._id,
                guest_name: guest.name,
                ticket_code: guest.ticket_code,
                qr_code: yield (0, qrGenerator_1.generateGuestQRCode)(base_url, event_id, guest.ticket_code)
            });
        })));
        res.json({ data: qrCodes });
    }
    catch (error) {
        console.error('Generate QR error:', error);
        res.status(500).json({ message: error.message || 'QR generation failed' });
    }
}));
// PUT /api/guests/:id - Update guest
router.put('/:id', authMiddleware_1.authenticate, authMiddleware_1.requireMod, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guest = yield Guest_1.default.findById(req.params.id);
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }
        const updates = req.body;
        Object.keys(updates).forEach(key => {
            if (key !== '_id' && key !== 'event_id') {
                guest[key] = updates[key];
            }
        });
        yield guest.save();
        res.json({ message: 'Guest updated', data: guest });
    }
    catch (error) {
        console.error('Update guest error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// DELETE /api/guests/:id - Delete guest
router.delete('/:id', authMiddleware_1.authenticate, authMiddleware_1.requireMod, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guest = yield Guest_1.default.findByIdAndDelete(req.params.id);
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }
        res.json({ message: 'Guest deleted' });
    }
    catch (error) {
        console.error('Delete guest error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// POST /api/guests/:id/reset - Reset guest check-in status
router.post('/:id/reset', authMiddleware_1.authenticate, authMiddleware_1.requireMod, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guest = yield Guest_1.default.findById(req.params.id);
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }
        guest.checkin_status = Guest_1.CheckinStatus.PENDING;
        guest.checkin_time = undefined;
        yield guest.save();
        res.json({ message: 'Check-in status reset', data: guest });
    }
    catch (error) {
        console.error('Reset checkin error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
