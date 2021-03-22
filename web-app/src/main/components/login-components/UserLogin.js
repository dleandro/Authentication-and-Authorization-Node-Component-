import React from 'react';
import LoginCard from "./LoginCard";
import Jumbotron from 'react-bootstrap/Jumbotron';
const UserLogin = ({ app, setRedirect }) =>

    <Jumbotron className={'d-flex flex-center'} style={{
        backgroundImage: `url(https://wallpaperboat.com/wp-content/uploads/2020/03/grey-texture-background-hd-1.jpg)`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        overflow: 'auto'
    }}>
        <LoginCard id={"login"} />
    </Jumbotron>

export default UserLogin
