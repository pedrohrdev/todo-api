import express from "express";
import { createUserService } from "../service/users.service";

export async function createUser(req: express.Request, res: express.Response) {

    // retrieving the data
    const { name, email, password } = req.body;

    // If the data isn't here, we'll return this message
    if(!name || !email || !password) {

        return res.status(400).json(
            {
                message: "Email and password and name are required"
            }
        );
    }

    // Here, we'll call the service to
    // createUser, so, the data is ok to insert,
    // so, let's make it

    try {

        await createUserService(name, email, password);

        return res.status(201).json(
            {
                message: "Created user sucessfuly!"
            }
        )

    } catch(error) {

        return res.status(500).json(
            {
                message: `Cannot create user. error message: ${error}`
            }
        )

    }

}