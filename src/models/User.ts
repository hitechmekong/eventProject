import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
    ADMIN = 'admin',
    MODERATOR = 'moderator'
}

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    assigned_events: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for now, in case of future auth methods
    role: { type: String, enum: Object.values(UserRole), default: UserRole.MODERATOR },
    assigned_events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
