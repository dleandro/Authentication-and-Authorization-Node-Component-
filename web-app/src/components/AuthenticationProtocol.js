import React from 'react'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const AuthenticationProtocol = ({selectedListener})=>
    <ToggleButtonGroup type="radio" name="options" onChange={selectedListener}>
        <ToggleButton value={"saml-login"}> SAML </ToggleButton>
        <ToggleButton value={"openid-login"}> OpenId </ToggleButton>
        <ToggleButton value={"kerberos-login"}> Kerberos </ToggleButton>
    </ToggleButtonGroup>

export default AuthenticationProtocol
    

   