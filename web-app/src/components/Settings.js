import React from 'react'


export default function Settings() {
    fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(data => console.log(data))
    return (
        <div>
            <h1>Settings</h1>
            <p>Network Protocol:</p>
            <form>
                <p>
                    <input type="radio" id="OpenID" name="protocol" value="OpenID"/>
                    <label for="OpenID">OpenID</label>
                </p>
                <p>
                    <input type="radio" id="Kerberos" name="protocol" value="Kerberos"/>
                    <label for="Kerberos">kerberos</label>
                </p>
                <p>
                    <input type="radio" id="SAML" name="protocol" value="SAML"/>
                    <label for="SAML">SAML</label>
                </p>
            </form>
        </div>
    )
}
