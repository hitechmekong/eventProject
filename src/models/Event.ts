import mongoose, { Schema, Document } from 'mongoose';

export type CheckinMechanism = 'organizer_scan' | 'guest_scan';

export interface IEvent extends Document {
    name: string;
    description: string;
    time: Date;
    location: string;
    background_image?: string;
    max_guests: number;
    table_count: number;
    checkin_mechanism: CheckinMechanism;
    event_qr_code?: string;
    is_checkin_open: boolean;
    created_by: mongoose.Types.ObjectId;
    created_at: Date;
    updated_at: Date;
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    background_image: { type: String },
    max_guests: { type: Number, default: 100 },
    table_count: { type: Number, default: 10 },
    checkin_mechanism: {
        type: String,
        enum: ['organizer_scan', 'guest_scan'],
        default: 'organizer_scan'
    },
    event_qr_code: { type: String },
    is_checkin_open: { type: Boolean, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model<IEvent>('Event', EventSchema);
