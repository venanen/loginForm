import React, {Fragment} from 'react'
import './ErrorMsg.css'
export default ({lc, error, ...props})=>{
	let errorDiv = '';
	/**
	 * Если ошибка есть, отобразить ее
	 */
	if(typeof error !== 'undefined' && error !== '' && error.hasOwnProperty('customError') && error.customError!==''){
		errorDiv = <div className={'error-msg p-col-12'} {...props}>{lc.p(error.customError)}</div>;
	}
	return (
		<Fragment>
			{errorDiv}
		</Fragment>
	)
}