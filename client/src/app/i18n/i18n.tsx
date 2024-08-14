import rosetta from 'rosetta';

export const i18n = rosetta({
	fr: { test: 'test'},
	en: {}
});

// Default language. To be defined asynchronously by Next 
i18n.locale('fr');