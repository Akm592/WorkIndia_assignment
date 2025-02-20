import supabase from "../config/database.js";

const bookingRepository = {
  async createBooking(userId, trainId, seatCount) {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: userId,
          train_id: trainId,
          seat_count: seatCount,
        },
      ])
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },

  async getBookingById(bookingId, userId) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return data;
  },
};

export default bookingRepository;
