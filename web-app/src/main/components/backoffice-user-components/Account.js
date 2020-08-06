import React, { useState } from 'react'
import {Form,Button} from "react-bootstrap";

export const Account = () => {

    const [newUsername, setNewUsername] = useState(undefined)
    const [newPassword, setNewPassword] = useState(undefined)

    // TODO:
    const submitChanges = () => 0

    return (
        <Form  className={`pl-5 pr-5 text-white`} variant={'dark'} style={{paddingTop: "75px", paddingLeft: "20px"}}>
            <Form.Group  controlId="newUsername">
                <Form.Label>New Username</Form.Label>
                <Form.Control type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Enter email" />
            </Form.Group>

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
