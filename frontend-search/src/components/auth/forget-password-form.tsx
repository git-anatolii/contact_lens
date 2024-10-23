import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import { useForm } from 'react-hook-form';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';

type FormValues = {
  email: string;
};

const defaultValues = {
  email: '',
};

const ForgetPasswordForm = ({ lang }: { lang: string }) => {
  const { closeModal, openModal } = useModalAction();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  function handleSignIn() {
    closeModal();
  }

  const onSubmit = (values: FormValues) => {
    console.log(values, 'token');
  };

  return (
    <div className="w-full px-5 py-6 mx-auto rounded-lg sm:p-8 bg-brand-light sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <p className="mt-3 mb-8 text-sm md:text-base text-body sm:mt-4 sm:mb-10">
          Forget Password Help
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          label="Email"
          type="email"
          variant="solid"
          className="mb-4"
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

        <Button
          type="submit"
          variant="formButton"
          className="w-full mt-0 h-11 md:h-12"
        >
          Reset Password
        </Button>
      </form>
      <div className="relative flex flex-col items-center justify-center mt-8 mb-6 text-sm text-heading sm:mt-10 sm:mb-7">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-brand-light">
          or continue with
        </span>
      </div>
      <div className="text-sm text-center sm:text-15px text-brand-muted">
        Back To{' '}
        <button
          type="button"
          className="font-medium underline text-brand-dark hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
