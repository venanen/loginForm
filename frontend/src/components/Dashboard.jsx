import React, {Fragment, useEffect} from 'react'
import './Dashboard.css'
import {observer} from "mobx-react";
import {Card} from "primereact/card";
import UserData from './Primitive/UserData'
import FormContainer from "./Primitive/FormContainer";

export default observer(({lc, store, core, ...props}) => {
	let card = '';
	let title = ''
	if (!store.dashboardStore.loading && store.dashboardStore.userData.hasOwnProperty('avatar')) {
		let uD = store.dashboardStore.userData;
		card = <UserData lc={lc} login={uD.login} phone={uD.phone} mail={uD.mail} image={uD.avatar}/>
		title = lc.p("welcomeBack")+", "+uD.name;
	}




	return (
		<Fragment>
			<div id={'main-container-Dashboard'} tabIndex="0" className={"p-grid p-align-center p-justify-center"}>
				<FormContainer
					titleText={title}
					id={"choose-container-HelloPage"}
					className={"p-lg-5 p-sm-12 p-xs-10 p-md-9"}
				>
				<div className="p-grid p-align-center p-justify-center">
					<div className="p-col-3">
						{card}
					</div>
					<div className="p-col-8">
						<span class="action-text">#dosomeaction</span>
					</div>
				</div>



				</FormContainer>
			</div>


			<div className={"loadingDashboard " + (store.dashboardStore.loading ? '' : 'hidden')}>
				<div className="loading-wrap">
					<div className="triangle1"></div>
					<div className="triangle2"></div>
					<div className="triangle3"></div>
				</div>
			</div>
		</Fragment>
	)


})