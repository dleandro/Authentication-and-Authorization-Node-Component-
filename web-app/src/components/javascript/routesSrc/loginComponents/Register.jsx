import React from 'react';
import {userService,authenticationService} from '../../service';

export default function Register({setRedirect}) {
    const [pass,setPass] = React.useState('');
    const [user,setUser] = React.useState('');

    const register =  () => userService().addUser(['',user,pass]).then( ()=> authenticationService().login(user,pass)).then(()=>{
        setRedirect('/');
        window.location.reload(false);
    });
    const idps = (text,btn) => <div className="col-xs-4 col-sm-2">
        <a href="#" className={`btn btn-lg btn-block omb_btn-${btn}`}>
            <span className="hidden-xs">{text}</span>
        </a>
    </div>

    return(
        <div className="container">
            <div className="omb_login">
                <h3 className="omb_authTitle">Login or <a href="#">Sign up</a></h3>
                <div className="row omb_row-sm-offset-3 omb_socialButtons">
                    {idps('Facebook','facebook')}
                    {idps('Twitter','twitter')}
                    {idps('Google+','google')}
                </div>
                <br/>

                <div className="row omb_row-sm-offset-3">
                    <div className="col-xs-12 col-sm-6">
                            <div className="input-group">
                                <span style={{height: '25px'}} className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" onChange={e=>setUser(e.target.value)} name="username" placeholder="email address"></input>
                            </div>
                            <span className="help-block"></span>

                            <div className="input-group">
                                <span style={{height: '25px'}} className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input type="password" className="form-control" onChange={e=>setPass(e.target.value)} name="password" placeholder="Password"></input>
                            </div>
                            <span className="help-block">Password error</span>

                            <button className="btn btn-lg btn-primary btn-block" onClick={register} type="submit">Login</button>
                    </div>
                </div>
                <div className="row omb_row-sm-offset-3">
                    <div className="col-xs-12 col-sm-3">
                        <p className="omb_forgotPwd">
                            <a href="/login">Forgot password?</a>
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}