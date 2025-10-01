// app/api/payfast/ipn/route.js
import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/db";
import Payment from "@/models/payment";

export async function POST(req) {
  try {
    const rawBody = await req.text(); // PayFast sends raw data
    const formData = Object.fromEntries(new URLSearchParams(rawBody));

    const paymentId = formData.custom_str2;
    const status = formData.payment_status;

    // NOTE: Signature verification skipped for test mode — should be added in production
    await DBConnect();
    if (status == "COMPLETE") {
      await Payment.findByIdAndUpdate(paymentId, { done: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ IPN handling failed:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
