import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React from "react";

/**
 * This is not supposed to be changed, instead make a new component which implements this
 * @param tooltipText
 * @param childButton
 * @returns {JSX.Element}
 * @constructor
 */
export const ToolTipButtonConstructor = ({tooltipText,childButton}) => (
    <OverlayTrigger overlay={<Tooltip id="tooltipbutton">{tooltipText}</Tooltip>}>
        {childButton}
    </OverlayTrigger>
);

const GenericTooltipButton = ({icon='fa fa-table',disabled=false,onClick,tooltipText='Open',bootstrapColor='primary'}) => (
    <ToolTipButtonConstructor tooltipText={tooltipText} childButton={
        <button disabled={disabled} className={`btn btn-outline-${bootstrapColor} btn-sm rounded-0`} type="button" onClick={onClick}><i className={icon}/></button>
    }/>
);
export default GenericTooltipButton;
