import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Guest, { CheckinStatus } from '../models/Guest';
import Event from '../models/Event';

class GuestController {

    // GET /api/guests?event_id=XYZ
    public getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const { event_id } = req.query;
            const filter = event_id ? { event_id } : {};

            const guests = await Guest.find(filter).sort({ createdAt: -1 });

            const total = guests.length;
            const checkedIn = guests.filter(g => g.checkin_status === CheckinStatus.CHECKED_IN).length;

            res.status(200).json({
                success: true,
                data: guests,
                stats: {
                    total,
                    checkedIn,
                    pending: total - checkedIn
                }
            });
        } catch (error) {
            console.error('Get Guests Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // POST /api/guests
    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, ticket_code, event_id, seat_location, company } = req.body;

            // Simple validation
            if (!name || !ticket_code || !event_id) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            const newGuest = new Guest({
                name,
                email,
                ticket_code,
                event_id,
                seat_location,
                company,
                checkin_status: CheckinStatus.PENDING
            });

            await newGuest.save();
            res.status(201).json({ success: true, data: newGuest });

        } catch (error: any) {
            console.error('Create Guest Error:', error);
            if (error.code === 11000) {
                res.status(400).json({ message: 'Ticket code already exists' });
                return;
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // POST /api/guests/:id/reset
    public resetCheckin = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const guest = await Guest.findById(id);

            if (!guest) {
                res.status(404).json({ message: 'Guest not found' });
                return;
            }

            guest.checkin_status = CheckinStatus.PENDING;
            guest.checkin_time = undefined;
            await guest.save();

            res.status(200).json({ success: true, message: 'Guest status reset', data: guest });

        } catch (error) {
            console.error('Reset Guest Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

}

export default new GuestController();
