'use client';

import { useState } from 'react';
import Image from '@components/ui/image';
import ProductDetailsTabManufacture from '@components/product/product-details/product-tab-manufacture';
import ProductDetailsTabTint from '@components/product/product-details/product-tab-tint';

const ProductSingleDetails: React.FC<{ lang: string }> = ({ lang }) => {
  
  return (
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        <div className="col-span-5 mb-6 overflow-hidden  md:mb-8 lg:mb-0">
          <div className="flex items-center justify-center w-auto">
            <Image
              src="/assets/images/product_example.jpg"
              alt="product example"
              width={900}
              height={680}
              style={{ width: 'auto' }}
            />
          </div>
          {/* )} */}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-2">
            <div className="block -mt-1.5 pb-5 mb-5 border-b border-border-base">
              <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                Acuvue 1-Day Define
              </h2>
            </div>
          </div>

          <dl className="productView-info text-[14px] leading-8 pb-5 mb-5 border-b border-border-base">
            <dt className={`productView-info-name w-48 float-left`}>
              Lens Category:
            </dt>
            <dd className="productView-info-value">
              Cosmetic Colors Spherical
            </dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Lens Type:
            </dt>
            <dd className="productView-info-value">
              Daily <span className="text-[12px]">(Disposable Hydrogel)</span>
            </dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Highest Plus Power:
            </dt>
            <dd className="productView-info-value" data-product-weight="">
              +1.00{' '}
              <span className="text-[12px]">
                [+1.00D to –0.50D (0.50D steps)]
              </span>
            </dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Highest Minus Power:
            </dt>
            <dd className="productView-info-value">
              -9.00{' '}
              <span className="text-[12px]">
                [( 0.50 steps &gt; -6.00 ) +1.00D to –0.50D (0.50D steps)]
              </span>
            </dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Base Curves:
            </dt>
            <dd className="productView-info-value">8.50</dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Diameters:
            </dt>
            <dd className="productView-info-value">14.2</dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Additional Parameters:
            </dt>
            <dd className="productView-info-value">N/A</dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Optic Zone:
            </dt>
            <dd className="productView-info-value">8.00</dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Center Thickness Plus:
            </dt>
            <dd className="productView-info-value">
              0.170 <span className="text-[12px]">(Based on +3.00)</span>
            </dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Center Thickness Minus:
            </dt>
            <dd className="productView-info-value">
              0.084 <span className="text-[12px]">(@ -3.00)</span>
            </dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Sphere Prism:
            </dt>
            <dd className="productView-info-value">N/A</dd>
            <dt className={`productView-info-name w-48 float-left`}>
              Miscellaneous:
            </dt>
            <dd className="productView-info-value">N/A</dd>
          </dl>
        </div>
      </div>
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        <div className="flex flex-col col-span-5 shrink-0 xl:ltr:pl-2 xl:rtl:pr-2">
          <ProductDetailsTabManufacture lang={lang} />
        </div>
        <div className="flex flex-col col-span-5 shrink-0 xl:ltr:pl-2 xl:rtl:pr-2">
          <ProductDetailsTabTint lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default ProductSingleDetails;
