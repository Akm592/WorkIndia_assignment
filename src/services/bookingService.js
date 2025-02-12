import bookingRepository from "../repositories/bookingRepository.js";
import trainRepository from "../repositories/trainRepository.js";
import ApiError from "../utils/apiError.js";
import supabase from "../config/database.js";

const bookSeat = async (userId, trainId, seatCount) => {
  return await supabase.transaction(async () => {
    const train = await trainRepository.getTrainById(trainId);
    if (!train) {
      throw new ApiError(404, "Train not found");
    }
    if (train.available_seats < seatCount) {
      throw new ApiError(400, "Not enough seats available");
    }

    const { error: updateError } = await supabase
      .from("trains")
      .update({ available_seats: train.available_seats - seatCount })
      .eq("id", trainId);

    if (updateError) {
      throw updateError;
    }

    const booking = await bookingRepository.createBooking(
      userId,
      trainId,
      seatCount
    );
    return booking;
  });
};

const getBookingDetails = async (bookingId, userId) => {
  return await bookingRepository.getBookingById(bookingId, userId);
};

export default {
  bookSeat,
  getBookingDetails,
};
