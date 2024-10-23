'use client';

import VendorCard from '@components/cards/vendor-card';
import Alert from '@components/ui/alert';

import Heading from '@components/ui/heading';

const data = [
  {
    id: 1,
    owner_id: 1,
    owner_name: 'Marcel',
    address: '22 Silver Spear St. San Diego, CA 92105, USA',
    phone: '+971-321-4841-78',
    website: 'www.area365mart.com',
    ratings: '5.00 rating from 1 review',
    name: 'Casanha Shop',
    slug: 'casanha-shop',
    description: 'You will get quality product',
    cover_image: {
      id: 1,
      thumbnail: '/assets/images/shop/shop-banner-1.jpg',
      original: '/assets/images/shop/shop-banner-1.jpg',
    },
    logo: {
      id: 1,
      thumbnail: '/assets/images/shop/shop-logo-1.jpg',
      original: '/assets/images/shop/shop-logo-1.jpg',
    },
    created_at: '2018-05-23',
    updated_at: '2020-05-23',
  },
  {
    id: 2,
    owner_id: 1,
    owner_name: 'Marcel',
    address: '22 Silver Spear St. San Diego, CA 92105, USA',
    phone: '+971-321-4841-78',
    website: 'www.area365mart.com',
    ratings: '5.00 rating from 1 review',
    name: 'Fashion Shop',
    slug: 'fashion-shop',
    description: 'You will get quality product',
    cover_image: {
      id: 1,
      thumbnail: '/assets/images/shop/shop-banner-2.jpg',
      original: '/assets/images/shop/shop-banner-2.jpg',
    },
    logo: {
      id: 1,
      thumbnail: '/assets/images/shop/shop-logo-2.jpg',
      original: '/assets/images/shop/shop-logo-2.jpg',
    },
    created_at: '2018-05-23',
    updated_at: '2020-05-23',
  },
];

const ShopsPageContent: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="px-4 pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 md:px-8">
      <div className="w-full xl:max-w-[1490px] mx-auto">
        <Heading variant="titleLarge" className="mb-4 lg:mb-6">
          All Manufactures
        </Heading>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5 xl:gap-6">
          {data?.map((item) => (
            <VendorCard key={item.id} shop={item} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopsPageContent;
