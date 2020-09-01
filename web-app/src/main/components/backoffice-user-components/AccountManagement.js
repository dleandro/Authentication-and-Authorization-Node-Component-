import React, { useState } from 'react'
import { Account } from './Account'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {UsersessionService} from "../../common/services/infoPagesServices";
import GenericInfoTab from "../../common/html-elements-utils/generics/GenericInfoTab";
import { profileService } from '../../common/services/basicServices';

const labels = ['Sessions'];

export const AccountManagement = () => {

    const [componentToBeShown, setComponentToBeShown] = useState(0)

    const components = {
        0: <Account />,
        1: <GenericInfoTab service={profileService()} resource={'profile'} />,
    }

    return (
        <React.Fragment>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={()=>setComponentToBeShown(0)}>Account</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp,idx)=><Nav.Link onClick={()=>setComponentToBeShown(idx+1)}>{comp}</Nav.Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {components[componentToBeShown]}
        </React.Fragment>

    )
}
