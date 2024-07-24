import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
import Navbar from '@/components/Navbar';
import QueryProvider from '@/components/provider/query-provider';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { META } from '@/lib/constant';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(META.url),
  title: 'actionspeak',
  description: 'Connect with customers via actionspeak',
  openGraph: {
    title: META.title,
    description: META.description,
    siteName: META.siteName,
    images: [META.ogImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
    images: [META.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <Script id='gtm' strategy='afterInteractive'>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MLKH9XL5');
          `}
        </Script>

        <Script
          defer
          data-domain='actionspeak.kr'
          src='https://www.actionspeak.kr/js/script.js'
        ></Script>
      </head>
      <body className={inter.className}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MLKH9XL5" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <QueryProvider>
          <ThemeProvider>
            <Navbar />
            <main className='max-w-screen min-h-screen'>{children}</main>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
