import React, { useState,useEffect } from 'react'
import Select from '@material-ui/core/Select'
import Table from "react-bootstrap/Table";
import TableRow from "./TableRow";
import {permissionService} from "../../../service"

/**
 * This represents a table responsible to handle and change data
 * @param labels
 * @param rows
 * @param editRequest
 * @param addRequest
 * @param deleteRequest
 * @returns {*}
 * @constructor
 */
export default function CustomTable({ labels, rows, editRequest, addRequest, deleteRequest, redirectPage }) {

    const [permissions,setPermissions]=useState([])
    const renderRows = (rows) => {


        var tRows = rows.map(rowCells => {
            return <TableRow redirectPage={redirectPage} editRequest={editRequest} deleteRequest={deleteRequest} cols={rowCells} />
        })
        return tRows
    }

    useEffect(
        ()=>{
            const getPermissions=async()=>{
                setPermissions(await permissionService().getPermissions())
            }
            getPermissions()
        }
       , [])


    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    {labels.map(label => <th>{label}</th>)}
                </tr>
            </thead>
            <tbody>
                {renderRows(rows)}
                <td>
                </td>
                <td>
                    <Select style={{color:"white"}} onChange={addRequest}>
                        {
                            permissions.map(permission=>
                                <option value={`${permission.action} ${permission.resource}`}>{permission.action} {permission.resource}</option>)
                        }

                    </Select>
                </td>
            </tbody>
        </Table>
    )
}
