'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from 'src/lib/hook';
import { loginUser, googleLoginUser } from 'src/lib/reducers/userSlice';
import { RootState, AppDispatch } from 'src/lib/store';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { LoginInputType } from '@utils/types';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaGoogle } from 'react-icons/fa';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import AlertFailure from '@components/ui/alert/alert-failure';
import AlertSuccess from '@components/ui/alert/alert-success';
import { axiosApi } from 'src/lib/api/userApi';
import { API_ENDPOINTS } from '@utils/api-endpoints';

interface LoginFormProps {
  lang: string;
  isPopup?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ lang }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  async function onSubmit({ email, password, remember_me }: LoginInputType) {
    const userLoginData: LoginInputType = {
      email: email,
      password: password,
      remember_me: remember,
    };
    await dispatch(loginUser(userLoginData)).unwrap();
    router.push(`/${lang}${ROUTES.HOME}`);
  }
  function handleSignUp() {
    router.push(`/${lang}${ROUTES.SIGN_UP}`);
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }
  const handleGoogleLogin = async () => {
    try {
      const url = API_ENDPOINTS.GOOGLE_LOGIN;
      const response = await axiosApi.get(url);
      const authUrl = response.data.auth_url;

      window.location.href = authUrl;
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  useEffect(() => {
    const handleGoogleLoginCallBack = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          await dispatch(googleLoginUser(code)).unwrap();
          router.push(`/${lang}${ROUTES.HOME}`);
        } catch (error) {
          console.error('Error during login:', error);
        }
      }
    };

    handleGoogleLoginCallBack();
  }, []);

  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative'
      )}
    >
      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light justify-center">
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 shadow-dropDown rounded-md flex flex-col justify-center">
          <div className="mb-10 text-center">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              Sign into you account
            </h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label="Email Address"
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
              <div className="flex items-center justify-center">
                <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>
                  <label
                    onClick={() => setRemember(!remember)}
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    Remember me
                  </label>
                </div>
                <div className="flex ltr:ml-auto rtl:mr-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-5 mb-3 text-sm text-center sm:text-15px text-body">
            Don’t have an account?
            <button
              type="button"
              className="text-sm text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
              onClick={handleSignUp}
            >
              Create Account
            </button>
          </div>
          {error && <AlertFailure message={error} />}
          {success && <AlertSuccess message="Login Successfully!" />}
          <div className="relative flex flex-col items-center justify-center text-sm">
            <span className="mt-6 text-sm text-brand-dark opacity-70">
              or continue with
            </span>
          </div>

          <div className="flex justify-center mt-5 space-x-2.5">
            <button
              onClick={handleGoogleLogin}
              className="flex border border-border-base rounded-lg p-2"
            >
              <FcGoogle className="w-5 h-5 mr-1" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
