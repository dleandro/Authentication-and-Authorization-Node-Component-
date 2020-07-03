import React, { useState } from 'react'

import SideNav, { NavIcon, NavItem, NavText } from '@trendmicro/react-sidenav';
import { Link } from 'react-router-dom';
const fontSize = { fontSize: '1.75em'/*,color: '#1cc4e6'*/ }


function SubItem ({subItem}){
    return (<NavItem key={subItem.key}>
        <NavText >
            <Link to={subItem.link}> {subItem.text}</Link>
        </NavText>
    </NavItem>);
}
/**
 * Receives the width of the sidebar when collapsed or expanded
 * @param navWidthCollapsed
 * @param navWidthExpanded
 * @param expanded
 * @returns {*}
 * @constructor
 */
export default function Sidebar({ navWidthCollapsed }) {
    const subItemToLink = subItem => <NavItem key={subItem.key}>
        <NavText >
            <Link to={subItem.link}> {subItem.text}</Link>
        </NavText>
    </NavItem>;

    const officeSubItems = [
        {link: '/users', text: 'Users',key:'userLink'},
        {link: '/permissions', text: 'Permissions',key:'permLink'},
        {link: '/roles', text: 'Roles',key:'rolesLink'},
        {link: '/lists', text: 'Lists',key:'listLink'}
    ].map(subItem =>subItemToLink(subItem));

    const navWidthExpanded = '250px';
    /**
     *
     * @type {({link: string, text: string, key: string}|
     * {link: string, text: string, key: string}|
     * {link: string, text: string, key: string}|
     * {subItems: [{link: string, text: string},
     * {link: string, text: string},
     * {link: string, text: string}], link: string, text: string, key: string})[]}
     */
    let mainItems = [
        { key: 'office', link: '/backoffice', icon: <i className="fa fa-cog fa-spin" style={fontSize} />, text: 'Backoffice', subItems: officeSubItems },
        { key: 'protocol', link: '/protocols', icon: <i className="fa fa-lock" style={fontSize} />, text: 'Authentication Types' }];

    const [expand, setexpand] = useState(false);

    /**
     * Opens or closes the Side Bar
     */
    async function toggleListener() {
        setexpand(!expand);
        console.log('set Expanded');
        document.getElementById('sidebar').style.width = expand ? navWidthExpanded : navWidthCollapsed;
        document.getElementById('main').style.marginLeft = expand ? navWidthCollapsed : navWidthExpanded;
    }

    return (
        <SideNav id={"sidebar"}
                 style={{'backgroundColor': '#282c34', width: expand ? navWidthExpanded : navWidthCollapsed}}
                 onToggle={(selected) => toggleListener()}>
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                {mainItems.map(item =>
                    <NavItem key={item.key} eventKey={item.key}>
                        <NavIcon ><Link to={item.link}>{item.icon}</Link></NavIcon>
                        { expand ? <NavText ><Link to={item.link}> {item.text}</Link></NavText>:null}
                        {item.subItems}

                    </NavItem>
                )}
            </SideNav.Nav>
        </SideNav>

    )
}



