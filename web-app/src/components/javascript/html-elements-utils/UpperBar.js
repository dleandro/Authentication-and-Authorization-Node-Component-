import React, { useEffect, useState } from 'react'
import DropdownButton from "react-bootstrap/DropdownButton";
import { Dropdown } from "react-bootstrap";
import { userService, authenticationService } from '../service'


/**
 *
 * @param setRedirect
 * @param isLoggedIn
 * @param logoutWith
 * @returns {*}
 * @constructor
 */

export default function Upperbar({ setRedirect }) {
    //available icons https://www.w3schools.com/icons/fontawesome_icons_webapp.asp

    const [loggedInUser, setLoggedInUser] = useState({})

    useEffect(() => {

        async function fetchData() {
            const user = userService().getAuthenticatedUser()
            if (user) {
                setLoggedInUser(await user)
            }
        }

        fetchData()

    }, [])

    const logoutAndRedirect = async () => {
        await authenticationService().logout()
        setLoggedInUser({})
    }


    const render = () => {
        console.log(loggedInUser)
        return loggedInUser.username ? <React.Fragment>
            <Dropdown.Item eventKey="1" onClick={() => setRedirect(`/user/profile`)}><i
                className="fa fa-vcard" /> Profile </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={logoutAndRedirect}><i
                className="fa fa-sign-out fa-fw" /> Logout</Dropdown.Item> </React.Fragment> :
            null

    }
    return (
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul class="navbar-nav ml-auto">
                    <DropdownButton
                        alignRight
                        title={<i className={"fa fa-user-circle-o"}> {loggedInUser.username} </i>}
                        id={`dropdown-variants-Info`}
                    >
                        {render()}
                        <Dropdown.Item eventKey="3" active>
                            <i className={"fa fa-cog fa-spin"} /> Settings
                </Dropdown.Item>
                    </DropdownButton>
                </ul>
            </div>

        </nav>
    )
}

