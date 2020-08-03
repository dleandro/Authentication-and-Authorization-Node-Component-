import Table from "react-bootstrap/Table";
import React, {useEffect, useState} from "react";
import {Card, Button, Form, FormControl, InputGroup} from "react-bootstrap";
import TableFilter from "../TableFilter";

export default function FilterablePageTable({ labels, rowsValues, valueToLineConverter }) {

    const chunkSize = 3;
    const [currentPage, setPage] = useState(1);
    const [values, setValues] = useState([]);
    const [linesToDisplay,setDisplay] = useState(undefined);
    useEffect(()=>{
        console.log('rowvalues ta sem length?',rowsValues)
        if (rowsValues.length){
            console.log('supostamente rowsValues tem length')
            setValues(chunksGenerator(rowsValues,chunkSize))
        }
    },[rowsValues]);
    useEffect(()=>{
        if (values.length){
            if (values[currentPage-1]){
                setDisplay(values[currentPage-1].map(valueToLineConverter));
            }else {
                setPage(currentPage-1)
            }
        }
    },[currentPage,values]);
    const chunksGenerator = (list,chuckSize) => new Array(Math.ceil(list.length / chuckSize)).fill().map(_ => list.splice(0,chuckSize));


    return (
        <div className={`d-flex justify-content-center pt-10 align-content-center mx-auto align-items-center`} id={'tabpage'}>
            <Card bg={'dark'} className="mb-2 " text={'light'} >
                <Card.Header className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                    <TableFilter initialData={rowsValues} dataDisplayerCB={newArr=>setValues(chunksGenerator(newArr,chunkSize))} />
                </Card.Header>
                <Card.Body >
                    <Table striped bordered hover variant="dark">
                        <thead>{labels}</thead>
                        <tbody>{linesToDisplay}</tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button disabled={values[currentPage-2]===undefined} variant="primary" type="submit" onClick={()=>setPage(currentPage-1)}>
                                Previous Page
                            </Button>
                        </InputGroup.Prepend>
                        <FormControl readOnly value={currentPage} />
                        <InputGroup.Append>
                            <Button disabled={values[currentPage]===undefined} variant="primary" type="submit" onClick={()=>setPage(currentPage+1)}>
                                Next Page
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Footer>
            </Card>
        </div>
    );
};
