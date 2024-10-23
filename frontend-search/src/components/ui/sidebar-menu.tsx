'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import Image from '@components/ui/image';

import useQueryParam from '@utils/use-query-params';

function SidebarMenuItem({ className, item, depth = 0, lang }: any) {
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string>('');
  const active = searchParams.get('category');
  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  const hasQueryKey = searchParams?.get('category');

  useEffect(() => {
    updateQueryparams('category', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      setFormState(slug);
      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
    );
  }

  return (
    <>
      <li
        onClick={onClick}
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm md:text-15px  border-t border-border-base first:border-t-0  py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
        } ${
          isOpen
            ? 'text-skin-primary'
            : 'text-skin-base hover:text-skin-primary'
        }`}
      >
        <button
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark'
          )}
        >
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || "categorythumbnail"}
                width={40}
                height={40}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
          <span className="capitalize">{name}</span>
          <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <li>
          <ul
            key="content"
            className="py-3 text-xs border-t border-border-base"
          >
            {items?.map((currentItem) => {
              const childDepth = depth + 1;
              return (
                <SidebarMenuItem
                  key={`${currentItem.name}${currentItem.slug}`}
                  item={currentItem}
                  depth={childDepth}
                  className={cn('text-sm ps-4 py-2 pe-4')}
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function SidebarMenu({
  lang,
  items,
  className,
}: {
  lang: string;
  items: any;
  className?: string;
}) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <SidebarMenuItem
          key={`${item.slug}-key-${item.id}`}
          item={item}
          lang={lang}
        />
      ))}
    </ul>
  );
}

export default SidebarMenu;
