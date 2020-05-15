import React from 'react'
import './SignUpItem.css'
import {Password} from "primereact/password";
import './SignUpItemPassword.css'
export default ({onChange, placeholder, value, tooltipText, className, error, id, weakLabel, mediumLabel, strongLabel,  feedback, lc}) => {

	if(typeof error.fields !== 'undefined' && error.isError === true && error.fields.hasOwnProperty(id))
		error = <label className={'error-description-field'}>{lc.p(error.fields[id])}</label> ;
	else
		error='';
	return (

			<div className="p-col-11 signUp-formElement">
				{error}
				<Password
					className={className+' '+(error !== ""?"error-input":'')}
					onChange={onChange}
					id={id}
					required={true}
					placeholder={placeholder}
					value={value}
					feedback={feedback}
					weakLabel={weakLabel}
					mediumLabel={mediumLabel}
					strongLabel={strongLabel}
					promptLabel={'Введите пароль'}
					tooltip={tooltipText}
					tooltipOptions={{event: 'focus'}}

				/>
			</div>


		)

}
