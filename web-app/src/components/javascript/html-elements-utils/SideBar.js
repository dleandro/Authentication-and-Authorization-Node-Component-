import React, { useState } from 'react'

import SideNav, { NavIcon, NavItem, NavText } from '@trendmicro/react-sidenav';
import { Link } from 'react-router-dom';
const fontSize = { fontSize: '1.75em'/*,color: '#1cc4e6'*/ }

/**
 * Receives the width of the sidebar when collapsed or expanded
 * @param navWidthCollapsed
 * @param navWidthExpanded
 * @param expanded
 * @returns {*}
 * @constructor
 */
export default function Sidebar({ sidebarCollapsedSize }) {

<<<<<<< HEAD
    const officeSubItems = [{link: '/permissions', text: 'Permissions'}, {
        link: '/roles',
        text: 'Roles'
    }, {link: '/lists', text: 'Lists'}]
=======
    const navWidthExpanded = "250px";

    const officeSubItems = [{ link: '/backoffice/permissions', text: 'Permissions' }, {
        link: '/backoffice/roles',
        text: 'Roles'
    }, { link: '/backoffice/lists', text: 'Lists' }]
>>>>>>> 78253bb718b6fd2212c4650eb34461ba4ee2565d
    /**
     *
     * @type {({link: string, text: string, key: string}|
     * {link: string, text: string, key: string}|
     * {link: string, text: string, key: string}|
     * {subItems: [{link: string, text: string},
     * {link: string, text: string},
     * {link: string, text: string}], link: string, text: string, key: string})[]}
     */
    var mainItems = [
<<<<<<< HEAD
        {key: 'home', link: '/', icon:<i className="fa fa-home" style={fontSize}/>, text: 'Homepage'},
        {key: 'login', link: '/login', icon:<i className="fa fa-sign-in" style={fontSize}/>, text: 'Login',},
        {key: 'protocol', link: '/protocols', icon:<i className="fa fa-lock" style={fontSize}/>, text: 'Protocol'},
        {key: 'office', link: '/users', icon:<i className="fa fa-tachometer" style={fontSize}/>, text: 'Backoffice', subItems: officeSubItems}];

    const [expand, setexpand] = useState(false);

    /**
     * Opens or closes the Side Bar
     */
    function toggleListener() {
        setexpand(!expand)
        console.log('set Expanded')
        document.getElementById('sidebar').style.width = expand ? navWidthExpanded : navWidthCollapsed
        document.getElementById('main').style.marginLeft = expand ? navWidthCollapsed : navWidthExpanded
    }


    return (
        <SideNav id={"sidebar"}
                 style={{'backgroundColor': '#282c34', width: expand ? navWidthExpanded : navWidthCollapsed}}
                 onToggle={(selected) => toggleListener()}>
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                {mainItems.map(item =>
                    <NavItem eventKey={item.key}>
                            <NavIcon ><Link to={item.link}>{item.icon}</Link></NavIcon>
                            { expand ? <NavText ><Link to={item.link}> {item.text}</Link></NavText>:null}
=======
        { key: 'home', link: '/', icon: <i className="fa fa-home" style={fontSize} />, text: 'Homepage' },
        { key: 'login', link: '/login', icon: <i className="fa fa-sign-in" style={fontSize} />, text: 'Login', },
        { key: 'protocol', link: '/protocols', icon: <i className="fa fa-lock" style={fontSize} />, text: 'Protocol' },
        { key: 'office', link: '/backoffice', icon: <i className="fa fa-tachometer" style={fontSize} />, text: 'Backoffice', subItems: officeSubItems }];
>>>>>>> 78253bb718b6fd2212c4650eb34461ba4ee2565d

        const [expand, setexpand] = useState(false);

        /**
         * Opens or closes the Side Bar
         */
        function toggleListener() {
            setexpand(!expand)
            console.log('set Expanded')
            document.getElementById('sidebar').style.width = expand ? navWidthExpanded : sidebarCollapsedSize
            document.getElementById('main').style.marginLeft = expand ? sidebarCollapsedSize : navWidthExpanded
        }
    
    
        return (
            <SideNav id={"sidebar"}
                     style={{'backgroundColor': '#282c34', width: expand ? navWidthExpanded : sidebarCollapsedSize}}
                     onToggle={(selected) => toggleListener()}>
                <SideNav.Toggle/>
                <SideNav.Nav defaultSelected="home">
                    {mainItems.map(item =>
                        <NavItem eventKey={item.key}>
                                <NavIcon ><Link to={item.link}>{item.icon}</Link></NavIcon>
                                { expand ? <NavText ><Link to={item.link}> {item.text}</Link></NavText>:null}
    
                            {item.subItems !== undefined ? item.subItems.map(subItem =>
                                <NavItem>
                                    <NavText>
                                        <Link to={subItem.link}> {subItem.text}</Link>
                                    </NavText>
                                </NavItem>
                            ) : null}
                        </NavItem>
                    )}
                </SideNav.Nav>
            </SideNav>
    
        )
}



