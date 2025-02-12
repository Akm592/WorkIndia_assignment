import supabase from "../config/database.js";

const createUser = async (username, hashedPassword, role) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ username, password: hashedPassword, role }])
    .select("id, username, role");

  if (error) {
    throw error;
  }
  return data ? data[0] : null;
};

const findUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single(); // Expecting single user with unique username

  if (error) {
    return null; // User not found or other error
  }
  return data;
};

const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return null;
  }
  return data;
};

export default {
  createUser,
  findUserByUsername,
  getUserById,
};
