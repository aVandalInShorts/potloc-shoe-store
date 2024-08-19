import { i18n } from "@/i18n/i18n";
import React from "react";
import styles from "./ShopListItem.module.css";
import { StoreActionTypesEnum, useStoreContext } from "@/store/Store";

export interface ShopListItemProps {
	model: string;
	stores: {
		store: string;
		inventory: number;
	}[];
}

export default function ShopListItem(props: ShopListItemProps) {
	const store = useStoreContext();

	const handleAddToCart = () => {
		store?.dispatch({
			type: StoreActionTypesEnum.ADD_CART_PRODUCT,
			payload: props.model,
		});
		store?.dispatch({
			type: StoreActionTypesEnum.SET_CART_OPEN,
			payload: true,
		});
	};

	return (
		<article className={styles.item}>
			<div>
				<h2>{props.model}</h2>
				<div className={styles.shops}>
					<div className={styles["shops-title"]}>
						{i18n.t("SHOP.ITEMS.SHOPS-LIST")}
					</div>
					<div className={styles["shops-list"]}>
						{props.stores.map((store) => {
							return (
								<div
									key={store.store}
									className={styles["shop-item"]}
								>
									{store.store}:{" "}
									<span>{store.inventory}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div>
				<button
					type="button"
					className="button"
					data-text={i18n.t("SHOP.ITEMS.ADD-TO-CART")}
					onClick={handleAddToCart}
				>
					{i18n.t("SHOP.ITEMS.ADD-TO-CART")}
				</button>
			</div>
		</article>
	);
}
