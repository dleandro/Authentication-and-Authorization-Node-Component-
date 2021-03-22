import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { webApiLinks } from '../../common/links';
import '../../common/stylesheets/App.css';
import AuthTypeContext from './AuthTypeContext';

const loginIdp = async idp => {
    console.log(`${webApiLinks.WEB_API_HOME_PATH}${webApiLinks.users.AUTHENTICATION_PATH}/${idp}`);
    window.location.assign(`${webApiLinks.WEB_API_HOME_PATH}${webApiLinks.users.AUTHENTICATION_PATH}/${idp}`);
};
const Tab = () =>  <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>;

const MicrosoftSamlButton = () =><Button className={'windows-button bg-dark text-light'} onClick={() => loginIdp("saml")} ><Tab/>Using Saml</Button>;
const MicrosoftOauthButton = () =><Button className={'windows-button bg-light text-dark'} onClick={() => loginIdp("azureAD")} ><Tab/>Using Oauth2</Button>;
const GoogleButton = () =><Button className={'google-button bg-default text-dark'} onClick={() => loginIdp("google")} ><Tab/>Sign in with Google</Button>;


export default () => {
    const ctx = useContext(AuthTypeContext);
    const checkIfSpecificAuthTypeIsActive = (protocol, idp) => ctx.allowedProtocolsAndIdps
        .find(({active, idp: idp1, protocol: protocol1}) => protocol1 === protocol && idp1 === idp && active);
    return (
        <React.Fragment>
            <br/>
            {checkIfSpecificAuthTypeIsActive('oauth2', 'google') && <GoogleButton/>}
            <br/>
            <br/>
            {checkIfSpecificAuthTypeIsActive('saml', 'office365') && <MicrosoftSamlButton/>}
            <br/>
            <br/>
            {checkIfSpecificAuthTypeIsActive('oauth2', 'office365') && <MicrosoftOauthButton/>}
        </React.Fragment>
    );
};
