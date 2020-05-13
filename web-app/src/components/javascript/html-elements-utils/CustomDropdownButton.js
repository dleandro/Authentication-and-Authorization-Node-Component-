import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from "react-bootstrap/NavDropdown";
import {Nav} from "react-bootstrap";

export default class CustomDropdownButton extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isOpen: false }
    }

    handleOpen = () => {
        this.setState({ isOpen: true })
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    render() {
        return (
                <Nav>
                    <NavDropdown
                        onMouseEnter = { this.handleOpen }
                        onMouseLeave = { this.handleClose }
                        show={ this.state.isOpen }
                        noCaret
                        id="language-switcher-container"
                        title={"Hover"}>

                        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                        {this.props.children}
                    </NavDropdown>
                </Nav>
        )
    }
}
