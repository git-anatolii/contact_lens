import ShopsSingleDetails from '@components/shops/shops-single-details';

export default async function ShopDetailsPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <ShopsSingleDetails lang={lang} />
    </>
  );
}

