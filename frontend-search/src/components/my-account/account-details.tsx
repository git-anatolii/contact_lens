'use client';

import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm, Controller } from 'react-hook-form';

interface UpdateUserType {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  shareProfileData: boolean;
  setAdsPerformance: boolean;
}

const defaultValues = {};

const AccountDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateUserType>({
    defaultValues,
  });

  return (
    <div className="flex flex-col w-full">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        Personal Information
      </Heading>
      <form className="flex flex-col justify-center w-full mx-auto" noValidate>
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                label={'First Name' as string}
                {...register('firstName', {
                  required: 'forms:first-name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.firstName?.message}
                lang={lang}
              />
              <Input
                label={'Last Name' as string}
                {...register('lastName', {
                  required: 'forms:last-name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.lastName?.message}
                lang={lang}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="tel"
                label={'Phone' as string}
                {...register('phoneNumber', {
                  required: 'forms:phone-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.phoneNumber?.message}
                lang={lang}
              />
            </div>
          </div>
        </div>
        <Heading
          variant="titleLarge"
          className="pt-6 mb-5 xl:mb-8 md:pt-7 lg:pt-8"
        >
          Account Information
        </Heading>
        <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="email"
                label={'Email' as string}
                {...register('email', {
                  required: 'forms:email-required',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'forms:email-error',
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.email?.message}
                lang={lang}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <PasswordInput
                label="Password"
                {...register('password', {
                  required: 'forms:password-required',
                })}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.password?.message}
                lang={lang}
              />
              <PasswordInput
                label="Confirm Password"
                {...register('confirmPassword', {
                  required: 'forms:password-required',
                })}
                error={errors.confirmPassword?.message}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                lang={lang}
              />
            </div>
          </div>
        </div>
        <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            type="submit"
            variant="formButton"
            className="w-full sm:w-auto"
          >
            Save Change
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
