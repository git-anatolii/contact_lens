import { Suspense } from 'react';
import Divider from '@components/ui/divider';
import GasPermeableLensContent from './gas-permeable-lens-content';
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
        <GasPermeableLensContent lang={lang} />
      </Suspense>
    </>
  );
}
