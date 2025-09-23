import mongoose from "mongoose";

const CreationSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 500 },
    coverImage: { type: String },
    status: {
      type: String,
      enum: ["completed", "active", "upcomming"],
      default: "active",
    },
    link: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Creation ||
  mongoose.model("Creation", CreationSchema);
