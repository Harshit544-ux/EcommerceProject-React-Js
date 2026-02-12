import supabase from "../config/supabase.js";
import bcrypt from 'bcryptjs';

//create user
export const createUser = async ({ name, email, password }) => {
  // Step 1: Check if user already exists
  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error("User already registered");
  }

  // Step 2: Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

  // Step 3: Insert into custom users table 
  const { data: newUser, error: insertError } = await supabase
    .from('users')
    .insert({
      name,
      email,
      password: hashedPassword,
      created_at: new Date(),
    })
    .select()
    .single();

  if (insertError) {
    throw new Error("DB Error: " + insertError.message);
  }

  return newUser;
};

//get user
export const getUser = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')

  if (error && error.code !== 'PGRST116') {
    throw new Error(error.message);
  }
  console.log("data", data)
  return data;
};

//login user
export const loginUserService = async (email, password) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};
