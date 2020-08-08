import React, {useState,} from 'react';
import { FormControl,InputGroup,Dropdown } from 'react-bootstrap';


// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
                <FormControl autoFocus className="mx-3 my-2 w-auto" placeholder="Type to filter..." onChange={(e) => setValue(e.target.value)} value={value} />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter( (child) => !value || child.props.children.toLowerCase().startsWith(value), )}
                </ul>
            </div>
        );
    },
);

export default function InputWithDropDown({onChange,fetchData,label}) {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    const fetchOptions = () => fetchData().then(setOptions);
    React.useEffect(()=>{fetchOptions()},[]);
    React.useEffect(()=>{onChange(value);fetchOptions()},[value]);
    return (
        <InputGroup>
            <FormControl value={value} placeholder={label}/>

            <InputGroup.Append>
                <Dropdown onSelect={setValue}>

                    <Dropdown.Toggle id="dropdown-custom-components" >
                        Matias chato dá fix
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        {options.map(option=><Dropdown.Item eventKey={option.eventKey}>{option.text}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </InputGroup.Append>
        </InputGroup>
    );
}
