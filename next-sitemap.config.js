/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.auxosys.com',
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
