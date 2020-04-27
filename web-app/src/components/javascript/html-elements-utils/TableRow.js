import React from 'react'
import Button from 'react-bootstrap/Button'

const fetch = require('node-fetch');
const MISS_CLICK_ALERT = 'HEY! Please change values before submiting, did you click wrong submit?'
const USER_URL = 'http://localhost:8082/user';

class TableRow extends React.Component {
    state = { cols:this.props.cols};
    stateWasChanged = false;
    isEmptyRow = true;

    //checks if any change was submited
    submitListener = _ => this.stateWasChanged? this.addOrEditRequest():alert(MISS_CLICK_ALERT) 

    //checks if collumns values were initiated undefined so it knows if is an edit row or an add row
    addOrEditRequest = _ => (this.isEmptyRow)? this.props.addRequest(this.state.cols):this.props.editRequest(this.state.cols);

    changeColNum = (i,value)=> {
        var ret = this.state.cols
        ret[i] = value;
        return ret
    }
    deleteListener= ()=>console.log('apaga-me');

    handleChange = (e,index) => this.setState({cols: this.changeColNum(index,e.target.value)})

    //called after updated state
    componentDidUpdate( prevProps,  prevState){
        this.stateWasChanged=true
    }
    //called when creating component
    componentDidMount() {
        this.isEmptyRow= this.props.cols[0] === undefined
    }


    render() {
        return (
            <tr>
                {
                    this.state.cols.map((col,index)=>
                        <td>
                            <input className="form-control border-0 text-white bg-transparent" type="text" value={this.props.cols[index]} onChange={e=>this.handleChange(e,index)}/>
                        </td>
                    )
                }
                <td>
                    <Button onClick={this.submitListener}>Submit</Button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Button onClick={this.deleteListener}>Delete</Button>
                </td>
            </tr>
        )
    }
}
export default  TableRow