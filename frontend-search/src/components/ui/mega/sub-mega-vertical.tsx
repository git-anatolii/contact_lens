
import { useRouter } from 'next/router';
import ListMenu from '@components/ui/mega/mega-menu';
import Container from '@components/ui/container';
import Image from '@components/ui/image';
import { productPlaceholder } from '@assets/placeholders';
import Link from '@components/ui/link';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function SidebarMenuItem({ className, item, depth = 0, lang }: any) {
  
  const { name, children: items, icon, type } = item;

  return (
    <>
      <li
        className={`relative transition  ${className ? className : 'text-sm '}`}
      >
        <Link
          href={`/${lang}${ROUTES.SEARCH}`}
          className={`flex items-center w-full hover:text-skin-primary ${
            items ? 'text-base font-medium' : ' '
          }`}
        >
          <span className="capitalize ">{name}</span>
        </Link>
        {Array.isArray(items) && (
          <div
            className={`subMenuChild w-full py-1 subMega--level${depth} ${
              depth > 1 && ' hidden '
            }`}
          >
            <ul key="content" className="text-xs">
              {items?.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <SidebarMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    lang={lang}
                    className={cn(
                      'text-sm text-skin-base hover:text-skin-primary mb-0.5'
                    )}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </li>
    </>
  );
}

const SubMegaVertical = ({ items, lang }: any) => {
  const depth = 0;
  return (
    <div className="dropdownMenu hidden md:block absolute z-10 left-full top-0 w-[800px] bg-skin-fill opacity-0 invisible shadow-md">
      <ul
        key="content"
        className="text-xs pl-7 px-5 py-4 grid grid-cols-3 gap-4"
      >
        {items?.map((currentItem: { name: any; slug: any }) => {
          const childDepth = depth + 1;
          return (
            <SidebarMenuItem
              key={`${currentItem.name}${currentItem.slug}`}
              item={currentItem}
              depth={childDepth}
              lang={lang}
              className={cn('text-sm  text-skin-base  mb-0.5')}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SubMegaVertical;
