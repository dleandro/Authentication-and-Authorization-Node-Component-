import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default function GenericInfoCard({fetchValueById,label}){
    const {id} = useParams();
    const [value, setValue] = useState('')
    useEffect(()=>{fetchValueById(id).then(setValue)},[id])

    return  (
        <div className="col-4 pt-5 align-content-center mx-auto align-items-center ceform-input" id={id}>
            <Card border="white" bg={'dark'} key={'userspecificinfocard'} text={'light'} className="mb-2">
                <Card.Header>{`${label} Info`}</Card.Header>
                <Card.Body>
                    <Card.Title>{`Details of ${label} num: ${value.id}`}</Card.Title>
                    <Form.Group>
                        {Object.keys(value).map(key=><React.Fragment>
                            <br />
                            <Form.Row>
                                <Form.Label column lg={2}>{key}</Form.Label>
                                <Form.Label  column lg={8}>{value[key]}</Form.Label>
                            </Form.Row>
                        </React.Fragment>)}
                    </Form.Group>


                </Card.Body>
            </Card>
        </div>
    );
}