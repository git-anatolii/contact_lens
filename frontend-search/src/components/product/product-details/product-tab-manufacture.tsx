import { useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetailsTabManufacture({
  lang,
}: {
  lang: string;
}) {
  let [tabHeading] = useState({
    Manufacturing_Specifications_And_Recommendations: '',
  });

  return (
    <div className="w-full xl:px-2 py-11 lg:py-14 xl:py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="block border-b border-border-base">
          <Tab
            key="manufacturing"
            className={({ selected }) =>
              classNames(
                'relative font-semibold inline-block transition-all text-18px lg:text-[20px] leading-5  focus:outline-none pb-3 lg:pb-5 hover:text-brand ltr:mr-8 rtl:ml-8',
                selected
                  ? 'text-brand-dark  after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:ltr:left-0 after:rtl:right-0 after:bg-brand'
                  : 'text-gray-400'
              )
            }
          >
            Manufacturing Specifications & Recommendations
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          {/* <Tab.Panel className="lg:flex"> */}
          <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
            <dl className="productView-info text-[14px] leading-8 pb-5 mb-5 border-b border-border-base">
              <dt className={`productView-info-name w-48 float-left`}>
                Production:
              </dt>
              <dd className="productView-info-value">
                Molded (Stabilized Soft)
              </dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Packaging:
              </dt>
              <dd className="productView-info-value">30 pack (Blister)</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Replacement Schedule:
              </dt>
              <dd className="productView-info-value" data-product-weight="">
                Daily
              </dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Wearing Schedule:
              </dt>
              <dd className="productView-info-value">DW</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Disinfection:
              </dt>
              <dd className="productView-info-value">N/A</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Stabilization:
              </dt>
              <dd className="productView-info-value">N/A</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Approved For Monovision:
              </dt>
              <dd className="productView-info-value">N/A</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Made to Order:
              </dt>
              <dd className="productView-info-value">N/A</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Made Jointly With:
              </dt>
              <dd className="productView-info-value">N/A</dd>
              <dt className={`productView-info-name w-48 float-left`}>
                Private Label Names:
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
