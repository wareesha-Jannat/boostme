import { NextResponse } from 'next/server';
import { DBConnect } from '@/lib/db';
import Payment from '@/models/payment';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await DBConnect();

    const payment = await Payment.findById(id);
    if (!payment) {
     
      return NextResponse.json({error : "payment not found"} ,{ status: 404 });
    }

    return NextResponse.json({ paymentStatus: payment.done });
  } catch (err) {
 
    return NextResponse.json({error: "Server error"}, { status: 500 });
  }
}
