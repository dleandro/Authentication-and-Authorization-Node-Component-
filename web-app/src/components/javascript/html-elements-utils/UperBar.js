import React from 'react'
import DropdownButton from "react-bootstrap/DropdownButton";
import {Dropdown} from "react-bootstrap";


/**
 *
 * @param setRedirect
 * @param isLoggedIn
 * @param logoutWith
 * @returns {*}
 * @constructor
 */
export default function Uperbar({setRedirect, isLoggedIn, logoutWith,userId}) {
//available icons https://www.w3schools.com/icons/fontawesome_icons_webapp.asp


    const logoutAndRedirect = () => {
        logoutWith({name: undefined, pass: undefined})
        setRedirect('/login')
    }

    const render = (predicate) => {
        console.log(`predicate:${predicate}`)
        return predicate ? <React.Fragment><Dropdown.Divider/>
            <Dropdown.Item eventKey="4" onClick={logoutAndRedirect}><i
                className="fa fa-sign-out fa-fw"/> Logout</Dropdown.Item> </React.Fragment> : null
    }
    return (
        <nav className="navbar navbar-dark bg-dark" id="NavBar">

            <DropdownButton
                title={<i className={"fa fa-user-circle-o"}> </i>}
                id={`dropdown-variants-Info`}
            >
                <Dropdown.Item eventKey="1" onClick={()=>setRedirect(`/users/${userId}`)}><i className="fa fa-vcard"/> Profile</Dropdown.Item>
                <Dropdown.Item eventKey="3" active>
                    <i className={"fa fa-cog fa-spin"}/> Settings
                </Dropdown.Item>
                {render(isLoggedIn)}
            </DropdownButton>

    
        </nav>
    )
}

