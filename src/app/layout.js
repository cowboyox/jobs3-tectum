import './globals.scss';
import './globals.css';

import { Web3Modal } from '@/components/pages/auth/wallet-connect';
import { Toaster } from '@/components/ui/toaster';
import ContextProvider from '@/context/ContextProvider';
import { SocketProvider } from '@/context/socket';
import { ParentWalletContextProvider } from '@/context/WalletContextProvider';

require('@solana/wallet-adapter-react-ui/styles.css');

export const metadata = {
  description: '',
  title: 'JOBS3 - Decentralising and globalising the employment landscape',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Web3Modal>
          <ParentWalletContextProvider>
            <SocketProvider>
              <ContextProvider>{children}</ContextProvider>
            </SocketProvider>
          </ParentWalletContextProvider>
        </Web3Modal>
        <Toaster />
      </body>
    </html>
  );
}
