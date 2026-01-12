import { Router, Response, Request } from 'express';
import multer from 'multer';
import * as XLSX from 'xlsx';
import Guest, { CheckinStatus } from '../models/Guest';
import Event from '../models/Event';
import { AuthRequest, authenticate, requireMod } from '../middleware/authMiddleware';
import { UserRole } from '../models/User';
import { generateUniqueCodes, generateTicketCode } from '../utils/ticketGenerator';
import { generateGuestQRCode } from '../utils/qrGenerator';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET /api/guests - List guests (filtered by event for mods)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const { event_id } = req.query;
        let query: any = {};

        if (event_id) {
            query.event_id = event_id;
        }

        // Mods can only see guests from their assigned events
        if (req.user!.role === UserRole.MOD && event_id) {
            const hasAccess = req.user!.assigned_events.some(
                (id) => id.toString() === event_id
            );
            if (!hasAccess) {
                return res.status(403).json({ message: 'Access denied to this event' });
            }
        }

        const guests = await Guest.find(query)
            .populate('event_id', 'name')
            .sort({ created_at: -1 });

        res.json({ data: guests });
    } catch (error) {
        console.error('Get guests error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/guests - Create single guest
router.post('/', authenticate, requireMod, async (req: AuthRequest, res: Response) => {
    try {
        const { name, phone, email, company, event_id, seat_location, is_vip } = req.body;

        if (!name || !event_id) {
            return res.status(400).json({ message: 'Name and event_id are required' });
        }

        // Generate unique ticket code
        const existingCodes = await Guest.find({ event_id }).distinct('ticket_code');
        const ticketCode = generateTicketCode({ length: 8, uppercase: true });

        const guest = new Guest({
            name,
            phone,
            email,
            company,
            event_id,
            seat_location,
            ticket_code: ticketCode,
            checkin_status: CheckinStatus.PENDING,
            metrics: { is_vip: is_vip || false }
        });

        await guest.save();
        res.status(201).json({ message: 'Guest created', data: guest });
    } catch (error: any) {
        console.error('Create guest error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Ticket code already exists, please try again' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/guests/import - Import guests from Excel
router.post('/import', authenticate, requireMod, upload.single('file'), async (req: AuthRequest, res: Response) => {
    try {
        const { event_id } = req.body;
        if (!event_id) {
            return res.status(400).json({ message: 'event_id is required' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Excel file is required' });
        }

        // Parse Excel file
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows: any[] = XLSX.utils.sheet_to_json(sheet);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Excel file is empty' });
        }

        // Get existing codes
        const existingCodes = await Guest.find({ event_id }).distinct('ticket_code');

        // Generate unique codes for all new guests
        const newCodes = await generateUniqueCodes(rows.length, existingCodes, { length: 8, uppercase: true });

        // Map rows to guest documents
        const guests = rows.map((row, index) => ({
            name: row['Họ tên'] || row['Name'] || row['name'] || '',
            phone: row['SĐT'] || row['Phone'] || row['phone'] || '',
            email: row['Email'] || row['email'] || '',
            company: row['Công ty'] || row['Company'] || row['company'] || '',
            seat_location: row['Bàn'] || row['Seat'] || row['seat_location'] || '',
            event_id,
            ticket_code: newCodes[index],
            checkin_status: CheckinStatus.PENDING,
            metrics: {
                is_vip: (row['VIP'] === 'x' || row['VIP'] === true || row['is_vip'] === true)
            }
        })).filter(g => g.name); // Filter out empty rows

        if (guests.length === 0) {
            return res.status(400).json({ message: 'No valid guest data found. Required column: "Họ tên" or "Name"' });
        }

        // Bulk insert
        const result = await Guest.insertMany(guests);

        res.json({
            message: `Imported ${result.length} guests successfully`,
            data: { imported: result.length }
        });
    } catch (error: any) {
        console.error('Import guests error:', error);
        res.status(500).json({ message: error.message || 'Import failed' });
    }
});

// POST /api/guests/generate-codes - Generate ticket codes for guests without codes
router.post('/generate-codes', authenticate, requireMod, async (req: AuthRequest, res: Response) => {
    try {
        const { event_id, code_length = 8, include_letters = true, include_numbers = true, uppercase = true } = req.body;

        if (!event_id) {
            return res.status(400).json({ message: 'event_id is required' });
        }

        // Find guests without ticket codes or with placeholder codes
        const guestsToUpdate = await Guest.find({
            event_id,
            $or: [
                { ticket_code: { $exists: false } },
                { ticket_code: '' },
                { ticket_code: null }
            ]
        });

        if (guestsToUpdate.length === 0) {
            return res.json({ message: 'All guests already have ticket codes', data: { updated: 0 } });
        }

        // Get existing codes
        const existingCodes = await Guest.find({ event_id }).distinct('ticket_code');

        // Generate unique codes
        const newCodes = await generateUniqueCodes(
            guestsToUpdate.length,
            existingCodes,
            { length: code_length, includeLetters: include_letters, includeNumbers: include_numbers, uppercase }
        );

        // Update each guest
        for (let i = 0; i < guestsToUpdate.length; i++) {
            guestsToUpdate[i].ticket_code = newCodes[i];
            await guestsToUpdate[i].save();
        }

        res.json({
            message: `Generated codes for ${guestsToUpdate.length} guests`,
            data: { updated: guestsToUpdate.length }
        });
    } catch (error: any) {
        console.error('Generate codes error:', error);
        res.status(500).json({ message: error.message || 'Generation failed' });
    }
});

// POST /api/guests/generate-qr - Generate QR codes for guests
router.post('/generate-qr', authenticate, requireMod, async (req: AuthRequest, res: Response) => {
    try {
        const { event_id, base_url } = req.body;

        if (!event_id || !base_url) {
            return res.status(400).json({ message: 'event_id and base_url are required' });
        }

        const guests = await Guest.find({ event_id });

        const qrCodes = await Promise.all(
            guests.map(async (guest) => ({
                guest_id: guest._id,
                guest_name: guest.name,
                ticket_code: guest.ticket_code,
                qr_code: await generateGuestQRCode(base_url, event_id, guest.ticket_code)
            }))
        );

        res.json({ data: qrCodes });
    } catch (error: any) {
        console.error('Generate QR error:', error);
        res.status(500).json({ message: error.message || 'QR generation failed' });
    }
});

// PUT /api/guests/:id - Update guest
router.put('/:id', authenticate, requireMod, async (req: AuthRequest, res: Response) => {
    try {
        const guest = await Guest.findById(req.params.id);
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }

        const updates = req.body;
        Object.keys(updates).forEach(key => {
            if (key !== '_id' && key !== 'event_id') {
                (guest as any)[key] = updates[key];
            }
        });

        await guest.save();
        res.json({ message: 'Guest updated', data: guest });
    } catch (error) {
        console.error('Update guest error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/guests/:id - Delete guest
router.delete('/:id', authenticate, requireMod, async (req: AuthRequest, res: Response) => {
    try {
        const guest = await Guest.findByIdAndDelete(req.params.id);
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }
        res.json({ message: 'Guest deleted' });
    } catch (error) {
        console.error('Delete guest error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/guests/:id/reset - Reset guest check-in status
router.post('/:id/reset', authenticate, requireMod, async (req: AuthRequest, res: Response) => {
    try {
        const guest = await Guest.findById(req.params.id);
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }

        guest.checkin_status = CheckinStatus.PENDING;
        guest.checkin_time = undefined;
        await guest.save();

        res.json({ message: 'Check-in status reset', data: guest });
    } catch (error) {
        console.error('Reset checkin error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
