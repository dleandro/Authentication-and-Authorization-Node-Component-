import 'bootstrap/dist/css/bootstrap.min.css';
import './common/stylesheets/App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BackOffice from './components/BackOffice';
import AuthenticationProtocol from './components/login-components/AuthenticationProtocol';
import UserInfo from './components/backoffice-user-components/UserInfo';
import ListInfo from './components/backoffice-list-components/ListInfo';
import PermissionInfo from './components/backoffice-permission-components/PermissionInfo';
import RoleInfo from './components/backoffice-role-components/RoleInfo';
import { Sessions } from './components/BackOfficeFunctionalities';
import { AuthTypeProvider } from './components/login-components/AuthTypeContext';
import { AccountManagement } from './components/backoffice-user-components/AccountManagement';
import UserLogin from './components/login-components/UserLogin';
import TablePage from "./common/html-elements-utils/TablePage";
import { listService, permissionService, rolesService, userService } from "./service";

const routers = [
    {
        route: '/users', component: <TablePage service={{
            ...userService(),
            editFields: ['New Username', 'New Password'],
            postFields: ['New Username', 'New Password'],
            afterUpdateRedirectUrl: user => `/users/${user.id}`,
            detailsUrl: user => `/users/${user.id}`
        }} resource={'users'} />
    },
    { route: '/roles', component: <TablePage service={{ ...rolesService(),editFields: ['New Role', 'New Parent_Role'],
    postFields: ['New Role', 'New Parent_Role'], }} resource={'roles'} /> },
    { route: '/permissions', component: <TablePage service={{ ...permissionService(),editFields: ['New Action', 'New Resource'],
    postFields: ['New Action', 'New Resource'], }} resource={'permissions'} /> },
    { route: '/lists', component: <TablePage service={{ ...listService(),editFields: ['New List'],
    postFields: ['New List'], }} resource={'lists'} /> }];
class Routes extends Component {

    // we have two routes pointing to the backoffice to make sure that when a logged in user exists and the app is on the path '/' he doesn't get stuck on that page

    render() {
        return (
            <div id={'main'} style={{ marginLeft: this.props.sidebarCollapsedSize }} >

                <Route path={'/backoffice'} exact component={BackOffice} />
                {routers.map(route => <Route key={route.route} path={route.route} exact component={() => route.component} />)}
                <Route path={`/users/:id`} exact component={UserInfo} />
                <Route path={'/account'} exact component={AccountManagement} />
                <Route path={'/login'} exact component={UserLogin} />

                <Route path={'/permissions/:id'} exact component={PermissionInfo} />

                <Route path={'/roles/:id'} exact component={RoleInfo} />

                <Route path={'/lists/:id'} exact component={ListInfo} />
                <Route path={'/sessions'} exact component={Sessions} />

                <AuthTypeProvider>
                    <Route path={'/configs'} exact component={() => <AuthenticationProtocol />} />
                </AuthTypeProvider>

                <Route path={'/'} exact component={BackOffice} />

            </div>

        );
    }
}

export default Routes