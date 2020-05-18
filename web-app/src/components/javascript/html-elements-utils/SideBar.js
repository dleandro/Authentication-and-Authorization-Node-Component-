import React, {useState} from 'react'

import SideNav, {NavItem, NavText} from '@trendmicro/react-sidenav';
import {Link} from 'react-router-dom';

/**
 * Receives the width of the sidebar when collapsed or expanded
 * @param navWidthCollapsed
 * @param navWidthExpanded
 * @param expanded
 * @returns {*}
 * @constructor
 */
export default function Sidebar({navWidthCollapsed, navWidthExpanded}) {

    const officeSubItems = [{link: '/backoffice/permissions', text: 'Permissions'}, {
        link: '/backoffice/roles',
        text: 'Roles'
    }, {link: '/backoffice/lists', text: 'Lists'}]
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
        {key: 'home', link: '/', icon: <i className="fa fa-home" style={{'font-size': "36px"}}/>, text: 'Homepage'},
        {
            key: 'login',
            link: '/login',
            icon: <i className="fa fa-sign-in" style={{'font-size': "36px"}}/>,
            text: 'Login',
        },
        {
            key: 'protocol',
            link: '/loginAdmin',
            icon: <i className="fa fa-lock" style={{'font-size': "36px"}}/>,
            text: 'Protocol'
        },
        {
            key: 'office',
            link: '/backoffice',
            icon: <i className="fa fa-tachometer" style={{'font-size': "36px"}}/>,
            text: 'Backoffice',
            subItems: officeSubItems
        }];

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
                        <Link to={item.link}> {expand ? <div>{item.icon} {item.text}</div> : item.icon} </Link>
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



