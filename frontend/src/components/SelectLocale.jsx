import React from 'react'
import {observer} from "mobx-react";
import localedConfig from '../config/locales'
import './SelectLocale.css'

export default observer(({store, core})=>{

	const _mS = core.bindingCarry(store.mainStore)


	let flags = [];

	for(let value of localedConfig['config']['enabledLanguage']){
		flags.push(<img key={value} src={'/flags/'+value.toUpperCase()+".png"} alt={value} onClick={()=>{ _mS("setLang")(value); console.log(value) }} className={'flag-image '+(store.mainStore.lang !== value?'grayscaled':'')}/>)
	}

	return (
		<div className={'flags-container'}>

			{flags}

		</div>
	)
})