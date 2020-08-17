import {useParams} from "react-router-dom";
import React, {useContext} from "react";
import UserContext from "../../../UserContext";
import TablePage from "../Tables/TablePage";

/**
 * This component was built based around the pattern of the TablePage and service. It basically adds the URL parameter id and the userId from the context API
 * to the service calls, the following way:
 * - service.get() => service.get(id)
 * - service.post(arr) => service.post(arr,id,userId)
 * - service.update(oldObj,arr) => service.update(oldObj,arr,id,userId)
 * - service.destroy(oldObj) => service.destroy(oldObj,id)
 * @param service
 * @param resource
 * @returns {JSX.Element}
 * @constructor
 */
export default function GenericInfo({ service,resource }) {

    let { id } = useParams();
    const ctx = useContext(UserContext);
    const serv = {...service};
    serv.get = () => service.get(id);
    serv.post = arr => service.post(arr,id,ctx.user.id);
    serv.update = (oldObj, arr) => service.update(oldObj,arr, id, ctx.user.id);
    serv.destroy = oldObj => service.destroy(oldObj ,id);

    return <TablePage service={serv} resource={resource} /> ;
}