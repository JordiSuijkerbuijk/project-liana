import { GeistSans } from 'geist/font/sans';

import ColorChange from '@/components/ColorChange';
import Footer from '@/components/Footer';
import LenisInstantiator from '@/components/LenisInstantiator';
import Navbar from '@/components/Navbar';

import './globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <LenisInstantiator>
        <body className={GeistSans.className}>
          <Navbar />
          <ColorChange />
          {children}
          <Footer />
        </body>
      </LenisInstantiator>
    </html>
  );
}
