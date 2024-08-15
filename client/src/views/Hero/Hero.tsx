import React from "react";
import Logo from "@/svg/logo.svg";
import Link from "next/link";

export default function Hero(props: {
	mainTitle: string;
	otherTitle: string;
	button?: {
		value: string;
		url: string;
	}[];
}) {
	return (
		<section>
			<Logo />
			<h1>{props.mainTitle}</h1>
			<h2>{props.otherTitle}</h2>
			{props.button?.length && (
				<div>
					{props.button.map((button) => (
						<Link key={button.value} href={button.url}>
							{button.value}
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
