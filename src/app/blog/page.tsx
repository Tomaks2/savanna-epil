"use client";

import Link from 'next/link';
import { useState } from 'react';
import { blogPosts } from '@/lib/blog-posts';
import { MessageCircle, Phone } from 'lucide-react';

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#FCFAFA',
        paddingBottom: '100px',
        color: '#3A3331',
      }}
    >
      {/* ── HEADER NAV ── */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 40px',
          borderBottom: '1px solid rgba(58,51,49,0.06)',
          background: 'rgba(252,250,250,0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: '24px',
            fontWeight: 600,
            color: '#3A3331',
            textDecoration: 'none',
            letterSpacing: '1px',
            textTransform: 'uppercase',
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
            color: 'rgba(58,51,49,0.6)',
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
          padding: '100px 24px 60px',
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
            color: '#C19B86',
            border: '1px solid rgba(193,155,134,0.4)',
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
            fontSize: 'clamp(40px, 6vw, 82px)',
            fontWeight: 300,
            color: '#3A3331',
            lineHeight: 1.1,
            letterSpacing: '-0.5px',
            marginBottom: '24px',
          }}
        >
          Корисно та{' '}
          <em style={{ fontStyle: 'italic', color: '#C19B86' }}>по суті</em>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: '16px',
            color: 'rgba(58,51,49,0.7)',
            maxWidth: '520px',
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
          <div style={{ width: '60px', height: '1px', background: 'rgba(193,155,134,0.3)' }} />
          <span style={{ color: '#C19B86', fontSize: '14px' }}>✦</span>
          <div style={{ width: '60px', height: '1px', background: 'rgba(193,155,134,0.3)' }} />
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none', width: '100%', maxWidth: '400px' }}
          >
            <article
              className="blog-card"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(193,155,134,0.15)',
                borderRadius: '24px',
                padding: '40px 36px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Category + Read time */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase' as const,
                    color: '#C19B86',
                    background: '#F2EBE5',
                    padding: '5px 14px',
                    borderRadius: '100px',
                  }}
                >
                  {post.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: '11px',
                    color: 'rgba(58,51,49,0.4)',
                    fontWeight: 300,
                  }}
                >
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: '28px',
                  fontWeight: 500,
                  color: '#3A3331',
                  lineHeight: 1.3,
                  marginBottom: '16px',
                }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: '14.5px',
                  color: 'rgba(58,51,49,0.6)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                  marginBottom: '32px',
                  flexGrow: 1,
                }}
              >
                {post.excerpt}
              </p>

              {/* CTA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: "var(--font-montserrat)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase' as const,
                  color: '#C19B86',
                  marginTop: 'auto',
                }}
              >
                Читати далі <span style={{ fontSize: '16px' }}>→</span>
              </div>
            </article>
          </Link>
        ))}
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          textAlign: 'center',
          padding: '120px 24px 40px',
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: '26px',
            fontStyle: 'italic',
            color: 'rgba(58,51,49,0.8)',
            marginBottom: '32px',
          }}
        >
          Маєте питання? Я відповім особисто.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'inline-block',
            fontFamily: "var(--font-montserrat)",
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '2.5px',
            textTransform: 'uppercase' as const,
            color: '#ffffff',
            background: '#DABCAE',
            padding: '18px 48px',
            borderRadius: '100px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(218,188,174,0.3)',
          }}
        >
          Записатися на консультацію
        </button>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div 
            style={{ position: 'absolute', inset: 0, background: 'rgba(58,51,49,0.4)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div style={{ position: 'relative', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', width: '100%', maxWidth: '448px', borderRadius: '32px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid white' }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', opacity: 0.5 }}
            >
              ✕
            </button>
            <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: '28px', marginBottom: '8px', textAlign: 'center', color: '#3A3331' }}>Зв'яжіться з нами</h3>
            <p style={{ textAlign: 'center', fontSize: '14px', opacity: 0.7, marginBottom: '32px', fontWeight: 300 }}>Оберіть найзручніший спосіб для запису або консультації</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="https://www.instagram.com/epil.room.poltava?igsh=ZHdhMXZ3bGk3eTZ4" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '16px', background: 'linear-gradient(to right, #faf5ff, #fdf2f8)', textDecoration: 'none', border: '1px solid #fce7f3' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <span style={{ fontWeight: 500, color: '#3A3331' }}>Instagram Direct</span>
              </a>
              
              <a href="https://t.me/toma0787" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '16px', background: '#eff6ff', textDecoration: 'none', border: '1px solid #dbeafe' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <MessageCircle size={20} />
                </div>
                <span style={{ fontWeight: 500, color: '#3A3331' }}>Telegram</span>
              </a>

              <a href="viber://chat?number=%2B380959072684" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '16px', background: '#f5f3ff', textDecoration: 'none', border: '1px solid #ede9fe' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <MessageCircle size={20} />
                </div>
                <span style={{ fontWeight: 500, color: '#3A3331' }}>Viber</span>
              </a>

              <a href="tel:+380959072684" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '16px', background: '#f9fafb', textDecoration: 'none', border: '1px solid #f3f4f6' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <Phone size={20} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 500, color: '#3A3331' }}>Зателефонувати</span>
                  <span style={{ fontSize: '12px', opacity: 0.6 }}>095 907 26 84</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
