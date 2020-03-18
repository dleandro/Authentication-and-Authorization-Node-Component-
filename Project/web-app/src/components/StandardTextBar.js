import React from 'react'
import Form from "react-bootstrap/Form";

export function StandardTextBar({ Id, placeholder, inputType }) {
    return (
        <div className="form-group">
            <input type={inputType} className="form-control" placeholder={placeholder} id={Id} required></input>
        </div>
    )
}

export default function LoginForm({ id }) {
    return (
       /*<Form.Group controlId={formId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={inputType} placeholder={placeholder} />
        </Form.Group>*/
       <div className="col-12 form-input" id={id}>
            <form action="/login" method="POST">
                <StandardTextBar Id={"email"} placeholder={"Enter email"} inputType={"email"}/>
                <StandardTextBar Id={"password"} placeholder={"Password"} inputType={"password"}/>
                <button type="submit" className="btn btn-success">Login</button>
            </form>
       </div>
    )
}

