import React from 'react'
import Button from 'react-bootstrap/Button'

const fetch = require('node-fetch');
const MISS_CLICK_ALERT = 'HEY! Please change values before submiting, did you click wrong submit?'
const USER_URL = 'http://localhost:8082/user';

class TableRow extends React.Component {
    state = { col1:this.props.col1 ,col2:this.props.col2};

    changecol1 = event => this.setState({col1: event.target.value})
    changecol2 = event => this.setState({col2: event.target.value})

    submitListener = _ => this.props.col1===this.state.col1 && this.props.col2===this.state.col2? alert(MISS_CLICK_ALERT) : this.addOrEditRequest()

    addOrEditRequest = _ => (this.props.col1 === undefined && this.props.col2===undefined)? this.addUserRequest():this.editUserRequest();

    addUserRequest= _=> {
        console.log(`fetching ${USER_URL} ... with ${this.state.col1} ${this.state.col2}`)
        fetch(USER_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.col2,
                password: '1234'
            })
        })
            .then(rsp=> {
                console.log(rsp);
                this.props.setRedirect('/backoffice')
                //return {user:rsp.text(),status:rsp.status}
            })
            //.then(json=>{console.log(json);json.status===200?setRedirect('/backoffice'):alert('Unable to login')})
    }

    editUserRequest= _=> {
        const editurl = `${USER_URL}/${this.state.col1}/username`
        console.log(`fetching ${editurl} ... with ${this.state.col1} ${this.state.col2}`)
        fetch(editurl, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.col2,
            })
        })
            .then(rsp=> {
                console.log(rsp);
                alert('Dont forget to refresh to see changes!')
                //return {user:rsp.text(),status:rsp.status}
            })
        //.then(json=>{console.log(json);json.status===200?setRedirect('/backoffice'):alert('Unable to login')})
    }

    render() {
        return (
            <tr>
                <td><input className="form-control border-0 text-white bg-transparent" type="text" value={this.state.col1} onChange={this.changecol1}/></td>
                <td><input className="form-control border-0 text-white bg-transparent" type="text" value={this.state.col2} onChange={this.changecol2}/></td>
                <td><Button onClick={this.submitListener}>Submit</Button></td>
            </tr>
        )
    }
}
export default  TableRow