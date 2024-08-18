"use client";

import rosetta from "rosetta";
import headerFr from "./header/fr.json";
import headerEn from "./header/en.json";

import homepageFr from "./homepage/fr.json";
import homepageEn from "./homepage/en.json";

import shopFr from "./shop/fr.json";
import shopEn from "./shop/en.json";

import cartFr from "./cart/fr.json";
import cartEn from "./cart/en.json";

import { createContext, ReactNode, useContext, useState } from "react";

export const i18n = rosetta({
	fr: {},
	en: {},
});

// Header
i18n.set("fr", headerFr[0]);
i18n.set("en", headerEn[0]);

// Homepage
i18n.set("fr", homepageFr[0]);
i18n.set("en", homepageEn[0]);

// SHOP
i18n.set("fr", shopFr[0]);
i18n.set("en", shopEn[0]);

// CART
i18n.set("fr", cartFr[0]);
i18n.set("en", cartEn[0]);

// Default language. To be defined asynchronously by Next
i18n.locale("fr");

interface LocaleContextProps {
	locale: string;
	setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
	const [locale, setLocale] = useState("fr");

	const changeLocale = (newLocale: string) => {
		i18n.locale(newLocale);
		setLocale(newLocale);
	};

	return (
		<LocaleContext.Provider value={{ locale, setLocale: changeLocale }}>
			{children}
		</LocaleContext.Provider>
	);
};

export const useLocale = () => {
	return useContext(LocaleContext);
};
