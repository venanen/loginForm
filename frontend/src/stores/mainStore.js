import {action, decorate, observable} from "mobx";

class mainStore{
	constructor(){
		this._this = this;
		this.lang = this.getDefaultLang();
	}

	/**
	 * Получение установленного языка или создание его по умолчанию
	 * @returns {string}
	 */
	getDefaultLang(){
		if(localStorage.getItem('locale') === null || localStorage.getItem('locale')==='' || typeof localStorage.getItem('locale')==='undefined'){
			localStorage.setItem('locale', 'ru');
			return 'ru';
		}else{
			return localStorage.getItem('locale');
		}

	}

	/**
	 * Установка нового языка по умолчанию
	 * @param lang
	 */
	setLang(lang){
		this.lang = lang;
		localStorage.setItem('locale', lang)
	}


}
decorate(mainStore, {
	lang: observable,
	setLang: action,

})
export default new mainStore();