import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import GenericTooltipButton from "./GenericTooltipButton";
import InputWithDropDown from '../Inputs/InputWithDropDown';
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "../Inputs/DatePicker";
import CheckBox from "../Inputs/CheckBox";

/**
 * This is not supposed to be changed, instead make a new component which implements this
 * @param submitListener
 * @param bootstrapColor
 * @param buttonTooltipText
 * @param child
 * @param openButtonIcon
 * @returns {JSX.Element}
 * @constructor
 */
export default function GenericModal({ submitListener, disabled = false, bootstrapColor = 'primary', buttonTooltipText, child, openButtonIcon = 'fa fa-table' }) {
    const [showModal, setModal] = useState(false);

    const submit = () => {
        submitListener();
        setModal(false);
    };

    return (<React.Fragment>
        <GenericTooltipButton disabled={disabled} onClick={() => setModal(true)} tooltipText={buttonTooltipText} bootstrapColor={bootstrapColor} icon={openButtonIcon} />
        <Modal show={showModal} onHide={() => setModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{buttonTooltipText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{child}</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => setModal(false)}>
                    Close
                </Button>
                {child ? <Button variant="outline-primary" onClick={submit}>Save Changes</Button> : undefined}
            </Modal.Footer>
        </Modal>
    </React.Fragment>);
}

export function SubmitValuesModal({ submitListener, disabled = false, labels, child, openButtonIcon = 'fa fa-table',
    bootstrapColor = 'primary', buttonTooltipText = 'Add new Value' }) {
    const [value, setValue] = useState(labels ? labels.map(t => '') : undefined);

    const inputTypePicker = (elem, idx) => {
        let selected = undefined;
        if (elem.text) {
            const supportedInputTypes = [
                {text:'(dropdown)',component:<InputWithDropDown onChange={e=>changeValue(idx,e)} label={elem.text.split('(')[0]}
                                                                fetchData={elem.DropdownOptionsFetcher?elem.DropdownOptionsFetcher:undefined}/>},
                {text:'(date)',component: <DatePicker text={elem.text.split('(')[0]} onChange={val =>changeValue(idx,val)}/>},
                {text:'(check)',component: <CheckBox text={elem.text.split('(')[0]} onChange={val =>changeValue(idx,val)}/>}];
            selected = supportedInputTypes.find(input=>elem.text.includes(input.text));
        }
        return selected ? selected.component : <FormControl key={elem.toString()} placeholder={elem} onChange={e => changeValue(idx, e.target.value)} />;
    }

    const changeValue = (i,newValue)=> setValue(value.map((elem, index) => index===i?newValue:elem));

    const body = () => <React.Fragment>
        {labels ? labels.map((currElement, index) => inputTypePicker(currElement, index)) : undefined}
        {child}
    </React.Fragment>;

    return (<GenericModal disabled={disabled} buttonTooltipText={buttonTooltipText} openButtonIcon={openButtonIcon} bootstrapColor={bootstrapColor}
        submitListener={() => submitListener(value)} child={body()} />);
}