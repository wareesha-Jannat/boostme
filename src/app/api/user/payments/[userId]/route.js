import { DBConnect } from "@/lib/db";
import Payment from "@/models/payment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { userId } = await params;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 4;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing user id" },
        { status: 400 }
      );
    }

    await DBConnect();

    const query = { to_user: userId, done: true };
    if (cursor) {
      query._id = { $lt: new mongoose.Types.ObjectId(String(cursor)) };
    }

    const payments = await Payment.find(query)
      .sort({ _id: -1 })
      .limit(pageSize + 1)
      .lean();

    const hasMore = payments.length > pageSize;
    const nextCursor = hasMore ? payments[pageSize]._id.toString() : null;
    const finalPayments = hasMore ? payments.slice(0, pageSize) : payments;

    const safePayments = finalPayments.map((p) => ({
      ...p,
      _id: p._id.toString(), // Converts ObjectId → String
      to_user: p.to_user.toString(), // Converts ObjectId → String
      createdAt: p.createdAt.toISOString(), // Converts Date → ISO String
    }));
    console.log(safePayments, nextCursor);
    return NextResponse.json({
      payments: safePayments,
      nextCursor,
    });
  } catch (error) {
    console.error("Payments API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
