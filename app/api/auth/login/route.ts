import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import OTP from '@/lib/models/OTP';
import { generateOTP } from '@/lib/auth';
import { sendOTPEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please sign up first.' },
        { status: 404 }
      );
    }

    if (!user.verified) {
      return NextResponse.json(
        { error: 'Please verify your email first' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete previous OTP if exists
    await OTP.deleteMany({ email: email.toLowerCase() });

    // Create new OTP
    await OTP.create({
      email: email.toLowerCase(),
      code: otp,
      expiresAt,
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    return NextResponse.json(
      {
        message: 'OTP sent to your email',
        email: email.toLowerCase(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
