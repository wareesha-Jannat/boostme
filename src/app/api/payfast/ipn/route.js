// app/api/payfast/ipn/route.js
import { NextResponse } from 'next/server';
import { DBConnect } from '@/lib/db';
import Payment from '@/models/payment';

export async function POST(req) {
  try {
    const rawBody = await req.text(); // PayFast sends raw data
    const formData = Object.fromEntries(new URLSearchParams(rawBody));

    const paymentId = formData.custom_str2;
    const status = formData.payment_status;
    console.log('from ipn cutsom str ', paymentId)
    console.log('paymentstatus ', status)


// NOTE: Signature verification skipped for test mode — should be added in production
    await DBConnect();
    if(status == "COMPLETE"){
      await Payment.findByIdAndUpdate(paymentId, { done: true });

    console.log('✅ Payment confirmed and updated in DB:');
    } 
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ IPN handling failed:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
