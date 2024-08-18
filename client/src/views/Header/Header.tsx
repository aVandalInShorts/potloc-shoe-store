"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./Header.module.css";
import { i18n, useLocale } from "@/i18n/i18n";
import Logo from "@/svg/logo.svg";
import CartIcon from "@/svg/cart.svg";
import { StoreActionTypesEnum, useStoreContext } from "@/store/Store";

export default function Header() {
	const [currLanguage, setCurrLanguage] = useState("fr");
	const store = useStoreContext();
	const local = useLocale();

	const handleLanguageChange = () => {
		const newLocale = i18n.locale() === "fr" ? "en" : "fr";
		i18n.locale(newLocale);
		local?.setLocale(newLocale);
		setCurrLanguage(newLocale);
		console.log("Language changed to", newLocale);
	};

	const handleCartOpen = () => {
		store?.dispatch({
			type: StoreActionTypesEnum.SET_CART_OPEN,
			payload: true,
		});
	};

	return (
		<header className={styles.header}>
			<div className={styles.ctn}>
				<Link href="/" className={styles.logo}>
					<Logo />
				</Link>

				<nav className={styles.nav}>
					<Link href="/">{i18n.t("HEADER.HOMEPAGE")}</Link>
					<Link href="/shop">{i18n.t("HEADER.SHOP")}</Link>
					<button type="button" onClick={handleLanguageChange}>
						{currLanguage === "fr" ? "EN" : "FR"}
					</button>
					<button
						type="button"
						onClick={handleCartOpen}
						className={styles["cart-btn"]}
					>
						<CartIcon />
					</button>
				</nav>
			</div>
		</header>
	);
}
