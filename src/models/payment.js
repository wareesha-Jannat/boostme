import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    to_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: { type: String, required: true },
    amount: { type: Number, required: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
