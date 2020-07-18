import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import {userService, protocolService, listService, rolesService,configService} from '../service'

export default function BackOffice() {

    const history = useHistory();

    const backOfficeFunctionalitiesRow1 = [{title:'Users',desc:'Manage User configurations and associate them with Roles.',link:'/users'},
        {title:'Permissions',desc:'Create, Update and Delete Permissions. Associate these Permissions to Roles.',link:'/permissions'},
        {title:'Roles',desc:'Create, Update and Delete Roles. Associate these roles with different sets of Permissions and Users.',link:'/roles'}];
    const backOfficeFunctionalitiesRow2 = [
        {title:'Lists',desc:'Manage Lists and associate them with Users.',link:'/lists'},
        {title:'Backoffice Configs',desc:'Choose the allowed authentication types for the application.',link:'/protocols'},
        {title:'Sessions',desc:'Manage User Sessions.',link:'/sessions'}];

    const functionalityToCard = func =>
        <Card key={`${func.title}Card`} className='ml-2 mr-2'>
            <Card.Body>
                <Card.Title>{func.title}</Card.Title>
                <Card.Text>{func.desc}</Card.Text>
                <br />
                <Button variant="primary" onClick={() => history.push(func.link)} >Take me there</Button>
            </Card.Body>
        </Card>;

    function myFunc(){
        configService().changeAzureADAuthenticationOptions({})
        .then(data=>console.log(data))
    }

    return (
        <React.Fragment>
        <button onClick={myFunc}>Click Me</button>

        <CardColumns style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px'}}>

            <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                    {backOfficeFunctionalitiesRow1.map(functionalityToCard)}
                </div>
                <div className="d-flex flex-row">
                    {backOfficeFunctionalitiesRow2.map(functionalityToCard)}
                </div>
            </div>
        </CardColumns>
        </React.Fragment>
    );
}

