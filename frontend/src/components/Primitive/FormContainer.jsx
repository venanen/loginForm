import React, {Fragment} from 'react'
import './FormContainer.css'
export default ({titleText, onFocus, onBlur, blur, className, id, children})=>{
	return (
		<Fragment>
			<div id={'background-page'} className={blur ? "activeBlur" : ''}/>
			<div tabIndex={0}
				 onFocus={onFocus}
				 onBlur={onBlur}
				 id={id}
				 className={className+" p-col-align-center formContainer " + (blur ? "activeShadow" : '')}>
				<div className={'panel-header'}>{titleText}</div>
				{children}
			</div>
		</Fragment>

	)
}
