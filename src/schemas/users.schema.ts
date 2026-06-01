import { z } from 'zod';

export const createUserSchema = z.object(
    {
        // Your name must be at least 3 characters long.
        name: z
            .string()
            .min(3, 'Your name must be at least 3 characters long.')
            .max(75, 'Your name must be a maximum of 75 characters long.'),


        // Your name must be a valid email address.
        email: z
            .string()
            .email('You need to send a valid email address.')
            .toLowerCase(),

        // The password must be a string, with a minimum of 6 characters and a maximum of 20.
        password: z
            .string()
            .min(6, 'Your password must be at least 6 characters long.')
            .max(50, 'Your password must be a maximum of 50 characters long.')
    }
);

export const loginUserSchema = z.object(
    {
        email: z
            .string()
            .email('You need to send a valid email adress.')
            .toLowerCase(),

        password: z
            .string()
            .min(6, 'Your password must be at least 6 characters long.')
            .max(50, 'Your password must be a maximum of 50 characters long.')            
    }
)