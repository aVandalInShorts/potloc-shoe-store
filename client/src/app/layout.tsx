import type { Metadata } from "next";
import "./globals.css";

import { LocaleProvider } from "@/i18n/i18n";
import StoreProvider from "@/store/Store";
import Body from "@/views/Body/Body";

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
				<Body>{children}</Body>
			</LocaleProvider>
		</StoreProvider>
	);
}
