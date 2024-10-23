'use client';

import cn from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { FaPlus,FaMinus } from 'react-icons/fa';


type CollapseProps = {
  lang: string;
  item: any;
  translatorNS: string;
  variant?: 'gray' | 'transparent';
};

export const Accordion: React.FC<CollapseProps> = ({
  lang,
  item,
  translatorNS,
  variant = 'gray',
}) => {
  const { id, title, content } = item;
  return (
    <div className="w-full">
      <div className="w-full mx-auto mb-4 rounded shadow-category text-brand-light group">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="border-b-1 flex justify-between w-full px-5 py-4 text-base font-medium 2xl:px-6 2xl:py-6 text-left  text-brand-dark focus:outline-none">
                <span
                  className={cn(
                    'text-sm font-medium leading-relaxed text-heading ltr:pr-2 rtl:pl-2',
                    {
                      'md:text-base': variant === 'gray',
                      'md:text-base lg:text-lg': variant === 'transparent',
                    }
                  )}
                >
                  {title}
                </span>
                {open ? <FaMinus /> : <FaPlus />}
              
              </Disclosure.Button>

              <Transition
                show={open}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-5 opacity-0"
                enterTo="transform scale-10 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-5 opacity-0"
              >
                {open && (
                  <Disclosure.Panel static>
                    <div className="px-5 pb-4 -mt-1 text-sm leading-7 2xl:pb-7 2xl:px-6 2xl:mt-0 2xl:text-15px text-gray-500">
                      {content}
                    </div>
                  </Disclosure.Panel>
                )}
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Accordion;
