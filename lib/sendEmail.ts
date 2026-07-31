import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY ?? '');
export const sendEmail = async (html?:string) => {
    try {
        await resend.emails.send({
            from: 'AL Wali Contact Form <onboarding@resend.dev>',
            to: 'alwali.store3@gmail.com',
            subject: 'Contact Form Response from website',
            html: html ?? ''
        });
        return true;
    } catch (error) {
        console.log('Send Email Error', error);
        return false;
    }
}