import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { authenticationService} from '../../service'
const fetch = require('node-fetch');


export default function LoginForm({id , app: state, setRedirect}) {

    var user, pass ="";
    var loginMe = ()=>{
        alert("Loggin in with"+user +pass)
        authenticationService().login(user,pass)
         .then(setRedirect('/loginSuccessfully'))
    }


    const handlePassword = event => {
        pass= event.target.value
    }

    const handleUsername = event => {
        user= event.target.value
    }

    return (
        <div className="col-12 form-input" id={id}>

            <InputGroup className="mb-3">
                <FormControl placeholder="username" aria-label="Recipient's username" aria-describedby="basic-addon2" type="text" onChange={handleUsername}/>
                <FormControl placeholder="password" aria-label="Recipient's password" aria-describedby="basic-addon2" type="password" onChange={handlePassword}/>
            </InputGroup>
            <Button variant="primary" onClick={loginMe}>{'Login'}</Button>
            <p><a href="http://localhost:8082/api/authentications/login/google"> Login With Google </a></p>
            <p><a href="http://localhost:8082/api/authentications/login/saml"> Login With Oauth0 </a></p>
            <p><a href="http://localhost:8082/api/authentications/login/azureAD"> Login With Office 365 </a></p>
        </div>
    )
}
