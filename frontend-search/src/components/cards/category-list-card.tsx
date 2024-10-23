import Link, { LinkProps } from 'next/link';
import Image from '@components/ui/image';
import { IoIosArrowForward } from 'react-icons/io';
import { Category } from '@utils/types';
import cn from 'classnames';

import { ROUTES } from '@utils/routes';
interface Props {
  lang: string;
  category: Category;
  href: LinkProps['href'];
  className?: string;
  variant?: 'default' | 'small' | 'antique';
}

const CategoryListCard: React.FC<Props> = ({
  category,
  className,
  href,
  variant = 'default',
  lang,
}) => {
  const { name, icon, image,children } = category;
  
  const SUBCATEGORIES_LIMITS = 5;
  return (
    <div className={`wb-categories__items pe-4`}>
        <Link href={href} legacyBehavior>
            <a
                className={cn(
                    'group  justify-between items-center px-0 transition ',
                    className
                )}
            >
                <Image
                    src={image?.original ?? '/assets/placeholder/category-small.svg'}
                    alt={name || "categorythumbnail"}
                    width={variant === 'antique' ? 80 : 255}
                    height={variant === 'antique' ? 80 : 160}
                    priority
                    style={{ width: '100%' }}
                    className="bg-sink-thumbnail object-cover transition duration-200 ease-in-out transform group-hover:opacity-80"
                    />

            </a>
        </Link>

        <h3
            className={`pt-5 text-[16px] text-fill-base capitalize  font-medium hover:text-brand`}
        >
            <Link href={href} legacyBehavior>{name}</Link>
        </h3>

        {Array.isArray(children) ? (
            <ul key="content" className="py-3 text-[14px] leading-6">
                {children.slice(0, SUBCATEGORIES_LIMITS)?.map((currentItem: any, idx:number) => {
                    return (
                        <li className="pb-1 hover:text-skin-primary" key={`${idx}`}>
                            <Link
                                href={`/${lang}${ROUTES.SEARCH}?category=${currentItem.slug}`}
                            >
                            {currentItem.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        ) : null}

    </div>
  );
};

export default CategoryListCard;
