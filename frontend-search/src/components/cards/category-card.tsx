import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { LinkProps } from 'next/link';

import cn from 'classnames';
import { categoryPlaceholder } from '@assets/placeholders';

interface Props {
  lang: string;
  item: any;
  href: LinkProps['href'];
  className?: string;
}

const CategoryCard: React.FC<Props> = ({ lang, item, href, className }) => {
  
  const {name, image, productCount} = item ?? {};

  return (
      <Link
          href={href}
          className={cn('group block w-full', className)}
      >
        <div className="flex flex-col sm:flex-row items-center gap-1">
          <div className="category-info sm:max-w-[70%] flex-auto">
            <h3 className="capitalize text-sm truncate leading-6 group-hover:text-skin-primary">
              {name}
            </h3>
            <p className={"text-[13px] text-gray-400"}>({productCount} items)</p>
          </div>
          <div className={`flex flex-shrink-0 group-hover:opacity-80`}>
            <Image
                src={image?.thumbnail ?? categoryPlaceholder}
                alt={name || "cardthunmbnail"}
                width={80}
                height={80}
                quality={100}
                className=""
            />
          </div>
        </div>
      </Link>
  );
};

export default CategoryCard;
