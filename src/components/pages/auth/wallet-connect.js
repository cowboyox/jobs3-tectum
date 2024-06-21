'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage, WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '905b3d24b01e0ca2b1c741cc9bbb839a';

// 2. Create wagmiConfig
const metadata = {
  description: 'Web3Modal Example',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  name: 'Web3Modal',
  url: 'https://web3modal.com',
};

// Create wagmiConfig
const chains = [mainnet, sepolia];
const config = defaultWagmiConfig({
  chains,
  metadata,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
// 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, chains })
const queryClient = new QueryClient();

// Create modal
createWeb3Modal({
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  projectId,
  wagmiConfig: config,
});

export function Web3Modal({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
