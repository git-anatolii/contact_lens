import SignupForm from '@components/auth/sign-up-form';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
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
        <SignupForm lang={lang} />
      </div>
      <Divider />
    </>
  );
}
