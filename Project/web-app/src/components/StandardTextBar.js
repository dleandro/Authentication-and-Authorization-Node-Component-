import React from 'react'

export function StandardTextBar({ onChange, placeholder, inputType }) {
    return (
        <div className="form-group">
            <input type={inputType} className="form-control" placeholder={placeholder} onChange={e=>onChange(e.target.value)} required></input>
        </div>
    )
}

export default function LoginForm({id , app}) {

    let getLink= ()=> `/login email=${app.state.email}&pass=${app.state.password}&auth=${app.state.selectedProtocol}`

    return (
        <div className="col-12 form-input" id={id}>
            <form action={getLink()} method="POST">
                <StandardTextBar onChange={app.changeEmail} placeholder={"Enter email"}  inputType={"email"}/>
                <StandardTextBar onChange={app.changePass} placeholder={"Password"}  inputType={"password"}/>
                <button type="submit" className="btn btn-success" >Login</button>
            </form>
       </div>
    )
}

