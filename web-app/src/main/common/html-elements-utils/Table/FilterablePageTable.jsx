import TableRow from "./TableRow";
import Table from "react-bootstrap/Table";
import React, {useEffect, useState} from "react";
import Button, {Card} from "react-bootstrap";
import TableFilter from "../TableFilter";

export default function FilterablePageTable({ labels,rowsArray,headerAddon }) {
    const [currentPage, setPage] = useState(1);
    const [values, setValues] = useState([]);
    useEffect(()=>{setValues(chunksGenerator(rowsArray,10))},[rowsArray]);

    const chunksGenerator = (list,chuckSize) => new Array(Math.ceil(list.length / chuckSize)).fill().map(_ => list.splice(0,chuckSize));


    return (
        <div className={`d-flex justify-content-center pt-10 align-content-center mx-auto align-items-center`} id={'tabpage'}>
            <Card bg={'dark'} className="mb-2 " text={'light'} >
                <Card.Header className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                    <div>
                    </div>
                    <TableFilter initialData={rowsArray} dataDisplayerCB={(newArr)=>setValues(chunksGenerator(newArr,10))} />
                    <div>
                        {headerAddon}
                    </div>
                </Card.Header>
                <Card.Body >
                    <Table striped bordered hover variant="dark">
                        <thead>{labels}</thead>
                        <tbody>{values[currentPage-1]}</tbody>
                    </Table>;
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Form.Label>{currentPage}</Form.Label>
                    <Button variant="primary" type="submit" onClick={()=>setPage(currentPage+1)}>
                        Next Page
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    );
}