"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
 // Assuming SEO exists, if not we might need to remove this too

/* ─── tiny helpers ─────────────────────────────────────────────────── */
const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const CATEGORIES = ["All", "Press Release", "Announcement", "Insight", "Event"];

/* ─── Skeleton card ─────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-[var(--bg-1)] rounded-2xl overflow-hidden animate-pulse">
      <div className="h-[200px] bg-[var(--bg-2)]" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 bg-[var(--bg-2)] rounded" />
        <div className="h-4 w-full bg-[var(--bg-2)] rounded" />
        <div className="h-4 w-4/5 bg-[var(--bg-2)] rounded" />
        <div className="h-3 w-1/4 bg-[var(--bg-2)] rounded mt-4" />
      </div>
    </div>
  );
}

/* ─── News card ─────────────────────────────────────────────────────── */
function NewsCard({ item, featured = false }) {
  if (featured) {
    return (
      <Link
        to={`/newsroom/${item.slug}`}
        className="group col-span-1 sm:col-span-2 lg:col-span-2 relative rounded-2xl overflow-hidden block h-[420px]"
      >
        <img
          loading="lazy"
          src={item.featuredImageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-0)] via-black/50 to-transparent" />

        {/* category badge */}
        {item.category && (
          <span className="absolute top-4 left-4 text-[11px] font-semibold uppercase tracking-widest bg-[var(--teal)] text-white px-3 py-1 rounded-full">
            {item.category}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-7">
          <p className="text-[var(--orange)] text-xs font-medium mb-2 uppercase tracking-wider">
            Featured
          </p>
          <h2 className="text-white text-2xl font-bold font-[family-name:var(--font-display)] leading-tight mb-3 group-hover:text-[var(--orange)] transition">
            {item.title}
          </h2>
          {item.summary && (
            <p className="text-gray-300 text-sm line-clamp-2 mb-4">{item.summary}</p>
          )}
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <span>{item.author || "OPM Editorial"}</span>
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span>{formatDate(item.publishedAt || item.createdAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/newsroom/${item.slug}`}
      className="group bg-[var(--bg-1)] hover:bg-[var(--bg-1)] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(12,85,204,0.15)] border border-transparent hover:border-[var(--teal)]/20"
    >
      {/* image */}
      <div className="relative h-[200px] overflow-hidden">
        <img
          loading="lazy"
          src={item.featuredImageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {item.category && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest bg-black/60 backdrop-blur-sm text-[var(--orange)] border border-[var(--teal)]/30 px-2.5 py-1 rounded-full">
            {item.category}
          </span>
        )}
      </div>

      {/* body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white text-sm font-semibold leading-snug group-hover:text-[var(--orange)] transition line-clamp-3 mb-3 flex-1">
          {item.title}
        </h3>
        {item.summary && (
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
            {item.summary}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="text-gray-500 text-xs">
            {formatDate(item.publishedAt || item.createdAt)}
          </span>
          <span className="text-[var(--orange)] text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
            Read more
            <svg className="w-3 h-3" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Newsroom component ───────────────────────────────────────── */
export default function Newsroom() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const loaderRef = useRef(null);

  useEffect(() => {
    fetchNews();
  }, []);

  /* infinite scroll via IntersectionObserver */
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisibleCount((n) => n + 8); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loading]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setFetchError("");
      // const res = await apiClient.get("/news");
      const mockData = [
        {
          _id: "1",
          slug: "auxosys-launches-ai",
          title: "AUXOSYS Launches New Enterprise AI Solution",
          summary: "Our latest product brings unparalleled AI capabilities to legacy enterprise systems, bridging the gap between old and new.",
          category: "Press Release",
          featuredImageUrl: "https://opmcorpimages.s3.ap-south-1.amazonaws.com/newsroom.jpg",
          publishedAt: Date.now() - 100000,
          author: "AUXOSYS Editorial"
        },
        {
          _id: "2",
          slug: "q3-earnings-report",
          title: "Q3 2026 Earnings Exceed Expectations",
          summary: "A stellar quarter fueled by our expanding cloud services division.",
          category: "Announcement",
          featuredImageUrl: "https://opmcorpimages.s3.ap-south-1.amazonaws.com/newsroom.jpg",
          publishedAt: Date.now() - 500000,
          author: "AUXOSYS Editorial"
        }
      ];
      setNews(mockData);
    } catch (err) {
      setFetchError(err.message || "Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = news.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchQ =
      !searchQuery ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const featuredItem = filtered[0];
  const restItems = filtered.slice(1, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <>
      

      <div className="bg-[var(--bg-0)] text-white min-h-screen">

        {/* ══════════════ HERO ══════════════ */}
        <section className="relative min-h-[500px] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://opmcorpimages.s3.ap-south-1.amazonaws.com/newsroom.jpg)",
            }}
          />
          {/* layered gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-0)] via-[var(--bg-0)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-0)] via-transparent to-transparent" />

          {/* animated grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(var(--orange) 1px,transparent 1px),linear-gradient(90deg,var(--orange) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
            <div className="inline-flex items-center gap-2 bg-[var(--teal)]/10 border border-[var(--teal)]/30 text-[var(--orange)] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)] animate-pulse" />
              Latest Updates
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight mb-5 max-w-2xl">
              OPM{" "}
              <span className="bg-gradient-to-r from-[var(--teal)] to-[var(--orange)] bg-clip-text text-transparent">
                Newsroom
              </span>
            </h1>
            <p className="text-gray-300 text-base lg:text-lg max-w-xl leading-relaxed">
              Driving high-impact journalism through innovation, integrity, and
              real-time storytelling — straight from the source.
            </p>

            {/* stats strip */}
            <div className="flex flex-wrap gap-8 mt-10">
              {[
                { label: "Articles Published", value: `${news.length}+` },
                { label: "Global Readers", value: "2M+" },
                { label: "Categories Covered", value: "12" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold font-[family-name:var(--font-display)] text-white">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FILTER BAR ══════════════ */}
        <div className="sticky top-0 z-30 bg-[var(--bg-0)]/90 backdrop-blur-md border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-center gap-4 justify-between">

            {/* categories */}
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(9); }}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${activeCategory === cat
                      ? "bg-[var(--teal)] border-[var(--teal)] text-white"
                      : "border-white/10 text-gray-400 hover:border-[var(--teal)]/50 hover:text-white"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500"
                fill="none" viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(9); }}
                className="bg-[var(--bg-1)] border border-white/10 text-white text-sm placeholder-gray-500 rounded-full pl-9 pr-4 py-1.5 w-56 focus:outline-none focus:border-[var(--teal)]/60 transition"
              />
            </div>
          </div>
        </div>

        {/* ══════════════ GRID ══════════════ */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-20">

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && fetchError && (
            <div className="text-center py-24 space-y-4">
              <p className="text-red-400 text-base">{fetchError}</p>
              <button
                onClick={fetchNews}
                className="text-sm text-[var(--orange)] underline underline-offset-4 hover:text-white transition"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !fetchError && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-400 text-base">No articles match your search.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-4 text-sm text-[var(--orange)] underline underline-offset-4 hover:text-white transition"
              >
                Clear filters
              </button>
            </div>
          )}

          {!loading && !fetchError && filtered.length > 0 && (
            <>
              {/* featured + 2 side cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {featuredItem && <NewsCard item={featuredItem} featured />}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {restItems.slice(0, 2).map((item) => (
                    <NewsCard key={item._id} item={item} />
                  ))}
                </div>
              </div>

              {/* rest of grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {restItems.slice(2).map((item) => (
                  <NewsCard key={item._id} item={item} />
                ))}
              </div>

              {/* infinite scroll sentinel */}
              {hasMore && (
                <div ref={loaderRef} className="flex justify-center py-12">
                  <div className="w-6 h-6 border-2 border-[var(--teal)] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
          )}
        </section>

        {/* ══════════════ NEWSLETTER STRIP ══════════════ */}
        <section className="border-t border-white/5 bg-[var(--bg-0)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-2">Stay in the loop</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                Get OPM's latest news and insights delivered straight to your inbox.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-3 w-full lg:w-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[var(--bg-1)] border border-white/10 text-white text-sm placeholder-gray-500 rounded-full px-5 py-3 flex-1 lg:w-72 focus:outline-none focus:border-[var(--teal)]/60 transition"
              />
              <button
                type="submit"
                className="bg-[var(--teal)] hover:bg-[#0a47b0] text-white text-sm font-semibold px-6 py-3 rounded-full transition whitespace-nowrap"
              >
                Subscribe →
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}