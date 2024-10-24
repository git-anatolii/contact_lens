import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'src/lib/hook';
import { RootState, AppDispatch } from 'src/lib/store';
import { tokenLoginUser } from 'src/lib/reducers/userSlice';
import dynamic from 'next/dynamic';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { useActiveScroll } from '@utils/use-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import UserIcon from '@components/icons/user-icon';
import HeaderMenu from '@layouts/header/header-menu';
import cn from 'classnames';
import Search from '@components/common/search';
const AuthMenu = dynamic(() => import('@layouts/header/auth-menu'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

function Header({ lang }: { lang: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthorized, user, loading, success, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const { openSidebar, displaySearch, openSearch, displayMobileSearch } =
    useUI();
  const siteSearchRef = useRef() as DivElementRef;
  const siteHeaderRef = useRef() as DivElementRef;
  const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
  useActiveScroll(siteHeaderRef);
  useEffect(() => {
    dispatch(tokenLoginUser());
  }, []);

  function handleLogin() {
    router.push(`/${lang}${ROUTES.LOGIN}`);
  }
  function handleCategoryMenu() {
    setCategoryMenu(!categoryMenu);
  }
  return (
    <>
      <header
        id="siteHeader"
        ref={siteHeaderRef}
        className={cn(
          'header-one sticky-header sticky top-0 z-50 lg:relative w-full',
          displayMobileSearch && 'active-mobile-search'
        )}
      >
        <div className="z-20 w-full transition duration-200 ease-in-out  body-font bg-fill-one">
          <div className="top-bar  text-13px text-gray-300 border-b border-white/5">
            <Container>
              <div className="h-12 flex justify-between items-center py-2 gap-5">
                <span className={`hidden md:block truncate`}>
                  The largest Contact Lens Search Platform for Optometrists and
                  Ophthalmologists...
                </span>
              </div>
            </Container>
          </div>
          <div className="border-b border-white/5">
            <Container>
              <div className="flex items-center justify-between">
                <Logo lang={lang} className="ps-3 md:ps-0 lg:mx-0" />

                <div className='flex flex-col gap-4 justify-center items-center px-4 pt-8'>
                  <Search
                    searchId="top-bar-search"
                    lang={lang}
                    className="flex w-[100vh] px-4"
                  />
                  <HeaderMenu
                    data={site_header.menu}
                    className="flex transition-all duration-200 ease-in-out"
                    lang={lang}
                  />
                </div>


                <div className="flex space-x-5 xl:space-x-10">
                  <div className="items-center flex gap-4">
                    <div className="flex items-center justify-center">
                      <UserIcon className="text-brand" />
                    </div>

                    <AuthMenu
                      isAuthorized={isAuthorized}
                      href={`/${lang}${ROUTES.ACCOUNT}`}
                      btnProps={{
                        children: 'SIGN IN',
                        onClick: handleLogin,
                      }}
                    >
                      {isAuthorized ? 'Hi ' + user?.name : 'My Account'}
                    </AuthMenu>
                  </div>
                </div>
              </div>

            </Container>
          </div>
        </div>
      </header>
      {categoryMenu && (
        <div
          className="shadow_bkg_show fixed w-full h-full inset-0 bg-black/60 z-40"
          onClick={handleCategoryMenu}
        ></div>
      )}
    </>
  );
}

export default Header;
