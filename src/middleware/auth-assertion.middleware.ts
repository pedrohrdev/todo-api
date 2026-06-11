import { Request } from 'express';
import { AppError } from '../errors/AppError';
import { AuthenticatedRequest } from '../types/authenticated-request';

export function assertAuthenticated(
    req: Request,
): asserts req is AuthenticatedRequest {

    if (!req.user) {
        throw new AppError('Unauthorized', 401);
    }

}