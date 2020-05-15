import React from 'react'
import {observer} from "mobx-react";
import FormContainer from './Primitive/FormContainer'
import SignUpItem from './Primitive/SignUpItem'
import SignUpItemPassword from './Primitive/SignUpItemPassword'
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {FileUpload} from "primereact/fileupload";
import './SignUp.css'
import ErrorMsg from './Primitive/ErrorMsg'

export default observer(({core, lc, store, ...props}) => {
	/**
	 * Каррирование стора с биндингом .this
	 */
	const _sS = core.bindingCarry(store.signupStore)





	return (
		<div id={'main-container-HelloPage'} tabIndex="0" className={"p-grid p-align-center p-justify-center"}>

			<FormContainer
				titleText={lc.p("register")}
				onBlur={_sS("setBlurOff")}
				onFocus={_sS("setBlurOn")}
				id={"choose-container-HelloPage"}
				className={"p-lg-5 p-xl-3 p-sm-12 p-xs-8 p-md-7"}
				blur={store.signupStore.blur}
			>

				<ErrorMsg lc={lc} error={store.signupStore.error}/>
				<div className="p-grid p-align-center p-justify-center">
					<div className="p-col-11" style={{fontSize:"0.9em"}}>{lc.p('signUpRequiredText')}</div>

					<SignUpItem
						error={store.signupStore.error}
						keyFilter={'alphanum'}
						id={'login'}
						password={false}
						placeholder={lc.p('login')}
						value={store.signupStore.login}
						onChange={_sS('setLogin')}
						tooltipText={lc.p('signUpLoginTooltip')}
						lc={lc}
						{...props}


					/>
					<SignUpItemPassword
						feedback={true}
						error={store.signupStore.error}
						id={'password'}
						placeholder={lc.p('password')}
						value={store.signupStore.password}
						onChange={_sS('setPassword')}
						tooltipText={lc.p('passwordEnterTooltip')}
						weakLabel={lc.p('weakPassword')}
						mediumLabel={lc.p('middlePassword')}
						strongLabel={lc.p('strongPassword')}
						lc={lc}
						{...props}


					/>
					<SignUpItemPassword
						feedback={false}
						error={store.signupStore.error}
						id={'repeatPassword'}
						placeholder={lc.p('repeatPassword')}
						value={store.signupStore.repeatPassword}
						onChange={_sS('setRepeatPassword')}
						tooltipText={lc.p('passwordRepeatTooltip')}
						lc={lc}
						{...props}


					/>
					<SignUpItem
						error={store.signupStore.error}
						keyFilter={/^[a-zA-Zа-яА-Я0-9_]+$/}
						id={'name'}
						password={false}
						placeholder={lc.p('name')}
						value={store.signupStore.name}
						onChange={_sS('setName')}
						tooltipText={lc.p('nameTooltip')}
						lc={lc}
						{...props}


					/>
					<SignUpItem
						error={store.signupStore.error}
						keyFilter={''}
						id={'phone'}
						password={false}
						placeholder={lc.p('phone')}
						value={store.signupStore.phone}
						onChange={_sS('setPhone')}
						inputMask={true}
						mask={"+9(999) 999-99-99"}
						tooltipText={lc.p('phoneTooltip')}
						lc={lc}
						{...props}


					/>
					<SignUpItem
						error={store.signupStore.error}
						keyFilter={'email'}
						id={'mail'}
						password={false}
						placeholder={lc.p('mail')}
						value={store.signupStore.mail}
						onChange={_sS('setMail')}
						tooltipText={lc.p('mailTooltip')}
						lc={lc}
						{...props}


					/>
					<div className="p-col-5 p-offset-1 upload-text-signup">
						{lc.p("uploadText")}
					</div>
					<div className="p-col-6">
						<FileUpload
							accept={'image/jpeg,image/png,image/gif'}
							name="avatar"
							onSelect={_sS("changeFile")}
							mode="basic"
							auto={false}

							chooseLabel={lc.p("chooseFile")}
						/>
					</div>

					<div className="p-col-6">
						<Link to={'/'}>{lc.p('signIn')}</Link>
					</div>
					<div className="p-col-6">
						<Button label={lc.p('signUp')}
								icon={"pi pi-arrow-right " + (store.signupStore.loading ? 'pi-spinner pi-spin' : '')}
								iconPos="right"
								onClick={_sS("signUp")}/>

					</div>
				</div>


			</FormContainer>
		</div>
	)
})