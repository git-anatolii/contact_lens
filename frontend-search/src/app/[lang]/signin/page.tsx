import LoginForm from '@components/auth/login-form';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <Divider />
      <div className="flex items-center justify-center h-screen">
          <LoginForm
            lang={lang}
          />
      </div>
      <Divider />
    </>
  );
}
