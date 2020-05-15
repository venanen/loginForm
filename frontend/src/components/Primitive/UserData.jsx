import React from 'react'
import {InputText} from "primereact/inputtext";
import './UserData.css';
import config from '../../config/config';

export default ({lc, image, login, phone, mail}) => {

	return (
		<div style={{borderRight: 'solid 1px #00000033;'}} className={'userCard p-grid p-align-center p-justify-start'}>
			<img src={image === '' ? 'https://renovacio-med.ru/images/noavatar.png' : config.mainConfig.image_url+image} className={'userImage p-col-11'}/>

			{lc.p('login')}
					<div className="p-inputgroup">

                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"/>
                                </span>
						<InputText disabled={true} value={login} placeholder="Username" />
					</div>

			{lc.p('phone')}
					<div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"/>
                                </span>
						<InputText disabled={true} value={phone} placeholder="Username" />
					</div>


			{lc.p('mail')}
					<div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"/>
                                </span>
						<InputText disabled={true} value={mail} placeholder="Username" />
					</div>









		</div>

	)


}
