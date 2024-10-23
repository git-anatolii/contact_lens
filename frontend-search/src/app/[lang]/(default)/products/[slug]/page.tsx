import Container from '@components/ui/container';
import ProductSingleDetails from '@components/product/product';
import Breadcrumb from '@components/ui/breadcrumb';

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <div className="pt-6 lg:pt-7 pb-10">
        <Container>
          <Breadcrumb lang={lang} />
          <ProductSingleDetails lang={lang} />
        </Container>
      </div>
    </>
  );
}
