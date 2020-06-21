import React from 'react';
import {userService,authenticationService} from '../../service';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";

export default function Register({setRedirect}) {
    const [pass,setPass] = React.useState('');
    const [user,setUser] = React.useState('');

    const register =  () => userService().addUser(['',user,pass]).then( ()=> authenticationService().login(user,pass)).then(()=>{
        setRedirect('/');
        window.location.reload(false);
    });

    return(
        <div className="modal-dialog">

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e=>setUser(e.target.value)} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" onClick={register} type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}