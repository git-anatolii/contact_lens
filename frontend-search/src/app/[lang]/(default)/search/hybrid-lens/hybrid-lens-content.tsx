'use client';

import { ProductGrid } from '@components/product/product-grid';
import { HybridLensFilters } from '@components/search/filters/hybrid-lens-filters';
import SearchTopBar from '@components/search/search-top-bar';
import Container from '@components/ui/container';
import { Element } from 'react-scroll';
import { useState } from 'react';
import { Eye } from '@components/icons/eye-icon';
import Link from 'next/link';

export default function HybridLensContent({ lang }: { lang: string }) {
  const [viewAs, setViewAs] = useState(Boolean(false));
  return (
    <Container>
      <div className="flex gap-2 pt-6 pb-6 border-b border-border-base">
        <div className="w-20">
          <Eye className="text-brand p-1 w-7 h-7 border rounded-full border-brand" />
        </div>
        <div className="">
          Hybrid lenses are specialized contact lenses that combine a gas
          permeable (GP) center with a soft outer skirt, offering both clear
          vision and enhanced comfort. The rigid center corrects vision issues
          like astigmatism and keratoconus, while the soft edge provides a more
          comfortable fit similar to soft lenses. Hybrid lenses are designed to
          stay centered on the eye, reducing the risk of movement or discomfort.
          They are often recommended for people who struggle to wear either
          traditional soft or rigid lenses alone. With proper care, hybrid
          lenses can provide long-lasting comfort and visual clarity.
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
          <HybridLensFilters lang={lang} />
        </div>
        <div className="w-full lg:-mt-1">
          <SearchTopBar lang={lang} viewAs={viewAs} onNavClick={setViewAs} />
          <ProductGrid lang={lang} viewAs={viewAs} />
        </div>
      </Element>
    </Container>
  );
}
