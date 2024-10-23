'use client';

import Header from '@layouts/default/header';
import Footer from '@layouts/footer/footer';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';

export default function DefaultLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer lang={lang} />
      <MobileNavigation lang={lang} />
    </div>
  );
}
