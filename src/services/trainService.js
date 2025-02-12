import trainRepository from '../repositories/trainRepository.js';
import ApiError from '../utils/apiError.js';

const addTrain = async (trainData) => {
    // Ensure available_seats is set to total_seats when creating a new train
    const newTrainData = {
        ...trainData,
        available_seats: trainData.total_seats, // Set available_seats = total_seats
    };
    return await trainRepository.createTrain(newTrainData);
};

const getTrainAvailability = async (source, destination) => {
    return await trainRepository.getTrainsByRoute(source, destination);
};

const updateTrainTotalSeats = async (trainId, seats) => {
    const train = await trainRepository.getTrainById(trainId);
    if (!train) {
        throw new ApiError(404, 'Train not found');
    }
    return await trainRepository.updateTrainSeats(trainId, seats);
};


export default {
    addTrain,
    getTrainAvailability,
    updateTrainTotalSeats
};