import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QuickBite — Crave It? Get It Fast.',
  description:
    'QuickBite is your modern, appetising food delivery destination. Fresh flavors delivered in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-white">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
