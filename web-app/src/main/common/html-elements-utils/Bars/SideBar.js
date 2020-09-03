import React, { useContext, useState, useEffect } from 'react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, { NavIcon, NavItem, NavText } from '@trendmicro/react-sidenav';
import { Link } from 'react-router-dom';
import UserContext from "../../../UserContext";
const fontSize = { fontSize: '1.75em'/*,color: '#1cc4e6'*/ }


/**
 * Receives the width of the sidebar when collapsed or expanded
 * @param navWidthCollapsed
 * @param navWidthExpanded
 * @param expanded
 * @returns {*}
 * @constructor
 */
export default function Sidebar({ navWidthCollapsed }) {
    const ctx = useContext(UserContext);

    const [itemsToShow,setItemsToShow]=useState({})

        const checkShouldShowItem =  permissionResource =>itemsToShow[permissionResource]
    const subItemToLink = subItem => /*checkShouldShowItem(subItem.key) ?*/ <NavItem key={subItem.key}>
        <NavText >
            <Link to={subItem.link}> {subItem.text}</Link>
        </NavText>
    </NavItem> /*: undefined*/;
    
    
    const officeSubItems = [
        { link: '/users', text: 'Users', key: 'users' },
        { link: '/permissions', text: 'Permissions', key: 'permissions' },
        { link: '/roles', text: 'Roles', key: 'roles' },
        { link: '/lists', text: 'Lists', key: 'lists' }
    ]
    
    const subItemsLinks=officeSubItems.map(subItem => subItemToLink(subItem));

    /*
    useEffect(()=>{
        const asyncOpts=async ()=>{
            if(ctx.rbac){
            officeSubItems.forEach(async officeSubItem=>{
                console.log(ctx)
               const json=itemsToShow
               json[officeSubItem['key']]=await ctx.rbac.can('GET',officeSubItem['key'])
               setItemsToShow(json)
            })
        }
        
    }
    asyncOpts()
    },[ctx.rbac])
    */




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
        { key: 'office', link: '/backoffice', icon: <i className="fa fa-cog" style={fontSize} />, text: 'Backoffice', subItems: subItemsLinks },
        { key: 'configs', link: '/configs', icon: <i className="fa fa-lock" style={fontSize} />, text: 'Configurations' }];

    const [expand, setexpand] = useState(false);

    React.useEffect(() => { document.getElementById('main').style.marginLeft = expand ? navWidthExpanded : navWidthCollapsed; }, [expand, navWidthCollapsed])

    return (
        <SideNav id={"sidebar"}
            style={{ 'backgroundColor': '#282c34', width: expand ? navWidthExpanded : navWidthCollapsed, position: 'fixed', height: '100%' }}
            onToggle={(selected) => setexpand(!expand)}>
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                {mainItems.map(item =>
                    <NavItem key={item.key} eventKey={item.key}>
                        <NavIcon ><Link to={item.link}>{item.icon}</Link></NavIcon>
                        {expand ? <NavText ><Link to={item.link}> {item.text}</Link></NavText> : null}
                        {item.subItems}

                    </NavItem>
                )}
            </SideNav.Nav>
        </SideNav>

    )
}



