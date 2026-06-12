import { supabase } from "../lib/supabase";

async function checkExistingUser(email: string){
    const {data} = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle(); 

    return data
}

async function createUser(name: string, email: string, hashedPassword: string) {
    const { data } = await supabase
        .from('users')
        .insert([
            { name, email, password_hash: hashedPassword }
        ]);

    return data
}

async function loginUser(email: string, password: string) {
     const { data } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

    return data

}


export const usersRepository = {checkExistingUser, createUser, loginUser}               