'use client';

import AddressGrid from '@components/address/address-grid';

const address = [
  {
    id: 1,
    title: 'Home',
    default: true,
    address: {
      lat: 1.357334,
      lng: 103.821417,
      formatted_address:
        'Acme Widgets 123 Widget Street Acmeville, AC 12345 United States of America',
    },
  },
  {
    id: 2,
    title: 'Office',
    default: false,
    address: {
      lat: 51.522379,
      lng: -0.09913,
      formatted_address:
        'Acme Widgets 890 Widget Street Acmeville, AC 213 United States of America.',
    },
  },
];

export default function AddressPageContent({ lang }: { lang: string }) {
  
  return (
    <>
      <AddressGrid address={address} lang={lang} />
    </>
  );
}
