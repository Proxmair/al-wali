// Email service for sending OTP codes
// This is a placeholder that logs to console
// Replace with your preferred email service (Resend, SendGrid, etc.)

export const sendOTPEmail = async (
  email: string,
  code: string
): Promise<boolean> => {
  try {
    // TODO: Integrate with actual email service
    // For now, we'll log to console
    console.log(`[EMAIL SERVICE] Sending OTP to ${email}: ${code}`);

    // Example using Resend (uncomment when you have API key):
    /*
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'noreply@yourapp.com',
        to: email,
        subject: 'Your AL Wali Login Code',
        html: `
          <h2>Your Login Code</h2>
          <p>Use this code to sign in to your AL Wali account:</p>
          <h1 style="font-size: 32px; letter-spacing: 5px;">${code}</h1>
          <p>This code expires in 10 minutes.</p>
        `,
      }),
    });

    return response.ok;
    */

    return true;
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    return false;
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  try {
    console.log(`[EMAIL SERVICE] Sending welcome email to ${email}`);

    // TODO: Integrate with actual email service
    /*
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'noreply@yourapp.com',
        to: email,
        subject: 'Welcome to AL Wali',
        html: `
          <h2>Welcome ${name}!</h2>
          <p>Thank you for signing up at AL Wali.</p>
          <p>Explore our exclusive perfume collection today!</p>
        `,
      }),
    });

    return response.ok;
    */

    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
};
