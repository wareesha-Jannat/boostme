import { DBConnect } from "@/lib/db";
import Creation from "@/models/creations";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { userId } = await params;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 6;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing user id" },
        { status: 400 }
      );
    }
    await DBConnect();

    const query = { creatorId: userId };
    if (cursor) {
      query._id = { $lt: new mongoose.Types.ObjectId(String(cursor)) };
    }

    const creations = await Creation.find(query)
      .sort({ _id: -1 })
      .limit(pageSize + 1)
      .lean();

    const hasMore = creations.length > pageSize;
    const nextCursor = hasMore ? creations[pageSize]._id.toString() : null;
    const finalCreations = hasMore ? creations.slice(0, pageSize) : creations;
    const safeCreations = finalCreations.map((c) => ({
      ...c,
      _id: c._id.toString(),
      creatorId: c.creatorId.toString(), // Converts ObjectId → String
      createdAt: c.createdAt.toISOString(), // Converts Date → ISO String
      updatedAt: c.updatedAt.toISOString(), // Converts Date → ISO String
    }));

    console.log(safeCreations, nextCursor);
    return NextResponse.json({
      creations: safeCreations,
      nextCursor,
    });
  } catch (error) {
    console.error("creations API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
