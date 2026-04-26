"use client";

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, use, useEffect } from 'react';
import { getPostBySlug, blogPosts, BlogSection } from '@/lib/blog-posts';
import { MessageCircle, Phone, X } from 'lucide-react';

/* ─────────────────── SECTION RENDERERS ─────────────────── */

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case 'intro':
      return (
        <p
          key={idx}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: '18px',
            lineHeight: 1.9,
            color: 'rgba(58,51,49,0.85)',
            fontWeight: 400,
            marginBottom: '28px',
          }}
        >
          {section.data.text as string}
        </p>
      );

    case 'section': {
      const d = section.data as { number: string; title: string; text: string };
      return (
        <div key={idx} style={{ margin: '64px 0 32px' }}>
          <div
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              color: '#C19B86',
              marginBottom: '12px',
            }}
          >
            Розділ {d.number}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 'clamp(24px, 4vw, 38px)',
              fontWeight: 500,
              color: '#3A3331',
              lineHeight: 1.2,
              marginBottom: '28px',
              paddingLeft: '24px',
              borderLeft: '4px solid #DABCAE',
            }}
          >
            {d.title}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '16.5px',
              lineHeight: 1.85,
              color: 'rgba(58,51,49,0.95)',
              fontWeight: 400,
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
            borderTop: '1px solid rgba(193,155,134,0.3)',
            borderBottom: '1px solid rgba(193,155,134,0.3)',
            padding: '40px 0',
            margin: '56px 0',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontStyle: 'italic',
              color: '#C19B86',
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
        <div key={idx} style={{ margin: '48px 0', overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: "var(--font-montserrat)",
              fontSize: '14px',
              background: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              border: '1px solid rgba(193,155,134,0.1)',
            }}
          >
            <thead>
              <tr>
                {d.headers.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: '20px 24px',
                      textAlign: 'left',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      color: i === d.winnerCol ? '#C19B86' : 'rgba(58,51,49,0.9)',
                      background: '#F2EBE5',
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
                    borderBottom: ri < d.rows.length - 1 ? '1px solid rgba(193,155,134,0.05)' : 'none',
                  }}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: '18px 24px',
                        color:
                          ci === d.winnerCol
                            ? '#C19B86'
                            : ci === 0
                            ? '#3A3331'
                            : 'rgba(58,51,49,0.6)',
                        fontWeight: ci === d.winnerCol ? 600 : ci === 0 ? 500 : 300,
                        background: ci === d.winnerCol ? 'rgba(193,155,134,0.03)' : 'transparent',
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
                color: 'rgba(58,51,49,0.4)',
                textAlign: 'center',
                marginTop: '16px',
                fontStyle: 'italic',
                fontWeight: 400,
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
            background: '#F2EBE5',
            borderLeft: '4px solid #DABCAE',
            padding: '28px 32px',
            borderRadius: '0 16px 16px 0',
            margin: '40px 0',
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase' as const,
              fontWeight: 600,
              color: '#C19B86',
              marginBottom: '12px',
            }}
          >
            {d.label}
          </div>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '15.5px',
              color: '#3A3331',
              lineHeight: 1.75,
              fontWeight: 400,
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
            margin: '40px 0',
            paddingLeft: '32px',
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
              background: 'linear-gradient(to bottom, #DABCAE, rgba(218,188,174,0.15))',
            }}
          />
          {d.items.map((item, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: '32px' }}>
              {/* dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-29px',
                  top: '6px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#DABCAE',
                  boxShadow: '0 0 10px rgba(218,188,174,0.3)',
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase' as const,
                  color: '#C19B86',
                  marginBottom: '8px',
                }}
              >
                {item.label}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: '15px',
                  color: 'rgba(58,51,49,0.7)',
                  lineHeight: 1.75,
                  fontWeight: 400,
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
        <ul key={idx} style={{ listStyle: 'none', margin: '32px 0', padding: 0 }}>
          {d.items.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '36px',
                  height: '36px',
                  background: '#DABCAE',
                  color: '#ffffff',
                  fontFamily: "var(--font-cormorant)",
                  fontSize: '18px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
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
                    fontSize: '15px',
                    color: '#3A3331',
                    marginBottom: '6px',
                    letterSpacing: '0.3px',
                  }}
                >
                  {item.title}
                </strong>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: '15px',
                    color: 'rgba(58,51,49,0.85)',
                    lineHeight: 1.75,
                    fontWeight: 400,
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
            background: '#ffffff',
            border: '1px solid rgba(193,155,134,0.2)',
            borderRadius: '24px',
            padding: '48px 40px',
            margin: '64px 0',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '32px',
              top: '24px',
              fontSize: '80px',
              color: 'rgba(193,155,134,0.1)',
              fontFamily: "var(--font-cormorant)",
              lineHeight: 1,
            }}
          >
            ✦
          </div>
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 500,
              color: '#3A3331',
              marginBottom: '20px',
            }}
          >
            {d.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '16px',
              color: 'rgba(58,51,49,0.7)',
              lineHeight: 1.85,
              fontWeight: 400,
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
      return null; // We handle global CTA below for consistency
    }

    default:
      return null;
  }
}

/* ─────────────────── PAGE ─────────────────── */

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'transparent',
        paddingBottom: '120px',
        color: '#3A3331',
      }}
    >
      {/* ── NAV ── */}
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
          href="/blog"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: 'rgba(58,51,49,0.6)',
            textDecoration: 'none',
          }}
        >
          ← Всі статті
        </Link>
      </nav>

      {/* ── POST HEADER ── */}
      <header
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '80px 24px 48px',
          textAlign: 'center',
        }}
      >
        {/* Category + Read time */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '32px',
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
              padding: '6px 16px',
              borderRadius: '100px',
            }}
          >
            {post.category}
          </span>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '12px',
              color: 'rgba(58,51,49,0.4)',
              fontWeight: 400,
            }}
          >
            {post.readTime}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: 400,
            color: '#3A3331',
            lineHeight: 1.1,
            marginBottom: '28px',
            letterSpacing: '-0.5px',
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: '17px',
            color: 'rgba(58,51,49,0.7)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto',
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
            gap: '20px',
            marginTop: '56px',
          }}
        >
          <div style={{ width: '100px', height: '1px', background: 'rgba(193,155,134,0.2)' }} />
          <span style={{ color: '#C19B86', fontSize: '14px' }}>✦</span>
          <div style={{ width: '100px', height: '1px', background: 'rgba(193,155,134,0.2)' }} />
        </div>
      </header>

      {/* ── POST BODY ── */}
      <article
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}
      >
        {post.content.map((section, idx) => renderSection(section, idx))}

        {/* ── CUSTOM BOTTOM CTA ── */}
        <div
          style={{
            textAlign: 'center',
            padding: '64px 0 0',
            borderTop: '1px solid rgba(58,51,49,0.06)',
            marginTop: '40px',
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 'clamp(24px, 3vw, 30px)',
              fontStyle: 'italic',
              color: '#3A3331',
              marginBottom: '16px',
            }}
          >
            Зробіть перший крок до гладкості назавжди
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: '14.5px',
              color: 'rgba(58,51,49,0.7)',
              marginBottom: '40px',
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            Я з радістю проконсультую вас і відповім на всі питання особисто.
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
        </div>
      </article>

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
