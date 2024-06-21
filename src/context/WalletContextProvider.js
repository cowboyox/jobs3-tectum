'use client'; // This is a client component

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import dynamic from 'next/dynamic';
import { useCallback, useMemo } from 'react';

import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { NetworkConfigurationProvider } from './NetworkConfigurationProvider';

import { RPC_ENDPOINT } from '@/utils/constants';

const ReactUIWalletModalProviderDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletModalProvider,
  { ssr: false }
);

const WalletContextProvider = ({ children }) => {
  const { autoConnect } = useAutoConnect();
  // const { networkConfiguration } = useNetworkConfiguration();

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  const onError = useCallback((error) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider autoConnect={autoConnect} onError={onError} wallets={wallets}>
        <ReactUIWalletModalProviderDynamic>{children}</ReactUIWalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ParentWalletContextProvider = ({ children }) => {
  return (
    <>
      <NetworkConfigurationProvider>
        <AutoConnectProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
      </NetworkConfigurationProvider>
    </>
  );
};
