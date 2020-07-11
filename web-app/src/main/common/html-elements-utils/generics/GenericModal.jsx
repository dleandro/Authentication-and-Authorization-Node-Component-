import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import GenericTooltipButton from "./GenericTooltipButton";

/**
 * This is not supposed to be changed, instead make a new component which implements this
 * @param submitListener
 * @param buttonTooltipText
 * @param child
 * @returns {JSX.Element}
 * @constructor
 */
export default function GenericModal({submitListener,buttonTooltipText,child,openButtonIcon='fa fa-table'}){
    const [showModal,setModal] = useState(false);

    const submit = ()=>{
        submitListener();
        setModal(false);
    };

    return(<React.Fragment>
        <GenericTooltipButton onClick={()=>setModal(true)} tooltipText={buttonTooltipText} icon={openButtonIcon}/>
        <Modal show={showModal} onHide={()=>setModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{buttonTooltipText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{child}</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={()=>setModal(false)}>
                    Close
                </Button>
                {child?<Button variant="outline-primary" onClick={submit}>Save Changes</Button>:undefined}
            </Modal.Footer>
        </Modal>
    </React.Fragment>);
}

export function SubmitValuesModal({submitListener,labels,child,openButtonIcon='fa fa-table',buttonTooltipText='Add new Value'}){
    const [value,setValue] = useState(labels?labels.map(t=>''):undefined);

    const changeValue = (i,newValue)=> setValue(value.map((elem, index) => index===i?newValue:elem));
    const body = () => <React.Fragment>
        {labels?labels.map((currElement, index) => <FormControl placeholder={currElement} onChange={e=>changeValue(index,e.target.value)}/>):undefined}
        {child}
    </React.Fragment>;

    return(<GenericModal buttonTooltipText={buttonTooltipText} openButtonIcon={openButtonIcon} submitListener={()=>submitListener(value)} child={body()} />);
}