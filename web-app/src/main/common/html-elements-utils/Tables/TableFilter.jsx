import React, {useEffect, useState} from 'react';
import {Dropdown, FormControl, InputGroup} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function TableFilter({initialData,dataDisplayerCB}) {

    const [valuesToBeFiltered, setvaluesToBeFiltered] = useState([...initialData]);

    const [dropdownItems,setDropItems] = useState(undefined)
    const [value, setValue] = useState('');
    const [field, setField] = useState('');
    React.useEffect(()=>{dataDisplayerCB(value)},[value]);
    useEffect(()=>{
        if (initialData.length){
            setvaluesToBeFiltered([...initialData])
            setDropItems(renderDropdownItems());
        }
    },[initialData]);

    const getFilteredData = filter =>valuesToBeFiltered.filter(val=>val[field].toString().includes(filter));

    const renderDropdownItems = _=>{
        const labels = Object.keys(valuesToBeFiltered[0]);
        const rederedItems = labels.map( key=><Dropdown.Item onSelect={(e,value)=>setField(e)} key={key} eventKey={key}>{key}</Dropdown.Item> )
        if (!labels.includes(field))setField(labels[0])
        return rederedItems
    }

    return (
        <InputGroup>
            <FormControl placeholder="Search ..." onChange={e=>setValue(getFilteredData(e.target.value))}/>
            <DropdownButton as={InputGroup.Append} variant="outline-secondary" title={field} id="input-group-dropdown-2">
                {dropdownItems}
            </DropdownButton>
        </InputGroup>
    );
}


