import { useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetailsTabTools({ lang }: { lang: string }) {
  return (
    <div className="w-full xl:px-2 py-11 lg:py-14 xl:py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="block border-b border-border-base">
          <Tab
            key="lens_tint"
            className={({ selected }) =>
              classNames(
                'relative font-semibold inline-block transition-all text-18px lg:text-[20px] leading-5  focus:outline-none pb-3 lg:pb-5 hover:text-brand ltr:mr-8 rtl:ml-8',
                selected
                  ? 'text-brand-dark  after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:ltr:left-0 after:rtl:right-0 after:bg-brand'
                  : 'text-gray-400'
              )
            }
          >
            Lens tints, coatings & markings
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          {/* <Tab.Panel className="lg:flex"> */}
          <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
            <dl className="productView-info text-[14px] leading-8 pb-5 mb-5 border-b border-border-base">
              <dt className={`productView-info-name w-48 float-left`}>
                Tints:
              </dt>
              <dd className="productView-info-value">N/A</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Visibility Tint:
              </dt>
              <dd className="productView-info-value">Yes (Light blue)</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Cosmetic Tint:
              </dt>
              <dd className="productView-info-value" data-product-weight="">
                N/A
              </dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Iris Diameter:
              </dt>
              <dd className="productView-info-value">N/A</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Pupil Diameter:
              </dt>
              <dd className="productView-info-value">N/A</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Inversion Marketing:
              </dt>
              <dd className="productView-info-value">Yes</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                UV Coating:
              </dt>
              <dd className="productView-info-value">Yes</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Lens Marketing:
              </dt>
              <dd className="productView-info-value">N/A</dd>
            </dl>
          </div>
          {/* </Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
