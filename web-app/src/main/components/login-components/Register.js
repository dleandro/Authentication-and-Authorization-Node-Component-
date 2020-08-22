import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import {userService,authenticationService} from '../../common/services/basicServices';
import Alert from 'react-bootstrap/Alert'

export default function Register() {
    const [pass,setPass] = React.useState('');
    const [user,setUser] = React.useState('');
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: true })
    const history = useHistory();

    const register =  () => userService().post([user,pass])
        .then( ()=> authenticationService().login(user,pass))
        .then(()=>{
            history.push('/backoffice');
            window.location.reload(false);
        })
        .catch(err => {
            setError({ errorMessage: err.message, shouldShow: true })
            console.error(err.message)
        });

return(
    <React.Fragment>
        {
            error.shouldShow &&
            <Alert variant={'primary'} onClose={() => setError(false)} dismissible>
                {error.errorMessage}
            </Alert>
        }
        <link href={'//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css'} rel="stylesheet" id="bootstrap-css"/>
        <div className="container">
            
            <div className="omb_login">
                <h3 className="omb_authTitle">Sign up</h3>
                <br/>

                <div className="row omb_row-sm-offset-3">
                    <div className="col-xs-12 col-sm-6">
                        <div className="input-group">
                            <span style={{height: '25px'}} className="input-group-addon"><i className="fa fa-user"/></span>
                            <input type="text" className="form-control" onChange={e => setUser(e.target.value)} name="username" placeholder="username"/>
                        </div>
                        <span className="help-block"/>

                        <div className="input-group">
                            <span style={{height: '25px'}} className="input-group-addon"><i className="fa fa-lock"/></span>
                            <input type="password" className="form-control" onChange={e => setPass(e.target.value)} name="password" placeholder="Password"/>
                        </div>
                        &nbsp;
                        <button className="btn btn-lg btn-primary btn-block" onClick={register} type="submit">Register</button>
                    </div>
                </div>
            </div>


        </div>
        </React.Fragment>
    );
}
