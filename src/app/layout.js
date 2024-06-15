import './globals.scss';
import './globals.css';

import { Web3Modal } from '@/components/pages/auth/wallet-connect';
import { Toaster } from '@/components/ui/toaster';
import ContextProvider from '@/context/ContextProvider';
import { SocketProvider } from '@/context/socket';
import { ParentWalletContextProvider } from '@/context/WalletContextProvider';

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
            <ContextProvider>
              <SocketProvider>{children}</SocketProvider>
            </ContextProvider>
          </ParentWalletContextProvider>
        </Web3Modal>
        <Toaster />
      </body>
    </html>
  );
}
