import { AppError } from "../errors/AppError";
import { supabase } from "../lib/supabase";

export async function createUserService(name: string, email: string, password: string) {
    
    // Here you would typically add logic to create the user
    // For example, you might check if the user already exists,
    // hash the password, and save the user to the database.
    // This is just a placeholder implementation.

    // Validating the input data, to know if data is empty or not, if it's empty, we throw an error
    if(!name || !email || !password) {

        throw new AppError('Email and password and name are required', 400);

    }    
    
    // More specific assessments
    if(password.length < 6) {
        
        throw new AppError('Password must be at least 6 characters long', 400); 

    }    

    // If everything is ok, we can create the user

    const { data, error } = await supabase
        .from('users')
        .insert([
            { name, email, password }
        ]);

        if(error) {

            throw new AppError(`Cannot create user. error message: ${error.message}`, 500);
            
        }

    // If the user is created successfully, we return the created user data
    return data;    

}