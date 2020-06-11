import React from 'react'
import {Checkbox,FormControlLabel,FormGroup} from '@material-ui/core';
import {protocolService} from '../service'

export default function AuthenticationProtocol() {

    const [state, setState] = React.useState({
        Saml: false,
        Google: false,
        AzureAD:false
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    

     

  
        return (
            <div>
                <h2>Select the protocols</h2>
            <FormGroup>
            <FormControlLabel control={<Checkbox checked={state.checkedA} onChange={handleChange}  name="Saml" color="primary" />}label="Saml Protocol"/>
            <FormControlLabel control={<Checkbox checked={state.checkedB} onChange={handleChange}  name="Google" color="primary" />}label="Google Protocol"/>
            <FormControlLabel control={<Checkbox  checked={state.checkedC} onChange={handleChange} name="AzureAD" color="primary" />}label="AzureAD Protocol"/>
            </FormGroup>
            <button className="btn btn-outline-primary my-2 my-sm-0 " id="SaveButton" onClick={()=>myFunction()}> Save</button>
            </div>
        )


function myFunction(){
        protocolService().changeActive('Saml',state.Saml)
        protocolService().changeActive('Google',state.Google)
        protocolService().changeActive('AzureAD',state.AzureAD)
}

}


