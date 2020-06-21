import React from 'react'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

export default function BackOffice() {

    const history = useHistory()

    return (

        <CardColumns style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "25px"
        }}>

            <Card className='mr-2 ml-2'>
                <Card.Body>
                    <Card.Title>Permissions</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    <Button variant="primary" onClick={() => history.push('/permissions')} >Take me there</Button>
                </Card.Body>
            </Card>
            <Card className='ml-2 mr-2'>
                <Card.Body>
                    <Card.Title>Roles</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    <Button variant="primary" onClick={() => history.push('/roles')} >Take me there</Button>
                </Card.Body>
            </Card>

            <Card className='ml-2 mr-2'>
                <Card.Body>
                    <Card.Title>Lists</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    <Button variant="primary" onClick={() => history.push('/lists')} >Take me there</Button>
                </Card.Body>
            </Card>

        </CardColumns>

    )

}

