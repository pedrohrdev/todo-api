import express from "express";
import { usersService } from "../services/users.service";
import { AppError } from "../errors/AppError";

// Register a new user
export async function createUser(req: express.Request, res: express.Response) {

    // retrieving the data
    const { name, email, password } = req.body;

    try {

        await usersService.createUser(name, email, password);

        return res.status(201).json(
            {
                message: "Created user sucessfuly!"
            }
        )

    } catch(error) {

        if(error instanceof AppError) {

            return res.status(error.statusCode).json(
                {
                    message: error.message
                }
            );

        }

        return res.status(500).json(
            {
                message: `Cannot create user. error message: ${error}`
            }
        )        

    }    
}

export async function loginUser(req: express.Request, res: express.Response) {

    // retrieving the data
    const { email, password } = req.body;

    try {

        const user = await usersService.loginUser(email, password);
        
        return res.status(200).json(
            {
                message: "Logged in user sucessfuly!",
                user
            }
        );

    } catch(error) {

        if (error instanceof AppError) {

            return res.status(error.statusCode).json(
                {
                    message: error.message
                }
            );

        }

        return res.status(500).json(
            {
                message: `Cannot login user. error message: ${error}`
            }
        );

    }    
    
}