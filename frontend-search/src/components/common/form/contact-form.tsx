'use client';

import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useIsMounted } from '@utils/use-is-mounted';

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC<{ lang: string }> = ({ lang }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  function onSubmit(values: ContactFormValues) {
    console.log(values, 'Contact');
  }

  const mounted = useIsMounted();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Input
        variant="solid"
        label="Name (required)"
        placeholder="Enter Your Full Name"
        {...register('name', { required: 'forms:name-required' })}
        error={errors.name?.message}
        lang={lang}
      />
      <Input
        type="email"
        variant="solid"
        label="Email (required)"
        placeholder="Enter Your Email"
        {...register('email', {
          required: 'forms:email-required',
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'forms:email-error',
          },
        })}
        error={errors.email?.message}
        lang={lang}
      />
      <Input
        variant="solid"
        type="text"
        label="Phone Number (optional)"
        placeholder="Enter Your Phone"
        {...register('phone')}
        lang={lang}
      />
      <TextArea
        variant="solid"
        label="Message"
        {...register('message')}
        placeholder="Write your message here"
        lang={lang}
      />
      <Button variant="formButton" className="w-full" type="submit">
        {mounted && <>Send Message</>}
      </Button>
    </form>
  );
};

export default ContactForm;
