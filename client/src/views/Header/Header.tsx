"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./Header.module.css";
import { i18n } from "@/i18n/i18n";
import Logo from "@/svg/logo.svg";

export default function Header() {
	const [currLanguage, setCurrLanguage] = useState("fr");

	const handleLanguageChange = () => {
		// const newLocale = i18n.locale() === "fr" ? "en" : "fr";
		// i18n.locale(newLocale);
		// setOtherLanguage(newLocale === "fr" ? "en" : "fr");
	};

	return (
		<header className={styles.header}>
			<div className={styles.ctn}>
				<Link href="/" className={styles.logo}>
					<Logo />
				</Link>

				<nav className={styles.nav}>
					<Link href="/" locale={currLanguage}>
						{i18n.t("HEADER.HOMEPAGE")}
					</Link>
					<Link href="/shop" locale={currLanguage}>
						{i18n.t("HEADER.SHOP")}
					</Link>
					<Link
						href="/"
						onClick={handleLanguageChange}
						locale={currLanguage === "fr" ? "en" : "fr"}
					>
						{currLanguage === "fr" ? "EN" : "FR"}
					</Link>
				</nav>
			</div>
		</header>
	);
}
