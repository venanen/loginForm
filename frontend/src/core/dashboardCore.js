import config from "../config/config";
import Dashboard from "../components/Dashboard";

class DashboardCore{

	constructor() {
		this.data = '';
	}


	async getUserData(){

		let data = new FormData();
		data.append('token', localStorage.getItem('token'))
		let res = await fetch(config.mainConfig.api_url + "/getuserdata", {
			method: "POST",
			body: data

		})
		let result = await res.json();

		if(result.isError === false && result.hasOwnProperty('additionData')&& result.additionData.hasOwnProperty('userData')){
			return result.additionData.userData;
		}else{
			return false;
		}
	}


}
export default new DashboardCore();