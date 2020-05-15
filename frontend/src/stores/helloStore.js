import {action, decorate, observable} from "mobx";
import config from '../config/config'
import {helloCore} from "../core/exportCore";

class HelloStore {
	constructor() {
		this._this = this;
		this.blur = false;
		this.login = '';
		this.password = '';
		this.loading = false;

		/**
		 * Клонировние объекта состояния по ссылке из helloCore
		 * @type {{isError: boolean, fields: {}, customError: string}}
		 */
		this.error = helloCore.error;
		this.history = '';


	}
	/**
	 * Обновление ошибки. Функция создана на случай расширения объекта состояния. Пока состояние представляет собой объект- не так важна
	 */
	updateError(){
		this.error = helloCore.error;
	}
	/**
	 * Установка значения конкретного поля
	 * @param field
	 * @param e
	 */
	setValue(field,e){
		if(!this.hasOwnProperty(field))
			throw new Error('Такого поля не существует')
		helloCore.dFE(field);
		this.updateError();
		this[field] = e.target.value;

	}
	/**
	 * Включение размытия заднего фона
	 */
	setBlurOn() {
		this.blur = true;

	}
	/**
	 * Выключение размытия заднего фона
	 */
	setBlurOff() {
		this.blur = false;

	}
	/**
	 * Установить значения поля логина
	 * @param e
	 */
	setLogin(e) {
		this.setValue('login', e)
	}
	/**
	 * Установить значения поля пароля
	 * @param e
	 */
	setPassword(e) {
		this.setValue('password', e)
	}


	/**
	 * Функция авторизации
	 * @returns {Promise<void>}
	 */
	async signIn() {
		this.loading = true;
		let result = await helloCore.signIn(this.login, this.password);
		if(!result.isError && result.hasOwnProperty('fields')){
			this.history.push('/dashboard')
		}
		this.error = result;
		this.loading = false;


	}
}

decorate(HelloStore, {
	blur: observable,
	login: observable,
	password: observable,
	loading: observable,
	error: observable,
	setBlurOn: action,
	setBlurOff: action,
	setValue: action,
	signIn: action,

})
export default new HelloStore();