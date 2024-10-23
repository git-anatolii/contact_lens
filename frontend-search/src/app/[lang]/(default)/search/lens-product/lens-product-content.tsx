'use client';

import { ProductGrid } from '@components/product/product-grid';
import { LensProductFilters } from '@components/search/filters/lens-product-filters';
import SearchTopBar from '@components/search/search-top-bar';
import Container from '@components/ui/container';
import { Element } from 'react-scroll';
import { useState } from 'react';
import { Eye } from '@components/icons/eye-icon';
import Link from 'next/link';

export default function LensProductContent({ lang }: { lang: string }) {
  const [viewAs, setViewAs] = useState(Boolean(false));
  return (
    <Container>
      <div className="flex gap-2 pt-6 pb-6 border-b border-border-base">
        <div className="w-20">
          <Eye className="text-brand p-1 w-7 h-7 border rounded-full border-brand" />
        </div>
        <div className="">
          Lens products come in a variety of types, each designed for specific
          vision needs and lifestyles. Daily disposable lenses are single-use
          soft lenses, such as Acuvue Oasys 1-Day, offering convenience and
          hygiene by eliminating the need for cleaning. Monthly or bi-weekly
          lenses, like Biofinity or Air Optix, are reusable and require nightly
          cleaning and storage in lens solution. Gas permeable lenses, such as
          Boston XO, provide sharper vision for people with astigmatism or other
          refractive errors and can last much longer than soft lenses. Hybrid
          lenses, like SynergEyes, combine a rigid center for clear vision with
          a soft outer skirt for comfort. Scleral lenses, like Zenlens, are
          larger rigid lenses that cover the sclera and are often used for
          complex eye conditions like keratoconus.
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
          <LensProductFilters lang={lang} />
        </div>
        <div className="w-full lg:-mt-1">
          <SearchTopBar lang={lang} viewAs={viewAs} onNavClick={setViewAs} />
          <ProductGrid lang={lang} viewAs={viewAs} />
        </div>
      </Element>
    </Container>
  );
}
