'use client';
import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmhtnbswx00zji80cht133de1"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: '../public/CroptrustLog.png',
        },
        // Configure Privy's login methods
        loginMethods: ['google'],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
