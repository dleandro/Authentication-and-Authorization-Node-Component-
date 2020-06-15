import React from 'react'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

export default function Homepage() {

    const history = useHistory()

    return (

        <CardColumns style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>

            <Card className='mr-2'>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    <Button variant="primary" onClick={() => history.push('/login')} >Take me there</Button>
                </Card.Body>
            </Card>
            <Card className='ml-2'>
                <Card.Body>
                    <Card.Title>Backoffice</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    <Button variant="primary" onClick={() => history.push('/backoffice')} >Take me there</Button>
                </Card.Body>
            </Card>

        </CardColumns>

    )

}

