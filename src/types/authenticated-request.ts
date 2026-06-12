import { Request } from 'express';
import { TokenPayload } from './token-payload';

export interface AuthenticatedRequest extends Request {
    user: TokenPayload;
}