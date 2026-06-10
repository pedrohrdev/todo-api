import { AppError } from "../errors/AppError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usersRepository } from '../repository/users.repository';

async function createUser(name: string, email: string, password_hash: string) {
    
    const existingUser = await usersRepository.checkExistingUser(email)
    
    if(existingUser) {
        throw new AppError('Email already in use', 409);
    }

    const hashedPassword = await bcrypt.hash(password_hash, 10);

    // If everything is ok, we can create the user

    return usersRepository.createUser(name, email, hashedPassword)
}

async function loginUser(email: string, password: string) {

    const user = await usersRepository.loginUser(email, password)

    if(!user) {
        throw new AppError('Invalid email or password', 401);
    }

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

export const usersService = {

    createUser,
    loginUser

};