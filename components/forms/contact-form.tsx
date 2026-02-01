"use client";

import * as React from "react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

// ✅ Zod schema
const contactFormSchema = z.object({
  first: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(50, "First name is too long."),
  last: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(50, "Last name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required.")
    // Simple, pragmatic phone check; adjust if you want strict formatting.
    .regex(/^[0-9+()\-.\s]{7,20}$/, "Enter a valid phone number."),
  body: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(2000, "Message is too long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  first: "",
  last: "",
  email: "",
  phone: "",
  body: "",
};

export function ContactForm() {
  const [values, setValues] = React.useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function setField<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear the field error as the user edits
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateAll(nextValues: ContactFormValues) {
    const parsed = contactFormSchema.safeParse(nextValues);
    if (parsed.success) return { ok: true as const, errors: {} as FieldErrors };

    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormValues | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.body;
    }
    return { ok: false as const, errors: fieldErrors };
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = validateAll(values);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/messages", values);

      // TODO: Replace with your submission logic (API route, server action, etc.)
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });

      console.log("Submitting contact form:", values);

      // Optional: reset after success
      setValues(initialValues);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="first" className="uppercase font-bold tracking-wider">
            First name
          </Label>
          <Input
            id="first"
            className="bg-secondary border-primary"
            name="first"
            value={values.first}
            onChange={(e) => setField("first", e.target.value)}
            autoComplete="given-name"
            aria-invalid={Boolean(errors.first)}
            aria-describedby={errors.first ? "first-error" : undefined}
          />
          <p
            id="first-error"
            className="min-h-[1.25rem] text-sm text-destructive"
          >
            {errors.first ?? ""}
          </p>
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="last" className="uppercase font-bold tracking-wider">
            Last name
          </Label>
          <Input
            className="bg-secondary border-primary"
            id="last"
            name="last"
            value={values.last}
            onChange={(e) => setField("last", e.target.value)}
            autoComplete="family-name"
            aria-invalid={Boolean(errors.last)}
            aria-describedby={errors.last ? "last-error" : undefined}
          />
          <p
            id="last-error"
            className="min-h-[1.25rem] text-sm text-destructive"
          >
            {errors.last ?? ""}
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="uppercase font-bold tracking-wider">
            Email
          </Label>
          <Input
            className="bg-secondary border-primary"
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <p
            id="email-error"
            className="min-h-[1.25rem] text-sm text-destructive"
          >
            {errors.email ?? ""}
          </p>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="uppercase font-bold tracking-wider">
            Phone
          </Label>
          <Input
            id="phone"
            className="bg-secondary border-primary"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          <p
            id="phone-error"
            className="min-h-[1.25rem] text-sm text-destructive"
          >
            {errors.phone ?? ""}
          </p>
        </div>

        {/* Message (spans 2 cols on md+) */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="body" className="uppercase font-bold tracking-wider">
            Message
          </Label>
          <Textarea
            className="h-[150px] bg-secondary border border-primary"
            id="body"
            name="body"
            value={values.body}
            onChange={(e) => setField("body", e.target.value)}
            rows={6}
            aria-invalid={Boolean(errors.body)}
            aria-describedby={errors.body ? "body-error" : undefined}
          />
          <p
            id="body-error"
            className="min-h-[1.25rem] text-sm text-destructive"
          >
            {errors.body ?? ""}
          </p>
        </div>

        {/* Submit (spans 2 cols on md+) */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </form>
  );
}
