"use client";

import { i18n } from "@/i18n/i18n";
import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import Close from "@/svg/close.svg";
import { StoreActionTypesEnum, useStoreContext } from "@/store/Store";
import CartItem from "./CartItem/CartItem";
import axios from "axios";

export default function Cart() {
	const modalRef = React.useRef<HTMLDialogElement>(null);
	const store = useStoreContext();
	const [price, setPrice] = useState<number>(0);
	const [tax, setTax] = useState<number>(0);

	useEffect(() => {
		if (store?.state.isCartOpen) {
			modalRef.current?.showModal();
		} else {
			modalRef.current?.close();
		}
	}, [store?.state.isCartOpen]);

	useEffect(() => {
		setPrice(
			store?.state.cart
				? store?.state.cart
						.map((item) => item.quantity * 10)
						.reduce((a, b) => a + b, 0)
				: 0
		);

		setTax(price * 0.05 + price * 1.05 * 0.09975);
	}, [store?.state.cart, price]);

	const handleModalClose = () => {
		store?.dispatch({
			type: StoreActionTypesEnum.SET_CART_OPEN,
			payload: false,
		});
	};

	const handleOutsideClick: React.MouseEventHandler<HTMLDialogElement> = (
		e
	) => {
		if (e.target === modalRef.current) {
			handleModalClose();
		}
	};

	const handleCartSubmit = async () => {
		const cart = store?.state.cart.map((item) => {
			return { model: item.model, quantity: item.quantity };
		});

		try {
			const response = await axios.post("/api/cart", { cart });
			console.log("Cart submitted", response.data);
		} catch (error) {
			console.error("Failed to submit cart", error);
		}
	};

	const items = store?.state.cart.map((item, index) => {
		return (
			<CartItem
				key={item.model + "-" + index}
				model={item.model}
				quantity={item.quantity}
			/>
		);
	});

	return (
		<dialog
			className={styles.modal}
			ref={modalRef}
			onClick={handleOutsideClick}
		>
			<div className={styles["title-ctn"]}>
				<h3 className={styles.title}>{i18n.t("CART.TITLE")}</h3>
				<button type="button" onClick={handleModalClose}>
					<Close />
				</button>
			</div>
			<div className={styles.items}>
				{store?.state.cart.length === 0 && i18n.t("CART.EMPTY")}
				{items}
			</div>
			<div className={styles.summary}>
				<div className={styles["summary-list"]}>
					{/* The prices here are fictional and are simple here to add dynamism */}
					<span>{i18n.t("CART.SUBTOTAL")}</span>
					<span>{(items?.length ? price : 0).toFixed(2)}$</span>
					<span>{i18n.t("CART.TAX")}</span>
					<span>{(items?.length ? tax : 0).toFixed(2)}$</span>
					<span>{i18n.t("CART.TOTAL")}</span>
					<span>
						{items?.length
							? (price + (items?.length ? tax : 0)).toFixed(2)
							: 0}
						$
					</span>
				</div>
				<button
					type="button"
					className="button"
					onClick={handleCartSubmit}
				>
					{i18n.t("CART.BUY")}
				</button>
			</div>
		</dialog>
	);
}
