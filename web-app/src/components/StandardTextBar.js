import React from 'react'

export function StandardTextBar({ onChange, placeholder, inputType }) {
    return (
        <div className="form-group">
            <input type={inputType} className="form-control" placeholder={placeholder} onChange={e=>onChange(e.target.value)} required></input>
        </div>
    )
}

export default function LoginForm({id , app}) {


    function myFunction(){
        alert('alert' + app.state.email)
        var myInit = { method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },     
         body: JSON.stringify({
                   "username": app.state.email,
                   "password": app.state.password
               })};
        fetch('/login',myInit)
        .then(response=>response.json())
        .then(data=>console.log(data))
    }

    return (
        <div className="col-12 form-input" id={id}>
                <StandardTextBar onChange={app.changeEmail} placeholder={"Enter email"}  inputType={"email"}/>
                <StandardTextBar onChange={app.changePass} placeholder={"Password"}  inputType={"password"}/>
                <button  onClick={myFunction} className="btn btn-success" >Login</button>
       </div>
    )
}

