"use client";

import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";
import { i18n } from "@/i18n/i18n";
import Logo from "@/svg/logo.svg";

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.ctn}>
				<Link href="/" className={styles.logo}>
					<Logo />
				</Link>

				<nav className={styles.nav}>
					<Link href="/">{i18n.t("HEADER.HOMEPAGE")}</Link>
					<Link href="/shop">{i18n.t("HEADER.SHOP")}</Link>
				</nav>
			</div>
		</header>
	);
}
