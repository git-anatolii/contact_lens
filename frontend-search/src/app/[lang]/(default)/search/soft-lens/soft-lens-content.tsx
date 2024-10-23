'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hook';
import { SoftLensGrid } from '@components/product/product-grid/soft-lens-grid';
import { SoftLensFilters } from '@components/search/filters/soft-lens-filters';
import SearchTopBar from '@components/search/search-top-bar';
import Container from '@components/ui/container';
import { Element } from 'react-scroll';
import { useState } from 'react';
import { Eye } from '@components/icons/eye-icon';
import Link from 'next/link';
import { getAllSoftLensThunk } from 'src/lib/reducers/lensSlice';

export default function SoftLensContent({ lang }: { lang: string }) {
  const [viewAs, setViewAs] = useState(Boolean(true));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllSoftLensThunk({ limit: 20, offset: 0 }));
  }, []);

  return (
    <Container>
      <div className="flex gap-2 pt-6 pb-6 border-b border-border-base">
        <div className="w-20">
          <Eye className="text-brand p-1 w-7 h-7 border rounded-full border-brand" />
        </div>
        <div className="">
          Soft contact lenses are made from flexible, water-absorbing materials,
          making them comfortable and easy to wear. They are ideal for people
          with active lifestyles due to their adaptability and minimal
          discomfort. Soft lenses are available in various types, including
          daily disposables, extended wear, and multifocal lenses. They provide
          clear vision for correcting common vision problems like
          nearsightedness, farsightedness, and astigmatism. Because they conform
          to the shape of the eye, soft lenses tend to stay in place better than
          rigid gas permeable lenses.
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
          <SoftLensFilters lang={lang} />
        </div>
        <div className="w-full lg:-mt-1">
          <SearchTopBar lang={lang} viewAs={viewAs} onNavClick={setViewAs} />
          <SoftLensGrid lang={lang} viewAs={viewAs} />
        </div>
      </Element>
    </Container>
  );
}
