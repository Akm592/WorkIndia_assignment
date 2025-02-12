import trainService from "../services/trainService.js";
import { trainSchema, updateTrainSchema } from "../models/trainModel.js";
import validate from "../middlewares/validator.js";

const addTrain = async (req, res, next) => {
  try {
    const trainData = req.body;
    const newTrain = await trainService.addTrain(trainData);
    res
      .status(201)
      .json({ message: "Train added successfully", train: newTrain });
  } catch (error) {
    next(error);
  }
};

const getAvailability = async (req, res, next) => {
  try {
    const { source, destination } = req.query;
    if (!source || !destination) {
      return res
        .status(400)
        .json({ message: "Source and destination are required" });
    }
    const trains = await trainService.getTrainAvailability(source, destination);
    res.json({ trains });
  } catch (error) {
    next(error);
  }
};

const updateSeats = async (req, res, next) => {
  try {
    const trainId = parseInt(req.params.trainId);
    const { total_seats } = req.body;
    const updatedTrain = await trainService.updateTrainTotalSeats(
      trainId,
      total_seats
    );
    res.json({
      message: "Train seats updated successfully",
      train: updatedTrain,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addTrain,
  getAvailability,
  updateSeats,
};
