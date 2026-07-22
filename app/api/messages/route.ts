import { supabaseServer } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  //console.log(body);
  const { data, error } = await supabaseServer
    .from("messages")
    .insert([body])
    .select();
  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

  const { error: emailError } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    subject: `New Contact Form Submission — ${body.first} ${body.last}`,
    html: `
        <div style="font-family:system-ui,sans-serif;font-size:15px;color:#111">
          <h2 style="margin:0 0 12px">New contact form submission</h2>
          <h4>Name</h4>
          <p>${body.first} ${body.last}</p>

          <h4>Phone</h4>
          <p><a href="${body.phone ? "tel:" + body.phone : ""}">${body.phone ?? "No Phone provided"}</a></p>

          <h4>Email</h4>
          <p><a href="mailto:${body.email}">${body.email}</a></p>

          <h4>Message:</h4>
          <p>${body.body}</p>

        </div>`,
  });

  if (emailError) {
    return NextResponse.json({ error: emailError }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
