import config from "../config/config";

class HelloCore {
	constructor() {
		/**
		 * Объект, содержащий ошибки в ходе работы
		 * @type {{isError: boolean, fields: {}, customError: string}}
		 */
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
	setCustomError(text) {
		this.error.customError = text;
		return this.error;
	}

	/**
	 * Просто алиас для setFieldError
	 * @param f
	 * @param e
	 */
	sFE(f, e) {  //Просто алиас для setFieldError
		this.setFieldError(f, e)
	}

	/**
	 * Установка ошибки, связанной с полями формы, такими как "пустой пароль" и т.д.
	 * @param field
	 * @param error
	 * @returns {{isError: boolean, fields: {}, customError: string}}
	 */
	setFieldError(field, error) {

		this.error.fields[field] = error;
		this.error.isError = true;
		return this.error;
	}

	/**
	 * Удаление ошибки конкретного поля
	 * @param field
	 */
	deleteFieldError(field) {
		if (this.error.fields.hasOwnProperty(field)) {
			delete this.error.fields[field];
			console.log(this.error)
			if (Object.entries(this.error.fields).length === 0)
				this.error.isError = false;
		}

	}

	/**
	 * Алиас для deleteFieldError
	 * @param f
	 */
	dFE(f) {
		return this.deleteFieldError(f);
	}

	/**
	 * Функция авторизации, возвращает объект ошибки
	 * @param login
	 * @param password
	 * @returns {Promise<*>}
	 */
	async signIn(login, password) {
		this.error = {
			isError: false,
			fields: {},
			customError: '',
		};
		/**
		 * Валидация полей формы
		 */
		if (password === "")
			this.sFE('password', 'passwordIsEmpty')

		if (login === "")
			this.sFE('login', 'loginIsEmpty')
		if (this.error.isError)
			return this.error;

		/**
		 * Создание формы для отправки к API
		 * @type {FormData}
		 */
		const data = new FormData();
		data.append("login", login);
		data.append("password", password)
		try {
			let res = await fetch(config.mainConfig.api_url + "/signin", {
				method: "POST",
				body: data,

			})
			res = await res.json()
			/**
			 * Установка состояния, полученного с сервера
			 * @type {any}
			 */
			this.error = res;


			/**
			 * Потеря данных по пути
			 */
			if(!res.hasOwnProperty('isError'))
				return this.setCustomError('errorOnFetch')


			/**
			 * Если получена ошибка, не связанная с полями формы
			 */
			if(res.hasOwnProperty('customError') && res.isError && res.customError !== '')
				return this.setCustomError(res.customError)


			/**
			 * Если все нормально, разрешаем авторизацию, и устанавливаем токен пользователя
			 */
			if(res.isError === false && res.hasOwnProperty('additionData')){
				localStorage.setItem('token', res.additionData.token);

			}

			return this.error;

		} catch (e) {
			/**
			 * Если произошла ошибка запроса или сервер не отвечает
			 */
			return this.setCustomError('errorOnFetch')
		}

	}
}
export default new HelloCore();