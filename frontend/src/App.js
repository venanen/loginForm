import React from 'react';

import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './style/flex.css'
import * as Core from './core/exportCore'
import * as Store from './stores/exportStore'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import {observer} from "mobx-react";

import HelloPage from './components/HelloPage'
import SelectLocale from './components/SelectLocale'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'


function App() {
	/**
	 * Получение объекта класса для локализации
	 * @type {Locale}
	 */
	const localeClass = new Core.Locale(Store.mainStore.lang);
	return (
		<div className="App">
			<SelectLocale core={Core} store={Store}/>
			<Router>
				<Switch>
					<Route path="/dashboard">
						<Dashboard store={Store} lc={localeClass} core={Core} />
					</Route>
					<Route path="/signup">

						<SignUp store={Store} lc={localeClass} core={Core}/>

					</Route>
					<Route render={(props)=>(
						<HelloPage {...props} store={Store} lc={localeClass} core={Core}/>
					)} path="/">



					</Route>



					<Route path="/login/">

					</Route>
				</Switch>
			</Router>

		</div>
	);
}

function redirect(to){
	return <Redirect to={to}/>
}
export default observer(App);
