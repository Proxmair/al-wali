import { sendEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Send email via Resend
    const html = `<p>${name} has sent you a message:${message} from this mail:${email}</p>`
    await sendEmail(html)

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}