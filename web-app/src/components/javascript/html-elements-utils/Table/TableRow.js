import React from 'react'
import Button from 'react-bootstrap/Button'


const MISS_CLICK_ALERT = 'HEY! Please change values before submiting, did you click wrong submit?'

/**
 * This represents a table row can either be
 *  - a regular row with data and 2 buttons on last column (edit data and delete data)
 *  - or
 *  - a empty row used to submit a new row, has empty fields to fill and a submit button on last column
 * @param {function} editRequest
 * @param {function} deleteRequest
 * @param {Array} cols
 */
class TableRow extends React.Component {
    state = { cols:this.props.cols};
    stateWasChanged = false;
    isEmptyRow = true;

    //checks if any change was submited
    submitListener = _ => this.stateWasChanged? this.props.editRequest(this.state.cols):alert(MISS_CLICK_ALERT)

    changeColNum = (i,value)=> {
        var ret = this.state.cols
        ret[i] = value;
        return ret
    }

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
                    {(!this.isEmptyRow)?undefined: <Button onClick={this.props.deleteRequest}>Delete</Button>}
                </td>
            </tr>
        )
    }
}
export default  TableRow