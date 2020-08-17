import React, {useState} from 'react';
import { Form } from 'react-bootstrap';

export default function DatePicker({onChange,text = 'Choose Date ...'}) {
    const [value, setValue] = useState({ date: undefined, time: undefined })
    React.useEffect(()=>{onChange(value)},[value])
    return (
        <div>
            <div className="row">
                <div className="col-md-8">
                    <Form.Group controlId="dob">
                        <Form.Label>Select Date:</Form.Label>
                        <Form.Control type="date" onChange={e=>setValue({date:e.target.value,time: value.time})} placeholder="yyyy-mm-dd" />
                        <br/>
                        <Form.Label>Select Time:</Form.Label>
                        <Form.Control type="time" onChange={e=>setValue({date:value.date,time: e.target.value})} placeholder="hh-mm" />
                    </Form.Group>
                </div>
            </div>
        </div>
    );
}
