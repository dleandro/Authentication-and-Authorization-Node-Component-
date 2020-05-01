import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'

function CustomCard({onClick,title,desc,buttonText,imgLink}) {
    return(<Card className="col-lg-12 col-md-12 my-auto ">
        <Card.Img variant="top" src={imgLink}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{desc}</Card.Text>
            <Button variant="primary" onClick={onClick}>{buttonText}</Button>
        </Card.Body>
    </Card>)
}

function LoginSuccessfully({setRedirect}) {

    var backToClientPage = () => {
        window.history.go(-1)
    }

    var redirectBackoffice = () => {
        setRedirect('/backoffice')
    }


    return (
        <React.Fragment>
            <CardDeck className="col-lg-8 row-cols-md-12 mx-auto  my-auto ">
                <CustomCard onClick={redirectBackoffice} title={"Backoffice"} buttonText={"JUST DO IT"} desc={"A place were you can acess our api endpoint through an UI"} imgLink={"https://blog.nxfacil.com.br/wp-content/uploads/2018/07/mbo-experts-1.png"} />
                <CustomCard onClick={backToClientPage} title={"Bring me back"} buttonText={"It's rewind Time"} desc={"The place were you came from, the place before the login page"} imgLink={"https://ih1.redbubble.net/image.705747383.3039/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"} />
            </CardDeck>
        </React.Fragment>
    )
}
export default LoginSuccessfully