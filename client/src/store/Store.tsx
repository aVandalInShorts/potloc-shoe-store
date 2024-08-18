"use client";

import React, { createContext, useContext, useReducer } from "react";
import WS from "./WS";

interface StoreStateInterface {
	isCartOpen: boolean;
	inventory: StoreProductInterface[];
}

export interface StoreProductInterface {
	store: string;
	model: string;
	inventory: number;
}

export enum StoreActionTypesEnum {
	SET_PRODUCT = "SET_PRODUCT",
	SET_CART_OPEN = "SET_CART_OPEN",
}

interface SetProductAction {
	type: StoreActionTypesEnum.SET_PRODUCT;
	payload: StoreProductInterface;
}

interface SetCartOpenAction {
	type: StoreActionTypesEnum.SET_CART_OPEN;
	payload: boolean;
}

type StoreActionType = SetProductAction | SetCartOpenAction;

interface StoreContextInterface {
	state: StoreStateInterface;
	dispatch: React.Dispatch<StoreActionType>;
}

function storeReducer(
	state: StoreStateInterface,
	action: StoreActionType
): StoreStateInterface {
	if (action.type === StoreActionTypesEnum.SET_PRODUCT) {
		const newInventory: StoreProductInterface[] = [...state.inventory];
		const itemIndex = newInventory.findIndex((item) => {
			return (
				item.store === action.payload.store &&
				item.model === action.payload.model
			);
		});

		if (newInventory[itemIndex]) {
			newInventory[itemIndex].inventory = action.payload.inventory;
		} else {
			newInventory.push(action.payload);
		}

		return { ...state, inventory: newInventory };
	} else if (action.type === StoreActionTypesEnum.SET_CART_OPEN) {
		return { ...state, isCartOpen: action.payload };
	} else {
		return state;
	}
}

const initialState: StoreStateInterface = { isCartOpen: false, inventory: [] };

export const storeContext = createContext<StoreContextInterface | null>(null);

export default function StoreProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [state, dispatch] = useReducer(storeReducer, initialState);

	return (
		<storeContext.Provider value={{ state, dispatch }}>
			<WS>{children}</WS>
		</storeContext.Provider>
	);
}

export const useStoreContext = () => {
	return useContext(storeContext);
};
