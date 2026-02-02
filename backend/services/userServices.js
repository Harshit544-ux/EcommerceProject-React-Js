import supabase from "../config/supabase.js";
import bcrypt from 'bcryptjs';

//create user
export const createUser = async ({ name, email, password }) => {
  // Step 1: Sign up user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: undefined, // Disable email confirmation to avoid rate limits
    },
  });

  if (error) {
    // Handle rate limit errors more gracefully
    if (error.message.includes('rate limit')) {
      throw new Error("Too many registration attempts. Please try again in a few minutes.");
    }
    throw new Error("Auth Error: " + error.message);
  }

  const user = data.user;

  // Step 2: Hash the password (for custom table only)
  const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

  // Step 3: Insert into custom users table
  const { error: insertError } = await supabase
    .from('users')
    .insert({
      id: user.id,
      name,
      email,
      password: hashedPassword,
      created_at: new Date(),
    });

  if (insertError) {
    throw new Error("DB Error: " + insertError.message);
  }

  return user;
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
