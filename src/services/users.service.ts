import { AppError } from "../errors/AppError";
import { supabase } from "../lib/supabase";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repository/users.repository';
import checkExistingUser from "../repository/users.repository";

export async function createUserService(name: string, email: string, password_hash: string) {
    
    // Here you would typically add logic to create the user
    // For example, you might check if the user already exists,
    // hash the password, and save the user to the database.
    // This is just a placeholder implementation.

    // Validating the input data, to know if data is empty or not, if it's empty, we throw an error
    if(!name || !email || !password_hash) {

        throw new AppError('Email and password and name are required', 400);

    }    
    
    // More specific assessments
    if(password_hash.length < 6) {
        
        throw new AppError('Password must be at least 6 characters long', 400); 

    };
    
    const existingUser = await userRepository.checkExistingUser(email)
    
    if(existingUser) {
        throw new AppError('Email already in use', 409);
    }

    const hashedPassword = await bcrypt.hash(password_hash, 10);

    // If everything is ok, we can create the user

    return await userRepository.createUser(name, email, hashedPassword)
}

export async function loginUserService(email: string, password: string) {


    //  Here, we checking if the user exists in the database, if not, we throw an error
    const user = await userRepository.loginUser(email, password)

    if(!user) {
        throw new AppError('Invalid email or password', 401);
    }


    // If the user exists, we need to check if the password is correct,
    // we use bcrypt to compare the provided password with the stored]
    // password hashed in the database. If the password is invalid, we throw an error.

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if(!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    const { password_hash, ...safeUser } = user;

    // Generate the jwt
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '1d'
        }
        


    )

    return { user: safeUser, token };
}    