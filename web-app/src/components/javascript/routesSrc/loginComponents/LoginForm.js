import React, {useContext} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {authenticationService,userService} from '../../service'
import UserContext from "../../../Context";
import GoogleButton from 'react-google-button'

import '../../../stylesheets/App.css'
const IDP_BASE_URL = "http://localhost:8082/api/authentications";

const authStyle= {
    width: '100px',
    height: '50px',
}
const officeStyle= {
    width: '75px',
    height: '25px',
}

const officeButtonStyle = {border: '1px solid #ea3e23', color: '#ea3e23',
    'width': '100px', height: '35px',}
const googleStyle = {border: '1px solid #ea3e23', color: '#ea3e23',
'width': '150px', height: '70px',}

const centered= {
    marginLeft: "30px",
    marginBottom: "10px"
}

export default function LoginForm({id, app: state, setRedirect}) {
    const userctx = useContext(UserContext)
    const {setUser} = userctx

    var user, pass = "";
    var loginMe =  () => {
        //alert("Loggin in with"+user +pass)
        userService().getUser(user)
            .then(t=>{
                authenticationService().login(user, pass);return t})
            .then(setUser)
            .then(setRedirect('/backoffice'))
            //.then(t=>authenticationService().login(user, pass))
            //.then(resp => setUser({name: user, pass: pass}))
            //.then(setRedirect('/loginSuccessfully'))
    }


    const handlePassword = event => {
        pass = event.target.value
    }

    const handleUsername = event => {
        user = event.target.value
    }

    var loginIdp=async (idp) => { 
         fetch(`${IDP_BASE_URL}/${idp}`,{mode : 'cors',
         headers: {
           'Access-Control-Allow-Origin':'*'
         }})
         .then(setRedirect('/'))
         .catch(setRedirect('/login'))           
        }

    return (
        <div className="col-12 form-input" id={id}>

            <InputGroup className="mb-3">
                <FormControl placeholder="username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                             type="text" onChange={handleUsername}/>
                <FormControl placeholder="password" aria-label="Recipient's password" aria-describedby="basic-addon2"
                             type="password" onChange={handlePassword}/>
            </InputGroup>

            <Button variant="primary" onClick={loginMe}>{'Login'}</Button>
            <GoogleButton style={centered} onClick={()=>loginIdp("google")}/>
            <Button><img src="ms-symbollockup_signin_dark.png" alt="my image" onClick={()=>loginIdp("azureAD")} /></Button>
            <Button style={googleStyle} variant="outline-light" onClick={()=>loginIdp("saml")} >
                <img style={authStyle} src="https://www.drupal.org/files/project-images/auth0-logo-whitebg.png" />
            </Button>

        </div>
    )
}
