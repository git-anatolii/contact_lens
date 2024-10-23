import { Suspense } from 'react';
import Divider from '@components/ui/divider';
import SoftLensContent from './soft-lens-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  function SearchBarFallback() {
    return <>Loading...</>;
  }

  return (
    <>
      <Divider />
      <Suspense fallback={<SearchBarFallback />}>
        <SoftLensContent lang={lang} />
      </Suspense>
    </>
  );
}
