import React from 'react'
import Table from "react-bootstrap/Table";
import TableRow from "./TableRow";

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
export default function CustomTable({labels, rows, editRequest, addRequest, deleteRequest,redirectPage}) {

    const renderRows = (rows) => {
       

        var tRows=rows.map(rowCells =>{ 
            return <TableRow  redirectPage={redirectPage} editRequest={editRequest} deleteRequest={deleteRequest} cols={rowCells}/>
        })
        tRows.push(<TableRow redirectPage={redirectPage} editRequest={addRequest} cols={labels.map(cell => undefined)}/>)
        return tRows
    }


    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                {labels.map(label => <th>{label}</th>)}
            </tr>
            </thead>
            <tbody>
            {renderRows(rows)}
            </tbody>
        </Table>
    )
}