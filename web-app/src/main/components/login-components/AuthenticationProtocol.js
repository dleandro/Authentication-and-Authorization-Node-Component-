import React, { useContext, useEffect, useState } from 'react'
import AuthTypeContext from './AuthTypeContext'
import Form from "react-bootstrap/Form";
import { SubmitValuesModal } from "../../common/html-elements-utils/generics/GenericModal";
import { configService } from "../../common/services/basicServices";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Alert from 'react-bootstrap/Alert';
import UserContext from '../../UserContext';

export default function AuthenticationProtocol() {

  const authTypeCtx = useContext(AuthTypeContext);
  const ctx=useContext(UserContext)

  const [state, setState] = useState([]);
  const [showAlert, setAlert] = useState(false);

  const [error, setError] = useState({ errorMessage: undefined, shouldShow: false });
  const [put,setPut]=useState(undefined);
  const [patch,setPatch]=useState(undefined);

  const checkHasPermission = async (method,resource) => ctx.rbac && ctx.rbac.can(method, resource);

  const switchValue = idx => {
    let newValue = [...state];
    newValue[idx].active = !newValue[idx].active;
    setState(newValue);
    console.log(newValue)
  }

  useEffect(()=>{
    const asyncOpts=async ()=>{
      setPut(await checkHasPermission('PUT','configs'))
      setPatch(await checkHasPermission('PATCH','auth-types'))
    }
    asyncOpts()
  },[])

  useEffect(() => {
    setState(authTypeCtx.allowedProtocolsAndIdps);
  }, [authTypeCtx.allowedProtocolsAndIdps]);

  function saveAuthTypesAllowed() {
    authTypeCtx.setAuthTypesFlag(true);
    authTypeCtx.setAllowedProtocolsAndIdps(state);
    setAlert(true);
  }

  return (
      <React.Fragment >

        {ctx.error ? <p>{ctx.error.status} {ctx.error.err}</p> :
            <CardColumns style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>

              <Card style={{ width: '24rem' }} key={'AuthProtocolCard'} border="info" className='ml-2 mr-2'>
                <Card.Body>
                  <Card.Title>{'Supported Authentication Types'}</Card.Title>
                  {state.map((authType, idx) =>
                      <React.Fragment>
                        <Form inline>
                          <Form.Check disabled={!patch} id={`Protocol: ${authType.protocol} IDP: ${authType.idp} switch`} checked={authType.active} onChange={() => switchValue(idx)} label={`${authType.idp} with ${authType.protocol} `} type={'switch'} />
                          &nbsp;&nbsp;
                          {
                            put && <SubmitValuesModal submitListener={val => {
                              let config = {}
                              authType.parameters.map((param, parametersIdx) => config[param] = val[parametersIdx])
                              console.log(config)
                              return configService()[`change_${authType.idp}_${authType.protocol}_AuthenticationOptions`](config)

                            }}
                                                      openButtonIcon={'fa fa-edit'} buttonTooltipText={`Edit ${authType.protocol}`} labels={authType.parameters} />
                          }
                        </Form><br /></React.Fragment>)}

                  {
                    patch && <div className="col-sm">
                      <button className="btn btn-outline-primary my-2 my-sm-0 " id="SaveButton" onClick={saveAuthTypesAllowed}> Save</button>
                      {showAlert?<Alert key={'successAlert'} variant={'success'} onClose={()=>setAlert(false)} dismissible>
                        Auth Types saved successfully!
                      </Alert>:undefined}
                    </div>
                  }

                </Card.Body>
              </Card>
            </CardColumns>
        }
      </React.Fragment>
  )

}