import 'bootstrap/dist/css/bootstrap.min.css';
import './common/stylesheets/App.css';
import React, { Component, useContext } from 'react';
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
import {listService, permissionService, rolesService, sessionService, userService} from "./service";
import UserContext from './UserContext';

const rolesDropdownOptionsFetcher = () => rolesService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.role})));
const rolePostFields = ['New Role', {text:'Id of the Parent Role (dropdown) ', DropdownOptionsFetcher:rolesDropdownOptionsFetcher}];


const userServ=(ctx)=> ({ ...userService(),
    editFields: ['New Username'],
    postFields: ['New Username', 'New Password'],
    detailsUrl: user => `/users/${user.id}`,
    post : (arr)=>userService().post([...arr,ctx.user.id]),
    update : (oldObject, newValuesArr)=>userService().update(oldObject,newValuesArr,ctx.user.id)
    });
const roleServ = {...rolesService(),
      postFields: rolePostFields ,
       detailsUrl: role => `/roles/${role.id}`
    };
const listServ = {...listService(), detailsUrl: list => `/lists/${list.id}`};
const permServ = {...permissionService(), postFields: ['New Action', 'New Resource'],
    detailsUrl: permission => `/permissions/${permission.id}`};

const sessionServ={...sessionService(),
    get: () => sessionService().get().then(results => results.map(result => {
        return {
            sid: result.sid,
            start_date: result.createdAt,
            end_date: result.expires,
            UserId:result.UserId

        }
    }))
}



class Routes extends Component {
    
    static contextType  = UserContext;
    
    // we have two routes pointing to the backoffice to make sure that when a logged in user exists and the app is on the path '/' he doesn't get stuck on that page
         routers = [
            { route: '/users', component: <TablePage service={userServ(this.context)} resource={'users'} />},
            { route: '/roles', component: <TablePage service={roleServ} resource={'roles'} /> },
            { route: '/permissions', component: <TablePage service={permServ} resource={'permissions'} /> },
            { route: '/lists', component: <TablePage service={listServ} resource={'lists'} /> },
            { route: '/sessions', component: <TablePage service={sessionServ} resource={'sessions'} /> }];
    
    render() {
        return (
            <div id={'main'} style={{ marginLeft: this.props.sidebarCollapsedSize }} >

                <Route path={'/backoffice'} exact component={BackOffice} />
                {this.routers.map(route => <Route key={route.route} path={route.route} exact component={() => route.component} />)}
                <Route path={`/users/:id`} exact component={UserInfo} />
                <Route path={'/account'} exact component={AccountManagement} />
                <Route path={'/login'} exact component={UserLogin} />

                <Route path={'/permissions/:id'} exact component={PermissionInfo} />

                <Route path={'/roles/:id'} exact component={RoleInfo} />

                <Route path={'/lists/:id'} exact component={ListInfo} />

                <AuthTypeProvider>
                    <Route path={'/configs'} exact component={() => <AuthenticationProtocol />} />
                </AuthTypeProvider>


            </div>

        );
    }
}

export default Routes