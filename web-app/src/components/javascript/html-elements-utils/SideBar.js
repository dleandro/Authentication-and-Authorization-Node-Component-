import React from 'react'

import SideNav, { NavItem} from '@trendmicro/react-sidenav';
import {Link} from 'react-router-dom';

export default function Sidebar({navWidthCollapsed , navWidthExpanded}) {


    var expanded = false

    function toggleListener() {
        expanded= !expanded
        document.getElementById('sidebar').style.width= expanded ? navWidthExpanded : navWidthCollapsed
        document.getElementById('main').style.marginLeft= expanded ? navWidthExpanded : navWidthCollapsed
    }


    return (
        <SideNav id={"sidebar"} style={{'backgroundColor': '#282c34',width: navWidthCollapsed}} onToggle={(selected) => toggleListener()}>
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



