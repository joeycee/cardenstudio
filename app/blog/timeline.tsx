"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BlogPost } from "@/types/api";

type Props = { posts: BlogPost[] };

function formatTimestamp(dateStr?: string | null) {
  if (!dateStr) return { full: "—", year: "——", month: "———", day: "——" };
  const d = new Date(dateStr);
  return {
    full: d.toLocaleDateString("en-NZ", { year: "numeric", month: "long", day: "numeric" }),
    year: d.getFullYear().toString(),
    month: d.toLocaleDateString("en-NZ", { month: "short" }).toUpperCase(),
    day: d.getDate().toString().padStart(2, "0"),
  };
}

function getIndex(i: number) {
  return (i + 1).toString().padStart(3, "0");
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function TimelineEntry({ post, index }: { post: BlogPost; index: number }) {
  const { ref, visible } = useReveal();
  const ts = formatTimestamp(post.published_at ?? post.created_at);
  const excerpt = post.excerpt ?? "";

  return (
    <div
      ref={ref}
      className="tml-entry"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
      }}
    >
      <div className="tml-node-wrap">
        <div className="tml-node-ring" />
        <div className="tml-node-dot" />
      </div>

      <div className="tml-date">
        <span className="tml-date-day">{ts.day}</span>
        <span className="tml-date-month">{ts.month}</span>
        <span className="tml-date-year">{ts.year}</span>
      </div>

      <Link href={`/blog/${post.slug}`} className="tml-card">
        <div className="tml-card-inner">
          <div className="tml-card-top">
            <span className="tml-index">#{getIndex(index)}</span>
            <span className="tml-tag">Article</span>
          </div>

          <h2 className="tml-title">{post.title}</h2>

          {excerpt ? <p className="tml-excerpt">{excerpt}</p> : null}

          <div className="tml-footer">
            <span className="tml-cta">
              Read article
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2 6h8M6.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="tml-full-date">{ts.full}</span>
          </div>
        </div>

        <div className="tml-scan" aria-hidden />
      </Link>
    </div>
  );
}

export function BlogTimeline({ posts }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{css}</style>

      <section className="tml-root">
        <div className="tml-bg-grid" aria-hidden />

        <div className="tml-wrap">
          <div ref={headerRef} className="tml-header">
            <div className="tml-header-meta">
              <span className="tml-header-label">TRANSMISSION LOG</span>
              <span className="tml-header-count">
                {posts.length.toString().padStart(2, "0")} ENTRIES
              </span>
            </div>
            <h1 className="tml-header-title">Blog</h1>
            <p className="tml-header-desc">
              Writing on web development, positioning, and building a stronger online presence.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="tml-track">
              <div className="tml-line" aria-hidden>
                <div className="tml-line-glow" />
              </div>

              {posts.map((post, i) => (
                <TimelineEntry key={post.id} post={post} index={i} />
              ))}

              <div className="tml-end" aria-hidden>
                <div className="tml-end-dot" />
                <span className="tml-end-label">END OF LOG</span>
              </div>
            </div>
          ) : (
            <div className="tml-empty">
              <div className="tml-empty-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="26"
                    height="26"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M9 14h10M9 10h6M9 18h4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="tml-empty-text">No transmissions yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

  .tml-root {
    position: relative;
    min-height: 100vh;
    padding: 5rem 0 8rem;
    background: var(--color-background, #0a0c0f);
    color: var(--color-ink, #e8e6e0);
    overflow: hidden;
  }
  .tml-bg-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }
  .tml-wrap {
    position: relative;
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .tml-header {
    margin-bottom: 4.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .tml-header-meta {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.25rem;
  }
  .tml-header-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.25em;
    color: #4ade80;
    padding: 0.25rem 0.6rem;
    border: 1px solid rgba(74,222,128,0.25);
    border-radius: 3px;
    background: rgba(74,222,128,0.05);
  }
  .tml-header-count {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    color: rgba(255,255,255,0.25);
  }
  .tml-header-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    color: #f0ede6;
    margin: 0 0 1rem;
  }
  .tml-header-desc {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8125rem;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(255,255,255,0.35);
    max-width: 38rem;
    margin: 0;
  }

  .tml-track {
    position: relative;
    padding-left: 7rem;
  }
  @media (max-width: 600px) { .tml-track { padding-left: 2.5rem; } }

  .tml-line {
    position: absolute;
    left: 3.6rem;
    top: 0.5rem;
    bottom: 2rem;
    width: 1px;
    background: rgba(255,255,255,0.07);
  }
  @media (max-width: 600px) { .tml-line { left: 0.7rem; } }
  .tml-line-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, #4ade80 0%, rgba(74,222,128,0.2) 30%, transparent 70%);
    animation: tml-drip 4s ease-in-out infinite;
  }
  @keyframes tml-drip {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    80% { opacity: 0.6; }
    100% { transform: translateY(200%); opacity: 0; }
  }

  .tml-entry {
    position: relative;
    margin-bottom: 2.5rem;
  }
  .tml-node-wrap {
    position: absolute;
    left: -3.85rem;
    top: 1.4rem;
    width: 10px;
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 600px) { .tml-node-wrap { left: -0.95rem; } }
  .tml-node-ring {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(74,222,128,0.2);
    transition: border-color 0.25s, transform 0.25s;
  }
  .tml-node-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 8px rgba(74,222,128,0.6);
    flex-shrink: 0;
    transition: box-shadow 0.25s;
  }
  .tml-entry:hover .tml-node-ring { border-color: rgba(74,222,128,0.6); transform: scale(1.3); }
  .tml-entry:hover .tml-node-dot { box-shadow: 0 0 14px rgba(74,222,128,0.9); }

  .tml-date {
    display: none;
    position: absolute;
    left: -7rem;
    top: 1rem;
    width: 2.6rem;
    text-align: right;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.05rem;
  }
  @media (min-width: 601px) { .tml-date { display: flex; } }
  .tml-date-day { font-family: 'IBM Plex Mono', monospace; font-size: 1.1rem; font-weight: 500; color: rgba(255,255,255,0.7); line-height: 1; }
  .tml-date-month { font-family: 'IBM Plex Mono', monospace; font-size: 0.55rem; font-weight: 400; letter-spacing: 0.1em; color: #4ade80; line-height: 1; }
  .tml-date-year { font-family: 'IBM Plex Mono', monospace; font-size: 0.55rem; color: rgba(255,255,255,0.2); letter-spacing: 0.05em; line-height: 1; }

  .tml-card {
    position: relative;
    display: block;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 0.75rem;
    background: rgba(255,255,255,0.025);
    overflow: hidden;
    transition: border-color 0.25s, background 0.25s, transform 0.25s;
  }
  .tml-card:hover {
    border-color: rgba(74,222,128,0.2);
    background: rgba(74,222,128,0.03);
    transform: translateX(4px);
  }
  .tml-card-inner { padding: 1.5rem 1.75rem; position: relative; z-index: 1; }

  .tml-card-top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.85rem; }
  .tml-index {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    font-weight: 500;
    color: rgba(255,255,255,0.18);
    letter-spacing: 0.08em;
  }
  .tml-tag {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4ade80;
    padding: 0.18rem 0.5rem;
    border: 1px solid rgba(74,222,128,0.2);
    border-radius: 3px;
    background: rgba(74,222,128,0.05);
  }
  .tml-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #f0ede6;
    margin: 0 0 0.65rem;
    line-height: 1.3;
    transition: color 0.2s;
  }
  .tml-card:hover .tml-title { color: #ffffff; }
  .tml-excerpt {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255,255,255,0.35);
    margin: 0 0 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .tml-footer { display: flex; align-items: center; justify-content: space-between; }
  .tml-cta {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    font-weight: 500;
    color: #4ade80;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    letter-spacing: 0.04em;
    transition: gap 0.2s;
  }
  .tml-card:hover .tml-cta { gap: 0.65rem; }
  .tml-full-date {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    color: rgba(255,255,255,0.15);
    letter-spacing: 0.05em;
  }
  @media (min-width: 601px) { .tml-full-date { display: none; } }

  .tml-scan {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(74,222,128,0.03) 50%, transparent 100%);
    transform: translateY(-100%);
    pointer-events: none;
  }
  .tml-card:hover .tml-scan {
    transform: translateY(100%);
    transition: transform 0.7s ease;
  }

  .tml-end { display: flex; align-items: center; gap: 1rem; padding-top: 0.5rem; }
  .tml-end-dot {
    position: absolute;
    left: -3.9rem;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.12);
  }
  @media (max-width: 600px) { .tml-end-dot { left: -1rem; } }
  .tml-end-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    color: rgba(255,255,255,0.12);
  }

  .tml-empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 3rem 0;
    color: rgba(255,255,255,0.2);
  }
  .tml-empty-text {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8125rem;
    letter-spacing: 0.08em;
  }
`;
