import React, {useContext} from 'react';
import { Form } from 'react-bootstrap';
import {Link, useParams} from "react-router-dom";
import {rolesService, userRoleService} from "../../service";
import UserContext from "../../UserContext";
import {SubmitValuesModal} from "./generics/GenericModal";
import GenericFunctionality from "./generics/GenericFunctionality";
import '../stylesheets/App.css'
import Jumbotron from "react-bootstrap/Jumbotron";
export default function CustomSideBar() {

    return (
        <React.Fragment>
            <Jumbotron style={{
                backgroundImage: `url(https://cdn.hipwallpaper.com/i/83/34/LEHn4v.jpg)`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>

            </Jumbotron>
        </React.Fragment>
);
}