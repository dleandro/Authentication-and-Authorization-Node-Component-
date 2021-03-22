import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import '../../common/stylesheets/App.css';
import { authenticationService } from '../../common/services/basicServices';
import {Card, CardDeck} from "react-bootstrap";
import SSOButtons from "./SSOButtons";

export default ({id}) => {
    const [userToLogin, setUserToLogin] = useState({ username: undefined, password: undefined })
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const loginLocalStrat = () =>
        userToLogin.username && userToLogin.password ?
            authenticationService().login(userToLogin.username, userToLogin.password)
                .then((resp) => {
                    console.log(resp)
                    window.location.assign('/backoffice')
                })
                .catch(err => {
                    setError({ errorMessage: err.message, shouldShow: true })
                    console.error(err)
                }) :
            setError({ errorMessage: "Please insert username and password first", shouldShow: true });

    const handlePassword = event => {
        setUserToLogin({ ...userToLogin, password: event.target.value })
    }

    const handleUsername = event => {
        setUserToLogin({ ...userToLogin, username: event.target.value })
    }

    return (
        <React.Fragment>
            <CardDeck bg={'light'} className="m-auto h-50 w-50 modal-content align-content-center d-flex flex-row text-center" >
                <Card className={'neumorphismCard'}>
                    <Card.Body>
                        <h1 className="col-12 user-name">Sign In</h1>

                        <div className="col-12 form-input" id={id}>

                            <InputGroup className="mb-3">
                                <FormControl placeholder="username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                             type="text" onChange={handleUsername} />
                                <FormControl placeholder="password" aria-label="Recipient's password" aria-describedby="basic-addon2"
                                             type="password" onChange={handlePassword} onKeyDown={e => e.key == 'Enter' && loginLocalStrat()} />

                            </InputGroup>
                            <Button variant="primary" onClick={loginLocalStrat}>{'Login'}</Button>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <a href="/register"> Register</a>
                    </Card.Footer>
                </Card>
                <Card className={'neumorphismCard d-flex align-content-center'}>
                    <Card.Body>
                        <SSOButtons />
                    </Card.Body>
                </Card>
            </CardDeck>
        </React.Fragment>
    )
};
