import mongoose, { Schema, Document } from 'mongoose';

export interface ICheckinLog extends Document {
    guest_id: mongoose.Types.ObjectId;
    event_id: mongoose.Types.ObjectId;
    checked_in_by?: mongoose.Types.ObjectId;
    timestamp: Date;
}

const CheckinLogSchema: Schema = new Schema({
    guest_id: { type: Schema.Types.ObjectId, ref: 'Guest', required: true },
    event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    checked_in_by: { type: Schema.Types.ObjectId, ref: 'User' }, // Nullable if system auto-checkin
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<ICheckinLog>('CheckinLog', CheckinLogSchema);
