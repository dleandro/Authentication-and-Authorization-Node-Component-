import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import LoginForm from "./StandardTextBar";


export class UserLogin extends Component {
    render() {
        return (
            /*<Form>
                <StandardTextBar formId={"formGroupEmail"} label={"Email address"} placeholder={"Enter email"} inputType={"email"} />
                <StandardTextBar formId={"formGroupPassword"} label={"Password"} placeholder={"Password"} inputType={"password"} />
            </Form>*/
            <div className="modal-dialog text-center">
                <div className="col-sm-8 main-section">
                    <div className="modal-content">
                        <div className="col-12 user-img">
                            <img src="logo.png"/>
                        </div>
                        <div className="col-12 user-name">
                            <h1>User Login</h1>
                        </div>
                        <LoginForm id={"login"}/>
                        <div className="col-12 link-part">
                            <a href="#">Forgot Password?   </a>
                            <h1></h1>
                            <a href="/register"> Register</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserLogin
