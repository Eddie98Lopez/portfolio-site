export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://example.com')

/** URL of a file in the Media collection, by its filename */
export const media = (filename: string) => `${SERVER_URL}/api/media/file/${filename}`

// Update these to match the exact filenames of your uploads in Media > email.
export const assets = {
  logo: media('logo-white-300x283.png'), // shown at 75x71
  envelope: media('email-message-600x432.png'), // TODO: filename – shown at 300x216
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
