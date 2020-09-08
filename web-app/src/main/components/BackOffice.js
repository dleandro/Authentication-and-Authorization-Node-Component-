import React,{useState,useEffect,useContext} from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext'
import ResourceCard from "../common/html-elements-utils/ResourceCard";


export default function BackOffice() {

    const history = useHistory();
    const ctx=useContext(UserContext);

    const [itemsToShow,setItemsToShow]=useState({})

    const checkHasPermission = resource => itemsToShow[resource]
  
    const backOfficeFunctionalitiesRow1 = [{title:'Users',desc:'Manage User configurations and associate them with Roles.',link:'/users',resource:'users'},
        {title:'Permissions',desc:'Create, Update and Delete Permissions. Associate these Permissions to Roles.',link:'/permissions',resource:'permissions'},
        {title:'Roles',desc:'Create, Update and Delete Roles. Associate these roles with different sets of Permissions and Users.',link:'/roles',resource:'roles'}];
    const backOfficeFunctionalitiesRow2 = [
        {title:'Lists',desc:'Manage Lists and associate them with Users.',link:'/lists',resource:'lists'},
        {title:'Backoffice Configs',desc:'Choose the allowed authentication types for the application.',link:'/configs',resource:'configs'},
        {title:'Sessions',desc:'Manage User Sessions.',link:'/sessions',resource:'sessions'}];

        /*useEffect(()=>{
            const asyncOpts=async ()=>{
                if(ctx.rbac){
                backOfficeFunctionalitiesRow1.forEach(async functionality=>{
                    console.log(itemsToShow)
                   const json=itemsToShow?itemsToShow:{}
                    json[functionality['resource']]=await ctx.rbac.can('GET',functionality['resource'])
                    setItemsToShow(json)
                })
                backOfficeFunctionalitiesRow2.forEach(async functionality=>{
                    console.log(itemsToShow)
                   const json=itemsToShow?itemsToShow:{}
                    json[functionality['resource']]=await ctx.rbac.can('GET',functionality['resource'])
                    setItemsToShow(json)
                })
            }
                
            }
            asyncOpts()
        },[ctx.rbac])
        */


    const functionalityToCard = func => <ResourceCard resource={func.resource} functionality={func} />;/*
    <Card key={`${func.title}Card`} className='ml-2 mr-2'>
            <Card.Body>
                <Card.Title>{func.title}</Card.Title>
                <Card.Text>{func.desc}</Card.Text>
                <br />
                <Button variant="primary" onClick={() => history.push(func.link)} >Take me there</Button>
            </Card.Body>
        </Card>*/


    return (
        
        <React.Fragment>
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
