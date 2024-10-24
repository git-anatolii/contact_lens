'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import StoreProvider from './store-provider';

interface ProvidersProps {
  children: React.ReactNode;
  session: any;
}

function Providers({ children, session }: ProvidersProps) {
  const queryClientRef = React.useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <StoreProvider>
      <QueryClientProvider client={queryClientRef.current}>
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default Providers;
