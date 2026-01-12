import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser, UserRole } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'ems_secret_key_change_in_production';
const JWT_EXPIRES_IN = '7d';

export interface AuthRequest extends Request {
    user?: IUser;
}

// Verify JWT token middleware
export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Require admin role middleware
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// Require mod role (or admin) middleware
export const requireMod = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || (req.user.role !== UserRole.MOD && req.user.role !== UserRole.ADMIN)) {
        return res.status(403).json({ message: 'Moderator access required' });
    }
    next();
};

// Generate JWT token
export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
