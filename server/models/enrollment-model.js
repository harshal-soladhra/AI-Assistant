// enrollment-model.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    status: {
      type: String,
      enum: ["enrolled", "completed"],
      default: "enrolled",
    },
    progress: {
      type: Number,
      default: 0, // %
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
