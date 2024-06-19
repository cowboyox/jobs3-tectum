import "./globals.scss";
import "./globals.css"; 
import { Toaster } from "@/components/ui/toaster"
import { SocketProvider } from '@/context/socket';

export const metadata = {
	title: "JOBS3 - Decentralising and globalising the employment landscape",
	description: "",
};

// Context Provider
import ContextProvider from "@/context/ContextProvider";
import { Web3Modal } from "@/components/pages/auth/wallet-connect";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Web3Modal>
					<ContextProvider>
						<SocketProvider>
							{children}
						</SocketProvider>
					</ContextProvider>
				</Web3Modal>
				<Toaster />
			</body>
		</html>
	);
}
