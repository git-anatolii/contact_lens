import { Suspense } from 'react';
import Divider from '@components/ui/divider';
import MaterialContent from './material-content';
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
        <MaterialContent lang={lang} />
      </Suspense>
    </>
  );
}
