import React, { useContext, useEffect, useState } from 'react'
import { listService, listUserService, rolesService, userListService, userService } from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import GenericInfoCard from "../../common/html-elements-utils/generics/GenericInfoCard";
import GenericInfo from "../../common/html-elements-utils/generics/GenericInfo";


const SpecificListInfo = () => <GenericInfoCard label={'User'} fetchValueById={listService().getList} />;

function ListUsers() {
    const postOptionsFetcher = () => userService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.username })));
    const serv = {
        ...listUserService(),
        editFields: [{ text: 'New End date (date)' }, { text: 'New Active state (check)' }],
        postFields: [{ text: 'Id of User to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New Date (date)'}],
    };
    return (
        <GenericInfo resource={'listuser'} service={serv} />
    );
}

const components = {
    0: <SpecificListInfo />,
    1: <ListUsers />,
}
const labels = ['Users'];
export default function ListInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0);
    const [otherLists, setLists] = useState(['']);
    useEffect(() => { listService().get().then(lists => setLists(lists.map(list => list.id))); }, []);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={() => setComponentToBeShown(0)}>List Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp, idx) => <Nav.Link onClick={() => setComponentToBeShown(idx + 1)}>{comp}</Nav.Link>)}

                    </Nav>
                    <Nav>
                        <NavDropdown title="Change List" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherLists.map(listId => <NavDropdown.Item href={`/lists/${listId}`}>{`View list: ${listId}`}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {components[componentToBeShown]}
        </React.Fragment>
    )
}
