import { safeParse, z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const createUserSchema = z.object(
    {
        // Your name must be at least 3 characters long.
        name: z
            .string()
            .min(3, 'Your name must be at least 3 characters long.')
            .max(75, 'Your name must be at least 3 characters long.'),


        // Your name must be a valid email address.
        email: z
            .email('You need to send a valid email address.')
            .toLowerCase(),

        // The password must be a string, with a minimum of 6 characters and a maximum of 20.
        password: z
            .string()
            .min(6, 'Your password must be at least 6 characters long.')
            .max(50, 'Your password must be a maximum of 50 characters long.')
    }
);

export function validateCreateUser(
    req: Request,
    res: Response,
    next: NextFunction

) {

    const result = createUserSchema.safeParse(req.body);

    if(!result.success) {

        return res.status(400).json(
            {
                errors: result.error.issues.map(issue => ({
                    field: String(issue.path[0]),
                    message: issue.message
                }))
            }
        )

    }

    req.body = result.data;

    next();

}