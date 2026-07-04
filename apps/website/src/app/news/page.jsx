"use client";
import React, { useEffect, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";

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
const DISPLAY = "'DM Sans', sans-serif";

// ── Category accent colours ───────────────────────────────────
const CAT_COLORS = {
    Blog: { color: "#5CC9D6", bg: "rgba(92, 201, 214, 0.1)", border: "rgba(92, 201, 214, 0.2)" },
    "Case Study": { color: "#0ea5e9", bg: "rgba(14, 165, 233, 0.1)", border: "rgba(14, 165, 233, 0.2)" },
    Press: { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.2)" },
    default: { color: "#AEB8C2", bg: "rgba(174, 184, 194, 0.1)", border: "rgba(174, 184, 194, 0.2)" },
};

function catStyle(cat) {
    return CAT_COLORS[cat] || CAT_COLORS.default;
}

// ── Skeleton card ─────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div style={{
            background: T.white, borderRadius: 16, overflow: "hidden",
            border: `1px solid ${T.creamDk}`, boxShadow: "0 2px 8px rgba(0,0,0,.1)"
        }}>
            <div style={{ height: 220, background: "#22384B", animation: "pulse 1.4s ease-in-out infinite" }} />
            <div style={{ padding: "22px 20px 20px" }}>
                {[80, 95, 60].map((w, i) => (
                    <div key={i} style={{
                        height: 12, width: `${w}%`, borderRadius: 6, marginBottom: 10,
                        background: "#22384B", animation: `pulse 1.4s ease-in-out ${i * 0.1}s infinite`
                    }} />
                ))}
                <div style={{
                    height: 10, width: "40%", borderRadius: 6, marginTop: 18,
                    background: "#22384B", animation: "pulse 1.4s ease-in-out .3s infinite"
                }} />
            </div>
        </div>
    );
}

// ── Featured (hero) card — large, first post ─────────────────
const FeaturedCard = memo(({ item }) => {
    const [hov, setHov] = useState(false);
    const cs = catStyle(item.category);
    return (
        <Link href={`/news/${item.slug}`}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
                background: T.white, borderRadius: 20, overflow: "hidden",
                border: `1px solid ${T.creamDk}`,
                boxShadow: hov ? "0 20px 60px rgba(0,0,0,.30)" : "0 4px 20px rgba(0,0,0,.15)",
                textDecoration: "none", transition: "all .3s cubic-bezier(.4,0,.2,1)",
                transform: hov ? "translateY(-3px)" : "none"
            }}>
            {/* Image */}
            <div style={{ position: "relative", overflow: "hidden", minHeight: 360 }}>
                <Image src={item.featuredImage || item.featuredImageUrl || item.image || "/placeholder.jpg"} alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                        objectFit: "cover", transition: "transform .6s cubic-bezier(.4,0,.2,1)",
                        transform: hov ? "scale(1.04)" : "scale(1)"
                    }} />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to right, rgba(8,24,38,.8) 0%, transparent 60%)"
                }} />
            </div>
            {/* Content */}
            <div style={{ padding: "44px 44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                            textTransform: "uppercase", color: cs.color, background: cs.bg,
                            border: `1px solid ${cs.border}`, padding: "4px 12px", borderRadius: 20,
                            fontFamily: FONT
                        }}>
                            {item.category || "News"}
                        </span>
                        <span style={{
                            fontSize: 10, fontWeight: 600, color: T.muted,
                            textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: FONT
                        }}>
                            Featured
                        </span>
                    </div>
                    <h2 style={{
                        fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 400, textTransform: 'none',
                        color: T.black, letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif",}}>
                        {item.title}
                    </h2>
                    {item.summary && (
                        <p style={{
                            fontSize: 14, color: T.body, lineHeight: 1.7,
                            fontFamily: FONT, marginBottom: 24,
                            display: "-webkit-box", WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical", overflow: "hidden"
                        }}>
                            {item.summary}
                        </p>
                    )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                        fontSize: 12, fontWeight: 800, color: hov ? T.brand : T.black,
                        textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: FONT,
                        transition: "color .2s"
                    }}>
                        Read Article
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke={hov ? T.brand : T.black} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transition: "transform .2s, stroke .2s", transform: hov ? "translateX(3px)" : "none" }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </div>
            </div>
        </Link>
    );
});

// ── Standard grid card ────────────────────────────────────────
const BlogCard = memo(({ item, index }) => {
    const [hov, setHov] = useState(false);
    const cs = catStyle(item.category);
    const imageUrl = item.featuredImage || item.featuredImageUrl || item.image;
    return (
        <Link href={`/news/${item.slug}`}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                display: "flex", flexDirection: "column", background: T.white,
                borderRadius: 16, overflow: "hidden",
                border: `1px solid ${hov ? T.brandMd : T.creamDk}`,
                boxShadow: hov ? "0 12px 40px rgba(92,201,214,.10)" : "0 2px 8px rgba(0,0,0,.1)",
                textDecoration: "none", transition: "all .25s cubic-bezier(.4,0,.2,1)",
                transform: hov ? "translateY(-3px)" : "none",
                animationDelay: `${index * 0.06}s`
            }}>
            {/* Image */}
            <div style={{ position: "relative", height: 210, overflow: "hidden", background: "#22384B", flexShrink: 0 }}>
                {imageUrl ? (
                    <Image src={imageUrl} alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{
                            objectFit: "cover",
                            transition: "transform .55s cubic-bezier(.4,0,.2,1)",
                            transform: hov ? "scale(1.05)" : "scale(1)"
                        }} />
                ) : (
                    <div style={{
                        width: "100%", height: "100%", display: "flex", alignItems: "center",
                        justifyContent: "center", background: T.brandLt, color: T.brandMd
                    }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                )}
                {/* Category pill */}
                <span style={{
                    position: "absolute", top: 12, left: 12, fontSize: 9, fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase", color: cs.color,
                    background: "rgba(15,36,54,.92)", backdropFilter: "blur(8px)",
                    padding: "4px 10px", borderRadius: 20, fontFamily: FONT,
                    border: `1px solid ${cs.border}`
                }}>
                    {item.category || "News"}
                </span>
            </div>
            {/* Content */}
            <div style={{ padding: "20px 20px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{
                    fontSize: 'clamp(1.35rem,2.2vw,1.7rem)', fontWeight: 400, textTransform: 'none', color: T.black, letterSpacing: '-0.01em', lineHeight: 1.35, marginBottom: 10, flex: 1,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                    transition: "color .2s", ...(hov ? { color: T.brand } : {}), fontFamily: "'Cormorant Garamond', serif",}}>
                    {item.title}
                </h3>
                {item.summary && (
                    <p style={{
                        fontSize: 12, color: T.muted, lineHeight: 1.6, marginBottom: 14,
                        fontFamily: FONT, display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden"
                    }}>
                        {item.summary}
                    </p>
                )}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingTop: 12, borderTop: `1px solid ${T.creamDk}`, marginTop: "auto"
                }}>
                    <span style={{
                        fontSize: 11, fontWeight: 700, color: hov ? T.brand : T.muted,
                        textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: FONT,
                        transition: "color .2s"
                    }}>
                        Read More
                    </span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke={hov ? T.brand : T.muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transition: "transform .2s, stroke .2s", transform: hov ? "translateX(2px)" : "none" }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </div>
            </div>
        </Link>
    );
});

// ── Main ──────────────────────────────────────────────────────
export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");
    const [activecat, setActivecat] = useState("All");

    useEffect(() => {
        (async () => {
            try {
                setLoading(true); setFetchError("");
                const res = await fetch("http://localhost:5002/news");
                if(!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                setBlogs(data.data || []);
            } catch (err) {
                setFetchError(err.message || "Failed to load articles.");
            } finally { setLoading(false); }
        })();
    }, []);

    const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];
    const filtered = activecat === "All" ? blogs : blogs.filter(b => b.category === activecat);
    const featured = filtered[0];
    const rest = filtered.slice(1);

    return (
        <>
            <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.45} }
        .card-in { animation: fadeUp .45s cubic-bezier(.4,0,.2,1) both; }
        body { background: #081826; }
      `}</style>

            <div style={{ minHeight: "100vh", background: T.cream, fontFamily: FONT, paddingTop: 100 }}>

                {/* ══ CATEGORY FILTER ═══════════════════════════════════ */}
                {categories.length > 1 && (
                    <div style={{
                        display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap",
                        padding: "0 24px", marginBottom: 44
                    }}>
                        {categories.map(cat => {
                            const active = activecat === cat;
                            const cs = catStyle(cat);
                            return (
                                <button key={cat} onClick={() => setActivecat(cat)}
                                    style={{
                                        padding: "7px 18px", borderRadius: 20, fontFamily: FONT,
                                        fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all .18s",
                                        letterSpacing: "0.06em", textTransform: "uppercase",
                                        border: `1.5px solid ${active ? (cat === "All" ? T.brand : cs.color) : T.creamDk}`,
                                        background: active ? (cat === "All" ? T.brand : cs.bg) : T.white,
                                        color: active ? (cat === "All" ? "#081826" : cs.color) : T.muted
                                    }}>
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ══ MAIN CONTENT ══════════════════════════════════════ */}
                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px" }}>

                    {/* Loading skeletons */}
                    {loading && (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                        </div>
                    )}

                    {/* Error */}
                    {!loading && fetchError && (
                        <div style={{ textAlign: "center", padding: "64px 0" }}>
                            <div style={{
                                width: 60, height: 60, borderRadius: 16, background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center",
                                justifyContent: "center", margin: "0 auto 16px", color: "#ef4444"
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: T.black, marginBottom: 6 }}>Failed to load articles</div>
                            <div style={{ fontSize: 13, color: T.muted, marginBottom: 20 }}>{fetchError}</div>
                            <button onClick={() => window.location.reload()}
                                style={{
                                    background: T.brand, color: "#081826", border: "none", borderRadius: 9,
                                    padding: "9px 22px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT
                                }}>
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && !fetchError && filtered.length === 0 && (
                        <div style={{ textAlign: "center", padding: "80px 0" }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: 18, background: T.brandLt,
                                border: `1px solid ${T.brandMd}`, display: "flex", alignItems: "center",
                                justifyContent: "center", margin: "0 auto 16px", color: T.brand
                            }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: T.black, marginBottom: 6, fontFamily: DISPLAY }}>
                                No articles yet
                            </div>
                            <div style={{ fontSize: 13, color: T.muted }}>
                                {activecat !== "All" ? `No ${activecat} articles found.` : "Check back soon for updates."}
                            </div>
                        </div>
                    )}

                    {/* Articles */}
                    {!loading && !fetchError && filtered.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

                            {/* Featured post */}
                            {featured && (
                                <div className="card-in" style={{ animationDelay: "0s" }}>
                                    <FeaturedCard item={featured} />
                                </div>
                            )}

                            {/* Divider with count */}
                            {rest.length > 0 && (
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    <div style={{ flex: 1, height: 1, background: T.creamDk }} />
                                    <span style={{
                                        fontSize: 10, fontWeight: 700, color: T.muted,
                                        textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap"
                                    }}>
                                        {rest.length} More Article{rest.length !== 1 ? "s" : ""}
                                    </span>
                                    <div style={{ flex: 1, height: 1, background: T.creamDk }} />
                                </div>
                            )}

                            {/* Grid of remaining posts */}
                            {rest.length > 0 && (
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20
                                }}>
                                    {rest.map((item, i) => (
                                        <div key={item._id} className="card-in" style={{ animationDelay: `${(i + 1) * 0.07}s` }}>
                                            <BlogCard item={item} index={i} />
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}