import localeData from '../config/locales.json'


class Locale{
	/**
	 * Установка языка сайта
	 * @param lang
	 */
	constructor(lang){
		this.lang = lang
	}

	/**
	 * Получение локализованной фразы по ее алиасу. Если фраза не переведена на нужный язык, вернет первую из набора. Если фразы нет вообще - вернет ее алиас
	 * @param phrase
	 * @returns {string}
	 */
	getPhrase(phrase){
		if(!localeData["data"].hasOwnProperty(phrase))
			return "[["+phrase+"]]";

		return (localeData['data'][phrase].hasOwnProperty(this.lang))?localeData['data'][phrase][this.lang]:localeData['data'][phrase][Object.keys(localeData['data'][phrase])[0]];
	}

	/**
	 * Алиас для getPhrase
	 * @param phrase
	 * @returns {string}
	 */
	p(phrase){ //алиас для сокращения кода
		return this.getPhrase(phrase);
	}

	/**
	 * Для изменения языка сайта НЕ реактивно
	 * @param lang
	 */
	setLocale(lang){
		this.lang=lang;
	}

}
export default Locale;