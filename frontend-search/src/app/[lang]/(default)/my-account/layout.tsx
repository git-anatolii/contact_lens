import Container from '@components/ui/container';
import AccountNav from '@components/my-account/account-nav';
import { ROUTES } from '@utils/routes';
import SettingsIcon from '@components/icons/account-settings';
import MapIcon from '@components/icons/account-address';
import { IoSettingsOutline } from 'react-icons/io5';
import AccountNavMobile from '@components/my-account/account-nav-mobile';

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT_SETTING,
    name: 'Account Settings',
    icon: <SettingsIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.ADDRESS,
    name: 'Address',
    icon: <MapIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: 'Change Password',
    icon: (
      <IoSettingsOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
];

export default function AccountLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <div className="border-t border-b border-border-base">
      <Container>
        <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 mx-auto">
          <div className="flex flex-col w-full lg:flex-row">
            <div className="lg:hidden">
              <AccountNavMobile options={accountMenu} lang={lang} />
            </div>
            <div className="hidden lg:block flex-shrink-0 w-72 me-7 xl:me-8">
              <AccountNav options={accountMenu} lang={lang} />
            </div>

            <div className="w-full mt-4 lg:mt-0 border border-border-base p-4 sm:p-5 lg:py-8 2xl:py-10 lg:px-9 2xl:px-10 rounded-md">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
