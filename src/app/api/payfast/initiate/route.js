// app/api/payfast/initiate/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import qs from "querystring";
import { DBConnect } from "@/lib/db";
import Payment from "@/models/payment.js";
import User from "@/models/user.js";

export async function POST(req) {
  try {
    const { name, message, amount, toUser } = await req.json();
    await DBConnect();

    if (!mongoose.Types.ObjectId.isValid(toUser)) {
      throw new Error("Invalid ObjectId");
    }
    const newPayment = await Payment.create({
      name,
      to_user: new mongoose.Types.ObjectId(String(toUser)),
      message,
      amount: parseInt(amount),
    });
    const accountHolder = await User.findById(toUser).select(
      "username payfastid payfastsecret"
    );

    const oid = newPayment._id.toString(); // convert to string
    const payfastData = {
      merchant_id: accountHolder.payfastid,
      merchant_key: accountHolder.payfastsecret,
      return_url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/payment/done?id=${oid}&username=${encodeURIComponent(
        accountHolder.username
      )}`, //urls for success and faliure page
      //   cancel_url: 'http://localhost:3000/payment/failure',
      notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payfast/ipn`, // url to handle process after request completion
      name_first: name,
      email_address: "test@example.com",
      amount,
      item_name: `Support from ${name}`,
      custom_str1: message,
      custom_str2: oid, // this is  order ID
    };

    const query = qs.stringify(payfastData);
    const redirectUrl = `https://sandbox.payfast.co.za/eng/process?${query}`;
    return NextResponse.json({ url: redirectUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initiate payment." },
      { status: 500 }
    );
  }
}
