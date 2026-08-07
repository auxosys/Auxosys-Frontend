import Head from 'next/head';

export default function SEO({
  title,
  description,
  urlPath = "",
  image,
  type = "website",
  jsonLd = null,
  globalSeo = {}, // Passed down from getStaticProps
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.auxosys.com";
  const url = `${siteUrl}${urlPath}`;
  
  // Merge page-specific props with global SEO settings
  const finalTitle = title || globalSeo.site_title || "Auxosys | Intelligent Digital Products";
  const finalDescription = description || globalSeo.meta_description || "Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products.";
  
  // Determine image (page-specific -> global default -> hardcoded default)
  const ogImageRaw = image || globalSeo.default_og_image || "/images/og-image.jpg";
  const absoluteImage = ogImageRaw.startsWith('http') ? ogImageRaw : `${siteUrl}${ogImageRaw}`;
  
  const twitterImageRaw = globalSeo.default_twitter_image || ogImageRaw;
  const absoluteTwitterImage = twitterImageRaw.startsWith('http') ? twitterImageRaw : `${siteUrl}${twitterImageRaw}`;

  // Favicons
  const faviconUrl = globalSeo.favicon || "/favicon.ico";
  const appleTouchIconUrl = globalSeo.apple_touch_icon || "/apple-touch-icon.png";
  const themeColor = globalSeo.theme_color || "#17262B";

  // Robots logic
  const robotsIndex = globalSeo.robots_index !== false ? "index" : "noindex";
  const robotsFollow = globalSeo.robots_follow !== false ? "follow" : "nofollow";
  const robotsArchive = globalSeo.robots_archive !== false ? "archive" : "noarchive";
  const robotsSnippet = globalSeo.robots_snippet !== false ? "snippet" : "nosnippet";
  const robotsImageIndex = globalSeo.robots_imageindex !== false ? "imageindex" : "noimageindex";
  const robotsTranslate = globalSeo.robots_translate !== false ? "translate" : "notranslate";
  const robotsMaxSnippet = globalSeo.robots_max_snippet || "-1";
  const robotsMaxImagePreview = globalSeo.robots_max_image_preview || "large";
  const robotsMaxVideoPreview = globalSeo.robots_max_video_preview || "-1";
  const robotsString = `${robotsIndex}, ${robotsFollow}, ${robotsArchive}, ${robotsSnippet}, ${robotsImageIndex}, ${robotsTranslate}, max-snippet:${robotsMaxSnippet}, max-image-preview:${robotsMaxImagePreview}, max-video-preview:${robotsMaxVideoPreview}`;

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {globalSeo.keywords && <meta name="keywords" content={globalSeo.keywords} />}
      <link rel="canonical" href={globalSeo.canonical_url || globalSeo.canonical ? `${globalSeo.canonical_url || globalSeo.canonical}${urlPath}` : url} />
      <link rel="alternate" href={siteUrl} hrefLang={globalSeo.language || "en"} />
      <meta name="robots" content={robotsString} />
      <meta name="theme-color" content={themeColor} />

      {/* AI Search Optimization (AEO / GEO) */}
      {globalSeo.ai_summary && <meta name="ai:summary" content={globalSeo.ai_summary} />}
      {globalSeo.ai_keywords && <meta name="ai:keywords" content={globalSeo.ai_keywords} />}
      {globalSeo.entity_tags && <meta name="entity:tags" content={globalSeo.entity_tags} />}

      {/* Dynamic Favicons */}
      <link rel="icon" href={faviconUrl} sizes="any" />
      <link rel="apple-touch-icon" href={appleTouchIconUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:site_name" content={globalSeo.site_name || "Auxosys"} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {globalSeo.locale && <meta property="og:locale" content={globalSeo.locale} />}
      {globalSeo.og_video && <meta property="og:video" content={globalSeo.og_video} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absoluteTwitterImage} />
      {globalSeo.twitter_player && <meta name="twitter:player" content={globalSeo.twitter_player} />}

      {/* Webmaster Verifications */}
      {globalSeo.google_site_verification && (
        <meta name="google-site-verification" content={globalSeo.google_site_verification} />
      )}
      {globalSeo.bing_site_verification && (
        <meta name="msvalidate.01" content={globalSeo.bing_site_verification} />
      )}

      {/* Schema.org JSON-LD (Page Specific) */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      
      {/* Global Schemas */}
      {globalSeo.organization_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: typeof globalSeo.organization_schema === 'string' ? globalSeo.organization_schema : JSON.stringify(globalSeo.organization_schema) }}
        />
      )}
      {globalSeo.website_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: typeof globalSeo.website_schema === 'string' ? globalSeo.website_schema : JSON.stringify(globalSeo.website_schema) }}
        />
      )}
    </Head>
  );
}
