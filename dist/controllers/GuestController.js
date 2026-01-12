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
const Guest_1 = __importStar(require("../models/Guest"));
class GuestController {
    constructor() {
        // GET /api/guests?event_id=XYZ
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { event_id } = req.query;
                const filter = event_id ? { event_id } : {};
                const guests = yield Guest_1.default.find(filter).sort({ createdAt: -1 });
                const total = guests.length;
                const checkedIn = guests.filter(g => g.checkin_status === Guest_1.CheckinStatus.CHECKED_IN).length;
                res.status(200).json({
                    success: true,
                    data: guests,
                    stats: {
                        total,
                        checkedIn,
                        pending: total - checkedIn
                    }
                });
            }
            catch (error) {
                console.error('Get Guests Error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
        // POST /api/guests
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, ticket_code, event_id, seat_location, company } = req.body;
                // Simple validation
                if (!name || !ticket_code || !event_id) {
                    res.status(400).json({ message: 'Missing required fields' });
                    return;
                }
                const newGuest = new Guest_1.default({
                    name,
                    email,
                    ticket_code,
                    event_id,
                    seat_location,
                    company,
                    checkin_status: Guest_1.CheckinStatus.PENDING
                });
                yield newGuest.save();
                res.status(201).json({ success: true, data: newGuest });
            }
            catch (error) {
                console.error('Create Guest Error:', error);
                if (error.code === 11000) {
                    res.status(400).json({ message: 'Ticket code already exists' });
                    return;
                }
                res.status(500).json({ message: 'Internal server error' });
            }
        });
        // POST /api/guests/:id/reset
        this.resetCheckin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const guest = yield Guest_1.default.findById(id);
                if (!guest) {
                    res.status(404).json({ message: 'Guest not found' });
                    return;
                }
                guest.checkin_status = Guest_1.CheckinStatus.PENDING;
                guest.checkin_time = undefined;
                yield guest.save();
                res.status(200).json({ success: true, message: 'Guest status reset', data: guest });
            }
            catch (error) {
                console.error('Reset Guest Error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = new GuestController();
