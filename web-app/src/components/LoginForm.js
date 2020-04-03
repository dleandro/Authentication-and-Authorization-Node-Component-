import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default function LoginForm({id , app}) {

    const fetch = require('node-fetch');
    function submitLoginRequest() {

        fetch("http://localhost:8082/login"+ app.state.selectedProtocol, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: app.state.username,
                password: app.state.password
            })
        })
            .then(resp=>resp.json())
            .then(json=>console.log(json))
    }

    function submitGoogleLoginRequest() {

        fetch("http://localhost:8082/google-login")
    }

    const handlePassword = event => {
        
        app.setState({ password: event.target.value })

    } 

    const handleUsername = event => {

        app.setState({ username: event.target.value })
    } 

    return (
        <div className="col-12 form-input" id={id}>

            <InputGroup className="mb-3">
                <FormControl
                    placeholder="username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    type="text"
                    value={app.state.username}
                    onChange={handleUsername}
                />
                <FormControl
                    placeholder="password"
                    aria-label="Recipient's password"
                    aria-describedby="basic-addon2"
                    type="password"
                    value={app.state.password}
                    onChange={handlePassword}
                />

            </InputGroup>


            <Button
                variant="primary"
                onClick={submitLoginRequest}
            >
            {'Login'}
            </Button>

            <a href="http://localhost:8082/google-login"> Login With Google </a>
		
        </div>
    )
}

