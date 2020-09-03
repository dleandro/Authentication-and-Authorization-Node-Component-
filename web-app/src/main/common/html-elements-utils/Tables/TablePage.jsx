import React, { useContext, useEffect, useState } from 'react';
import GenericTooltipButton from "../generics/GenericTooltipButton";
import UserContext from "../../../UserContext";
import { SubmitValuesModal } from "../generics/GenericModal";
import { useHistory } from "react-router-dom";
import FilterablePageTable from "./FilterablePageTable";
import { Spinner } from "react-bootstrap";
import Loading from "../Loading";
import Alert from 'react-bootstrap/Alert'



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
    const [values, setValues] = useState(undefined);
    const [post,setPost] = useState(undefined);
    const [put,setPut] = useState(undefined);
    const [del,setDel] = useState(undefined);
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })
    const checkHasPermission = async method => ctx.rbac && ctx.rbac.can(method, resource);

    useEffect(() => {
        service.get()
            .then(data => setValues(data))
            .catch(err => {
                //this removes the page from the loading state
                setValues([]);
                setError({ errorMessage: err.message, shouldShow: true });
            })
    }, []);

    useEffect(()=>{
        const asyncOpts=async ()=>{
            setPost(await checkHasPermission('POST'))
            setPut(await checkHasPermission('PUT'))
            setDel(await checkHasPermission('DELETE'))

            
        }
        asyncOpts()
    },[])
    
    useEffect(() => { if (error) console.error('An error ocurred: ', error); }, [error]);
    useEffect(() => console.log(values), [values])
    const postData = arr => service.post(arr)
    .then(d => setValues([...values, d]))
    .catch(err => {
        setError({ errorMessage: err.message, shouldShow: true })
        console.error(err)
    });
    
    const addButton= ()=>post && service.postFields ?
     <th><SubmitValuesModal openButtonIcon={'fa fa-plus'} bootstrapColor={'success'} submitListener={postData} labels={service.postFields} /></th> : undefined 

    const editButton =   rowObject =>  put && service.editFields ? <td>
        <SubmitValuesModal openButtonIcon={'fa fa-edit'} bootstrapColor={'warning'} buttonTooltipText={'Edit!'} labels={service.editFields}
            submitListener={newValuesArr => service.update(rowObject, newValuesArr)
                .then(updated => {
                    console.log(updated); setValues([...values].map(val => val === rowObject ? updated : val));
                })
                .catch(err => {
                    setError({ errorMessage: err.message, shouldShow: true })
                    console.error(err)
                })} rowObj={rowObject} /></td> :
        undefined;

    const deleteButton =  val =>  del && service.destroy ? <td>
        <GenericTooltipButton icon={'fa fa-trash'} tooltipText={'Delete!'} bootstrapColor={'danger'}
            onClick={() => service.destroy(val)
                .then(() => setValues([...values]
                    .filter(item => item !== val)
                ))
                .catch(err => {
                    setError({ errorMessage: err.message, shouldShow: true })
                    console.error(err)
                })} /></td> :
        undefined;

    const buildTable = () => {
        console.log('building table...',values)
        console.log('serv: ', service, ' res: ', resource)
        const infoButton = val => service.detailsUrl ? <td>
            <GenericTooltipButton icon={'fa fa-info-circle'} onClick={t => history.push(service.detailsUrl(val))} tooltipText={'More Info!'} bootstrapColor={'primary'} />
        </td> : undefined;
        if (values.length && Array.isArray(values)) {
            //this avoids rendering blank cells by making sure every line as the same fields and that only common fields will be shown
            let labels = values.map(Object.keys).reduce((first,second)=>first.filter(v=>second.includes(v)));
            //let labels = Object.keys(values[0]);
            const headers = <tr>
                {labels.map(label => <th key={label}>{label}</th>)}
                {addButton()}
            </tr>;
            const valueToLine = val => <tr key={JSON.stringify(val)}>
                {labels.map((label,idx) => <td key={`${idx}:${val[label]}`}>{val[label]}</td>)}
                {editButton(val)}{deleteButton(val)}{infoButton(val)}
            </tr>;
            return <FilterablePageTable labels={headers} rowsValues={[...values]} valueToLineConverter={valueToLine} />;
        }
        const noDataFoundMessage = <h1 className={'text-white'}>No Data Found</h1>;
        return <div className={'d-flex justify-content-center '}><ul><li>{noDataFoundMessage}</li><li>{addButton()}</li></ul></div>;
    };
    //<Spinner animation="border" size="lg" variant="info" />
    return (
        <React.Fragment>
            {
                error.shouldShow &&
                <Alert variant={'warning'} onClose={() => setError(false)} dismissible>
                    {error.errorMessage}
                </Alert>
            }
            {
                values ? buildTable() : <Loading />

            }
        </React.Fragment>
    );
};

export default TablePage;
