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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckinStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var CheckinStatus;
(function (CheckinStatus) {
    CheckinStatus["PENDING"] = "pending";
    CheckinStatus["CHECKED_IN"] = "checked_in";
})(CheckinStatus || (exports.CheckinStatus = CheckinStatus = {}));
const GuestSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    company: { type: String },
    avatar: { type: String },
    event_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Event', required: true },
    ticket_code: { type: String, required: true, unique: true }, // Ensure unique index in DB
    seat_location: { type: String },
    checkin_status: { type: String, enum: Object.values(CheckinStatus), default: CheckinStatus.PENDING },
    checkin_time: { type: Date },
    metrics: {
        is_vip: { type: Boolean, default: false },
        lucky_draw_code: { type: String }
    }
}, { timestamps: true });
// Compound index if needed, but for now we rely on the unique constraint on the field
// GuestSchema.index({ ticket_code: 1 }, { unique: true });
exports.default = mongoose_1.default.model('Guest', GuestSchema);
