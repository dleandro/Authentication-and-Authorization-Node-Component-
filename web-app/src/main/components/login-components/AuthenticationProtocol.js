import React, { useContext, useEffect, useState } from 'react'
import AuthTypeContext from './AuthTypeContext'
import Form from "react-bootstrap/Form";
import {SubmitValuesModal} from "../../common/html-elements-utils/generics/GenericModal";
import {configService} from "../../service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";

export default function AuthenticationProtocol() {

  const ctx = useContext(AuthTypeContext);

  const [state, setState] = useState([]);

  const switchValue = idx =>{
    let newValue= [...state];
    newValue[idx].active = newValue[idx].active === 1?0:1 ;
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
        {ctx.error?<p>{ctx.error.status} {ctx.error.err}</p>:
            <CardColumns style={{display: 'flex', justifyContent: 'center', paddingTop: '100px'}}>

            <Card style={{ width: '24rem'}} key={'AuthProtocolCard'} border="info" className='ml-2 mr-2'>
                <Card.Body>
                  <Card.Title>{'Select Supported Identity Providers'}</Card.Title>
                  { state.map((authType,idx) => <React.Fragment><Form inline>
                    <Form.Check id={`${authType.protocol} switch`} checked={authType.active === 1} onChange={()=>switchValue(idx)} label={authType.protocol} type={'switch'} />
                    &nbsp;&nbsp;
                    <SubmitValuesModal submitListener={val =>authType.changeConfigs?authType.changeConfigs(val):alert('AuthTypeContext doesnt have an editListener')}
                                       openButtonIcon={'fa fa-edit'} buttonTooltipText={`Edit ${authType.protocol}`} labels={Object.keys(authType)} />

                  </Form><br/></React.Fragment>)}
                  <br />
                  <button className="btn btn-outline-primary my-2 my-sm-0 " id="SaveButton" onClick={saveAuthTypesAllowed}> Save</button>

                  <br/>
                  <SubmitValuesModal submitListener={val =>configService().changeDatabaseOptions(val[0])}
                                     openButtonIcon={'fa fa-database'} buttonTooltipText={`Edit SGDB`} labels={['Edit SGBD']} />
                </Card.Body>
              </Card>
            </CardColumns>
        }
      </React.Fragment>
  )

}


