'use client';

import { ProductGrid } from '@components/product/product-grid';
import { GasPermeableLensFilters } from '@components/search/filters/gas-permeable-lens-filters';
import SearchTopBar from '@components/search/search-top-bar';
import Container from '@components/ui/container';
import { Element } from 'react-scroll';
import { useState } from 'react';
import { Eye } from '@components/icons/eye-icon';
import Link from 'next/link';

export default function GasPemeableLensContent({ lang }: { lang: string }) {
  const [viewAs, setViewAs] = useState(Boolean(false));
  return (
    <Container>
      <div className="flex gap-2 pt-6 pb-6 border-b border-border-base">
        <div className="w-20">
          <Eye className="text-brand p-1 w-7 h-7 border rounded-full border-brand" />
        </div>
        <div className="">
          Gas permeable lenses (GP lenses) are rigid contact lenses made from
          durable materials that allow oxygen to pass through to the eye,
          promoting eye health. Unlike soft lenses, they retain their shape on
          the eye, providing sharper vision for people with astigmatism and
          other refractive errors. GP lenses are typically smaller than soft
          lenses and can take some time for users to get accustomed to wearing
          them. They are less prone to protein deposits, making them easier to
          clean and maintain. Due to their long-lasting material, gas permeable
          lenses can last for years with proper care.
          <div className="mt-2">
            <Link href="https://therightcontact.com" className="mt-2">
              https://therightcontact.com
            </Link>
          </div>
        </div>
      </div>
      <Element
        name="grid"
        className="flex pt-7 lg:pt-11 pb-16 lg:pb-20 products-category"
      >
        <div className="sticky hidden h-full shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-80  top-16">
          <GasPermeableLensFilters lang={lang} />
        </div>
        <div className="w-full lg:-mt-1">
          <SearchTopBar lang={lang} viewAs={viewAs} onNavClick={setViewAs} />
          <ProductGrid lang={lang} viewAs={viewAs} />
        </div>
      </Element>
    </Container>
  );
}
