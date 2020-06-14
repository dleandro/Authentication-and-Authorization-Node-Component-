import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { authenticationService } from '../../service'
import GoogleButton from 'react-google-button'
import { webApiLinks } from '../../../links'

import '../../../stylesheets/App.css'
const IDP_BASE_URL = '/api/authentications';

const authStyle = {
    width: '100px',
    height: '50px',
}
const officeStyle = {
    width: '75px',
    height: '25px',
}

const officeButtonStyle = {
    border: '1px solid #ea3e23', color: '#ea3e23',
    'width': '100px', height: '35px',
}
const googleStyle = {
    border: '1px solid #ea3e23', color: '#ea3e23',
    'width': '150px', height: '70px',
}

const centered = {
    marginLeft: "30px",
    marginBottom: "10px"
}

export default function LoginForm({ id, app: state, setRedirect }) {

    var user, pass = "";

    var loginLocalStrat = () => {
        authenticationService().login(user, pass)
    }

    const handlePassword = event => {
        pass = event.target.value
    }

    const handleUsername = event => {
        user = event.target.value
    }

    var loginIdp = async (idp) => {
        console.log(`${webApiLinks.WEB_API_HOME_PATH}/${webApiLinks.users.AUTHENTICATION_PATH}/${idp}`)
        window.location.assign(`${webApiLinks.WEB_API_HOME_PATH}${webApiLinks.users.AUTHENTICATION_PATH}/${idp}`)
    }

    return (
        <div className="col-12 form-input" id={id}>

            <InputGroup className="mb-3">
                <FormControl placeholder="username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                    type="text" onChange={handleUsername} />
                <FormControl placeholder="password" aria-label="Recipient's password" aria-describedby="basic-addon2"
                    type="password" onChange={handlePassword} />
            </InputGroup>

            <Button variant="primary" onClick={loginLocalStrat}>{'Login'}</Button>
            <GoogleButton style={centered} onClick={() => loginIdp("google")} />
            <Button><img src="ms-symbollockup_signin_dark.png" alt="my image" onClick={() => loginIdp("azureAD")} /></Button>
            <Button style={googleStyle} variant="outline-light" onClick={() => loginIdp("saml")} >
                <img style={authStyle} src="https://www.drupal.org/files/project-images/auth0-logo-whitebg.png" />
            </Button>

        </div>
    )
}
