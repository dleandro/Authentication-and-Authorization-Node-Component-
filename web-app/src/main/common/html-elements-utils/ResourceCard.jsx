import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../../UserContext';
import {useHistory} from 'react-router-dom';
//receives the resource which we need in order to render the specified element
function usePermissionChecker(resource, elementToRender) {
    let ctx = useContext(UserContext);
    const [shouldRender, setShouldRender] = useState(undefined);
    const [actions,setActions] =useState([]);
    const [renderedElement,setElement] = useState(undefined);

    //everytime an action is added as a requirement to render the element or the resource changes
    //it reevaluates if the element should be rendered
    useEffect(()=>{
        if (actions.length && ctx.rbac){
            const areActionAllowed=Promise.all(actions.map(action=>ctx.rbac.can(action,resource)));
            const isResourceAllowed= areActionAllowed.then(actionsAllowed=>actionsAllowed.reduce((prevAction,currAction)=>prevAction&&currAction));
            isResourceAllowed.then(setShouldRender);
        }
    },[resource,actions,ctx.rbac]);
    //everytime the flag changes it stores or removes the element from the state
    useEffect(()=>{
        setElement(shouldRender?elementToRender:undefined);
    },[shouldRender]);
    //adds a action as a requirement to render a element
    function addRequiredAction(action) {
        setActions([...actions,action]);
    }

    return [renderedElement, addRequiredAction];
}

export default function ResourceCard({functionality,resource}) {
    const history = useHistory();
    const [redirectButton,addRequiredPermission] = usePermissionChecker(resource,<Button variant="primary" onClick={() => history.push(functionality.link)} >Take me there</Button>);

    useEffect(()=>{
        addRequiredPermission('GET');
    },[]);
    return (
        <Card key={`${functionality.title}Card`} className='ml-2 mr-2'>
            <Card.Body>
                <Card.Title>{functionality.title}</Card.Title>
                <Card.Text>{functionality.desc}</Card.Text>
                <br/>
                {redirectButton || <Button variant="primary" disabled={true} >Take me there</Button>}
            </Card.Body>
        </Card>
    );
}
