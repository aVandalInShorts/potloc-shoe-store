import rosetta from 'rosetta';
import headerFr from './header/fr.json'
import headerEn from './header/en.json'

import homepageFr from './homepage/fr.json'
import homepageEn from './homepage/en.json'

export const i18n = rosetta({
	fr: {},
	en: {}
});


// Header
i18n.set('fr', headerFr[0]);
i18n.set('en', headerEn[0]);

// Homepage
i18n.set('fr', homepageFr[0]);
i18n.set('en', homepageEn[0]);

// Default language. To be defined asynchronously by Next 
i18n.locale('fr');