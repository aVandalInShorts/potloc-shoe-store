import React, { useEffect } from "react";
import { StoreActionTypesEnum, useStoreContext } from "./Store";

export default function WS({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const ws = new WebSocket("ws://localhost:8080/");
	const store = useStoreContext();

	useEffect(() => {
		console.info("WS mounted");
		ws.onmessage = (event) => {
			store?.dispatch({
				type: StoreActionTypesEnum.SET_PRODUCT,
				payload: JSON.parse(event.data),
			});

			return () => {
				ws.close();
			};
		};
	}, []);

	return <>{children}</>;
}
