import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import OTP from '@/lib/models/OTP';
import Session from '@/lib/models/Session';
import { generateSessionToken, generateToken } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and OTP code are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find and verify OTP
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      code,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Find user and mark as verified
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { verified: true },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Generate session token
    const sessionToken = generateSessionToken();
    const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await Session.create({
      userId: user._id,
      token: sessionToken,
      expiresAt: sessionExpiry,
    });

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    // Set secure HTTP-only cookie
    const response = NextResponse.json(
      {
        message: 'Email verified successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );

    response.cookies.set('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred during verification' },
      { status: 500 }
    );
  }
}
