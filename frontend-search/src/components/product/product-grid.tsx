import type { FC } from 'react';
import Button from '@components/ui/button';
import ProductCardAlpine from '@components/product/product-items/product-card';
import ProductCardList from '@components/product/product-items/product-list-view';
import { Product } from '@utils/types';

interface ProductGridProps {
  lang: string;
  className?: string;
  viewAs: boolean;
}

const product: Product = {
  id: 'product1',
  name: '[Sample] Able Brewing System  consetetur sadipscing elitr',
  slug: 'sample-able-brewing-system-consetetur',
  description: 'Stemming from an intense passion for the most flavourful cup of coffee, Able Brewing set out to create a brewer that was as aesthetically pleasing as it was functional. They imagined a product that would easily find itself at home in your kitchen during your morning routine. A product that would successfully showcase the Kone filter that they had painstakingly perfected. Inspired by Japanese and Mid-Century design, the resulting brewer elegantly serves pour over coffee. The multi-part design allows the top brewer portion to be removed once brewing is complete leaving a single pot server. The all ceramic exterior is dishwasher safe.',
  image: {
    id: 1,
    thumbnail: '/assets/images/products/p-1.jpg',
    original: '/assets/images/products/p-1.jpg',
  },
  gallery: [
    {
      id: 1,
      thumbnail: '/assets/images/products/p-3-1.jpg',
      original: '/assets/images/products/p-3-1.jpg',
    },
    {
      id: 2,
      thumbnail: '/assets/images/products/p-3-2.jpg',
      original: '/assets/images/products/p-3-2.jpg',
    },
    {
      id: 3,
      thumbnail: '/assets/images/products/p-3-3.jpg',
      original: '/assets/images/products/p-3-3.jpg',
    },
    {
      id: 4,
      thumbnail: '/assets/images/products/p-3-1.jpg',
      original: '/assets/images/products/p-3-1.jpg',
    },
  ],
  quantity: 70,
  price: 1200,
  sale_price: 2000,
  unit: 'Common Good',
  tag: [
    {
      id: 1,
      name: 'Digital',
      slug: 'digital',
    },
    {
      id: 2,
      name: 'Smartphones',
      slug: 'smartphones',
    },
    {
      id: 3,
      name: 'Tablets',
      slug: 'tablets',
    },
    {
      id: 4,
      name: 'Electronic',
      slug: 'electronic',
    },
  ],
  sold: 0
};

export const ProductGrid: FC<ProductGridProps> = ({
  className = '',
  lang,
  viewAs,
}) => {
  return (
    <>
      <div
        className={`${
          viewAs
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
            : 'grid grid-cols-1 gap-8'
        } ${className}`}
      >
        {viewAs ? (
          <ProductCardAlpine
            key={`product--key-${product.id}`}
            product={product}
            lang={lang}
          />
        ) : (
          <ProductCardList
            key={`product--key-${product.id}`}
            product={product}
            lang={lang}
          />
        )}
      </div>
      <div className="pt-8 text-center xl:pt-10">
        <Button className={'w-60 '}>Next Page</Button>
      </div>
    </>
  );
};
