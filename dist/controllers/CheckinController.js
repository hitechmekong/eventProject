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
const Guest_1 = __importStar(require("../models/Guest"));
const SocketService_1 = __importDefault(require("../services/SocketService"));
// import CheckinLog from '../models/CheckinLog'; // TODO: Add logging if required
class CheckinController {
    constructor() {
        // Method A: Fixed QR (Self-Check-in)
        // Input: ticket_code
        this.selfCheckin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { ticket_code } = req.body;
                if (!ticket_code) {
                    res.status(400).json({ message: 'Ticket code is required' });
                    return;
                }
                // Find Guest
                const guest = yield Guest_1.default.findOne({ ticket_code }).populate('event_id');
                if (!guest) {
                    res.status(404).json({ message: 'Guest not found' });
                    return;
                }
                // Check Event config
                const event = guest.event_id; // Cast to specific type if needed, or use populated doc
                if (!event.config.is_checkin_open) {
                    res.status(403).json({ message: 'Check-in is currently closed for this event' });
                    return;
                }
                // Check if already checked in? 
                // Requirement doesn't strictly say to fail, but let's assume we return success + info if already checked in, 
                // OR re-emit event. Let's update if not checked in.
                let isNewCheckin = false;
                if (guest.checkin_status !== Guest_1.CheckinStatus.CHECKED_IN) {
                    guest.checkin_status = Guest_1.CheckinStatus.CHECKED_IN;
                    guest.checkin_time = new Date();
                    // Logic for random seat assignment can go here if seat_location is empty
                    // if (!guest.seat_location) { ... }
                    yield guest.save();
                    isNewCheckin = true;
                }
                // Prepare payload for Socket
                // Payload: Guest info (Name, Avatar, Job Title, Seat, Welcome Message).
                const payload = {
                    name: guest.name,
                    avatar: guest.avatar,
                    job_title: guest.company, // Assuming company/job title mapping
                    seat: guest.seat_location || 'TBD',
                    welcome_message: `Welcome ${guest.name}!`,
                    event_id: event._id
                };
                // Emit event
                // Requirement: Emit 'new_checkin' to room matching event_id
                SocketService_1.default.emit('new_checkin', payload, event._id.toString());
                res.status(200).json({
                    success: true,
                    message: isNewCheckin ? 'Check-in successful' : 'Already checked in',
                    data: guest
                });
            }
            catch (error) {
                console.error('Self Check-in Error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
        // Method B: Personal QR (Staff-Assisted)
        // Input: ticket_code
        this.scanCheckin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { ticket_code } = req.body;
                if (!ticket_code) {
                    res.status(400).json({ message: 'Ticket code is required' });
                    return;
                }
                // Find Guest
                const guest = yield Guest_1.default.findOne({ ticket_code }).populate('event_id');
                if (!guest) {
                    res.status(404).json({ message: 'Guest not found' });
                    return;
                }
                const event = guest.event_id;
                // Force check-in updates
                if (guest.checkin_status !== Guest_1.CheckinStatus.CHECKED_IN) {
                    guest.checkin_status = Guest_1.CheckinStatus.CHECKED_IN;
                    guest.checkin_time = new Date();
                    yield guest.save();
                }
                // Prepare payload
                const payload = {
                    name: guest.name,
                    avatar: guest.avatar,
                    job_title: guest.company,
                    seat: guest.seat_location || 'TBD',
                    welcome_message: `Verified: ${guest.name}`,
                    event_id: event._id
                };
                // Emit event
                SocketService_1.default.emit('new_checkin', payload, event._id.toString());
                res.status(200).json({
                    success: true,
                    message: 'Guest verified and checked in',
                    data: guest
                });
            }
            catch (error) {
                console.error('Scan Check-in Error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = new CheckinController();
