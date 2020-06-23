import React, { useContext, useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import AuthTypeContext from './AuthTypeContext'

export default function AuthenticationProtocol() {

  const ctx = useContext(AuthTypeContext)

  const [state, setState] = useState([])

  const handleChange = (event) => {

    var idxToChange = state.indexOf(state
      .find(authType => authType.protocol === event.target.name))
    
    state[idxToChange] = { protocol: event.target.name, active: event.target.checked ? 1 : 0 }

    setState([...state])

  };

  useEffect(() => {
    setState(ctx.allowedProtocolsAndIdps)
  }, [ctx.allowedProtocolsAndIdps])

  function saveAuthTypesAllowed() {
    ctx.setAuthTypesFlag(true)
    ctx.setAllowedProtocolsAndIdps(state)
  }

  return (
    <div style={{ paddingLeft: "30px", paddingTop: "30px" }}>
       
      {
        ctx.error?<p>{ctx.error.status} {ctx.error.err}</p>:
        <React.Fragment>
        <h2>Select Supported Identity Providers</h2>
      <FormGroup>
        {
          state
            .map(authType =>
              <FormControlLabel key={authType.protocol} control={<Checkbox checked={authType.active === 1} onChange={handleChange} name={authType.protocol} color="primary" />} label={authType.protocol} />)
        }
      </FormGroup>
      <button className="btn btn-outline-primary my-2 my-sm-0 " id="SaveButton" onClick={() => saveAuthTypesAllowed()}> Save</button>
      </React.Fragment>
      }
      
      
    </div>
  )

}


