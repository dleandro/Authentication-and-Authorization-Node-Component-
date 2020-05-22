import React, {useContext} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {authenticationService} from '../../service'
import UserContext from "../../../Context";

import '../../../stylesheets/App.css'
const IDP_BASE_URL = "http://localhost:8082/api/authentications";
const googleStyle = { 		"display":'inline-block',
        "position":'relative',
        "margin":'0 auto 0 auto',
    '-moz-border-radius':'50%',
'-webkit-border-radius':'50%',
'border-radius':'50%',
'text-align':'center',
'width': '50px',
height: '50px',
'font-size':'20px',
color:'#ffffff',
'background-color': '#BD3518',
'line-height':'50px'
}


export default function LoginForm({id, app: state, setRedirect}) {
    const userctx = useContext(UserContext)
    const {setUser} = userctx

    var user, pass = "";
    var loginMe = () => {
        //alert("Loggin in with"+user +pass)
        authenticationService().login(user, pass)
            .then(resp => setUser({name: user, pass: pass}))
            .then(setRedirect('/loginSuccessfully'))
    }


    const handlePassword = event => {
        pass = event.target.value
    }

    const handleUsername = event => {
        user = event.target.value
    }

    return (
        <div className="col-12 form-input" id={id}>

            <InputGroup className="mb-3">
                <FormControl placeholder="username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                             type="text" onChange={handleUsername}/>
                <FormControl placeholder="password" aria-label="Recipient's password" aria-describedby="basic-addon2"
                             type="password" onChange={handlePassword}/>
            </InputGroup>
            <a href="#" className="fa fa-google mx-auto" style={googleStyle}></a>
            <Button variant="primary" onClick={loginMe}>{'Login'}</Button>
            <div className="Office-container">
                <div className="Office-image" />
                <div className="Office-button-text">office 365</div>
            </div>
            <p><a href={`${IDP_BASE_URL}/google`}> Login With Google </a></p>
            <p><a href={`${IDP_BASE_URL}/saml`}> Login With Oauth0 </a></p>
            <p><a href={`${IDP_BASE_URL}/azureAD`}> Login With Office 365 </a></p>
        </div>
    )
}
