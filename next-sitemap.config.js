/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://auxosys.vercel.app',
  generateRobotsTxt: true, // (optional)
  exclude: ['/404', '/500', '/admin', '/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
}
