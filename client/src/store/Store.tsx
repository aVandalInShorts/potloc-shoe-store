"use client";

import { createContext, useContext, useReducer } from "react";

interface State {
	inventory: Product[];
}

interface Product {
	name: string;
	quantity: number;
}

interface Action {
	type: string;
	payload: any;
}

function storeReducer(state: State, action: Action): State {
	switch (action.type) {
		case "SET_PRODUCT":
			const newInventory = { ...state.inventory };
			if (newInventory[action.payload.name]) {
				newInventory[action.payload.name].quantity = action.payload.quantity;
			} else {
				newInventory[action.payload.name] = action.payload;
			}

			return { ...state, inventory: newInventory };
		default:
			return state;
	}
}

const storeContext = createContext({});

export default function StoreProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [state, dispatch] = useReducer(storeReducer, { inventory: [] });

	return (
		<storeContext.Provider value={{ ...state, dispatch }}>
			{children}
		</storeContext.Provider>
	);
}

export const useStoreContext = () => {
	return useContext(storeContext);
};
