import {action, computed, decorate, observable} from "mobx";
import {signUpCore} from '../core/exportCore'
class SignupStore {


	constructor() {
		this._this = this;
		this.loading = false;
		this.blur = false;
		this.login = '';
		this.password = '';
		this.repeatPassword = '';
		this.phone = '';
		this.mail = '';
		this.name = '';
		this.file = '';
		this.redirect = false;
		/**
		 * Установка объекта состояния и ошибок, равного таковому в signUpCore
		 * @type {{isError, fields, customError}|*}
		 */
		this.error = signUpCore.error;


	}

	/**
	 * Обновление ошибки. Функция создана на случай расширения объекта состояния. Пока состояние представляет собой объект- не так важна
	 */
	updateError(){
		this.error = signUpCore.error;
	}


	/**
	 * Установка значения конкретного поля
	 * @param field
	 * @param e
	 */
	setValue(field,e){
		if(!this.hasOwnProperty(field))
			throw new Error('Такого поля не существует')
		signUpCore.dFE(field);
		this.updateError();
		this[field] = e.target.value;

	}

	/**
	 * Включение размытия заднего фона
	 */
	setBlurOn(){
		this.blur = true;
	}

	/**
	 * Выключение размытия заднего фона
	 */
	setBlurOff(){
		this.blur = false;
	}

	/**
	 * Установить значения поля логина
	 * @param e
	 */
	setLogin(e){
		this.setValue('login', e)
	}
	/**
	 * Установить значения поля пароля
	 * @param e
	 */
	setPassword(e){
		this.setValue('password', e)
	}
	/**
	 * Установить значения поля для повторного ввода пароля
	 * @param e
	 */
	setRepeatPassword(e){
		this.setValue('repeatPassword', e)
	}
	/**
	 * Установить значения поля для телефона
	 * @param e
	 */
	setPhone(e){
		this.setValue('phone', e)
	}
	/**
	 * Установить значения поля почты
	 * @param e
	 */
	setMail(e){
		this.setValue('mail', e)
	}
	/**
	 * Установить значения поля имени
	 * @param e
	 */
	setName(e){
		this.setValue('name', e)
	}

	/**
	 * Обработчик нажатия на кнопку "зарегестрироваться". Отправляет данные в core
	 * @returns {Promise<void>}
	 */
	async signUp(){
		this.error = signUpCore.error;
		this.loading = true;
		let result = await signUpCore.signUp(this.login, this.password, this.repeatPassword, this.phone, this.mail, this.name, this.file);
		if(result.isError === false)
			this.redirect = true;

		this.error = result;

		this.loading = false;
	}

	/**
	 * Обработчик выбора файла
	 * @param e
	 */
	changeFile(e){
		this.file = e.files[0];

	}

}

decorate(SignupStore,
	{
		blur: observable,
		login: observable,
		password: observable,
		repeatPassword: observable,
		phone: observable,
		mail: observable,
		name: observable,
		loading: observable,
		error: observable,
		signUp: action,
		setBlurOff: action,
		setBlurOn: action,
		setLogin: action,
		setPassword: action,
		setRepeatPassword: action,
		setPhone: action,
		setMail: action,
		setName: action,
		setValue: action,
		updateError: action,



	}

)
export default new SignupStore()