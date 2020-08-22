import React, { useContext, useEffect, useState } from 'react'
import AuthTypeContext from './AuthTypeContext'
import Form from "react-bootstrap/Form";
import { SubmitValuesModal } from "../../common/html-elements-utils/generics/GenericModal";
import { configService } from "../../common/services/basicServices";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

export default function AuthenticationProtocol() {

  const ctx = useContext(AuthTypeContext);

  const [state, setState] = useState([]);

  const switchValue = idx => {
    let newValue = [...state];
    newValue[idx].active = newValue[idx].active === 1 ? 0 : 1;
    setState(newValue);
  }

  useEffect(() => {
    setState(ctx.allowedProtocolsAndIdps);
  }, [ctx.allowedProtocolsAndIdps]);

  function saveAuthTypesAllowed() {
    ctx.setAuthTypesFlag(true);
    ctx.setAllowedProtocolsAndIdps(state);
  }

  return (
    <React.Fragment >
      {ctx.error ? <p>{ctx.error.status} {ctx.error.err}</p> :
        <CardColumns style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>

          <Card style={{ width: '24rem' }} key={'AuthProtocolCard'} border="info" className='ml-2 mr-2'>
            <Card.Body>
              <Card.Title>{'Select Supported Authentication Types'}</Card.Title>
              {state.map((authType, idx) => <React.Fragment><Form inline>
                <Form.Check id={`Protocol: ${authType.protocol} IDP: ${authType.idp} switch`} checked={authType.active === 1} onChange={() => switchValue(idx)} label={`${authType.idp} with ${authType.protocol} `} type={'switch'} />
                    &nbsp;&nbsp;
                    <SubmitValuesModal submitListener={val => {
                  let config = {}
                  authType.parameters.map((param, parametersIdx) => config[param] = val[parametersIdx])
                  return configService()[`change${authType.protocol}AuthenticationOptions`](config)

                }}
                  openButtonIcon={'fa fa-edit'} buttonTooltipText={`Edit ${authType.protocol}`} labels={authType.parameters} />

              </Form><br /></React.Fragment>)}
              <Form inline>
                <div className="col-sm"><button className="btn btn-outline-primary my-2 my-sm-0 " id="SaveButton" onClick={saveAuthTypesAllowed}> Save</button> </div>
              </Form>
            </Card.Body>
          </Card>
        </CardColumns>
      }
    </React.Fragment>
  )

}


