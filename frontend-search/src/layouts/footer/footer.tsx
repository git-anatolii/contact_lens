'use client';

import Widgets from '@layouts/footer/widget/widget';
import Copyright from '@layouts/footer/copyright';
import { footer } from './data';
const { widgets } = footer;

interface FooterProps {
  variant?: 'default' | 'medium';
  lang: string;
}

const Footer: React.FC<FooterProps> = ({ variant = 'default', lang }) => {
  return (
    <footer className="footer-one bg-fill-one text-gray-400">
      <Widgets widgets={widgets} variant={variant} lang={lang} />
      <Copyright variant={variant} lang={lang} />
    </footer>
  );
};

export default Footer;
