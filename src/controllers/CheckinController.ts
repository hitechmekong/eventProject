import { Request, Response } from 'express';
import Guest, { CheckinStatus } from '../models/Guest';
import Event from '../models/Event';
import SocketService from '../services/SocketService';
// import CheckinLog from '../models/CheckinLog'; // TODO: Add logging if required

class CheckinController {

    // Method A: Fixed QR (Self-Check-in)
    // Input: ticket_code
    public selfCheckin = async (req: Request, res: Response): Promise<void> => {
        try {
            const { ticket_code } = req.body;

            if (!ticket_code) {
                res.status(400).json({ message: 'Ticket code is required' });
                return;
            }

            // Find Guest
            const guest = await Guest.findOne({ ticket_code }).populate('event_id');
            if (!guest) {
                res.status(404).json({ message: 'Guest not found' });
                return;
            }

            // Check Event config
            const event = guest.event_id as any; // Cast to specific type if needed, or use populated doc
            if (!event.config.is_checkin_open) {
                res.status(403).json({ message: 'Check-in is currently closed for this event' });
                return;
            }

            // Check if already checked in? 
            // Requirement doesn't strictly say to fail, but let's assume we return success + info if already checked in, 
            // OR re-emit event. Let's update if not checked in.

            let isNewCheckin = false;
            if (guest.checkin_status !== CheckinStatus.CHECKED_IN) {
                guest.checkin_status = CheckinStatus.CHECKED_IN;
                guest.checkin_time = new Date();

                // Logic for random seat assignment can go here if seat_location is empty
                // if (!guest.seat_location) { ... }

                await guest.save();
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
            SocketService.emit('new_checkin', payload, event._id.toString());

            res.status(200).json({
                success: true,
                message: isNewCheckin ? 'Check-in successful' : 'Already checked in',
                data: guest
            });

        } catch (error) {
            console.error('Self Check-in Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Method B: Personal QR (Staff-Assisted)
    // Input: ticket_code
    public scanCheckin = async (req: Request, res: Response): Promise<void> => {
        try {
            const { ticket_code } = req.body;

            if (!ticket_code) {
                res.status(400).json({ message: 'Ticket code is required' });
                return;
            }

            // Find Guest
            const guest = await Guest.findOne({ ticket_code }).populate('event_id');
            if (!guest) {
                res.status(404).json({ message: 'Guest not found' });
                return;
            }

            const event = guest.event_id as any;

            // Force check-in updates
            if (guest.checkin_status !== CheckinStatus.CHECKED_IN) {
                guest.checkin_status = CheckinStatus.CHECKED_IN;
                guest.checkin_time = new Date();
                await guest.save();
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
            SocketService.emit('new_checkin', payload, event._id.toString());

            res.status(200).json({
                success: true,
                message: 'Guest verified and checked in',
                data: guest
            });

        } catch (error) {
            console.error('Scan Check-in Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

}

export default new CheckinController();
