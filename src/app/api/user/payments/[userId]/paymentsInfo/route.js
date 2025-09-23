import { DBConnect } from "@/lib/db";
import Payment from "@/models/payment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { userId } = await params;
    await DBConnect();
    const stats = await Payment.aggregate([
      {
        $match: {
          to_user: new mongoose.Types.ObjectId(String(userId)),
          done: true,
        },
      },
      {
        $group: {
          _id: null,
          totalPayments: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    const result = stats[0] || { totalPayments: 0, totalAmount: 0 };

    return NextResponse.json({
      totalPayments: result.totalPayments,
      totalAmount: result.totalAmount,
    });
  } catch (error) {
    console.error("Payments Info Api Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
