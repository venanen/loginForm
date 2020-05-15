import config from "../config/config"
import {history} from 'react-router-dom';

class SignUpStore{
	/**
	 * Объект, содержащий ошибки в ходе работы
	 * @type {{isError: boolean, fields: {}, customError: string}}
	 */
	constructor(){
		this.error = {
			isError: false,
			fields: {},
			customError: '',
		};


	}
	/**
	 * Установка ошибки, не связанной с полями формы
	 * @param text
	 * @returns {{isError: boolean, fields: {}, customError: string}|*}
	 */
	setCustomError(text){
		this.error.customError = text;
		return this.error;
	}

	/**
	 * Просто алиас для setFieldError
	 * @param f
	 * @param e
	 */
	sFE(f, e){  //Просто алиас для setFieldError
		this.setFieldError(f, e)
	}
	/**
	 * Установка ошибки, связанной с полями формы, такими как "пустой пароль" и т.д.
	 * @param field
	 * @param error
	 * @returns {{isError: boolean, fields: {}, customError: string}}
	 */
	setFieldError(field, error){

		this.error.fields[field] = error;
		this.error.isError = true;
		return this.error;
	}

	/**
	 * Удаление ошибки конкретного поля
	 * @param field
	 */
	deleteFieldError(field){
		if(this.error.fields.hasOwnProperty(field)){
			delete this.error.fields[field];
			console.log(this.error)
			if(Object.entries(this.error.fields).length === 0)
				this.error.isError = false;
		}

	}
	/**
	 * Алиас для deleteFieldError
	 * @param f
	 */
	dFE(f){
		return this.deleteFieldError(f);
	}


	/**
	 * Функция регистрации пользователя, возвращает объект ошибки
	 * @param login
	 * @param password
	 * @param repeatPassword
	 * @param phone
	 * @param mail
	 * @param name
	 * @param file
	 * @returns {Promise<*>}
	 */
	async signUp(login, password, repeatPassword, phone, mail, name, file){
		this.error.isError = false;

		/**
		 * Валидация полей
		 */
		if(!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(mail))
			this.sFE('mail', 'mailIsInvalid')

		if(password!==repeatPassword){
			this.sFE('password', 'passRepassNotEqual')
			this.sFE('repeatPassword', 'passRepassNotEqual')
		}

		if(login === ''){
			this.sFE('login', 'loginIsEmpty')
		}
		if(password === ''){
			this.sFE('password', 'passwordIsEmpty')
		}
		if(repeatPassword === ''){
			this.sFE('repeatPassword', 'repeatPasswordIsEmpty')
		}
		if(phone === ''){
			this.sFE('phone', 'phoneIsEmpty')
		}
		if(mail === ''){
			this.sFE('mail', 'mailIsEmpty')
		}
		if(name === ''){
			this.sFE('name', 'nameIsEmpty')
		}




		if(this.error.isError)
			return this.error;


		/**
		 * Обработка ошибок сети, запроса, и ошибок, полученных с сервера
		 * @type {*|void}
		 */
		let res = await this.sendData({login, password, repeatPassword, phone, mail, name, file});

		if(!res.hasOwnProperty('isError'))
			return this.setCustomError('errorOnFetch')
		if(res.hasOwnProperty('isError') && res.isError === true){
			//console.log(res);
			return res;
		}


		if(res.hasOwnProperty('customError') && res.isError && res.customError !== '')
			return this.setCustomError(res.customError)

		if(res.isError === false && res.hasOwnProperty('additionData')){
			localStorage.setItem('token', res.additionData.token);
			window.location.href = '/dashboard'

		}


		// res = {
		// 	isError: true,
		// 	fields: {login: "jop"},
		// 	customError: '',
		// };

		return res;


	}

	/**
	 * Фукнция отправки данных на сервер
	 * @param login
	 * @param password
	 * @param repeatPassword
	 * @param phone
	 * @param mail
	 * @param name
	 * @param file
	 * @returns {Promise<*>}
	 */
	async sendData({login, password, repeatPassword, phone, mail, name, file}){

		/**
		 * Установка полей формы
		 * @type {FormData}
		 */
		const data = new FormData();
		data.append('login', login);
		data.append('password', password);
		data.append('repeatPassword', repeatPassword)
		data.append('phone', phone);
		data.append('mail', mail);
		data.append('name', name);

		/**
		 * Проверка, добавлен ли файл
		 */
		if(typeof file !== 'undefined' && file)
			data.append('file', file, 'avatar.jpg');
		try{
			let result = await fetch(config.mainConfig.api_url+"/signup",{
				method: "POST",
				body: data,

			})

			let json = await result.json()

			return json;

		}catch(e){
			/**
			 * Обработка ошибки сетевого запроса
			 */
			return this.setCustomError('errorOnFetch')
		}



	}



}
export default new SignUpStore()