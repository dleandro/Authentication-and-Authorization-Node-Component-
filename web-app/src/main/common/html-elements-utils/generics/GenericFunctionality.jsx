import React, {useContext, useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import GenericTooltipButton from "./GenericTooltipButton";
import {SubmitValuesModal} from "./GenericModal";
import {Link} from "react-router-dom";
import UserContext from "../../../UserContext";

/**
 * if you're changing something here that's probably wrong
 * @param fetchCB -should contain an err atribute if an error occured
 * @param postNewDataCB -should return a promise with an object identical to the returned in fetchCB and should receive an array
 * @param postNewDataFieldLabels -labels that describe the array values of the postNewDataCB aka the parameters of postNewDataCB
 * @param deleteDataCB - should receive one of the objects returned by fetchCB which you want to delete
 * @param valueToLineCB -should convert one of the objects returned by fetchCB into a table line
 * @param tableLabels -main table headers
 * @returns {JSX.Element}
 * @constructor
 */
export default function GenericFunctionality({fetchCB,postNewDataCB,postNewDataFieldLabels,deleteDataCB,valueToLineCB,tableLabels,resource}){
    const [values, setValues] = useState([]);
    const [error,setError] = useState(undefined);
    const postData = arr => postNewDataCB(arr).then(d=>setValues([...values,d]));
    const deleteValue = val => deleteDataCB(val).then(()=>setValues([...values].filter(item=>item.id !==val.id)));

    useEffect(()=>{fetchCB().then(data=>{console.log(data); return 'err' in data?setError(data):setValues(data)});},[]);
    useEffect(()=>{if (error)console.error('An error ocurred: ',error);},[error]);

    const valueToLine = (val) => <tr>
        {valueToLineCB(val)}
        {deleteDataCB?
        <td>
            <GenericTooltipButton icon={'fa fa-trash'} tooltipText={'Delete!'} bootstrapColor={'danger'} onClick={()=>deleteValue(val)} />
        </td>:undefined}
    </tr>;
    return (
        <React.Fragment>
            {error?<p>{error.status} {error.err}</p>:
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        {tableLabels.map(label => <th>{label}</th>)}
                        <th>
                            {postNewDataCB?<SubmitValuesModal submitListener={postData} labels={postNewDataFieldLabels}/>:undefined}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {values.map(valueToLine)}
                    </tbody>
                </Table>
            }
        </React.Fragment>
    );
}

export function BasicFunctionality({fetchCB,postNewDataCB,postNewDataFieldLabels,deleteDataCB,resource,editDataRenderer}){
    const [values, setValues] = useState([]);
    const [error,setError] = useState(undefined);
    const postData = arr => postNewDataCB(arr).then(d=>setValues([...values,d]));
    const deleteValue = val => deleteDataCB(val).then(()=>setValues([...values].filter(item=>item.id !==val.id)));
    const ctx = useContext(UserContext);

    const checkForPermission= method => ctx.userPermissions?ctx.userPermissions.filter(perm=>perm===method+'_'+resource).length:undefined;

    useEffect(()=>{fetchCB().then(data=>{console.log(data); return 'err' in data?setError(data):setValues(data)});},[]);
    useEffect(()=>{if (error)console.error('An error ocurred: ',error);},[error]);


    const render = ()=> {
        let labels=Object.keys(values[0]);
        const headers = <tr>
            {labels.map(label => <th>{label}</th>)}
            <th>{postNewDataCB && checkForPermission('POST')?<SubmitValuesModal submitListener={postData} labels={postNewDataFieldLabels}/>:undefined}</th>
        </tr>;
        const body = values.map(val => <tr>
            {labels.map(label=><td>{label==='id'?<Link to={`/${resource}/${val.id}`}>{`${resource} details: ${val.id}`}</Link>:val[label]}</td>)}
            {checkForPermission('PUT')?editDataRenderer(val):undefined}
            {deleteDataCB && checkForPermission('DELETE')?
                <td>
                    <GenericTooltipButton icon={'fa fa-trash'} tooltipText={'Delete!'} bootstrapColor={'danger'} onClick={()=>deleteValue(val)} />
                </td>:undefined}

        </tr>);
        return checkForPermission('GET')?<Table striped bordered hover variant="dark"><thead>{headers}</thead><tbody>{body}</tbody></Table>
            : <h1 className="display-1 text-white">Im sorry you dont have enough permissions</h1>;
    }

    return (
        <React.Fragment>
            {error?<p>{error.status} {error.err}</p>: values.length && Array.isArray(values) ? render() : undefined}
        </React.Fragment>
    );
}