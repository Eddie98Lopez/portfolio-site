# Branded emails (React Email)

Drop this `emails/` folder into `src/`, so you end up with `src/emails/...`.

## 1. Install

```sh
npm uninstall @react-email/components
npm install react-email@latest
```

`react-email` is a regular dependency (not dev), since your app imports the
components and `render` at runtime. After your first deploy, check your Vercel
function sizes; early versions of the unified package bloated serverless bundles.

Add a preview script to `package.json`:

```json
"scripts": {
  "email": "email dev --dir src/emails/templates --port 3001"
}
```

Run `npm run email` and open the URL it prints to preview templates live.

## 2. Assets

**Images** come from your Payload Media collection. Export from Figma as 2x PNGs
(logo, envelope frame `message 1`, the five social icons), upload them to Media,
and put their exact filenames in `assets.ts`. The Media collection's read access must
be public (`read: () => true`), or email clients get a 403.

**Fonts** go in your Next app at `public/email/fonts/` (check Mazurquica's license
allows web embedding).

**Base URL**: both use `NEXT_PUBLIC_SERVER_URL`, defaulting to `http://localhost:3000`.
In Vercel, set `NEXT_PUBLIC_SERVER_URL=https://lopezed.com`, otherwise sent emails would
point at localhost (the hook logs a warning if so).

**Preview**: keep Payload running (`npm run dev`) so the images load, and run the preview on
another port, since both default to 3000: `"email": "email dev --dir src/emails/templates --port 3001"`.

## 3. Fill in `brand.ts`

Social URLs, privacy URL, and (for marketing emails) a real postal address.

## 4. Wire into Payload

`payload.config.ts`:

```ts
import { beforeFormEmail } from './emails/formEmails'
import { withEmailTemplateField } from './emails/templateField'

formBuilderPlugin({
  // ...existing options
  formOverrides: {
    fields: ({ defaultFields }) => withEmailTemplateField(defaultFields),
  },
  beforeEmail: beforeFormEmail,
}),
```

Each email in a form's Emails section now has an **Email template** dropdown.
If you use Postgres or SQLite, create a migration for the new column:
`npx payload migrate:create` (MongoDB needs nothing).

### Adding a template

1. Create `templates/YourTemplate.tsx` with a default export (it can accept `{ message }`).
2. Add it to `formEmailTemplates` in `registry.ts`.
3. It appears in the dropdown (Postgres/SQLite: new migration, since select options are an enum).

## Components

- `EmailLayout` — Html/Head/Body/Container, fonts, preview text, mobile CSS
- `Band` — a full-width strip (dark `ink` or light `paper`); every section is one
- `BrandHeader` — dark band with centered logo
- `HeroImage` — centered image on dark
- `DisplayHeading` — the big uppercase headline
- `BodyText` — centered mono paragraph on dark
- `BrandButton` + `ButtonSpacer` — white pill buttons, stacked
- `SocialLinks` — icon row
- `FooterDisclaimer`, `FooterCompany`, `FooterLinks` — footer building blocks
- `BrandedMessage` (template) — wraps the admin-written message in the brand design
- `TransactionalFooter` — privacy link, no unsubscribe
- `MarketingFooter` — unsubscribe + postal address (legally required for marketing)
