import React, { useState, useContext } from 'react'
import {Form,Button} from "react-bootstrap";
import { userService } from '../../service';
import UserContext from '../../UserContext'

export const Account = () => {

    const ctx=useContext(UserContext)

    const [newPassword, setNewPassword] = useState(undefined)

    // TODO:
    const submitChanges = () =>userService().updatePassword(ctx.user.id,newPassword)

    return (
        <Form  className={`pl-5 pr-5 text-white`} variant={'dark'} style={{paddingTop: "75px", paddingLeft: "20px"}}>

            <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitChanges}>
                Save
            </Button>
        </Form>
    )
}
