import React from 'react'

import SideNav, { Toggle, Nav, NavItem } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Link} from 'react-router-dom';

export default function Sidebar() {


    return (
        <SideNav  style={{'background-color': '#282c34'}}>
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <Link to={'/'} > Homepage </Link>
                </NavItem>
                <NavItem eventKey="charts">
                    <Link to={'/login'} >Login</Link>
                </NavItem>
                <NavItem eventKey="charts">
                    <Link to={'/loginAdmin'} > Protocol</Link>
                </NavItem>
                <NavItem eventKey="charts">
                    <Link to={'/backoffice'} > Backoffice</Link>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}



