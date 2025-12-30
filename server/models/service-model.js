import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: String,
      required: true,
    },

    provider: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
