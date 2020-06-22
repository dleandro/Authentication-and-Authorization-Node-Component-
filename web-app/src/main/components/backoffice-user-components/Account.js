import React, { useState } from 'react'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

export const Account = () => {

    const [newUsername, setNewUsername] = useState(undefined)
    const [newPassword, setNewPassword] = useState(undefined)

    // TODO:
    const submitChanges = () => 0

    return (
        <div style={{paddingTop: "75px", paddingLeft: "20px"}}>
            <form noValidate autoComplete="off">
                <Input placeholder="New Username" inputProps={{ 'aria-label': 'description' }} onChange={(e) => setNewUsername(e.target.value)} />
                <Input placeholder="New Password" inputProps={{ 'aria-label': 'description' }} onChange={(e) => setNewPassword(e.target.value)}/>
            </form>
            <Button variant="contained" onClick={submitChanges}>
                Save
            </Button>
        </div>
    )
}
