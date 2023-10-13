import { FC, ReactElement, ReactNode } from 'react';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';

  interface Props {
    children: ReactNode;
  }

  const queryClient = new QueryClient();

  export const ApiClientProvider : FC<Props> = ({children}) : ReactElement => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>  
    );