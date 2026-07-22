// app/actions/submit-contact-form.ts
"use server";

import { Resend } from "resend";

export type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  services: string[];
  timeline: string | undefined;
  budget: number[];
};

export type SubmitResult = { success: boolean } | { error: string };

const resend = new Resend(process.env.RESEND_API_KEY);

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export async function submitQuoteRequest(
  values: ContactFormValues,
): Promise<SubmitResult> {
  const { firstName, lastName, email, phone, services, timeline, budget } =
    values;

  if (!firstName?.trim() || !lastName?.trim() || !email?.includes("@")) {
    return { error: "Please fill out your name and a valid email." };
  }

  const fields = [
    ["Name", `${firstName} ${lastName}`],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Services", services.length ? services.join(", ") : "—"],
    ["Timeline", timeline || "—"],
    ["Budget", `${usd(budget[0])} – ${usd(budget[1])}`],
  ];

  try {
    console.log(values);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `New Quote Inquiry — ${firstName} ${lastName}`,
      text: fields.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;font-size:15px;color:#111">
          <h2 style="margin:0 0 12px">New Quote Request form submission</h2>
          ${fields
            .map(
              ([k, v]) =>
                `<p style="margin:4px 0"><strong>${k}:</strong> ${v}</p>`,
            )
            .join("")}
        </div>`,
    });

    if (error) {
      console.error("[contact]", error);
      return { error: "We couldn't send your message. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("[contact]", err);
    return { error: "We couldn't send your message. Please try again." };
  }
}
