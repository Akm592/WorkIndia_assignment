import supabase from "../config/database.js";

const createTrain = async (trainData) => {
  const { data, error } = await supabase
    .from("trains")
    .insert([trainData])
    .select("*");
  if (error) {
    throw error;
  }
  return data ? data[0] : null;
};

const getTrainsByRoute = async (source, destination) => {
  const { data, error } = await supabase
    .from("trains")
    .select("*")
    .eq("source_station", source)
    .eq("destination_station", destination)
    .gt("available_seats", 0); // Only show trains with available seats

  if (error) {
    throw error;
  }
  return data || [];
};

const getTrainById = async (trainId) => {
  const { data, error } = await supabase
    .from("trains")
    .select("*")
    .eq("id", trainId)
  

  if (error) {
    throw error;
  }
  return data;
};

const updateTrainSeats = async (trainId, seats) => {
  const { data, error } = await supabase
    .from("trains")
    .update({ total_seats: seats, available_seats: seats })
    .eq("id", trainId)
    .select("*");

  if (error) {
    throw error;
  }
  return data ? data[0] : null;
};

export default {
  createTrain,
  getTrainsByRoute,
  getTrainById,
  updateTrainSeats,
};
