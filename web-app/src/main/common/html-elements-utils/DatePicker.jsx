import React, {useContext} from 'react';
import { Form } from 'react-bootstrap';
import {Link, useParams} from "react-router-dom";
import {rolesService, userRoleService} from "../../service";
import UserContext from "../../UserContext";
import {SubmitValuesModal} from "./generics/GenericModal";
import GenericFunctionality from "./generics/GenericFunctionality";

export default function DatePicker({onChange,text = 'Choose Date ...'}) {
    return (
        <div>
            <div className="row">
                <div className="col-md-8">
                    <Form.Group controlId="dob">
                        <Form.Label>Select Date:</Form.Label>
                        <Form.Control type="date" onChange={e=>onChange(e.target.value)} name="dob" placeholder="Date of Birth" />
                    </Form.Group>
                </div>
            </div>
        </div>
    );
}
