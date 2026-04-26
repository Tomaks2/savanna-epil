import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://savanna-epil.vercel.app'),
  title: "Savanna | Електроепіляція Полтава та область | Видалення волосся назавжди",
  description: "Професійна студія електроепіляції Savanna в Полтаві. Гарантоване видалення волосся назавжди (100% результат). Дипломований майстер Тома, абсолютна стерильність (сухожар), без болю. Електроепіляція обличчя, бікіні, пахв. Приймаємо клієнтів з Полтави та Полтавської області.",
  keywords: [
    "електроепіляція полтава", "видалення волосся назавжди полтава", "епіляція полтава", "електро полтава", "epil room poltava", "savanna полтава", "майстер електроепіляції полтава", "тома полтава", "електроепіляція обличчя полтава", "електроепіляція бікіні полтава", "електроепіляція ціни полтава", "лазерна епіляція полтава альтернатива", "шугаринг полтава альтернатива", "електроепіляція полтавська область", "косметолог полтава", "видалення сивого волосся полтава", "видалення пушкового волосся", "стерильна епіляція полтава", "електро епіляція полтава", "назавжди видалити волосся", "електроепілог полтава"
  ],
  authors: [{ name: "Майстер Тома" }],
  creator: "Savanna Epil Room Poltava",
  publisher: "Savanna Epil Room Poltava",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Savanna | Електроепіляція Полтава | Видалення волосся назавжди",
    description: "Професійна студія електроепіляції Savanna в Полтаві. Гарантоване видалення волосся назавжди (100% результат). Безпечно, стерильно, назавжди.",
    url: "https://savanna-epil.vercel.app",
    siteName: "Savanna Epil Room Poltava",
    locale: "uk_UA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://savanna-epil.vercel.app",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  verification: {
    google: "DAvUsi8wbakBT6_pfJi2SrWJy6d9i4T6yZoT_0MNPas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${cormorant.variable} ${montserrat.variable} h-full scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', e => e.preventDefault());
              document.addEventListener('keydown', e => {
                if (
                  (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's')) || 
                  e.key === 'F12' || 
                  (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
                ) {
                  e.preventDefault();
                }
              });
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthAndBeautyBusiness",
              "name": "Savanna Epil Room",
              "image": "https://savanna-epil.vercel.app/about.jpg",
              "@id": "https://savanna-epil.vercel.app",
              "url": "https://savanna-epil.vercel.app",
              "telephone": "+380959072684",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "вул. Соборності, 66",
                "addressLocality": "Полтава",
                "postalCode": "36000",
                "addressCountry": "UA",
                "addressRegion": "Полтавська область"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 49.5843477,
                "longitude": 34.5204481
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "09:00",
                "closes": "20:00"
              },
              "sameAs": [
                "https://www.instagram.com/epil.room.poltava"
              ]
            })
          }}
        />
      </head>
      <body className="font-body min-h-full flex flex-col antialiased relative">
        {/* Global Background Image */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-epil-bg)]/40 via-[var(--color-epil-bg)]/60 to-[var(--color-epil-bg)]"></div>
        </div>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
