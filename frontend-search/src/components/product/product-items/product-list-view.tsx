import cn from 'classnames';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { Product } from '@utils/types';
import { useModalAction } from '@components/common/modal/modal.context';

import { ROUTES } from '@utils/routes';

interface ProductProps {
  lang?: string;
  product: Product;
  className?: string;
}

function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data, lang }: any = props;

  const { openModal } = useModalAction();

  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }

  return (
    <button
      className="w-full min-w-[150px] px-4 py-2 bg-skin-primary text-skin-inverted text-[14px] items-center justify-center focus:outline-none focus-visible:outline-none"
      aria-label="Count Button"
      onClick={handlePopupView}
    >
      Product Details
    </button>
  );
}

const ProductList: React.FC<ProductProps> = ({ product, className, lang }) => {
  return (
    <article
      className={cn(
        ' product-list-view overflow-hidden relative  grid grid-cols-4  gap-8',
        className
      )}
      title="Acuvue 1-Day"
    >
      <div className="col-span-1 ">
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/Acuvue 1-Day`}
          className="block border border-black/10 hover:border-skin-primary"
        >
          <div className="relative card-img-container overflow-hidden mx-auto w-full max-w-[270px]  h-[180px] md:h-[300px] ">
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
        </Link>
      </div>

      <div className="col-span-3">
        <div className="text-12px sm:text-sm mt-auto text-gray-400 mb-2">
          Spherical
        </div>
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/Acuvue 1-Day`}
          className="text-skin-base text-base font-semibold leading-5 min-h-[30px] line-clamp-2 mb-1.5 hover:text-skin-primary"
        >
          Acuvue 1-Day
        </Link>

        <div className="space-s-2 mb-2">
          <Link
            href={`/${lang}${ROUTES.PRODUCTS}/Acuvue 1-Day`}
            className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary"
          >
            Johnson & Johnson Vision Care
          </Link>
        </div>
        <div className="grid grid-cols-2 text-sm text-skin-base line-clamp-3 leading-6 text-opacity-80">
          <dl className="col-span-1 flex-col">
            <div className="mb-1 flex">
              <dt className="font-bold">Lens Category:</dt>
              <dd className="ml-2">Spherical</dd>
            </div>
            <div className="mb-1 flex">
              <dt className="font-bold">Lens Type:</dt>
              <dd className="ml-2">Daily, Disposable Hydrogel</dd>
            </div>
            <div className="mb-1 flex">
              <dt className="font-bold">Replacement Schedule:</dt>
              <dd className="ml-2">Daily</dd>
            </div>
            <div className="mb-1 flex">
              <dt className="font-bold">Packaging:</dt>
              <dd className="ml-2">30 pack</dd>
            </div>
          </dl>
          <dl className="col-span-1 flex-col">
            <div className="mb-1 flex">
              <dt className="font-bold">Highest Plus Power:</dt>
              <dd className="ml-2">-12</dd>
            </div>
            <div className="mb-1 flex">
              <dt className="font-bold">Highest Minus:</dt>
              <dd className="ml-2">-12</dd>
            </div>
            <div className="mb-1 flex">
              <dt className="font-bold">Base Curve:</dt>
              <dd className="ml-2">8.50</dd>
            </div>
            <div className="mb-1 flex">
              <dt className="font-bold">Diameter:</dt>
              <dd className="ml-2">14.2</dd>
            </div>
          </dl>
        </div>
        <div className="inline-block product-cart-button mt-6">
          <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
        </div>
      </div>
    </article>
  );
};

export default ProductList;
