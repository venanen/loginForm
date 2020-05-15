import React from 'react'
import './HelloPage.css'
import FormInput from './Primitive/formInputGroup'
import {observer} from "mobx-react";
import {Button} from "primereact/button";
import FormContainer from './Primitive/FormContainer'
import {Link} from "react-router-dom";
import ErrorMsg from './Primitive/ErrorMsg'

export default observer(({core, store, lc, history, ...props}) => {
	/**
	 * Получение объекта стора для страницы
	 */

	const _hS = core.bindingCarry(store.helloStore);
	store.helloStore.history = history;


	return <div id={'main-container-HelloPage'} tabIndex="0" className={"p-grid p-align-center p-justify-center"}>
		<FormContainer
			titleText={lc.p("helloPageMainText")}
			onBlur={_hS("setBlurOff")}
			onFocus={_hS("setBlurOn")}
			id={"choose-container-HelloPage"}
			className={"p-lg-3 p-sm-12 p-xs-8 p-md-7"}
			blur={store.helloStore.blur}
		>
			<div className="p-grid ">
				<div className={'p-col-6 leftSide-loginLayout '}>
					<ErrorMsg style={{marginBottom: '1em'}} lc={lc} error={store.helloStore.error}/>
					<FormInput error={store.helloStore.error}
							   id={"login"} onFocus={_hS("setBlurOn")}
							   onBlur={_hS("setBlurOff")}
							   onChange={_hS("setLogin")}
							   value={store.helloStore.login}
							   placeholder={lc.p('login')}
							   icon={'pi-user'}
							   keyFilter={"alphanum"}
							   lc={lc}
					/>

					<FormInput error={store.helloStore.error}
							   id={"password"}
							   password={true}
							   onFocus={_hS("setBlurOn")}
							   onBlur={_hS("setBlurOff")}
							   onChange={_hS("setPassword")}
							   value={store.helloStore.password}
							   placeholder={lc.p('password')}
							   icon={'pi-key'}
							   lc={lc}
					/>

					<Button label={lc.p('signIn')}
							icon={"pi pi-arrow-right " + (store.helloStore.loading ? 'pi-spinner pi-spin' : '')}
							iconPos="right"
							onClick={_hS("signIn")}/>
				</div>

				<div className={'p-col-6  p-grid p-justify-center rightSide-loginLayout p-align-end'}>
					<div id={"registerText"}>{lc.p('makeRegisterText')}
					</div>
					<Link to={'/signup'}>
						<Button label={lc.p("register")} icon="pi pi-arrow-right" iconPos="right"/>
					</Link>
				</div>

			</div>
		</FormContainer>


	</div>


})


