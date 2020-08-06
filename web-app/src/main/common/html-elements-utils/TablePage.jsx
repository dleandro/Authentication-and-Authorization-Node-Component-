import React, { useContext, useEffect, useState } from 'react';
import GenericTooltipButton from "./generics/GenericTooltipButton";
import UserContext from "../../UserContext";
import { SubmitValuesModal } from "./generics/GenericModal";
import { useHistory } from "react-router-dom";
import FilterablePageTable from "./Table/FilterablePageTable";


/**
 * service should contain the methods get,post,update,destroy,afterUpdateRedirectUrl,detailsUrl and the fields editFields and postFields
 * - editFields: an array of strings representing the input label on the update popUp
 * ex- editFields=['new username','new pass'] means that the edit popup will have 2 input boxes with those 2 labels to submit 2 values(a new username and password)
 * - postFields: an array of strings representing the input label on the post popUp
 * ex- postFields=['new username','new pass'] means that the add popup will have 2 input boxes with those 2 labels to submit 2 values(an username and password)
 * - get(): must not receive any params and should return an object array representing the passed resource ex- resource='user' get returns {id:1,username:'ex',pass:'1111'}
 * - post(newValuesArr): must receive an array of values similar to postFields and return an object equal to the objects returned on get
 * ex- postFields=['user','pass] post receives ['JoeMama','1111'] post returns {id:1,username:'JoeMama',pass:'1111'}
 * - destroy(valueToBeDeleted): receives the object which we want to delete, the object is equal to the ones returned on get, any return value will be ignored
 * - update(oldObject,newValuesArr): must receive an array of values similar to editFields and the object which will be updated
 * must return an object equal to the objects returned on get
 * ex- editFields=['user','pass] update receives ['newJoeMama','1414'] update returns {id:1,username:'newJoeMama',pass:'1414'}
 * - afterUpdateRedirectUrl(oldObject): receives the same as destroy, should return the link to which we want to be redirected after the update is called
 * ex- afterUpdateRedirectUrl receives {id:1,username:'JoeMama',pass:'1111'} and returns '/user/1' or '/user/JoeMama'
 * - detailsUrl(resourceObj): receives the same as destroy, should return the link to check the details of the resource object
 * ex- detailsUrl receives {id:1,username:'JoeMama',pass:'1111'} and returns '/user/1' or '/user/JoeMama'
 * - resource: a string representing the permission which the user needs to own in order to perform the GET/POST/PUT/DELETE requests
 * ex- resource='role' user needs to own the permission 'PUT_role' to update existing roles
 * @param service
 * @param resource
 * @returns {JSX.Element}
 * @constructor
 */
const TablePage = ({ service, resource }) => {
    const ctx = useContext(UserContext);
    let history = useHistory();
    let [values, setValues] = useState([]);
    const [error,setError] = useState(undefined);
    const postData = arr => service.post(arr).then(d=>setValues([...values,d]));
    const deleteValue = selectedValue => service.destroy(selectedValue).then(()=>setValues([...values].filter(item=>item !==selectedValue)));
    const editValue = (newValuesArr,selectedValue) => service.update(selectedValue,newValuesArr).then(updated=>{
        console.log(updated)
        setValues([...values].map(val=>val===selectedValue?updated:val))
    })//.then(t=>history.push(service.afterUpdateRedirectUrl(selectedValue)));


    const checkForPermission = method => ctx.userPermissions ? ctx.userPermissions.filter(perm => perm === method + '_' + resource).length : undefined;

    useEffect(() => { service.get().then(data => { console.log(data); return 'err' in data ? setError(data) : setValues(data) }); }, []);
    useEffect(() => { if (error) console.error('An error ocurred: ', error); }, [error]);

    const buildTable = () => {
        let labels = Object.keys(values[0]);
        const headers = <tr>
            {labels.map(label => <th key={label}>{label}</th>)}
            <th><SubmitValuesModal openButtonIcon={'fa fa-plus'} bootstrapColor={'success'} submitListener={postData}
                labels={service.postFields} /></th>
        </tr>;
        const valueToLine = val => <tr key={JSON.stringify(val)}>
            {labels.map(label => <td key={val[label]}>{val[label]}</td>)}
            <td><SubmitValuesModal labels={service.editFields} submitListener={newValuesArr => editValue(newValuesArr, val)} openButtonIcon={'fa fa-edit'}
                initialValues={val} bootstrapColor={'warning'} buttonTooltipText={'Edit!'} /></td>
            <td><GenericTooltipButton icon={'fa fa-info-circle'} onClick={t => history.push(service.detailsUrl(val))}
                tooltipText={'More Info!'} bootstrapColor={'primary'} /></td>
            <td><GenericTooltipButton icon={'fa fa-trash'} tooltipText={'Delete!'} bootstrapColor={'danger'} onClick={() => deleteValue(val)} /></td>
        </tr>;
        return <FilterablePageTable labels={headers} rowsValues={[...values]} valueToLineConverter={valueToLine} />;
    };

    return (
        <React.Fragment>
            {error ? <p>{error.status} {error.err}</p> : values.length && Array.isArray(values) ? buildTable() : undefined}
        </React.Fragment>
    );
};

export default TablePage;