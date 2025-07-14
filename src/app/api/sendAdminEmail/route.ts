// app/api/send-admin-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
console.log(resend);

type Values = {
  fullName: string;
  email: string;
  phone: string;
  fromTime: string;
  toTime: string;
  barId: string;
};
export async function POST(req: Request) {
  const body: Values = await req.json();

  const { fullName, email, phone, fromTime, toTime, barId } = body;

  try {
    const data = await resend.emails.send({
      from: "Abdullai Bush Bar <onboarding@resend.dev>", // use a verified sender
      to: ["inuenike@gmail.com"], // replace with real admin email
      subject: "New Bush Bar Reservation",
      replyTo: email,
      html: `
        <h2>Reservation Details</h2>
        <p><strong>Bar ID:</strong> ${barId}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>From Time:</strong> ${fromTime}</p>
        <p><strong>To Time:</strong> ${toTime}</p>
      `,
    });

    return NextResponse.json({ message: "Email sent!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
