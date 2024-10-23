'use client';

import dynamic from 'next/dynamic';
import { useUI } from '@contexts/ui.context';
import { Drawer } from '@components/common/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import motionProps from '@components/common/drawer/motion';

export default function ManagedDrawer({ lang }: { lang: string }) {
  const { displayDrawer, closeDrawer, drawerView } = useUI();
  const dir = getDirection(lang);
  const contentWrapperCSS = dir === 'ltr' ? { right: 0 } : { left: 0 };

  return (
    <Drawer
      rootClassName={
        drawerView === 'ORDER_DETAILS' ? 'order-details-drawer' : ''
      }
      open={displayDrawer}
      placement={dir === 'rtl' ? 'left' : 'right'}
      onClose={closeDrawer}
      // @ts-ignore
      level={null}
      contentWrapperStyle={contentWrapperCSS}
      {...motionProps}
    >
    </Drawer>
  );
}
