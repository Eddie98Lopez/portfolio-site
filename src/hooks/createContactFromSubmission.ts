// src/hooks/createContactFromSubmission.ts
import type { CollectionAfterChangeHook } from 'payload'

// Title of the form(s) in the admin panel that should create contacts
const CONTACT_FORM_TITLES = ['Contact Form']

export const createContactFromSubmission: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  // Only run on new submissions, not edits in the admin panel
  if (operation !== 'create') return doc

  try {
    const { payload } = req

    // `form` is usually just an ID at this point, so fetch it to check which form it was
    const formId = typeof doc.form === 'object' ? doc.form.id : doc.form
    const form = await payload.findByID({
      collection: 'forms',
      id: formId,
      depth: 0,
      req,
    })

    if (!CONTACT_FORM_TITLES.includes(form.title)) return doc

    // submissionData is an array of { field, value }. Flatten it to an object
    const data: Record<string, string> = Object.fromEntries(
      (doc.submissionData ?? []).map(({ field, value }: { field: string; value: string }) => [
        field,
        value,
      ]),
    )

    payload.logger.info({ data, msg: 'Contact form submission data' })

    if (!data.email) return doc

    // Avoid duplicate contacts: update if the email already exists
    const existing = await payload.find({
      collection: 'contacts',
      where: { email: { equals: data.email } },
      limit: 1,
      depth: 0,
      req,
    })

    const contactData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'contacts',
        id: existing.docs[0].id,
        data: contactData,
        req,
      })
    } else {
      await payload.create({
        collection: 'contacts',
        data: contactData,
        req,
      })
    }
  } catch (err) {
    // Don't break the visitor's form submission if contact creation fails
    req.payload.logger.error({ err, msg: 'Failed to create contact from form submission' })
  }

  return doc
}
