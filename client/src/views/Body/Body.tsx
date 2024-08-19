"use client";

import { useStoreContext } from "@/store/Store";
import { Roboto } from "next/font/google";
import React from "react";
import Header from "@/views/Header/Header";
import Cart from "@/views/Cart/Cart";
import { i18n } from "@/i18n/i18n";
import styles from "./Body.module.css";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700", "900"],
});

export default function Body({ children }: { children: React.ReactNode }) {
	const store = useStoreContext();

	return (
		<html
			lang={i18n.locale()}
			className={`${
				store?.state.isCartOpen ? styles["html-disable-scroll"] : ""
			}`}
		>
			<body
				className={`${roboto.className}${
					store?.state.isCartOpen
						? ` ${styles["disable-scroll"]}`
						: ""
				}`}
			>
				<Header />
				{children}
				<Cart />
			</body>
		</html>
	);
}
