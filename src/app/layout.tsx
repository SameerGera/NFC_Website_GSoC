import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GSOCK ID",
  description: "Digital identity platform for GSOCK club members",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GSOCK ID",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-512.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#3B82F6",
};

const swScript = `
(function() {
  if (!('serviceWorker' in navigator)) return;

  var isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  if (isDev) {
    navigator.serviceWorker.getRegistrations().then(function(regs) {
      for (var i = 0; i < regs.length; i++) regs[i].unregister();
    });
    if ('caches' in window) {
      caches.keys().then(function(keys) {
        for (var i = 0; i < keys.length; i++) caches.delete(keys[i]);
      });
    }
  } else {
    navigator.serviceWorker.register('/sw.js').catch(function() {});
  }
})();
`.trim();

const errorRecoveryScript = `
(function() {
  var reloadKey = '__gsock_reloaded';
  window.addEventListener('error', function(e) {
    if (e.message && e.message.indexOf('ChunkLoadError') !== -1) {
      if (!sessionStorage.getItem(reloadKey)) {
        sessionStorage.setItem(reloadKey, '1');
        location.reload();
      }
    }
  });
  window.addEventListener('load', function() {
    sessionStorage.removeItem(reloadKey);
  });
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://identitytoolkit.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-512.svg" />
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
        <script dangerouslySetInnerHTML={{ __html: errorRecoveryScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
