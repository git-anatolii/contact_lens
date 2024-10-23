import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import { termsAndServices } from '@settings/terms-settings';
import Heading from '@components/ui/heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
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
      <PageHeroSection heroTitle="Terms & Condition" lang={lang} />
      <div className="py-12 lg:py-16 2xl:py-20">
        <Container>
          <div className="w-full xl:max-w-[1200px] mx-auto">
            {termsAndServices?.map((item) => (
              // @ts-ignore
              <div
                key={item.title}
                className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
              >
                <Heading className="mb-4 lg:mb-6 font-body" variant="title">
                  {item.title}
                </Heading>
                <div
                  className="space-y-5 text-sm leading-7 text-brand-muted lg:text-15px"
                  dangerouslySetInnerHTML={{
                    // @ts-ignore
                    __html: item.description,
                  }}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
