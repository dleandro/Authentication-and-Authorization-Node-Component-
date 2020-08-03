import React from 'react'
import LoginForm from "./LoginForm";
import Jumbotron from 'react-bootstrap/Jumbotron';

const UserLogin = ({ app, setRedirect }) =>

    <Jumbotron style={{
        backgroundImage: `url(https://wallpaperboat.com/wp-content/uploads/2020/03/grey-texture-background-hd-1.jpg)`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        overflow: 'auto'
    }}>
        <div className="modal-dialog text-center" >
            <div className="col-sm-8 main-section" >
                <div className="modal-content" >
                    <div className="col-12 user-img">
                        <img src="logo.png" alt={""} />
                    </div>
                    <div className="col-12 user-name">
                        <h1 style={{color: "black"}}>User Login</h1>
                    </div>
                    <LoginForm id={"login"} />
                    <div className="col-12 link-part">
                        <a href="/register"> Register</a>
                    </div>
                </div>
            </div>
        </div>
    </Jumbotron>

export default UserLogin
