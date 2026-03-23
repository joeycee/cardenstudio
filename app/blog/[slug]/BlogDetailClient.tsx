"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { BlogPost } from "@/types/api";

type Props = {
  post: BlogPost;
  imageUrl: string | null;
  publishedDate: string | null;
};

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;

    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);

    return () => clearTimeout(t);
  }, [delay]);

  return ref;
}

function Block({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const ref = useFadeIn(delay);
  return <div ref={ref} className={className}>{children}</div>;
}

export function BlogDetailClient({ post, imageUrl, publishedDate }: Props) {
  return (
    <>
      <style>{css}</style>

      <article className="bdp-root">
        <div className="bdp-bg-grid" aria-hidden />

        <div className="bdp-wrap">
          <Block delay={0} className="bdp-back-wrap">
            <Link href="/blog" className="bdp-back">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M9 2L4 7L9 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Transmission log
            </Link>
          </Block>

          <Block delay={80} className="bdp-meta-row">
            <span className="bdp-eyebrow">JOURNAL</span>
          </Block>

          <Block delay={140}>
            <h1 className="bdp-title">{post.title}</h1>
          </Block>

          <Block delay={200} className="bdp-sub-row">
            {publishedDate ? (
              <div className="bdp-datestamp">
                <span className="bdp-datestamp-label">PUBLISHED</span>
                <span className="bdp-datestamp-value">{publishedDate}</span>
              </div>
            ) : null}
            {post.excerpt ? <p className="bdp-excerpt">{post.excerpt}</p> : null}
          </Block>

          <Block delay={260} className="bdp-divider-wrap">
            <div className="bdp-divider">
              <div className="bdp-divider-glow" aria-hidden />
            </div>
          </Block>

          {imageUrl ? (
            <Block delay={300} className="bdp-image-wrap">
              <div className="bdp-image-inner">
                <img alt={post.title} src={imageUrl} className="bdp-image" />
                <div className="bdp-image-overlay" aria-hidden />
              </div>
            </Block>
          ) : null}

          <Block delay={360} className="bdp-content-wrap">
            <div className="bdp-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          </Block>

          <Block delay={400} className="bdp-footer">
            <div className="bdp-footer-line" aria-hidden />
            <div className="bdp-footer-inner">
              <span className="bdp-footer-label">END OF TRANSMISSION</span>
              <Link href="/blog" className="bdp-footer-back">
                Back to log
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M2 6h8M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </Block>
        </div>
      </article>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Serif:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  .bdp-root {
    position: relative;
    min-height: 100vh;
    padding: 5rem 0 8rem;
    background: var(--color-background, #0a0c0f);
    color: var(--color-ink, #e8e6e0);
    overflow: hidden;
  }
  .bdp-bg-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }
  .bdp-wrap {
    position: relative;
    max-width: 48rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .bdp-back-wrap { margin-bottom: 3rem; }
  .bdp-back {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.3);
    text-decoration: none;
    transition: color 0.2s, gap 0.2s;
  }
  .bdp-back:hover { color: #4ade80; gap: 0.25rem; }
  .bdp-back svg { flex-shrink: 0; }

  .bdp-meta-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }
  .bdp-eyebrow {
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

  .bdp-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.07;
    color: #f0ede6;
    margin: 0 0 2rem;
  }

  .bdp-sub-row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2.5rem;
    align-items: start;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 560px) { .bdp-sub-row { grid-template-columns: 1fr; gap: 1rem; } }

  .bdp-datestamp {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-top: 0.2rem;
    min-width: 7rem;
  }
  .bdp-datestamp-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: #4ade80;
    line-height: 1;
  }
  .bdp-datestamp-value {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.4;
  }

  .bdp-excerpt {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8125rem;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255,255,255,0.38);
    margin: 0;
    border-left: 2px solid rgba(74,222,128,0.25);
    padding-left: 1.25rem;
  }

  .bdp-divider-wrap { margin-bottom: 2.5rem; }
  .bdp-divider {
    position: relative;
    height: 1px;
    background: rgba(255,255,255,0.06);
    overflow: hidden;
  }
  .bdp-divider-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent, #4ade80, transparent);
    animation: bdp-sweep 3s ease-in-out infinite;
  }
  @keyframes bdp-sweep {
    0% { transform: translateX(-100%); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 0.6; }
    100% { transform: translateX(100%); opacity: 0; }
  }

  .bdp-image-wrap { margin-bottom: 3.5rem; }
  .bdp-image-inner {
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
    border: 1px solid rgba(255,255,255,0.06);
    aspect-ratio: 16/9;
  }
  .bdp-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }
  .bdp-image-inner:hover .bdp-image { transform: scale(1.02); }
  .bdp-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(10,12,15,0.5));
    pointer-events: none;
  }

  .bdp-content-wrap { margin-bottom: 5rem; }
  .bdp-content {
    font-family: 'IBM Plex Serif', serif;
    font-size: 1.0625rem;
    font-weight: 300;
    line-height: 1.9;
    color: rgba(232,230,224,0.82);
  }
  .bdp-content p { margin: 0 0 1.75rem; }
  .bdp-content p:last-child { margin-bottom: 0; }
  .bdp-content h2 {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #f0ede6;
    margin: 3rem 0 1.25rem;
  }
  .bdp-content h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #f0ede6;
    margin: 2.25rem 0 1rem;
  }
  .bdp-content a {
    color: #4ade80;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgba(74,222,128,0.35);
    transition: text-decoration-color 0.2s;
  }
  .bdp-content a:hover { text-decoration-color: #4ade80; }
  .bdp-content strong { color: #f0ede6; font-weight: 500; }
  .bdp-content em { font-style: italic; color: rgba(232,230,224,0.65); }
  .bdp-content blockquote {
    border-left: 2px solid rgba(74,222,128,0.35);
    padding: 0.25rem 0 0.25rem 1.5rem;
    margin: 2rem 0;
    color: rgba(232,230,224,0.5);
    font-style: italic;
  }
  .bdp-content code {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85em;
    color: #4ade80;
    background: rgba(74,222,128,0.07);
    padding: 0.15em 0.4em;
    border-radius: 3px;
    border: 1px solid rgba(74,222,128,0.12);
  }
  .bdp-content pre {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 0.5rem;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
  }
  .bdp-content pre code {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.8125rem;
    color: rgba(232,230,224,0.75);
  }
  .bdp-content ul, .bdp-content ol {
    padding-left: 1.5rem;
    margin: 0 0 1.75rem;
  }
  .bdp-content li { margin-bottom: 0.5rem; }
  .bdp-content hr {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin: 3rem 0;
  }
  .bdp-content img {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid rgba(255,255,255,0.06);
    margin: 2rem 0;
  }

  .bdp-footer-line {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin-bottom: 1.75rem;
  }
  .bdp-footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bdp-footer-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    color: rgba(255,255,255,0.12);
  }
  .bdp-footer-back {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    font-weight: 500;
    color: #4ade80;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    letter-spacing: 0.04em;
    transition: gap 0.2s, opacity 0.2s;
  }
  .bdp-footer-back:hover { gap: 0.65rem; opacity: 0.8; }
`;
