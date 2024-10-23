'use client';

import { ProductGrid } from '@components/product/product-grid';
import { MaterialFilters } from '@components/search/filters/material-filter';
import SearchTopBar from '@components/search/search-top-bar';
import Container from '@components/ui/container';
import { Element } from 'react-scroll';
import { useState } from 'react';
import { Eye } from '@components/icons/eye-icon';
import Link from 'next/link';

export default function MaterialContent({ lang }: { lang: string }) {
  const [viewAs, setViewAs] = useState(Boolean(false));
  return (
    <Container>
      <div className="flex gap-2 pt-6 pb-6 border-b border-border-base">
        <div className="w-20">
          <Eye className="text-brand p-1 w-7 h-7 border rounded-full border-brand" />
        </div>
        <div className="">
          Contact lens materials vary depending on the type of lens and its
          intended use. Soft lenses are typically made from hydrogel or silicone
          hydrogel, which are flexible, water-absorbing materials that allow
          oxygen to pass through to the cornea. Gas permeable lenses are made
          from rigid polymers like fluorosilicone acrylate, which permit oxygen
          transmission while maintaining their shape on the eye for sharper
          vision. Hybrid lenses combine a rigid gas permeable center with a soft
          hydrogel or silicone hydrogel skirt for both clarity and comfort.
          Scleral lenses are made from similar rigid materials as gas permeable
          lenses but are larger, resting on the sclera to correct more complex
          vision issues. Each material is designed to balance oxygen
          permeability, comfort, and vision correction.
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
          <MaterialFilters lang={lang} />
        </div>
        <div className="w-full lg:-mt-1">
          <SearchTopBar lang={lang} viewAs={viewAs} onNavClick={setViewAs} />
          <ProductGrid lang={lang} viewAs={viewAs} />
        </div>
      </Element>
    </Container>
  );
}
