import { Rubik } from 'next/font/google';
import { Metadata } from 'next';

import './[lang]/globals.css';

const rubik = Rubik({
  weight: ['300','400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'The Right Contact',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${rubik.variable}`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
