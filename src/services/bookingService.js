import ApiError from "../utils/apiError.js";
import supabase from "../config/database.js";
import bookingRepository from "../repositories/bookingRepository.js";

const bookSeat = async (userId, trainId, seatCount) => {
  const { data, error } = await supabase.rpc("book_seat", {
    p_user_id: userId,
    p_train_id: trainId,
    p_seat_count: seatCount,
  });

  if (error) {
    throw new ApiError(500, error.message);
  }

  return data;
};

const getBookingDetails = async (bookingId, userId) => {
  return await bookingRepository.getBookingById(bookingId, userId);
};

export default {
  bookSeat,
  getBookingDetails,
};
