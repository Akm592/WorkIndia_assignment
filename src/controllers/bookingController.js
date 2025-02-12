import bookingService from "../services/bookingService.js";
import bookingSchema from "../models/bookingModel.js";
import validate from "../middlewares/validator.js";

const bookSeat = async (req, res, next) => {
  try {
    const { train_id, seat_count } = req.body;
    const userId = req.user.userId; // User ID from JWT
    const booking = await bookingService.bookSeat(userId, train_id, seat_count);
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    next(error);
  }
};

const getBookingDetails = async (req, res, next) => {
  try {
    const bookingId = parseInt(req.params.bookingId);
    const userId = req.user.userId; // User ID from JWT
    const bookingDetails = await bookingService.getBookingDetails(
      bookingId,
      userId
    );
    if (!bookingDetails) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
    }
    res.json({ booking: bookingDetails });
  } catch (error) {
    next(error);
  }
};

export default {
  bookSeat,
  getBookingDetails,
};
