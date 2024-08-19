import React from "react";
import styles from "./CartItem.module.css";
import {
	CartItemInterface,
	StoreActionTypesEnum,
	useStoreContext,
} from "@/store/Store";
import { i18n } from "@/i18n/i18n";

export default function CartItem(props: CartItemInterface) {
	const store = useStoreContext();

	const OnChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
		store?.dispatch({
			type: StoreActionTypesEnum.UPDATE_CART_PRODUCT,
			payload: {
				model: props.model,
				quantity: parseInt(e.target.value),
			},
		});
	};

	const onDeleteItem = () => {
		store?.dispatch({
			type: StoreActionTypesEnum.REMOVE_CART_PRODUCT,
			payload: props.model,
		});
	};

	return (
		<div className={styles.item}>
			<div>
				<div className={styles["title"]}>{props.model}</div>
				<input
					type="number"
					min="0"
					max="100"
					value={props.quantity}
					onInput={OnChangeCount}
				/>
			</div>
			<div className={styles.price}>
				<div>
					<span>{i18n.t("CART.PRODUCT.PRICE")}</span>
					{(props.quantity * 10).toFixed(2)}
				</div>
				<div>
					<button
						type="button"
						onClick={onDeleteItem}
						className={styles.remove}
					>
						{i18n.t("CART.PRODUCT.REMOVE")}
					</button>
				</div>
			</div>
		</div>
	);
}
