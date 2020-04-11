import React from 'react'
import LoginForm from "./LoginForm";

const UserLogin = ({app, setRedirect})=>
    <div className="modal-dialog text-center">
        <div className="col-sm-8 main-section">
            <div className="modal-content">
                <div className="col-12 user-img">
                    <img src="logo.png" alt={""}/>
                </div>
                <div className="col-12 user-name">
                    <h1>User Login</h1>
                </div>
                <LoginForm id={"login"} app={app} setRedirect={setRedirect} />
                <div className="col-12 link-part">
                    <a href="/passwordForgotten">Forgot Password?   </a>
                    <h1></h1>
                    <a href="/register"> Register</a>
                </div>
            </div>
        </div>
    </div>

export default UserLogin
