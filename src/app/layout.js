import { blinker, tektur } from "@/utils/fonts";
import "./globals.scss";

export const metadata = {
	title: "JOBS3 - Decentralising and globalising the employment landscape",
	description: "",
};

// Context Provider
import ContextProvider from "@/context/ContextProvider";

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${blinker.variable} ${tektur.variable}`}>
			<ContextProvider>
				<body>{children}</body>
			</ContextProvider>
		</html>
	);
}
