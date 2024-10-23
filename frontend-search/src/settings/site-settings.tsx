import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';
import siteLogo from 'public/assets/images/logo.png';
import siteLogoBlack from 'public/assets/images/logo-black.png';

export const siteSettings = {
  name: 'The Right Contact',
  description:
    'The largest Contact Lens Search Platform for Optometrists and Ophthalmologists',
  logo: {
    url: siteLogo,
    urlReverse: siteLogoBlack,
    alt: 'The Right Contact',
    href: '/en',
    width: 195,
    height: 26,
  },
  defaultLanguage: 'en',
  site_header: {
    topmenu: [
      {
        id: 1,
        path: '/manufactures',
        label: 'Manufactures',
      },
      {
        id: 2,
        path: '/contact-us',
        label: 'Contact us',
      },
    ],
    menu: [
      {
        id: 1,
        path: '/search/soft-lens',
        label: 'Soft Lens',
      },
      {
        id: 2,
        path: '/search/gas-permeable-lens',
        label: 'Gas Permeable Lens',
      },
      {
        id: 3,
        path: '/search/hybrid-lens',
        label: 'Hybrid Lens',
      },
      {
        id: 4,
        path: '/search/material',
        label: 'Material',
      },
      {
        id: 5,
        path: '/search/lens-product',
        label: 'Lens Product',
      },
    ],
    pagesMenu: [
      {
        id: 1,
        path: '/search',
        label: 'menu-best-deals',
      },
      {
        id: 2,
        path: '/about-us',
        label: 'menu-about-us',
      },
      {
        id: 3,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
      {
        id: 4,
        path: '/faq',
        label: 'menu-faq',
      },
    ],
  },
};
