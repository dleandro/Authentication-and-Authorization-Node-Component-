import React, {useEffect, useState} from 'react';
import {Form,Dropdown, FormControl, InputGroup} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function TableFilter({initialData,dataDisplayerCB}) {
    const [value, setValue] = useState('');
    const [field, setField] = useState('');
    React.useEffect(()=>{dataDisplayerCB(value)},[value]);

    const getFilteredData = filter =>initialData.filter(val=>val[field].toString().includes(filter));

    const renderDropdownItems = _=>{
        const labels = Object.keys(initialData[0]);
        const rederedItems = labels.map( key=><Dropdown.Item onSelect={(e,value)=>setField(e)} eventKey={key}>{key}</Dropdown.Item> )
        if (!labels.includes(field))setField(labels[0])
        return rederedItems
    }

    return (
        <InputGroup>
            <FormControl placeholder="Recipient's username" onChange={e=>setValue(getFilteredData(e.target.value))}/>
            <DropdownButton as={InputGroup.Append} variant="outline-secondary" title="Dropdown" id="input-group-dropdown-2">
                {initialData.length?renderDropdownItems():undefined}
            </DropdownButton>
        </InputGroup>
    );
}


