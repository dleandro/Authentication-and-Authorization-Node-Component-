import React from 'react'

import SideNav, { NavItem, NavText} from '@trendmicro/react-sidenav';
import {Link} from 'react-router-dom';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";


export default function Sidebar({navWidthCollapsed , navWidthExpanded}) {

    const officeSubItems = [{link: '/backoffice/permissions',text:'Permissions'},{link: '/backoffice/roles',text:'Roles'},{link: '/backoffice/lists',text:'Lists'}]

    var mainItems = [
        {key:'home',link:'/',text:'Homepage'},
        {key:'login',link:'/login',text:'Login'},
        {key:'protocol',link:'/loginAdmin',text:'Protocol'},
        {key:'office',link:'/backoffice',text:'Backoffice', subItems:officeSubItems}];

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
                {mainItems.map(item=>
                    <NavItem eventKey={item.key}>
                        <Link to={item.link} > {item.text} </Link>
                        { item.subItems!==undefined? item.subItems.map(subItem=>
                            <NavItem>
                                <NavText>
                                    <Link to={subItem.link} > {subItem.text}</Link>
                                </NavText>
                            </NavItem>
                        ):null}
                    </NavItem>
                )}
            </SideNav.Nav>
        </SideNav>

    )
}



