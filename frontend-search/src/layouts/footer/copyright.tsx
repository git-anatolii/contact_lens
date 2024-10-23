import Image from '@components/ui/image';
import Container from '@components/ui/container';
interface CopyrightProps {
  lang: string;
  variant?: 'default' | 'medium';
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({ lang, variant = 'default' }) => {
  return (
    <div className="border-t border-white/10  pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 sm:mb-0">
      <Container>
        <div className="justify-center items-center flex flex-col md:flex-row text-center">
          <p className="text-gray-400 text-sm leading-7 lg:leading-[27px]">
            &copy;&nbsp;Copyright {year}&nbsp;
            <a
              className="transition-colors duration-200 ease-in-out text-brand hover:text-brand-light"
              href=""
            >
              © 2020 The Right Contact, Inc
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Copyright;
