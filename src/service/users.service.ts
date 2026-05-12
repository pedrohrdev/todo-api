export async function createUserService(name: string, email: string, password: string) {
    
    // Here you would typically add logic to create the user
    // For example, you might check if the user already exists,
    // hash the password, and save the user to the database.
    // This is just a placeholder implementation.

    if(email === "") {
        throw new Error('Email cannot be empty');
    } else if(password === "") {
        throw new Error('Password cannot be empty');
    } else if (name.length < 3) {
        throw new Error('Name must be at least 3 character long');
    }

    

}   