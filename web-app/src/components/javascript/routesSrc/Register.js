import React from "react"
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {userService} from '../service'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router";

export default function Register() {

    const history = useHistory();

    var user, pass = "";
    const handlePassword = event => {
        pass = event.target.value
    }

    const handleUsername = event => {
        user = event.target.value
    }

    var register =  () => {
        userService().addUser([user,pass]).then(
            history.push('/')
        )
    }


    return(
        <div className="blueSquare">
        <InputGroup className="mb-3">
                <FormControl placeholder="username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                             type="text" onChange={handleUsername}/>
                <FormControl placeholder="password" aria-label="Recipient's password" aria-describedby="basic-addon2"
                             type="password" onChange={handlePassword}/>
            </InputGroup>
            <Button variant="primary" onClick={register}>{'Register'}</Button>
            </div>
    )
}