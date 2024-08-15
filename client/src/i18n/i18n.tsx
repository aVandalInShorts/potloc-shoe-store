import rosetta from 'rosetta';
import headerFr from './header/fr.json'
import headerEn from './header/en.json'

export const i18n = rosetta({
	fr: {},
	en: {}
});


i18n.set('fr', headerFr[0]);
i18n.set('en', headerEn[0]);

// Default language. To be defined asynchronously by Next 
i18n.locale('fr');