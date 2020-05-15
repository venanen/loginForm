
import {dashboardCore} from "../core/exportCore";
import {action, decorate, observable} from "mobx";
class DashboardStore{
	constructor(){
		this._this = this;
		this.loading = true;
		this.userData = '';
		this.getData();

	}

	async getData(){
		this.loading = true;
		let data = await dashboardCore.getUserData();
		this.loading = false;
		if(data !== false){
			this.userData = data;
		}else{
			//window.location.href = '/';
		}

	}
	setLoading(value){
		this.loading = !!value;
	}



}
decorate(DashboardStore, {
	loading: observable,
	userData: observable,
	setLoading: action,
	getData: action,

})
export default new DashboardStore();