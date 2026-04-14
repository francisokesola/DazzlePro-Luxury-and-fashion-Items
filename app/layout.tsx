import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { CartProvider } from './context/CartContext';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: ' DazzlePro — Luxury Fashion & Jewellery',
  description: 'Discover timeless luxury at DazzlePro. Exquisite jewellery and haute couture fashion crafted for those who appreciate the finer things in life.',
  keywords: 'luxury fashion, fine jewellery, designer clothes, gold jewelry, haute couture',
  openGraph: {
    title: ' DazzlePro — Luxury Fashion & Jewellery',
    description: 'Timeless luxury. Exquisite jewellery and couture fashion.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
