import Joi from "joi";

const bookingSchema = Joi.object({
  train_id: Joi.number().integer().min(1).required(),
  seat_count: Joi.number().integer().min(1).required(),
});

export default bookingSchema;
