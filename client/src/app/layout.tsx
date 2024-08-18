import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { LocaleProvider } from "@/i18n/i18n";
import Header from "@/views/Header/Header";
import StoreProvider from "@/store/Store";
import Cart from "@/views/Cart/Cart";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
	title: "Potloc technical test",
	description: "Create a dynamic store for Aldo the clothing brand.",
	authors: [
		{
			name: "François Vandal",
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<StoreProvider>
			<LocaleProvider>
				<html lang="fr">
					<body className={roboto.className}>
						<Header />
						{children}
						<Cart />
					</body>
				</html>
			</LocaleProvider>
		</StoreProvider>
	);
}
