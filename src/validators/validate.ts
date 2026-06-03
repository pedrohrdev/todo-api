import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        // // Here, the 'result' variable receives the output from 'safeParse'.
        // It takes our defined schema, checks 'req.body', and verifies:
        // -> Whether 'req.body' matches the schema or not.
        const result = schema.safeParse(req.body);

        if (!result.success) {

            return res.status(400).json({
                errors: result.error.issues.map(issue => ({
                    field: String(issue.path[0]),
                    message: issue.message
                }))
            });

        }

        // Replaces the original req.body with the parsed and sanitized data from Zod.
        // This ensures the controller receives only validated, correctly typed data —
        // including any transformations applied by the schema (e.g. string → number).
        req.body = result.data;

        next();

    }

}