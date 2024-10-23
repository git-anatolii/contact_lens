'use client';

import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm } from 'react-hook-form';

interface ChangePasswordInputType {
  newPassword: string;
  oldPassword: string;
}

const defaultValues = {
  oldPassword: '',
  newPassword: '',
};

const ChangePassword: React.FC<{ lang: string }> = ({ lang }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    defaultValues,
  });

  return (
    <>
      <Heading variant="titleLarge">Change Password</Heading>
      <div className="flex flex-col w-full mt-6 lg:w-10/12 2xl:w-9/12 lg:mt-7">
        <form className="flex flex-col justify-center w-full mx-auto ">
          <div className="flex flex-col space-y-5 lg:space-y-7">
            <PasswordInput
              label="Old Password"
              error={errors.oldPassword?.message}
              {...register('oldPassword', {
                required: 'You must need to provide your old password',
              })}
              lang={lang}
            />
            <PasswordInput
              label="New Password"
              error={errors.newPassword?.message}
              {...register('newPassword', {
                required: 'You must need to provide your new password',
              })}
              lang={lang}
            />

            <div className="relative mt-3">
              <Button
                type="submit"
                variant="formButton"
                className="w-full sm:w-auto"
              >
                Change Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
