import cn from 'classnames';
import { useState } from 'react';
import Link from '@components/ui/link';
import {
  IoIosArrowForward,
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
  IoIosArrowBack,
} from 'react-icons/io';

import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';

import SubMegaVertical from "@components/ui/mega/sub-mega-vertical";
import {getDirection} from "@utils/get-direction";

function SidebarMenuItem({ className, item, depth = 0, lang }: any) {
  
  const { name, children: items, icon, type } = item;
    const dir = getDirection(lang);
  return (
    <>
      <li
        className={`flex justify-between items-center transition  ${
          type != 'mega' && 'relative'
        } ${
          className
            ? className
            : 'text-sm hover:text-brand px-3.5 2xl:px-4 border-b border-border-base last:border-b-0'
        }`}
      >
        <Link
          href={`/${lang}${ROUTES.SEARCH}`}
          className={cn(
            'flex items-center w-full py-3 text-start outline-none focus:outline-none focus:ring-0 focus:text-skin-base'
          )}
        >
          {icon && (
            <div className="inline-flex w-8 shrink-0 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || "categorythumbnail"}
                width={25}
                height={25}
                style={{ width: 'auto' }}
              />
            </div>
          )}
          <span className="capitalize">{name}</span>
          {items && (
            <span className="hidden ltr:ml-auto rtl:mr-auto md:inline-flex">
              {dir === 'rtl' ? <IoIosArrowBack className="text-15px text-skin-base text-opacity-40"/>
                  : <IoIosArrowForward className="text-15px text-skin-base text-opacity-40"/>}
            </span>
          )}
        </Link>
        {Array.isArray(items) ? (
          <>
            {type != 'mega' ? (
              <div
                className={`dropdownMenu absolute top-0 z-10 invisible hidden w-full border opacity-0 md:block left-full bg-brand-light border-border-base subMenu--level${depth}`}
              >
                <ul key="content" className="text-xs px-0.5 py-3">
                  {items?.map((currentItem) => {
                    const childDepth = depth + 1;
                    return (
                      <SidebarMenuItem
                        key={`${currentItem.name}${currentItem.slug}`}
                        item={currentItem}
                        depth={childDepth}
                        lang={lang}
                        className={cn(
                          'text-sm px-3 ltr:pr-3 rtl:pl-3 text-brand-muted hover:text-brand mb-0.5'
                        )}
                      />
                    );
                  })}
                </ul>
              </div>
            ) : (
              <SubMegaVertical items={items} lang={lang} />
            )}
          </>
        ) : null}
      </li>
    </>
  );
}

function SidebarMenu({ items, className,categoriesLimit, lang }: any) {
    const [categoryMenuToggle, setcategoryMenuToggle] = useState(
    Boolean(false)
    );
    

    function handleCategoryMenu() {
    setcategoryMenuToggle(!categoryMenuToggle);
    }

    return (
      <ul
        className={cn(
          'w-full bg-skin-fill border-t-0 border-2 border-skin-primary rounded-b-md category-dropdown-menu',
          className
        )}
      >
        {items?.map((item: any, idx: number) =>
          idx <= categoriesLimit - 1 ? (
            <SidebarMenuItem
              key={`${item.slug}-key-${item.id}`}
              item={item}
              lang={lang}
            />
          ) : (
            categoryMenuToggle && (
              <SidebarMenuItem
                key={`${item.slug}-key-${item.id}`}
                item={item}
                lang={lang}
              />
            )
          )
        )}

        {items.length >= categoriesLimit && (
          <li
            className={`px-4 relative transition text-sm hover:text-skin-primary`}
          >
            <div
              className={`flex items-center w-full py-3 text-start cursor-pointer`}
              onClick={handleCategoryMenu}
            >
              <div className={`inline-flex flex-shrink-0 ltr:mr-2 rtl:ml-2`}>
                {categoryMenuToggle ? (
                  <IoIosRemoveCircleOutline className="text-xl text-skin-base text-opacity-80" />
                ) : (
                  <IoIosAddCircleOutline className="text-xl text-skin-base text-opacity-80" />
                )}
              </div>
              <span className="capitalize ">All Categories</span>
            </div>
          </li>
        )}
      </ul>
    );
}

export default SidebarMenu;
