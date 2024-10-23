'use client';

import { Attachment } from '@utils/types';
import useWindowSize from '@utils/use-window-size';
import Breadcrumb from '@components/ui/breadcrumb';
import cn from 'classnames';


interface HeaderProps {
  lang: string;
  heroTitle?: string;
  variant?: 'default' | 'white';
  className?: string;
}

const PageHeroSection: React.FC<HeaderProps> = ({
  heroTitle = 'Page Section Title',
  variant = 'default',
  className = '',
  lang,
}) => {
  
  const { width } = useWindowSize();
  return (
    <div
      className={cn(
        'flex justify-center md:min-h-[250px] lg:min-h-[288px] py-20 w-full bg-slate-100 page-header-banner',
        {
          'style-variant-white': variant === 'white',
        },
        className
      )}

    >
      <div className="relative flex flex-col items-center justify-center w-full">
        <h2
          className={cn(
            'text-xl md:text-2xl lg:text-3xl 2xl:text-[32px] font-bold text-center',
            {
              'text-brand-dark': variant === 'default',
              'text-brand-light': variant === 'white',
            }
          )}
        >
          <span className="block mb-3 font-bold md:mb-4 lg:mb-5 2xl:mb-7 ">
            {heroTitle}
          </span>
        </h2>
        <Breadcrumb lang={lang} />
      </div>
    </div>
  );
};

export default PageHeroSection;
