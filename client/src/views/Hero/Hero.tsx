"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/svg/logo.svg";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero(props: {
	mainTitle: string;
	otherTitle: string;
	button?: {
		value: string;
		url: string;
	}[];
}) {
	const [animStart, setAnimStart] = useState(false);

	useEffect(() => {
		// The animation will start after the component is mounted
		// to prevent the animation from starting during loading
		setAnimStart(true);
	}, []);

	return (
		<section
			className={`section ${styles.hero}${animStart ? " anim-start" : ""}`}
		>
			<div className={`section-content-narrow ${styles["hero-content"]}`}>
				<Logo className={styles.logo} />
				<h1 className={styles["main-title"]}>{props.mainTitle}</h1>
				<h2 className={styles["other-title"]}>{props.otherTitle}</h2>
				{props.button?.length && (
					<div className={styles.btns}>
						{props.button.map((button, index) => (
							<Link
								className={`button button-${
									index % 2 === 0 ? "green" : "orange"
								}`}
								key={`hero-button-${index}`}
								href={button.url}
								data-text={button.value}
							>
								{button.value}
							</Link>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
