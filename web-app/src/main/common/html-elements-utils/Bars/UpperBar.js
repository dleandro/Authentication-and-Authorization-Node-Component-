import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Dropdown } from "react-bootstrap";
import { authenticationService } from '../../services/basicServices';
import UserContext from '../../../UserContext'


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

    const history = useHistory()

    const ctx = useContext(UserContext)
    console.log(ctx)
    const username = ctx.user.username || ""

    const logoutAndRedirect = async () => {
        await authenticationService().logout()
        ctx.setUser({ id: undefined, username: undefined })
        window.location.assign('/')
    }

    const renderUserIfOneIsLoggedIn = () => {
        return username !== "" && <React.Fragment>
            <Dropdown.Item eventKey="1" onClick={() => history.push(`/account`)}><i
                className="fa fa-vcard" /> Profile </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={logoutAndRedirect}>
                <i className="fa fa-sign-out fa-fw" /> Logout
            </Dropdown.Item>
        </React.Fragment>;
    }

    return (

        <React.Fragment>

        <nav className="navbar navbar-expand-md bg-dark">
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <DropdownButton
                        alignRight
                        title={<i className={'fa fa-user-circle-o'}> {username} </i>}
                        id={`dropdown-variants-Info`}
                    >
                        {renderUserIfOneIsLoggedIn()}
                    </DropdownButton>
                </ul>
            </div>

        </nav>

        </React.Fragment>
    )
}

