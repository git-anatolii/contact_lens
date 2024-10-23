'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/lib/hook';
import { registerUser } from 'src/lib/reducers/userSlice';
import { RootState, AppDispatch } from 'src/lib/store';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import AlertFailure from '@components/ui/alert/alert-failure';
import AlertSuccess from '@components/ui/alert/alert-success';
import { SignUpInputType } from '@utils/types';
import { ROUTES } from '@utils/routes';

interface SignUpFormProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

export default function SignUpForm({ lang, className }: SignUpFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();
  function handleSignIn() {
    router.push(`/${lang}${ROUTES.LOGIN}`);
  }
  async function onSubmit({ name, email, password }: SignUpInputType) {
    const userSignUpData: SignUpInputType = {
      name: name,
      email: email,
      password: password,
    };
    await dispatch(registerUser(userSignUpData)).unwrap();
    router.push(`/${lang}${ROUTES.LOGIN}`);
  }

  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]',
      )}
    >
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light justify-center">
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-10 pt-2.5">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              SignUp for free
            </h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label="Name"
                type="text"
                variant="solid"
                {...register('name', {
                  required: 'forms:name-required',
                })}
                error={errors.name?.message}
                lang={lang}
              />
              <Input
                label="Email"
                type="email"
                variant="solid"
                {...register('email', {
                  required: 'You must need to provide your email address',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please provide valid email address',
                  },
                })}
                error={errors.email?.message}
                lang={lang}
              />
              <PasswordInput
                label="Password"
                error={errors.password?.message}
                {...register('password', {
                  required: 'You must need to provide your password',
                })}
                lang={lang}
              />
              <div className="relative">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  Register
                </Button>
              </div>
              {error && <AlertFailure message={error} />}
              {success && <AlertSuccess message="Successfully Registered!" />}
              <div className="mt-3 mb-1 text-sm text-center sm:text-base text-body">
                Already registered?
                <button
                  type="button"
                  className="text-sm ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none"
                  onClick={handleSignIn}
                >
                  Sign In Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
