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
import { AuthTypeProvider } from './components/login-components/AuthTypeContext';
import { AccountManagement } from './components/backoffice-user-components/AccountManagement';
import UserLogin from './components/login-components/UserLogin';
import TablePage from "./common/html-elements-utils/TablePage";
import {listService, logsService, permissionService, rolesService, sessionService, userService} from "./service";

const rolesDropdownOptionsFetcher = () => rolesService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.role})));
const rolePostFields = ['New Role', {text:'Id of the Parent Role (dropdown) ', DropdownOptionsFetcher:rolesDropdownOptionsFetcher}];

const userServ = {...userService(), editFields: ['New Username', 'New Password'], postFields: ['New Username', 'New Password'], detailsUrl: user => `/users/${user.id}`};
const roleServ = {...rolesService(), editFields: rolePostFields, postFields: rolePostFields , detailsUrl: role => `/roles/${role.id}`};
const listServ = {...listService(), editFields: ['New List'], postFields: ['New List'], detailsUrl: list => `/lists/${list.id}`};
const permServ = {...permissionService(), editFields: ['New Action', 'New Resource'], postFields: ['New Action', 'New Resource'],
    detailsUrl: permission => `/permissions/${permission.id}`};

const routers = [
    { route: '/users', component: <TablePage service={userServ} resource={'users'} />},
    { route: '/roles', component: <TablePage service={roleServ} resource={'roles'} /> },
    { route: '/permissions', component: <TablePage service={permServ} resource={'permissions'} /> },
    { route: '/lists', component: <TablePage service={listServ} resource={'lists'} /> },
    { route: '/sessions', component: <TablePage service={{...sessionService()}} resource={'sessions'} /> }];

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

                <AuthTypeProvider>
                    <Route path={'/configs'} exact component={() => <AuthenticationProtocol />} />
                </AuthTypeProvider>

                <Route path={'/'} exact component={BackOffice} />

            </div>

        );
    }
}

export default Routes