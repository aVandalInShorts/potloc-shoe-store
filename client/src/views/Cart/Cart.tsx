"use client";

import { i18n } from "@/i18n/i18n";
import React, { useEffect } from "react";
import styles from "./Cart.module.css";
import Close from "@/svg/close.svg";
import { StoreActionTypesEnum, useStoreContext } from "@/store/Store";

export default function Cart() {
	const modalRef = React.useRef<HTMLDialogElement>(null);
	const store = useStoreContext();

	useEffect(() => {
		if (store?.state.isCartOpen) {
			modalRef.current?.showModal();
		} else {
			modalRef.current?.close();
		}
		console.log("Cart is open:", store?.state.isCartOpen);
	}, [store?.state.isCartOpen]);

	const handleModalClose = () => {
		console.log("CLOOOOSE");
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
			<div className={styles.items}>{i18n.t("CART.EMPTY")}</div>
			<div className={styles.summary}>
				<div className={styles["summary-list"]}>
					<span>{i18n.t("CART.SUBTOTAL")}</span>
					<span>0.00$</span>
					<span>{i18n.t("CART.TAX")}</span>
					<span>0.00$</span>
					<span>{i18n.t("CART.TOTAL")}</span>
					<span>0.00$</span>
				</div>
				<button type="button" className="button">
					{i18n.t("CART.BUY")}
				</button>
			</div>
		</dialog>
	);
}
