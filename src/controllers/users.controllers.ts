import express from "express";
import { createUserService } from "../services/users.service";
import { loginUserService } from "../services/users.service";
import { AppError } from "../errors/AppError";

// Register a new user
export async function createUser(req: express.Request, res: express.Response) {

    // retrieving the data
    const { name, email, password } = req.body;

    // Here, we'll call the service to
    // createUser, so, the data is ok to insert,
    // so, let's make it

    try {

        // Here, we call the servicve to create the user
        await createUserService(name, email, password);

        // If the user is created successfully, we return a success message
        return res.status(201).json(
            {
                message: "Created user sucessfuly!"
            }
        )

    // If there's an error, we catch it and return a 500 status with the error message    
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

        const user = await loginUserService(email, password);
        
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