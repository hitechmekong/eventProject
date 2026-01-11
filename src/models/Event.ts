import mongoose, { Schema, Document } from 'mongoose';

export interface ISeatMap {
    // Flexible structure for seat map
    [key: string]: any;
}

export interface IEvent extends Document {
    name: string;
    time: Date;
    location: string;
    background_image?: string;
    config: {
        capacity: number;
        is_checkin_open: boolean;
        enable_seat_map: boolean;
    };
    seat_map?: ISeatMap;
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    background_image: { type: String },
    config: {
        capacity: { type: Number, default: 100 },
        is_checkin_open: { type: Boolean, default: false },
        enable_seat_map: { type: Boolean, default: false }
    },
    seat_map: { type: Schema.Types.Mixed } // JSON structure
}, { timestamps: true });

export default mongoose.model<IEvent>('Event', EventSchema);
