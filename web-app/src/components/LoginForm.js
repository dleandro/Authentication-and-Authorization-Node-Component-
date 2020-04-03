import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
const fetch = require('node-fetch');


export default function LoginForm({id , app: state,props: setRedirect}) {

    var user, pass ="";


    function submitLoginRequest() {
        fetch("http://localhost:8082/login"+ state.selectedProtocol, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        })

          .then(resp=>{setRedirect()})
           // .then(json=>console.log(json))

        //return <Redirect to="/backofice"/>
    }

    function submitGoogleLoginRequest() {

        fetch("http://localhost:8082/google-login")
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
                <FormControl
                    placeholder="username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={handleUsername}
                />
                <FormControl
                    placeholder="password"
                    aria-label="Recipient's password"
                    aria-describedby="basic-addon2"
                    type="password"
                    onChange={handlePassword}
                />

            </InputGroup>


            <Button variant="primary"
                onClick={submitLoginRequest}
            >
                {'Login'}
            </Button>

            <a href="http://localhost:8082/google-login"> Login With Google </a>
        </div>
    )
}
