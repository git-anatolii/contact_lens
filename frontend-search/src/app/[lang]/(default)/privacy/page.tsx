import PageHeroSection from '@components/ui/page-hero-section';
import PrivacyPageContent from './privacy-page-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <PageHeroSection heroTitle="Privacy & Policy" lang={lang} />
      <PrivacyPageContent lang={lang} />
    </>
  );
}
