import React, { useState, useContext } from 'react'
import {Form,Button} from "react-bootstrap";
import { userService, profileService } from '../../common/services/basicServices';
import UserContext from '../../UserContext'
import Alert from 'react-bootstrap/Alert'
import { useHistory } from 'react-router-dom';

export const Account = () => {

    const ctx=useContext(UserContext)

    const [newPassword, setNewPassword] = useState(undefined)
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })
    const [success, setSuccess] = useState({ message: undefined, shouldShow: false })
    const history=useHistory()
    // TODO:
    const submitChanges = () =>{
        profileService().put(newPassword)
        .then(_=>setSuccess({message: 'Password updated successfully',shouldShow: true}))
    .catch(err => {
        setError({ errorMessage: err.message, shouldShow: true })
        console.error(err)
    });
}

    return (
        <React.Fragment>
            {
                error.shouldShow &&
                <Alert variant={'warning'} onClose={() => setError(false)} dismissible>
                    {error.errorMessage}
                </Alert>
            }
            {
                success.shouldShow && <Alert variant={'success'} onClose={() => setSuccess(false)} dismissible> {success.message} </Alert>
            }

        <Form  className={`pl-5 pr-5 text-white`} variant={'dark'} style={{paddingTop: "75px", paddingLeft: "20px"}}>

            <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={submitChanges}>
                Save
            </Button>
        </Form>
        </React.Fragment>
    )
}
