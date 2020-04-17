import React from 'react'
import Button from 'react-bootstrap/Button'

const fetch = require('node-fetch');
const MISS_CLICK_ALERT = 'HEY! Please change values before submiting, did you click wrong submit?'
const USER_URL = 'http://localhost:8082/user';

class TableRow extends React.Component {
    state = { cols:this.props.cols};

    submitListener = _ => this.props.cols[0]===this.state.cols[0] && this.props.cols[1]===this.state.cols[1]? alert(MISS_CLICK_ALERT) : this.addOrEditRequest()

    addOrEditRequest = _ => (this.props.cols[0] === undefined && this.props.cols[1]===undefined)? this.addUserRequest():this.editUserRequest();

    addUserRequest= _=> {
        console.log(`fetching ${USER_URL} ... with ${this.state.cols}`)
        fetch(USER_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.cols[1],
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
        const editurl = `${USER_URL}/${this.state.cols[0]}/username`
        console.log(`fetching ${editurl} ... with ${this.state.cols}`)
        fetch(editurl, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.cols[1],
            })
        })
            .then(rsp=> {
                console.log(rsp);
                alert('Dont forget to refresh to see changes!')
                //return {user:rsp.text(),status:rsp.status}
            })
        //.then(json=>{console.log(json);json.status===200?setRedirect('/backoffice'):alert('Unable to login')})
    }

    changeColNum = (i,value)=> {
        var ret = this.state.cols
        ret[i] = value;
        return ret
    }

    handleChange = (e,index) => this.setState({cols: this.changeColNum(index,e.target.value)})


    render() {
        return (
            <tr>
                {
                    this.state.cols.map((col,index)=>
                        <td>
                            <input className="form-control border-0 text-white bg-transparent" type="text" value={this.state.cols[index]} onChange={e=>this.handleChange(e,index)}/>
                        </td>
                    )
                }
                <td><Button onClick={this.submitListener}>Submit</Button></td>
            </tr>
        )
    }
}
export default  TableRow