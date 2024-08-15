import styles from "./page.module.css";
import Hero from "@/views/Hero/Hero";
import { i18n } from "@/i18n/i18n";

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero
				mainTitle={i18n.t("HOMEPAGE.HERO.BIG-TITLE")}
				otherTitle={i18n.t("HOMEPAGE.HERO.SMALL-TITLE")}
				button={[
					{ value: i18n.t("HOMEPAGE.HERO.WOMEN-BUTTON"), url: "/shop" },
					{ value: i18n.t("HOMEPAGE.HERO.MEN-BUTTON"), url: "/shop" },
				]}
			/>
		</main>
	);
}
