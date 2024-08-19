"use client";

import React, { createContext, useContext, useReducer } from "react";
import WS from "./WS";

interface StoreStateInterface {
	isCartOpen: boolean;
	cart: CartItemInterface[];
	inventory: StoreProductInterface[];
}

export interface CartItemInterface {
	model: string;
	quantity: number;
}
export interface StoreProductInterface {
	store: string;
	model: string;
	inventory: number;
}

export enum StoreActionTypesEnum {
	SET_PRODUCT = "SET_PRODUCT",
	SET_CART_OPEN = "SET_CART_OPEN",
	ADD_CART_PRODUCT = "ADD_CART_PRODUCT",
	UPDATE_CART_PRODUCT = "UPDATE_CART_PRODUCT",
	REMOVE_CART_PRODUCT = "REMOVE_CART_PRODUCT",
}

interface SetProductAction {
	type: StoreActionTypesEnum.SET_PRODUCT;
	payload: StoreProductInterface;
}

interface SetCartOpenAction {
	type: StoreActionTypesEnum.SET_CART_OPEN;
	payload: boolean;
}

interface AddCartProductAction {
	type: StoreActionTypesEnum.ADD_CART_PRODUCT;
	payload: string;
}

interface SetCartProductAction {
	type: StoreActionTypesEnum.UPDATE_CART_PRODUCT;
	payload: {
		model: string;
		quantity: number;
	};
}

interface RemoveCartProductAction {
	type: StoreActionTypesEnum.REMOVE_CART_PRODUCT;
	payload: string;
}

type StoreActionType =
	| SetProductAction
	| SetCartOpenAction
	| AddCartProductAction
	| SetCartProductAction
	| RemoveCartProductAction;

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
	} else if (action.type === StoreActionTypesEnum.ADD_CART_PRODUCT) {
		const newCart: CartItemInterface[] = [...state.cart];
		const itemIndex = newCart.findIndex((item) => {
			return item.model === action.payload;
		});

		if (newCart[itemIndex]) {
			newCart[itemIndex].quantity++;
		} else {
			newCart.push({ model: action.payload, quantity: 1 });
		}

		return { ...state, cart: newCart };
	} else if (action.type === StoreActionTypesEnum.UPDATE_CART_PRODUCT) {
		const newCart: CartItemInterface[] = [...state.cart];
		const itemIndex = newCart.findIndex((item) => {
			return item.model === action.payload.model;
		});

		if (newCart[itemIndex]) {
			newCart[itemIndex].quantity = action.payload.quantity;
		} else {
			newCart.push({
				model: action.payload.model,
				quantity: action.payload.quantity,
			});
		}

		return { ...state, cart: newCart };
	} else if (action.type === StoreActionTypesEnum.REMOVE_CART_PRODUCT) {
		const newCart: CartItemInterface[] = [...state.cart];
		const itemIndex = newCart.findIndex((item) => {
			return item.model === action.payload;
		});

		if (newCart[itemIndex]) {
			newCart.splice(itemIndex, 1);
		}

		return { ...state, cart: newCart };
	} else {
		return state;
	}
}

const initialState: StoreStateInterface = {
	isCartOpen: false,
	cart: [],
	inventory: [],
};

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
