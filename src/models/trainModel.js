import Joi from "joi";

const trainSchema = Joi.object({
  train_name: Joi.string().required(),
  source_station: Joi.string().required(),
  destination_station: Joi.string().required(),
  total_seats: Joi.number().integer().min(1).required(),
});

const updateTrainSchema = Joi.object({
  total_seats: Joi.number().integer().min(1).required(),
});

export { trainSchema, updateTrainSchema };
