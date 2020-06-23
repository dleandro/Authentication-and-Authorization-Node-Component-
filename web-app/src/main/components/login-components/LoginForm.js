import React, { useState, useContext } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { authenticationService } from '../../service'
import GoogleButton from 'react-google-button'
import { webApiLinks } from '../../common/links'
import '../../common/stylesheets/App.css'
import Alert from 'react-bootstrap/Alert'
import AuthTypeContext from './AuthTypeContext'

const authStyle = {
    width: '100px',
    height: '50px',
}

const googleBtn = {
    marginLeft: "30px",
    marginBottom: "10px"
}

const imgBtns = {
    background: "none",
    border: "none"
}

export default function LoginForm({ id }) {

    const [userToLogin, setUserToLogin] = useState({ username: undefined, password: undefined })

    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const ctx = useContext(AuthTypeContext)

    var loginLocalStrat = () =>
        userToLogin.username && userToLogin.password ?
            authenticationService().login(userToLogin.username, userToLogin.password).then(() => window.location.assign('/backoffice')) :
            setError({ errorMessage: "Please insert username and password first", shouldShow: true })

    const handlePassword = event => {
        setUserToLogin({ ...userToLogin, password: event.target.value })
    }

    const handleUsername = event => {
        setUserToLogin({ ...userToLogin, username: event.target.value })
    }

    var loginIdp = async (idp) => {
        console.log(`${webApiLinks.WEB_API_HOME_PATH}/${webApiLinks.users.AUTHENTICATION_PATH}/${idp}`)
        window.location.assign(`${webApiLinks.WEB_API_HOME_PATH}${webApiLinks.users.AUTHENTICATION_PATH}/${idp}`)
    }

    const checkIfSpecificAuthTypeIsActive = (authType) => {
        return ctx.allowedProtocolsAndIdps.
            find(availableAuthType => availableAuthType.protocol === authType && availableAuthType.active === 1)
    }
    return (

        <React.Fragment>

            {
                error.shouldShow &&
                <Alert variant={'warning'} onClose={() => setError(false)} dismissible>
                    {error.errorMessage}
                </Alert>
            }


            <div className="col-12 form-input" id={id}>


                <InputGroup className="mb-3">

                    <FormControl placeholder="username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                        type="text" onChange={handleUsername} />
                    <FormControl placeholder="password" aria-label="Recipient's password" aria-describedby="basic-addon2"
                        type="password" onChange={handlePassword} onKeyDown={e => e.key == 'Enter' && loginLocalStrat()}/>

                </InputGroup>
                <Button variant="primary" onClick={loginLocalStrat}>{'Login'}</Button>

                {checkIfSpecificAuthTypeIsActive('Google') && <GoogleButton style={googleBtn} onClick={() => loginIdp("google")} />}

                {checkIfSpecificAuthTypeIsActive('AzureAD') && <Button style={imgBtns} onClick={() => loginIdp("azureAD")} >
                    <img src="ms-symbollockup_signin_dark.png" alt="microsoft" /></Button>}

                {checkIfSpecificAuthTypeIsActive('Saml') && <Button style={imgBtns} onClick={() => loginIdp("saml")} >
                    <img style={authStyle} src="https://www.drupal.org/files/project-images/auth0-logo-whitebg.png" /></Button>}

            </div>
        </React.Fragment>
    )
}
