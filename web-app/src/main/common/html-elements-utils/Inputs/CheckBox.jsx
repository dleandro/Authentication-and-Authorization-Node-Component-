import React, {useState} from 'react';
import { Form } from 'react-bootstrap';

export default function DatePicker({onChange,text = 'Check'}) {
    const [value, setValue] = useState(false)
    React.useEffect(()=>{onChange(value)},[value])
    return (
        <Form.Check type="checkbox" label={text} isValid={value} onClick={()=>setValue(!value)} />
    );
}
