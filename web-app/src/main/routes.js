import 'bootstrap/dist/css/bootstrap.min.css';
import './common/stylesheets/App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BackOffice from './components/BackOffice';
import AuthenticationProtocol from './components/login-components/AuthenticationProtocol';
import { AuthTypeProvider } from './components/login-components/AuthTypeContext';
import { AccountManagement } from './components/backoffice-user-components/AccountManagement';
import UserLogin from './components/login-components/UserLogin';
import TablePage from './common/html-elements-utils/Tables/TablePage';
import {listService, permissionService, rolesService, sessionService, userService} from './common/services/basicServices';
import UserContext from './UserContext';
import GenericInfoCard from './common/html-elements-utils/generics/GenericInfoCard';
import GenericInfoTab from './common/html-elements-utils/generics/GenericInfoTab';
import {listUserService, permissionRoleService, rolePermissionService, roleUserService,
    userHistoryService, userListService, userRoleService, UsersessionService} from './common/services/infoPagesServices';
import GenericInfoPage from './common/html-elements-utils/generics/GenericInfoPage';

const listInfoComponents = {
    0: <GenericInfoCard label={'User'} fetchValueById={listService().getList} />,
    1: <GenericInfoTab resource={'users-lists'} service={listUserService()} />,
};
const permissionInfoComponents = {
    0: <GenericInfoCard label={'Permission'} fetchValueById={permissionService().getPermission} />,
    1: <GenericInfoTab service={permissionRoleService()} resource={'roles-permissions'} />,
};
const RolePermission = () => <GenericInfoTab service={{...rolePermissionService()}} resource={'roles-permissions'} />;
const roleInfoComponents = {
    0: <GenericInfoCard label={'Role'} fetchValueById={rolesService().getRole} />,
    1: <RolePermission/>,
    2: <GenericInfoTab service={{...roleUserService()}} resource={'users-roles'}/>,
};

const UserRole = () => <GenericInfoTab resource={'users-roles'} service={userRoleService()}/>;
const UserSession = ()=>  <GenericInfoTab service={UsersessionService()} resource={'sessions'} />;
const UserList = () =>  <GenericInfoTab service={userListService()} resource={'users-lists'} />;
const userInfoComponents = {
    0: <GenericInfoCard label={'User'} fetchValueById={userService().getUserById} />,
    1: <UserRole/>, 2: <UserSession/>, 3: <UserList/>,
    4: <GenericInfoTab service={userHistoryService()} resource={'user-history'} />,
};
const userServ=(ctx)=> ({ ...userService(),
    post : (arr)=>userService().post([...arr,ctx.user.id]),
    update : (oldObject, newValuesArr)=>userService().update(oldObject,newValuesArr,ctx.user.id),
});





class Routes extends Component {

    static contextType  = UserContext;

    // we have two routes pointing to the backoffice to make sure that when a logged in user exists and the app is on the path '/' he doesn't get stuck on that page
    routers = [
        { route: '/users', component: <TablePage service={userServ(this.context)} resource={'users'} />},
        { route: '/users/:id', component: <GenericInfoPage infoPageName={'User Info'} components={userInfoComponents} labels={['Roles', 'Sessions', 'Lists', 'History']} />},
        { route: '/roles', component: <TablePage service={rolesService()} resource={'roles'} /> },
        { route: '/roles/:id', component: <GenericInfoPage labels={['Permissions', 'Users']} components={roleInfoComponents} infoPageName={'Role Info'} /> },
        { route: '/permissions', component: <TablePage service={permissionService()} resource={'permissions'} /> },
        { route: '/permissions/:id', component: <GenericInfoPage infoPageName={'Permission Info'} components={permissionInfoComponents} labels={['Roles']} /> },
        { route: '/lists', component: <TablePage service={listService()} resource={'lists'} /> },
        { route: '/lists/:id', component: <GenericInfoPage labels={['Users']} components={listInfoComponents} infoPageName={'List Info'} /> },
        { route: '/sessions', component: <TablePage service={sessionService()} resource={'sessions'} /> }];
    render() {
        return (
            <div id={'main'} style={{ marginLeft: this.props.sidebarCollapsedSize }} >

                <Route path={'/backoffice'} exact component={BackOffice} />
                <Route path={'/'} exact component={BackOffice} />
                {this.routers.map(route => <Route key={route.route} path={route.route} exact component={() => route.component} />)}
                <Route path={'/account'} exact component={AccountManagement} />
                <Route path={'/login'} exact component={UserLogin} />
                <AuthTypeProvider>
                    <Route path={'/configs'} exact component={() => <AuthenticationProtocol />} />
                </AuthTypeProvider>
            </div>

        );
    }
}

export default Routes;
