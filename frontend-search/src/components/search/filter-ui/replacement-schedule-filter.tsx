import React, { useEffect, useState } from 'react';
import { CheckBox } from '@components/ui/form/checkbox';
import { usePathname, useSearchParams } from 'next/navigation';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Disclosure } from '@headlessui/react';
import Heading from '@components/ui/heading';

import useQueryParam from '@utils/use-query-params';

export const ReplacementScheduleFilter = ({ lang }: { lang: string }) => {
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string[]>([]);

  const hasQueryKey = searchParams?.get('dietary');

  useEffect(() => {
    updateQueryparams('dietary', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(',') ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    setFormState(
      formState.includes(value)
        ? formState.filter((item) => item !== value)
        : [...formState, value]
    );
  }
  // const items = data?.dietary?.data;
  const items = [
    {
      id: 1,
      name: 'Daily',
      subname: '<24 hours',
      slug: 'daily',
    },
    {
      id: 2,
      name: 'Disposable',
      subname: '1 week to 1 month',
      slug: 'disposable',
    },
    {
      id: 3,
      name: 'Planned Replacement',
      subname: '3-4 months',
      slug: 'hybridlens',
    },
    {
      id: 4,
      name: 'Conventional',
      subname: '6-12 months',
      slug: 'conventional',
    },
  ];

  return (
    <div className="block">
      <Heading className="lg:text-xl mb-5 -mt-1 block-title">
        Replacement Schedule
      </Heading>
      <div className="flex flex-col">
        {items?.map((item: any) => (
          <CheckBox
            key={`${item.name}-key-${item.id}`}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={formState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
};
