import React from 'react'
import {InputText} from "primereact/inputtext";
import './SignUpItem.css'
import {InputMask} from "primereact/inputmask";

export default ({onChange, placeholder, value, password, keyFilter, tooltipText, className,error, id, inputMask, mask, lc, ...props}) => {

	let render;
	if(typeof error.fields !== 'undefined' && error.isError === true && error.fields.hasOwnProperty(id))
		error = <label className={'error-description-field'}>{lc.p(error.fields[id])}</label> ;
	else
		error='';
	if(inputMask === true)
		render = <InputMask
			mask={mask}
			className={className+' '+(error !== ""?"error-input":'')}
			onChange={onChange}
			id={id}
			required={true}
			keyfilter={keyFilter}
			type={password ? 'password' : ''}
			placeholder={placeholder}
			value={value}
			tooltip={tooltipText}
			tooltipOptions={{event: 'focus'}}
			{...props}
		/>
	else
		render = <InputText
			className={className+' '+(error !== ""?"error-input":'')}
			onChange={onChange}
			id={id}
			required={true}
			keyfilter={keyFilter}
			type={password ? 'password' : ''}
			placeholder={placeholder}
			value={value}
			tooltip={tooltipText}
			tooltipOptions={{event: 'focus'}}
			{...props}
		/>

	return (

			<div className="p-col-11 signUp-formElement">
				{error}
				{render}

			</div>

		)

}