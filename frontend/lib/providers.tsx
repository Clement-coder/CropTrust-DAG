'use client';
import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig } from '@privy-io/wagmi';
import { http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProductProvider } from "@/hooks/use-products"
import { CartProvider } from '@/hooks/cartProvider';

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmhtnbswx00zji80cht133de1"
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
logo: '/CroptrustLog.png',
        },
        loginMethods: ['google'],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
            <ProductProvider>
              <CartProvider>{children}</CartProvider>
            </ProductProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
