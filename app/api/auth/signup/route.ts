import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import OTP from '@/lib/models/OTP';
import { generateOTP } from '@/lib/auth';
import { sendOTPEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser && existingUser.verified) {
      return NextResponse.json(
        { error: 'User already exists. Please login instead.' },
        { status: 409 }
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

    // If user doesn't exist, create unverified user
    if (!existingUser) {
      await User.create({
        email: email.toLowerCase(),
        name,
        verified: false,
      });
    }

    return NextResponse.json(
      {
        message: 'OTP sent to your email. Please verify to complete signup.',
        email: email.toLowerCase(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
