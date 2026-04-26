import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

export const metadata = {
  title: 'Блог | Savanna Epil Room',
  description: 'Корисні статті про електроепіляцію, догляд за шкірою та вибір між методами видалення волосся.',
};

export default function BlogPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1209 50%, #0a0a0a 100%)',
        paddingBottom: '80px',
      }}
    >
      {/* ── HEADER NAV ── */}
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
          href="/"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: 'rgba(232,213,176,0.6)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
        >
          ← На головну
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          textAlign: 'center',
          padding: '80px 24px 60px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            fontFamily: "var(--font-montserrat)",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '4px',
            textTransform: 'uppercase' as const,
            color: '#c9a96e',
            border: '1px solid rgba(201,169,110,0.4)',
            padding: '6px 20px',
            borderRadius: '2px',
            marginBottom: '28px',
          }}
        >
          Блог
        </div>

        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 300,
            color: '#f0e6d0',
            lineHeight: 1.1,
            letterSpacing: '-0.5px',
            marginBottom: '20px',
          }}
        >
          Корисно та{' '}
          <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>по суті</em>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: '15px',
            color: 'rgba(240,230,208,0.55)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          Статті про електроепіляцію, вибір методів та догляд за шкірою — без води та маркетингу.
        </p>

        {/* Decorative line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '52px',
          }}
        >
          <div style={{ width: '60px', height: '1px', background: 'rgba(201,169,110,0.3)' }} />
          <span style={{ color: '#c9a96e', fontSize: '14px' }}>✦</span>
          <div style={{ width: '60px', height: '1px', background: 'rgba(201,169,110,0.3)' }} />
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px',
        }}
      >
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <article
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                padding: '36px 32px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(201,169,110,0.06)';
                el.style.borderColor = 'rgba(201,169,110,0.3)';
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(255,255,255,0.03)';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* Glow accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
                  opacity: 0.6,
                }}
              />

              {/* Category + Read time */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
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
                    padding: '4px 12px',
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

              {/* Title */}
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '24px',
                  fontWeight: 500,
                  color: '#f0e6d0',
                  lineHeight: 1.3,
                  marginBottom: '14px',
                }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: '13.5px',
                  color: 'rgba(240,230,208,0.5)',
                  lineHeight: 1.75,
                  fontWeight: 300,
                  marginBottom: '28px',
                }}
              >
                {post.excerpt}
              </p>

              {/* CTA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "var(--font-montserrat)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase' as const,
                  color: '#c9a96e',
                }}
              >
                Читати далі <span style={{ fontSize: '14px' }}>→</span>
              </div>
            </article>
          </Link>
        ))}
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          textAlign: 'center',
          padding: '80px 24px 0',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '22px',
            fontStyle: 'italic',
            color: 'rgba(240,230,208,0.6)',
            marginBottom: '24px',
          }}
        >
          Маєте питання? Я відповім особисто.
        </p>
        <Link
          href="/#contact"
          style={{
            display: 'inline-block',
            fontFamily: "var(--font-montserrat)",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '2.5px',
            textTransform: 'uppercase' as const,
            color: '#0a0a0a',
            background: 'linear-gradient(135deg, #c9a96e, #e8d5b0)',
            padding: '16px 40px',
            borderRadius: '2px',
            textDecoration: 'none',
          }}
        >
          Записатися на консультацію
        </Link>
      </section>
    </main>
  );
}
