import { blinker, tektur } from "@/utils/fonts";
import "./globals.scss";

export const metadata = {
	title: "JOBS3 - Decentralising and globalising the employment landscape",
	description: "",
};

// Context Provider
import ContextProvider from "@/context/ContextProvider";
import { Web3Modal } from "@/components/pages/auth/wallet-connect";

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${blinker.variable} ${tektur.variable}`}>
			<body>
				<Web3Modal>
					<ContextProvider>
						{children}
					</ContextProvider>
				</Web3Modal>
			</body>
		</html>
	);
}
