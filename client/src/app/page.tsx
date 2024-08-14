import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
	const ws = new WebSocket("ws://localhost:8080/");

	ws.onmessage = (event) => {
		// console.log(event.data);
	};

	return (
		<main className={styles.main}>
			HOMEPAGE	
		</main>
	);
}
