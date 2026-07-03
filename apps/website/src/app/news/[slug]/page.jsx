"use client";
import DOMPurify from "dompurify";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

/* ─── helpers ─────────────────────────────────────────────── */
const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const estimateReadTime = (html = "") => {
  const words = html.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

/* ─── Share button ────────────────────────────────────────── */
function ShareButton({ label, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/25 px-4 py-2 rounded-full transition"
    >
      {icon}
      {label}
    </button>
  );
}

/* ─── Table-of-contents builder ──────────────────────────── */
function buildTOC(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const headings = Array.from(div.querySelectorAll("h2,h3"));
  return headings.map((h, i) => ({
    id: `heading-${i}`,
    text: h.textContent,
    level: h.tagName === "H2" ? 2 : 3,
  }));
}

function injectIds(html) {
  let i = 0;
  return html.replace(/<(h[23])(.*?)>/g, (_, tag, attrs) => {
    return `<${tag}${attrs} id="heading-${i++}">`;
  });
}

/* ─── Related Card ───────────────────────────────────────── */
function RelatedCard({ item }) {
  return (
    <Link
      to={`/newsroom/${item.slug}`}
      className="group bg-[var(--bg-1)] hover:bg-[var(--bg-1)] rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(12,85,204,0.15)] border border-transparent hover:border-[var(--teal)]/20"
    >
      {item.featuredImageUrl && (
        <div className="relative h-[170px] overflow-hidden">
          <img
            loading="lazy"
            src={item.featuredImageUrl}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          {item.category && (
            <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-sm text-[var(--orange)] border border-[var(--teal)]/30 px-2.5 py-1 rounded-full">
              {item.category}
            </span>
          )}
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-sm font-medium leading-snug group-hover:text-[var(--orange)] transition line-clamp-3 flex-1">
          {item.title}
        </h4>
        <p className="text-gray-500 text-xs mt-3">
          {new Date(item.publishedAt || item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

/* ─── Progress bar ───────────────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[var(--teal)] to-[var(--orange)] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function NewsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");
  const contentRef = useRef(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      // Mocked data
      const mockPost = {
        title: "AUXOSYS Launches New Enterprise AI Solution",
        content: "<h2>A New Era of Intelligence</h2><p>Today, we are thrilled to announce...</p>",
        publishedAt: Date.now(),
        category: "Press Release",
        author: "AUXOSYS Editorial",
        featuredImageUrl: "https://opmcorpimages.s3.ap-south-1.amazonaws.com/newsroom.jpg"
      };
      setPost(mockPost);
      setRelated([]);
    } catch (err) {
      setError(err.message || "Failed to load article.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) { fetchPost(); window.scrollTo(0, 0); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  /* build TOC after post loads */
  useEffect(() => {
    if (post?.content) setToc(buildTOC(post.content));
  }, [post]);

  /* active heading tracker */
  useEffect(() => {
    if (!toc.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveHeading(e.target.id); });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── loading skeleton ─────────────────────────────────── */
  if (loading) {
    return (
      <div className="bg-[var(--bg-0)] text-white min-h-screen">
        <div className="h-[520px] bg-[var(--bg-1)] animate-pulse" />
        <div className="max-w-[900px] mx-auto px-6 py-16 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-[var(--bg-1)] rounded animate-pulse ${i % 3 === 2 ? "w-3/5" : "w-full"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-[var(--bg-0)] text-white min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-1)] flex items-center justify-center mb-2">
          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24">
            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-red-400 text-base font-medium">{error || "This article could not be found."}</p>
        <Link to="/newsroom" className="text-[var(--orange)] hover:text-white text-sm transition underline underline-offset-4">
          ← Back to Newsroom
        </Link>
      </div>
    );
  }

  const safeHtml = injectIds(
    DOMPurify.sanitize(post.content || "", { USE_PROFILES: { html: true } })
  );
  const readTime = estimateReadTime(post.content);

  return (
    <>
      <ReadingProgress />

      

      <div className="bg-[var(--bg-0)] text-white min-h-screen">

        {/* ══════════════ HERO ══════════════ */}
        <section className="relative h-[560px] lg:h-[680px] flex items-end overflow-hidden">
          {post.featuredImageUrl ? (
            <img
              loading="lazy"
              src={post.featuredImageUrl}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover scale-105"
              style={{ animation: "heroZoom 12s ease-out forwards" }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-1)] to-[var(--bg-0)]" />
          )}

          {/* multi-layer gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-0)] via-[var(--bg-0)]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-0)]/60 to-transparent" />

          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 w-full">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
              <Link to="/newsroom" className="hover:text-white transition">Newsroom</Link>
              <span>/</span>
              {post.category && (
                <>
                  <span className="text-[var(--orange)]">{post.category}</span>
                  <span>/</span>
                </>
              )}
              <span className="truncate max-w-[200px] text-gray-500">{post.title}</span>
            </div>

            {post.category && (
              <span className="inline-block text-[11px] font-semibold uppercase tracking-widest bg-[var(--teal)] text-white px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
            )}

            <h1 className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-display)] leading-tight max-w-3xl mb-5">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[var(--teal)] flex items-center justify-center text-xs font-bold font-[family-name:var(--font-display)]">
                  {(post.author || "O").charAt(0).toUpperCase()}
                </div>
                <span>{post.author || "OPM Editorial"}</span>
              </div>
              <span className="text-gray-600">•</span>
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {readTime} min read
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════ BODY ══════════════ */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-20">

          {/* ── Left column: content ── */}
          <div>
            {/* summary callout */}
            {post.summary && (
              <div className="border-l-4 border-[var(--teal)] bg-[var(--bg-1)] rounded-r-xl px-6 py-5 mb-10">
                <p className="text-gray-200 text-base leading-relaxed italic">{post.summary}</p>
              </div>
            )}

            {/* share row */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mr-1">Share</span>
              <ShareButton
                label="Twitter / X"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, "_blank")}
                icon={
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
              />
              <ShareButton
                label="LinkedIn"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank")}
                icon={
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                }
              />
              <ShareButton
                label={copied ? "Copied!" : "Copy link"}
                onClick={handleCopyLink}
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>

            {/* article body */}
            <div
              ref={contentRef}
              className="
                prose prose-invert max-w-none
                prose-headings:text-white prose-headings:font-bold font-[family-name:var(--font-display)]
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-300 prose-p:leading-[1.9] prose-p:my-4
                prose-strong:text-white
                prose-a:text-[var(--orange)] prose-a:no-underline hover:prose-a:underline
                prose-li:text-gray-300 prose-li:leading-relaxed
                prose-blockquote:border-[var(--teal)] prose-blockquote:bg-[var(--bg-1)]/50
                prose-blockquote:rounded-r-lg prose-blockquote:py-1
                prose-blockquote:text-gray-200 prose-blockquote:not-italic
                prose-code:text-[var(--orange)] prose-code:bg-[var(--bg-1)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-[var(--bg-0)] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                prose-img:rounded-xl prose-img:border prose-img:border-white/5
                prose-hr:border-white/10
              "
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />

            {/* tags / category */}
            {post.category && (
              <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-2">
                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mr-1 flex items-center">Tags</span>
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--bg-1)] border border-white/10 text-gray-300">
                  {post.category}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--bg-1)] border border-white/10 text-gray-300">OPM</span>
              </div>
            )}

            {/* back link */}
            <div className="mt-10">
              <Link
                to="/newsroom"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Newsroom
              </Link>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">

              {/* Table of contents */}
              {toc.length > 0 && (
                <div className="bg-[var(--bg-1)] border border-white/5 rounded-2xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                    In this article
                  </p>
                  <ul className="space-y-2">
                    {toc.map(({ id, text, level }) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={`block text-xs leading-snug transition py-1 ${level === 3 ? "pl-3" : ""
                            } ${activeHeading === id
                              ? "text-[var(--orange)] font-medium"
                              : "text-gray-400 hover:text-white"
                            }`}
                        >
                          {text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article meta */}
              <div className="bg-[var(--bg-1)] border border-white/5 rounded-2xl p-5 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
                  Article Info
                </p>
                <div className="space-y-3 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Published</span>
                    <span className="text-white">{formatDate(post.publishedAt || post.createdAt)}</span>
                  </div>
                  {post.updatedAt && (
                    <div className="flex justify-between">
                      <span>Updated</span>
                      <span className="text-white">{formatDate(post.updatedAt)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Read time</span>
                    <span className="text-white">{readTime} min</span>
                  </div>
                  {post.category && (
                    <div className="flex justify-between">
                      <span>Category</span>
                      <span className="text-[var(--orange)]">{post.category}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* newsletter mini */}
              <div className="bg-gradient-to-br from-[var(--teal)]/20 to-[var(--bg-1)] border border-[var(--teal)]/30 rounded-2xl p-5">
                <p className="text-sm font-semibold mb-1">Stay updated</p>
                <p className="text-xs text-gray-400 mb-4">Get the latest OPM news in your inbox.</p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[var(--bg-0)] border border-white/10 text-white text-xs placeholder-gray-500 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-[var(--teal)]/60 transition"
                />
                <button className="w-full bg-[var(--teal)] hover:bg-[#0a47b0] text-white text-xs font-semibold py-2 rounded-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* ══════════════ RELATED ══════════════ */}
        {related.length > 0 && (
          <section className="border-t border-white/5 bg-[var(--bg-0)]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)]">Related Articles</h3>
                  <p className="text-gray-400 text-sm mt-1">More stories you might enjoy</p>
                </div>
                <Link
                  to="/newsroom"
                  className="text-sm text-[var(--orange)] hover:text-white transition flex items-center gap-1"
                >
                  View all
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((item) => (
                  <RelatedCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* hero zoom keyframe */}
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.05); }
          to { transform: scale(1); }
        }
      `}</style>
    </>
  );
}