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
            paddingTop: "30px"
        }}>

            <div class="d-flex flex-column">


                <div class="d-flex flex-row">

                    <Card className='ml-2 mr-2'>
                        <Card.Body>
                            <Card.Title>Users</Card.Title>
                            <Card.Text>
                                Manage User configurations and associate them with Roles.
                            </Card.Text>
                            <br />
                            <Button variant="primary" onClick={() => history.push('/users')} >Take me there</Button>
                        </Card.Body>
                    </Card>

                    <Card className='mr-2 ml-2'>
                        <Card.Body>
                            <Card.Title>Permissions</Card.Title>
                            <Card.Text>
                                Create, Update and Delete Permissions. Associate these Permissions to Roles.
                    </Card.Text>
                            <Button variant="primary" onClick={() => history.push('/permissions')} >Take me there</Button>
                        </Card.Body>
                    </Card>

                    <Card className='ml-2 mr-2'>
                        <Card.Body>
                            <Card.Title>Roles</Card.Title>
                            <Card.Text>
                                Create, Update and Delete Roles. Associate these roles with different sets of Permissions and Users.
                    </Card.Text>
                            <Button variant="primary" onClick={() => history.push('/roles')} >Take me there</Button>
                        </Card.Body>
                    </Card>

                </div>

                <div class="d-flex flex-row">


                    <Card className='ml-2 mr-2'>
                        <Card.Body>
                            <Card.Title>Lists</Card.Title>
                            <Card.Text>
                                Manage Lists and associate them with Users.
                    </Card.Text>
                            <br />
                            <Button variant="primary" onClick={() => history.push('/lists')} >Take me there</Button>
                        </Card.Body>
                    </Card>

                    <Card className='ml-2 mr-2'>
                        <Card.Body>
                            <Card.Title>Authentication Types</Card.Title>
                            <Card.Text>
                                Choose the allowed authentication types for the application.
                    </Card.Text>
                            <br />
                            <Button variant="primary" onClick={() => history.push('/protocols')} >Take me there</Button>
                        </Card.Body>
                    </Card>

                    <Card className='ml-2 mr-2'>
                        <Card.Body>
                            <Card.Title>Sessions</Card.Title>
                            <Card.Text>
                                Manage User Sessions.
                    </Card.Text>
                            <br />
                            <Button variant="primary" onClick={() => history.push('/sessions')} >Take me there</Button>
                        </Card.Body>
                    </Card>


                </div>

            </div>



        </CardColumns>
    )
}

