import cn from 'classnames';
import Image from '@components/ui/image';
import { Product } from '@utils/types';

import { ROUTES } from '@utils/routes';
import Link from '@components/ui/link';

interface ProductProps {
  lang: string;
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductProps> = ({ product, className, lang }) => {
  return (
    <article
      className={cn(
        'flex flex-col product-card relative card-image--jump px-2 sm:px-3  h-full',
        className
      )}
      title="Acuvue 1-Day"
    >
      <div className="relative flex-shrink-0  mt-4">
        <div className="relative card-img-container overflow-hidden mx-auto w-full h-[180px] md:h-[200px] ">
          <Image
            src="/assets/images/product_example.jpg"
            alt="Product Image"
            quality={100}
            priority
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="object-cover bg-fill-thumbnail"
          />
        </div>
      </div>

      <div className="flex flex-col mb-2 h-full overflow-hidden text-center relative">
        <div className="text-sm mt-auto leading-6 text-gray-400 mb-1.5">
          Spherical
        </div>
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/Acuvue 1-Day`}
          className="text-skin-base text-sm leading-5 min-h-[40px] line-clamp-2 mb-2 hover:text-brand"
        >
          Acuvue 1-Day
        </Link>

        <div className="space-s-2 mb-4 lg:mb-4">
          <span className="inline-block mx-1 text-sm font-medium sm:text-15px lg:text-base text-brand">
            Johnson & Johnson Vision Care
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;