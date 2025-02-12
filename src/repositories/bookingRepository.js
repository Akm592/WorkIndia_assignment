import supabase from "../config/database.js";

const createBooking = async (userId, trainId, seatCount) => {
  try {
    const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
      .insert([{ user_id: userId, train_id: trainId, seat_count: seatCount }])
      .select("*")
      .single();
    if (bookingError) {
      throw bookingError;
    }
    return bookingData;
  } catch (error) {
    throw error;
  }
};

const getBookingById = async (bookingId, userId) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .eq("user_id", userId)
    .single();

  if (error) {
    return null;
  }
  return data;
};

export default {
  createBooking,
  getBookingById,
};
