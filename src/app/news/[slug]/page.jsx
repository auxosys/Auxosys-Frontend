"use client";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// ── Brand tokens ──────────────────────────────────────────────
const T = {
    brand: "#5CC9D6",
    brandLt: "rgba(92, 201, 214, 0.1)",
    brandMd: "rgba(92, 201, 214, 0.2)",
    black: "#F8FAFC",
    body: "#AEB8C2",
    muted: "#7F93A3",
    cream: "#081826",
    creamDk: "#22384B",
    white: "#0F2436",
};
const FONT = "'DM Sans', sans-serif";

// ── Category accent colours ───────────────────────────────────
const CAT_COLORS = {
    Blog: { color: "#5CC9D6", bg: "rgba(92, 201, 214, 0.1)", border: "rgba(92, 201, 214, 0.2)" },
    "Case Study": { color: "#0ea5e9", bg: "rgba(14, 165, 233, 0.1)", border: "rgba(14, 165, 233, 0.2)" },
    Press: { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.2)" },
    default: { color: "#AEB8C2", bg: "rgba(174, 184, 194, 0.1)", border: "rgba(174, 184, 194, 0.2)" },
};
const catStyle = (cat) => CAT_COLORS[cat] || CAT_COLORS.default;

// ── Reading progress bar ──────────────────────────────────────
function ProgressBar() {
    const [pct, setPct] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const top = el.scrollTop || document.body.scrollTop;
            const h = el.scrollHeight - el.clientHeight;
            setPct(h > 0 ? Math.min(100, (top / h) * 100) : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 200,
            background: "rgba(92, 201, 214, .12)"
        }}>
            <div style={{
                height: "100%", width: `${pct}%`, background: T.brand,
                transition: "width .1s linear",
                boxShadow: `0 0 8px ${T.brand}`
            }} />
        </div>
    );
}

// ── Skeleton loader ───────────────────────────────────────────
function ArticleSkeleton() {
    const bar = (w, h = 14, mb = 10, delay = 0, key = undefined) => (
        <div key={key} style={{
            height: h, width: w, borderRadius: 7, marginBottom: mb,
            background: "#22384B", animation: `pulse 1.4s ease-in-out ${delay}s infinite`
        }} />
    );
    return (
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "60px 24px" }}>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}`}</style>
            {bar("30%", 10, 24)}
            {bar("85%", 38, 12)}
            {bar("60%", 38, 40)}
            <div style={{
                height: 400, borderRadius: 20, background: "#22384B",
                marginBottom: 48, animation: "pulse 1.4s ease-in-out infinite"
            }} />
            {[100, 95, 88, 72, 95, 80].map((w, i) => bar(`${w}%`, 14, 12, i * 0.08, i))}
        </div>
    );
}

// ── Related card ──────────────────────────────────────────────
function RelatedCard({ item }) {
    const [hov, setHov] = useState(false);
    const cs = catStyle(item.category);
    const imageUrl = item.featured_image_url || item.featuredImage || item.featuredImageUrl || item.image;
    return (
        <Link href={`/news/${item.slug}`}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                display: "flex", flexDirection: "column", background: T.white,
                borderRadius: 14, overflow: "hidden",
                border: `1px solid ${hov ? T.brandMd : T.creamDk}`,
                boxShadow: hov ? "0 10px 32px rgba(92,201,214,.10)" : "0 2px 8px rgba(0,0,0,.1)",
                textDecoration: "none", transition: "all .25s cubic-bezier(.4,0,.2,1)",
                transform: hov ? "translateY(-3px)" : "none"
            }}>
            <div style={{ height: 160, overflow: "hidden", background: "#22384B", flexShrink: 0 }}>
                {imageUrl
                    ? <img loading="lazy" src={imageUrl} alt={item.title}
                        style={{
                            width: "100%", height: "100%", objectFit: "cover",
                            transition: "transform .55s", transform: hov ? "scale(1.05)" : "scale(1)"
                        }} />
                    : <div style={{ width: "100%", height: "100%", background: T.brandLt }} />
                }
            </div>
            <div style={{ padding: "16px 16px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                {item.category && (
                    <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.10em",
                        textTransform: "uppercase", color: cs.color, fontFamily: FONT
                    }}>
                        {item.category}
                    </span>
                )}
                <h4 style={{
                    fontSize: 'clamp(1.1rem,1.6vw,1.25rem)', fontWeight: 400, textTransform: 'none', color: hov ? T.brand : T.black,
                    letterSpacing: '-0.01em', lineHeight: 1.4,
                    transition: "color .2s",
                    display: "-webkit-box", WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0, fontFamily: "'Cormorant Garamond', serif",}}>
                    {item.title}
                </h4>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: "auto" }}>
                    <span style={{
                        fontSize: 10, fontWeight: 700, color: hov ? T.brand : T.muted,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        fontFamily: FONT, transition: "color .2s"
                    }}>Read</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke={hov ? T.brand : T.muted} strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        style={{
                            transition: "transform .2s, stroke .2s",
                            transform: hov ? "translateX(2px)" : "none"
                        }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

// ── Main ──────────────────────────────────────────────────────
export default function Blogpage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                setLoading(true); setError(null);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${slug}`);
                if (!res.ok) throw new Error("Failed to load article.");
                const data = await res.json();
                
                const postData = data?.data?.post || (data?.data && !data.data.post ? data.data : null);
                const relatedData = data?.data?.related || [];

                if(!postData) throw new Error("Article not found.");

                setPost(postData);
                setRelated(relatedData);
            } catch (err) {
                setError(err.message || "Failed to load article.");
            } finally { setLoading(false); }
        })();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div style={{ minHeight: "100vh", background: T.cream, paddingTop: 80 }}>
            <ArticleSkeleton />
        </div>
    );

    if (error || !post) return (
        <div style={{
            minHeight: "100vh", background: T.cream, paddingTop: 80,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 16, padding: "0 24px", textAlign: "center",
            fontFamily: FONT
        }}>
            <div style={{
                width: 60, height: 60, borderRadius: 16, background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center",
                justifyContent: "center", color: "#ef4444"
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.black }}>
                {error || "Article not found"}
            </div>
            <Link href="/news" style={{
                color: T.brand, fontSize: 13, fontWeight: 700,
                textDecoration: "none", display: "flex", alignItems: "center", gap: 5
            }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to News
            </Link>
        </div>
    );

    const decodeHtml = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html; return txt.value;
    };
    const safeHtml = DOMPurify.sanitize(
        post.content ? decodeHtml(post.content) : "",
        { USE_PROFILES: { html: true } }
    );

    const cs = catStyle(post.category);
    const date = post.publishedAt || post.createdAt
        ? new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN",
            { day: "numeric", month: "long", year: "numeric" })
        : null;

    // rough read time
    const words = (post.content || "").trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.round(words / 200));

    const imageUrl = post.featured_image_url || post.featuredImage || post.featuredImageUrl || post.image;

    return (
        <>
            <style>{`
        * { box-sizing: border-box; }
        body { background: #081826; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fu  { animation: fadeUp .5s cubic-bezier(.4,0,.2,1) both; }
        .fu1 { animation-delay: .1s; }
        .fu2 { animation-delay: .2s; }
        .fu3 { animation-delay: .3s; }

        /* ── Article prose styles ── */
        .article-body h1,
        .article-body h2,
        .article-body h3 {
          font-family: 'DM Sans', sans-serif;
          font-weight: 900;
          color: #F8FAFC;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 2em 0 0.6em;
        }
        .article-body h1 { font-size: clamp(1.6rem, 3vw, 2rem); }
        .article-body h2 { font-size: clamp(1.3rem, 2.5vw, 1.6rem); }
        .article-body h3 { font-size: 1.15rem; }
        .article-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; font-weight: 400;
          color: #AEB8C2; line-height: 1.85;
          margin: 0 0 1.4em;
        }
        .article-body strong, .article-body b {
          font-weight: 800; color: #F8FAFC;
        }
        .article-body em, .article-body i {
           color: #AEB8C2;
        }
        .article-body a {
          color: #5CC9D6; font-weight: 600;
          text-underline-offset: 3px;
        }
        .article-body a:hover { color: #5CC9D6; filter: brightness(1.1); }
        .article-body ul, .article-body ol {
          padding-left: 1.5em; margin: 0 0 1.4em;
        }
        .article-body li {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; color: #AEB8C2;
          line-height: 1.8; margin-bottom: 0.4em;
        }
        .article-body blockquote {
          border-left: 3px solid #5CC9D6;
          margin: 2em 0; padding: 0.4em 0 0.4em 1.5em;
        }
        .article-body blockquote p {
           font-size: 19px;
          color: #F8FAFC; margin: 0;
          font-weight: 500;
        }
        .article-body img {
          max-width: 100%; border-radius: 12px;
          margin: 2em 0;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .article-body hr {
          border: none; border-top: 1px solid #22384B;
          margin: 2.5em 0;
        }
        .article-body pre, .article-body code {
          font-family: monospace; font-size: 14px;
          background: rgba(255,255,255,0.05); 
          border-radius: 6px; padding: 4px 8px; color: #F8FAFC;
        }
        .article-body pre { padding: 20px; overflow-x: auto; border-radius: 12px; }
      `}</style>

            <ProgressBar />

            <div style={{ minHeight: "100vh", background: T.cream, fontFamily: FONT }}>

                {/* ── HERO SECTION ── */}
                <div className="fu" style={{
                    position: "relative",
                    width: "100%",
                    minHeight: "75vh",
                    display: "flex",
                    alignItems: "flex-end",
                    paddingTop: 120,
                    paddingBottom: 70,
                    marginBottom: 56,
                    background: "#0d0d0d",
                    overflow: "hidden"
                }}>
                    {imageUrl && (
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            zIndex: 0
                        }} />
                    )}
                    
                    {/* Dark gradient for text readability */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(8,24,38,0.95) 0%, rgba(8,24,38,0.5) 50%, rgba(8,24,38,0.1) 100%)",
                        zIndex: 1
                    }} />

                    <div style={{ 
                        position: "relative", 
                        zIndex: 2, 
                        maxWidth: 960, 
                        margin: "0 auto", 
                        padding: "0 24px",
                        width: "100%"
                    }}>
                        <Link href="/news"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 6,
                                color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700, textDecoration: "none",
                                textTransform: "uppercase", letterSpacing: "0.10em", fontFamily: FONT,
                                transition: "color .15s", marginBottom: 28
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Back to News
                        </Link>
                        
                        <h1 style={{
                            fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 400, textTransform: 'none', color: '#ffffff', letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 24,
                            maxWidth: 850, fontFamily: "'Cormorant Garamond', serif",}}>
                            {post.title}
                        </h1>

                        <div style={{
                            display: "flex", alignItems: "center", gap: 12,
                            flexWrap: "wrap", fontFamily: FONT
                        }}>
                            <span style={{ fontSize: 14, color: "#fff", fontWeight: 700 }}>
                                By {post.author || "AUXOSYS Team"}
                            </span>
                            <span style={{ color: "rgba(255,255,255,0.4)" }}>•</span>
                            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                                {date || "Unknown Date"}
                            </span>
                            <span style={{ color: "rgba(255,255,255,0.4)" }}>•</span>
                            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
                                {readTime} min read
                            </span>
                            <span style={{ color: "rgba(255,255,255,0.4)" }}>•</span>
                            <span style={{
                                fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                                textTransform: "uppercase", color: "#fff", background: "rgba(255,255,255,0.15)",
                                border: "1px solid rgba(255,255,255,0.2)", padding: "4px 12px",
                                borderRadius: 20
                            }}>
                                {post.category || "News"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── SUMMARY / PULL QUOTE ── */}
                {post.summary && (
                    <div className="fu fu2" style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px 44px" }}>
                        <div style={{
                            background: T.brandLt, borderRadius: "0 12px 12px 0", padding: "18px 22px",
                            borderLeft: `3px solid ${T.brand}`
                        }}>
                            <p style={{
                                fontSize: 16, fontWeight: 600, color: T.black,
                                lineHeight: 1.7, margin: 0, fontFamily: FONT,
                                }}>
                                {post.summary}
                            </p>
                        </div>
                    </div>
                )}

                {/* ── ARTICLE BODY ── */}
                <article className="fu fu3" style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px 64px" }}>
                    <div className="article-body"
                        dangerouslySetInnerHTML={{ __html: safeHtml }} />
                </article>

                {/* ── ARTICLE FOOTER ── */}
                <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px 72px" }}>
                    <div style={{ height: 1, background: T.creamDk, marginBottom: 24 }} />
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        flexWrap: "wrap", gap: 12
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: "50%", background: T.brandLt,
                                border: `1px solid ${T.brandMd}`, display: "flex", alignItems: "center",
                                justifyContent: "center", color: T.brand
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 800, color: T.black, fontFamily: FONT }}>
                                    AUXOSYS Team
                                </div>
                                <div style={{ fontSize: 11, color: T.muted, fontFamily: FONT }}>
                                    {date || "AUXOSYS"}
                                </div>
                            </div>
                        </div>
                        <Link href="/news"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 7,
                                background: T.white, color: T.black,
                                border: `1.5px solid ${T.creamDk}`, borderRadius: 10,
                                padding: "9px 18px", fontSize: 11, fontWeight: 700,
                                textDecoration: "none", fontFamily: FONT,
                                textTransform: "uppercase", letterSpacing: "0.08em",
                                transition: "all .2s"
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = T.brand; e.currentTarget.style.color = T.brand; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = T.creamDk; e.currentTarget.style.color = T.black; }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            All Articles
                        </Link>
                    </div>
                </div>

                {/* ── RELATED ARTICLES ── */}
                {related.length > 0 && (
                    <div style={{ background: T.white, borderTop: `1px solid ${T.creamDk}`, padding: "56px 24px 72px" }}>
                        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                            {/* Section heading */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
                                <span style={{ width: 22, height: 1.5, background: T.brand, display: "inline-block" }} />
                                <span style={{
                                    fontSize: 10, fontWeight: 700, color: T.brand,
                                    letterSpacing: "0.16em", textTransform: "uppercase"
                                }}>
                                    Related Articles
                                </span>
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, textTransform: 'none', color: T.black, letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: 32, fontFamily: "'Cormorant Garamond', serif",}}>
                                Keep Reading
                            </h2>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                                gap: 16
                            }}>
                                {related.map(item => (
                                    <RelatedCard key={item._id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}