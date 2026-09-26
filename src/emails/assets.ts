// Images come from your Payload Media collection; fonts from Next's public/ folder.
// Both are served by your app, so one base URL covers local preview and production.
// Same order as getServerSideURL() in utilities/getURL.ts:
//   1. NEXT_PUBLIC_SERVER_URL, if set
//   2. VERCEL_PROJECT_PRODUCTION_URL, set automatically by Vercel (your production domain)
//   3. http://localhost:3000 (Payload dev server must be running)
// Deliberately NOT VERCEL_URL: it changes every deploy, and preview deployments
// are usually behind Vercel Authentication, so email clients can't load images from them.

const resolveServerURL = () => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:3000'
}

export const SERVER_URL = resolveServerURL().replace(/\/$/, '')

/** URL of a file in the Media collection, by its filename */
export const media = (filename: string) => `${SERVER_URL}/api/media/file/${filename}`

// Update these to match the exact filenames of your uploads in Media > email.
export const assets = {
  logo: media('logo-white-300x283.png'), // shown at 75x71
  envelope: media('envelope-600x432.png'), // TODO: filename – shown at 300x216
  social: {
    instagram: media('instagram-56.png'), // TODO: filenames – shown at 28x28
    tiktok: media('tiktok-56.png'),
    facebook: media('facebook-56.png'),
  },
  // Put the .woff2 files in public/email/fonts/ in your Next app.
  fonts: {
    mazurquicaBold: `${SERVER_URL}/email/fonts/Mazurquica-Bold.woff2`,
    plexMonoRegular: `${SERVER_URL}/email/fonts/IBMPlexMono-Regular.woff2`,
    ptMonoBold: `${SERVER_URL}/email/fonts/PTMono-Bold.woff2`,
  },
} as const
