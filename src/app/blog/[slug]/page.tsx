import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, blogPosts, BlogSection } from '@/lib/blog-posts';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Savanna Blog`,
    description: post.excerpt,
  };
}

/* ─────────────────── SECTION RENDERERS ─────────────────── */

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case 'intro':
      return (
        <p
          key={idx}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: '17px',
            lineHeight: 1.9,
            color: 'rgba(240,230,208,0.75)',
            fontWeight: 300,
            marginBottom: '20px',
          }}
        >
          {section.data.text as string}
        </p>
      );

    case 'section': {
      const d = section.data as { number: string; title: string; text: string };
      return (
        <div key={idx} style={{ margin: '56px 0 28px' }}>
          <div
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              color: '#c9a96e',
              marginBottom: '10px',
            }}
          >
            Розділ {d.number}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 'clamp(22px, 3.5vw, 34px)',
              fontWeight: 500,
              color: '#f0e6d0',
              lineHeight: 1.2,
              marginBottom: '24px',
              paddingLeft: '20px',
              borderLeft: '3px solid #c9a96e',
            }}
          >
            {d.title}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '15.5px',
              lineHeight: 1.85,
              color: 'rgba(240,230,208,0.65)',
              fontWeight: 300,
            }}
          >
            {d.text}
          </p>
        </div>
      );
    }

    case 'pullquote': {
      const d = section.data as { text: string };
      return (
        <blockquote
          key={idx}
          style={{
            borderTop: '1px solid rgba(201,169,110,0.4)',
            borderBottom: '1px solid rgba(201,169,110,0.4)',
            padding: '32px 0',
            margin: '44px 0',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 'clamp(20px, 2.8vw, 28px)',
              fontStyle: 'italic',
              color: '#e8d5b0',
              lineHeight: 1.5,
              whiteSpace: 'pre-line',
            }}
          >
            {d.text}
          </p>
        </blockquote>
      );
    }

    case 'table': {
      const d = section.data as {
        headers: string[];
        rows: string[][];
        winnerCol: number;
        caption?: string;
      };
      return (
        <div key={idx} style={{ margin: '36px 0', overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: "var(--font-montserrat)",
              fontSize: '13.5px',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(8px)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr>
                {d.headers.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: '16px 18px',
                      textAlign: 'left',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      fontSize: '12px',
                      color: i === d.winnerCol ? '#c9a96e' : 'rgba(240,230,208,0.9)',
                      background: 'rgba(255,255,255,0.05)',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.rows.map((row, ri) => (
                <tr
                  key={ri}
                  style={{
                    borderBottom: ri < d.rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: '14px 18px',
                        color:
                          ci === d.winnerCol
                            ? '#c9a96e'
                            : ci === 0
                            ? 'rgba(240,230,208,0.85)'
                            : 'rgba(240,230,208,0.5)',
                        fontWeight: ci === d.winnerCol ? 600 : ci === 0 ? 500 : 300,
                        background: ci === d.winnerCol ? 'rgba(201,169,110,0.06)' : 'transparent',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {d.caption && (
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: '12px',
                color: 'rgba(240,230,208,0.3)',
                textAlign: 'center',
                marginTop: '10px',
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              {d.caption}
            </p>
          )}
        </div>
      );
    }

    case 'callout': {
      const d = section.data as { label: string; text: string };
      return (
        <div
          key={idx}
          style={{
            background: 'rgba(201,169,110,0.06)',
            border: '1px solid rgba(201,169,110,0.2)',
            borderLeft: '3px solid #c9a96e',
            padding: '24px 28px',
            borderRadius: '0 4px 4px 0',
            margin: '32px 0',
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase' as const,
              fontWeight: 600,
              color: '#c9a96e',
              marginBottom: '10px',
            }}
          >
            {d.label}
          </div>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '14.5px',
              color: 'rgba(240,230,208,0.75)',
              lineHeight: 1.75,
              fontWeight: 300,
              margin: 0,
            }}
          >
            {d.text}
          </p>
        </div>
      );
    }

    case 'timeline': {
      const d = section.data as { items: { label: string; text: string }[] };
      return (
        <div
          key={idx}
          style={{
            margin: '32px 0',
            paddingLeft: '28px',
            position: 'relative',
          }}
        >
          {/* vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '7px',
              top: '8px',
              bottom: '8px',
              width: '1px',
              background: 'linear-gradient(to bottom, #c9a96e, rgba(201,169,110,0.15))',
            }}
          />
          {d.items.map((item, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: '28px' }}>
              {/* dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-25px',
                  top: '6px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#c9a96e',
                  boxShadow: '0 0 8px rgba(201,169,110,0.5)',
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase' as const,
                  color: '#c9a96e',
                  marginBottom: '6px',
                }}
              >
                {item.label}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: '14.5px',
                  color: 'rgba(240,230,208,0.6)',
                  lineHeight: 1.75,
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      );
    }

    case 'numberedlist': {
      const d = section.data as { items: { title: string; text: string }[] };
      return (
        <ul key={idx} style={{ listStyle: 'none', margin: '24px 0', padding: 0 }}>
          {d.items.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '18px',
                alignItems: 'flex-start',
                marginBottom: '22px',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #c9a96e, #e8d5b0)',
                  color: '#0a0a0a',
                  fontFamily: "var(--font-cormorant)",
                  fontSize: '16px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '2px',
                  marginTop: '2px',
                }}
              >
                {i + 1}
              </div>
              <div>
                <strong
                  style={{
                    display: 'block',
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#f0e6d0',
                    marginBottom: '4px',
                    letterSpacing: '0.3px',
                  }}
                >
                  {item.title}
                </strong>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: '14px',
                    color: 'rgba(240,230,208,0.55)',
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  {item.text}
                </span>
              </div>
            </li>
          ))}
        </ul>
      );
    }

    case 'conclusion': {
      const d = section.data as { title: string; text: string };
      return (
        <div
          key={idx}
          style={{
            background: 'rgba(201,169,110,0.07)',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: '6px',
            padding: '44px 40px',
            margin: '52px 0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '28px',
              top: '16px',
              fontSize: '72px',
              color: 'rgba(201,169,110,0.08)',
              fontFamily: "var(--font-cormorant)",
              lineHeight: 1,
            }}
          >
            ✦
          </div>
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: 500,
              color: '#e8d5b0',
              marginBottom: '16px',
            }}
          >
            {d.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '15px',
              color: 'rgba(240,230,208,0.6)',
              lineHeight: 1.85,
              fontWeight: 300,
              margin: 0,
            }}
          >
            {d.text}
          </p>
        </div>
      );
    }

    case 'cta': {
      const d = section.data as {
        question: string;
        sub: string;
        buttonText: string;
        buttonHref: string;
      };
      return (
        <div
          key={idx}
          style={{
            textAlign: 'center',
            padding: '48px 0 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            margin: '0',
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              fontStyle: 'italic',
              color: '#f0e6d0',
              marginBottom: '14px',
            }}
          >
            {d.question}
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '13.5px',
              color: 'rgba(240,230,208,0.45)',
              marginBottom: '36px',
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            {d.sub}
          </p>
          <Link
            href={d.buttonHref}
            style={{
              display: 'inline-block',
              fontFamily: "var(--font-montserrat)",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '2.5px',
              textTransform: 'uppercase' as const,
              color: '#0a0a0a',
              background: 'linear-gradient(135deg, #c9a96e, #e8d5b0)',
              padding: '17px 44px',
              borderRadius: '2px',
              textDecoration: 'none',
            }}
          >
            {d.buttonText}
          </Link>
          <p
            style={{
              marginTop: '18px',
              fontFamily: "var(--font-montserrat)",
              fontSize: '12px',
              color: 'rgba(240,230,208,0.3)',
              fontWeight: 300,
            }}
          >
            Зробіть перший крок до гладкості, яка залишиться з вами назавжди.
          </p>
        </div>
      );
    }

    default:
      return null;
  }
}

/* ─────────────────── PAGE ─────────────────── */

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1209 50%, #0a0a0a 100%)',
        paddingBottom: '100px',
      }}
    >
      {/* ── NAV ── */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 40px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: '22px',
            fontWeight: 600,
            color: '#e8d5b0',
            textDecoration: 'none',
            letterSpacing: '1px',
          }}
        >
          Savanna
        </Link>
        <Link
          href="/blog"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: 'rgba(232,213,176,0.6)',
            textDecoration: 'none',
          }}
        >
          ← Всі статті
        </Link>
      </nav>

      {/* ── POST HEADER ── */}
      <header
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '64px 24px 40px',
          textAlign: 'center',
        }}
      >
        {/* Category + Read time */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '2.5px',
              textTransform: 'uppercase' as const,
              color: '#c9a96e',
              border: '1px solid rgba(201,169,110,0.35)',
              padding: '5px 14px',
              borderRadius: '2px',
            }}
          >
            {post.category}
          </span>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '11px',
              color: 'rgba(240,230,208,0.35)',
              fontWeight: 300,
            }}
          >
            {post.readTime}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 400,
            color: '#f0e6d0',
            lineHeight: 1.15,
            marginBottom: '20px',
            letterSpacing: '-0.3px',
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: '15px',
            color: 'rgba(240,230,208,0.45)',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1.7,
          }}
        >
          {post.subtitle}
        </p>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '44px',
          }}
        >
          <div style={{ width: '80px', height: '1px', background: 'rgba(201,169,110,0.25)' }} />
          <span style={{ color: '#c9a96e', fontSize: '12px' }}>✦</span>
          <div style={{ width: '80px', height: '1px', background: 'rgba(201,169,110,0.25)' }} />
        </div>
      </header>

      {/* ── POST BODY ── */}
      <article
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 24px 60px',
        }}
      >
        {post.content.map((section, idx) => renderSection(section, idx))}
      </article>
    </main>
  );
}
