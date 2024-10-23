import { useRouter } from 'next/router';

import ListMenu from '@components/ui/mega/mega-menu';
import Container from '@components/ui/container';
import Image from '@components/ui/image';
import { productPlaceholder } from '@assets/placeholders';
import Link from '@components/ui/link';

const SubMega = ({ item, lang }: any) => {
  const {
    type,
    mega_categoryCol,
    mega_bannerMode,
    mega_bannerImg: image,
    mega_bannerUrl,
    mega_contentBottom,
  } = item ?? {};
  const widthCateArea = mega_bannerMode;
  let isBannerMode = false;
  if (mega_bannerMode == 'left' || mega_bannerMode == 'right') isBannerMode = true;

  return (
    <div className="subMega shadow-dropDown bg-skin-fill  z-30 absolute start-0 opacity-0 group-hover:opacity-100">
      <Container className={'mx-auto max-w-screen-2xl'}>
        <div className={`flex flex-row gap-5 pt-8 py-5`}>
          <div
            className={`cateArea ${isBannerMode ? 'basis-3/4' : 'basis-full'} `}
          >
            <ul
              className={`text-body text-sm grid grid-cols-${mega_categoryCol} gap-4 `}
            >
              {item.subMenu.map((menu: any, index: number) => {
                const dept: number = 1;
                const menuName: string = `sidebar-menu-${dept}-${index}`;
                return (
                  <ListMenu
                    dept={dept}
                    data={menu}
                    hasSubMenu={menu.subMenu}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                    lang={lang}
                  />
                );
              })}
            </ul>
          </div>
          {isBannerMode && (
            <div
              className={`imageArea basis-1/4 ${
                mega_bannerMode == 'left' && 'order-first'
              }`}
            >
              <Link href={mega_bannerUrl} className="text-skin-base ">
                <div className="card-img-container max-w-[350px]">
                  <Image
                    src={image ?? productPlaceholder}
                    alt={'Product Image'}
                    width={450}
                    height={300}
                    quality={75}
                    loading={'lazy'}
                    sizes={'(max-width: 768px) 15vw,15vw'}
                    className="object-cover bg-skin-thumbnail"
                  />
                </div>
              </Link>
            </div>
          )}
        </div>
      </Container>
      {mega_contentBottom.trim().length != 0 && (
        <div className="navPages-contentbottom bg-skin-carnation">
          <Container>
            <div
              className={`text-white text-sm text-center py-4`}
              dangerouslySetInnerHTML={{ __html: mega_contentBottom }}
            />
          </Container>
        </div>
      )}
    </div>
  );
};

export default SubMega;
