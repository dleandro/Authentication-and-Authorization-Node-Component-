import React from 'react';
import { useHistory } from 'react-router-dom'
import {userService,authenticationService} from '../../service';

export default function Register() {
    const [pass,setPass] = React.useState('');
    const [user,setUser] = React.useState('');

    const history = useHistory()

    const register =  () => userService().addUser(['',user,pass]).then( ()=> authenticationService().login(user,pass)).then(()=>{
        history.push('/backoffice')
        window.location.reload(false);
    });
    const idps = (text,btn) => <div className="col-xs-4 col-sm-2">
        <a href="#" className={`btn btn-lg btn-block omb_btn-${btn}`}>
            <span className="hidden-xs">{text}</span>
        </a>
    </div>

    return(
        <div className="container">
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
            <div className="omb_login">
                <h3 className="omb_authTitle">Sign up</h3>
                <div className="row omb_row-sm-offset-3 omb_socialButtons">
                    {idps('Facebook','facebook')}
                    {idps('Twitter','twitter')}
                    {idps('Office365','google')}
                </div>
                <br/>

                <div className="row omb_row-sm-offset-3">
                    <div className="col-xs-12 col-sm-6">
                            <div className="input-group">
                                <span style={{height: '25px'}} className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" onChange={e=>setUser(e.target.value)} name="username" placeholder="username"></input>
                            </div>
                            <span className="help-block"></span>

                            <div className="input-group">
                                <span style={{height: '25px'}} className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input type="password" className="form-control" onChange={e=>setPass(e.target.value)} name="password" placeholder="Password"></input>
                            </div>

                            <button className="btn btn-lg btn-primary btn-block" onClick={register} type="submit">Register</button>
                    </div>
                </div>
            </div>


        </div>
    )
}