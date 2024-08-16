"use client";

import { useStoreContext } from "@/store/Store";
import React, { useEffect, useState } from "react";
import ShopListItem, { ShopListItemProps } from "./ShopListItem/ShopListItem";
import { i18n } from "@/i18n/i18n";
import styles from "./ShopList.module.css";

export default function ShopList() {
	const store = useStoreContext();
	const [items, setItems] = useState<ShopListItemProps[]>([]);
	const [itemsElement, setItemsElement] = useState<JSX.Element[]>([]);

	useEffect(() => {
		store &&
			store.state.inventory.forEach((item) => {
				const itemIndex = items.findIndex(
					(i) => i.model === item.model
				);

				if (itemIndex >= 0) {
					const storyIndex = items[itemIndex].stores.findIndex(
						(s) => s.store === item.store
					);
					if (storyIndex >= 0) {
						items[itemIndex].stores[storyIndex].inventory =
							item.inventory;
					} else {
						items[itemIndex].stores.push({
							store: item.store,
							inventory: item.inventory,
						});
					}
				} else {
					items.push({
						model: item.model,
						stores: [
							{
								store: item.store,
								inventory: item.inventory,
							},
						],
					});
				}
			});

		setItemsElement(
			items.map((item) => {
				return <ShopListItem key={item.model} {...item} />;
			})
		);
	}, [store, store?.state.inventory, items]);

	return (
		<section className={`section ${styles["list-section"]}`}>
			<div className="section-content">
				<h1>{i18n.t("SHOP.TITLE")}</h1>
				<div className={`items-list ${styles.list}`}>
					{itemsElement}
				</div>
			</div>
		</section>
	);
}
