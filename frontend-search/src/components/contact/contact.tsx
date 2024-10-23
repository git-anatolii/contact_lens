import ContactBox from '@components/contact/contact-content';

const data = [
  {
    id: 1,
    title: 'Primary Number',
    default: true,
    number: '(202) 555-0191',
  },
  {
    id: 2,
    title: 'Secondary Number',
    default: false,
    number: '(202) 555-0701',
  },
];

const ContactPage: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="w-full max-w-[1300px] mx-auto">
      <div className="flex flex-wrap">
        <div className="w-full">
          <ContactBox items={data} lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
