/**
 * Функция каррирования обработчиков mobx для работы с ними напрямую, без использования состояния useState()
 * @param store
 * @returns {function(*): (*|Function|void)}
 */
const bindingCarry = (store)=>{
	if(typeof store === "undefined")
		throw new Error('Не передан Store')
	return (func)=>{
		if(typeof store._this === "undefined")
			throw new Error("Не передан _this");
		if(typeof store[func] === "undefined")
			throw new Error("Ошибка в названии функции")
		return store[func].bind(store._this);
	}
}
 export default bindingCarry;