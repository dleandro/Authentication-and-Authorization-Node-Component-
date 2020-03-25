import React from 'react'

export function StandardTextBar({ onChange, placeholder, inputType }) {
    return (
        <div className="form-group">
            <input type={inputType} className="form-control" placeholder={placeholder} onChange={e=>onChange(e.target.value)} required></input>
        </div>
    )
}

export default function LoginForm({id , app}) {


    const fetch = require('node-fetch');
    function submitLoginRequest() {
        console.log("http://localhost:8082/"+app.state.selectedProtocol)
        fetch("http://localhost:8082/"+app.state.selectedProtocol,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:app.state.email, pass:app.state.password})
        })
            .then(resp=>resp.json())
            .then(json=>console.log(json))
    }
    return (
        <div className="col-12 form-input" id={id}>
            <form >
                <StandardTextBar onChange={app.changeEmail} placeholder={"Enter email"}  inputType={"email"}/>
                <StandardTextBar onChange={app.changePass} placeholder={"Password"}  inputType={"password"}/>
                <button type="submit" onsubmit={submitLoginRequest()} className="btn btn-success" >Login</button>
            </form>
		</div>
    )
}

