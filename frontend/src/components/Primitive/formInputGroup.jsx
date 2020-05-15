import React, {Fragment} from 'react'
import {InputText} from "primereact/inputtext";
import './formInputGroup.css'

export default ({icon, placeholder, onFocus, onBlur, onChange, value, password, id, keyFilter, error,className, lc,  ...props }) => {
	/**
	 * Если ошибка присутсвует, отобразить ее
	 */
	if(typeof error.fields !== 'undefined' && error.isError === true && error.fields.hasOwnProperty(id))
		error = <label id={id+'-error'} className={'error-signin'}>{lc.p(error.fields[id])}</label>;
	else
		error='';

	return (
		<Fragment>
			{error}
			<div className={'formElement p-inputgroup'}>
			<span className="p-inputgroup-addon">
            	 <i className={"pi " + icon}/>
			</span>
				<InputText id={id}
						   required={true}
						   keyfilter={keyFilter}
						   type={password ? 'password' : ''}
						   onFocus={onFocus}
						   onBlur={onBlur}
						   placeholder={placeholder}
						   onChange={onChange}
						   value={value}
						   className={className+' '+(error !== ""?"error-input":'')}
						   {...props}
				/>

			</div>
		</Fragment>
	)
}