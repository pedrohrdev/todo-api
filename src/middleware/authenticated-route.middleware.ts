import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function authenticatedRouteMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (!req.user) {
        throw new AppError('Unauthorized', 401);
    }

    next();

}