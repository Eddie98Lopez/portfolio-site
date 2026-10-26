const normalizeUrl = (url) => {
  if (!url) return null
  const withProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`
  return withProtocol.replace(/\/+$/, '')
}

const SITE_URL =
  normalizeUrl(process.env.NEXT_PUBLIC_SERVER_URL) ||
  normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/posts-sitemap.xml',
    '/pages-sitemap.xml',
    '/projects-sitemap.xml',
    '/*',
    '/posts/*',
    '/projects/*',
  ],
  robotsTxtOptions: {
    policies: [
      // Everyone (incl. Googlebot, Bingbot, AI search bots): allow, minus admin
      { userAgent: '*', allow: '/', disallow: '/admin/*' },

      // Training crawlers: block
      { userAgent: 'GPTBot', disallow: '/' }, // OpenAI training
      { userAgent: 'ClaudeBot', disallow: '/' }, // Anthropic training
      { userAgent: 'Google-Extended', disallow: '/' }, // Gemini training (doesn't affect Google Search)
      { userAgent: 'Applebot-Extended', disallow: '/' }, // Apple AI training
      { userAgent: 'meta-externalagent', disallow: '/' }, // Meta AI training
      { userAgent: 'CCBot', disallow: '/' }, // Common Crawl (widely used for training)
      { userAgent: 'Bytespider', disallow: '/' }, // ByteDance
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
      `${SITE_URL}/projects-sitemap.xml`,
    ],
  },
}
