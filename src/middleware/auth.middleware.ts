import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

interface TokenPayload {
    id: number;
    email: string;
    name: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
};

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new AppError('Token is missing', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        
        req.user = decoded;

        next();

    } catch {
        throw new AppError('Invalid or expired token', 401);
    }

}