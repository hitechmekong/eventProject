import mongoose, { Schema, Document } from 'mongoose';

export enum CheckinStatus {
    PENDING = 'pending',
    CHECKED_IN = 'checked_in'
}

export interface IGuest extends Document {
    name: string;
    phone?: string;
    email?: string;
    company?: string;
    avatar?: string;
    event_id: mongoose.Types.ObjectId;
    ticket_code: string;
    seat_location?: string;
    checkin_status: CheckinStatus;
    checkin_time?: Date;
    metrics: {
        is_vip: boolean;
        lucky_draw_code?: string;
    };
}

const GuestSchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    company: { type: String },
    avatar: { type: String },
    event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
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

export default mongoose.model<IGuest>('Guest', GuestSchema);
