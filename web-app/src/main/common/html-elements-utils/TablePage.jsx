import React, {useContext, useEffect, useState} from 'react';
import {Card,Table,Form} from "react-bootstrap";
import GenericTooltipButton from "./generics/GenericTooltipButton";
import UserContext from "../../UserContext";
import {SubmitValuesModal} from "./generics/GenericModal";
import {useHistory} from "react-router-dom";
import {userService} from "../../service";

const customService = {...userService()};
customService.editFields = ['New Username','New Password'];
customService.postFields = ['New Username','New Password'];
customService.afterUpdateRedirectUrl = id=>`/users/${id}`;
customService.detailsUrl = id=>`/users/${id}`;


const TablePage = ({service,resource}) => {
    const ctx = useContext(UserContext);
    let history = useHistory();
    const [values, setValues] = useState([]);
    const [error,setError] = useState(undefined);
    const [selectedValue,setSelectedVal] = useState(undefined);
    const postData = arr => service.post(arr).then(d=>setValues([...values,d]));
    const deleteValue = () => service.destroy(selectedValue.id).then(()=>setValues([...values].filter(item=>item.id !==selectedValue.id)));
    const editValue = (newValuesArr) => service.update(selectedValue,newValuesArr).then(t=>history.push(`/${resource}/${selectedValue.id}`));


    const checkForPermission= method => ctx.userPermissions?ctx.userPermissions.filter(perm=>perm===method+'_'+resource).length:undefined;

    useEffect(()=>{service.get().then(data=>{console.log(data); return 'err' in data?setError(data):setValues(data)});},[]);
    useEffect(()=>{if (error)console.error('An error ocurred: ',error);},[error]);

    const buildTable = ()=> {
        let labels=Object.keys(values[0]);
        const headers = <tr>
            <th>{'Select'}</th>
            {labels.map(label => <th>{label}</th>)}
        </tr>;
        const body = values.map(val => <tr>
            <td><Form.Check checked={selectedValue === val} type="checkbox" onChange={()=>setSelectedVal(val)}/></td>
            {labels.map(label=><td>{val[label]}</td>)}
            </tr>);
        //return checkForPermission('GET')?<Table striped bordered hover variant="dark"><thead>{headers}</thead><tbody>{body}</tbody></Table>
          //  : <h1 className="display-1 text-white">Im sorry you dont have enough permissions</h1>;
        return <Table striped bordered hover variant="dark"><thead>{headers}</thead><tbody>{body}</tbody></Table>;
    };

    return(
        <div className={`d-flex justify-content-center pt-10 align-content-center mx-auto align-items-center`} id={'tabpage'}>
            <Card bg={'dark'} className="mb-2 " text={'light'} >
                <Card.Header className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                    <div>
                    </div>
                    <a href="#" className="white-text mx-3">{resource}</a>
                    <div>
                        <GenericTooltipButton icon={'fa fa-info-circle'} disabled={!selectedValue} onClick={t=>history.push(service.detailsUrl(selectedValue.id))}
                                              tooltipText={'More Info!'} bootstrapColor={'primary'} />
                        <SubmitValuesModal initialValues={selectedValue} openButtonIcon={'fa fa-plus'} bootstrapColor={'success'} submitListener={postData}
                                           labels={service.postFields}/>
                        <SubmitValuesModal labels={service.editFields} disabled={!selectedValue} submitListener={editValue} openButtonIcon={'fa fa-edit'}
                                           initialValues={selectedValue}  bootstrapColor={'warning'} buttonTooltipText={'Edit!'}/>
                        <GenericTooltipButton icon={'fa fa-trash'} disabled={!selectedValue} tooltipText={'Delete!'} bootstrapColor={'danger'} onClick={deleteValue}/>
                    </div>
                </Card.Header>
                <Card.Body >
                    {error?<p>{error.status} {error.err}</p>: values.length && Array.isArray(values) ? buildTable() : undefined}
                </Card.Body>
            </Card>
        </div>
    );
};

export default TablePage;