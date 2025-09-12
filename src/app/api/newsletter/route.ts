import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
import { render } from '@react-email/components';

import NewsletterSubscribe from "@/emails/NewsletterSubscribe";
import { validateEmail } from "@/utils/validateEmail";

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    const resend = new Resend(process.env.RESEND_API_KEY);
    const audience = process.env.RESEND_AUDIENCE_KEY!;
    const marketingEmail = process.env.MARKETING_EMAIL_ADDRESS!;

    if (!validateEmail(email)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    try {
        const { data: contactList } = await resend.contacts.list({
            audienceId: audience,
        });

        const contactExists = contactList?.data.some(contact => contact.email === email);

        if (contactExists) {
            return NextResponse.json({
                error: "Email is already subscribed."
            }, { status: 409 });
        }

        await resend.contacts.create({
            email,
            unsubscribed: false,
            audienceId: audience
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        const emailHtml = await render(NewsletterSubscribe());
        const { data: confirmData, error } = await resend.emails.send({
            from: marketingEmail,
            to: email,
            subject: "Welcome to the Project 0 Newsletter!",
            html: emailHtml,
            headers: {
                'List-Unsubscribe': '<https://blog.0.xyz/unsubscribe>'
            },
        });

        const data = { confirmData };
        return NextResponse.json({ data });
    } catch (error) {
        console.error("Full error object:", JSON.stringify(error, null, 2));
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error',
            details: error
        }, { status: 500 });
    }
};
