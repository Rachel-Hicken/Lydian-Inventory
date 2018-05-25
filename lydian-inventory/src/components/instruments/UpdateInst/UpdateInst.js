import React, { Component, createRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

class UpdateInst extends Component {
    constructor() {
        super()
        this.state = {
            editing: false,
            instrument: {},
            text: 'This stuff',
            
        }
        this.inst_school_id = createRef()
        // this.hideEdit = this.hideEdit.bind(this);
        // this.showEdit = this.showEdit.bind(this);
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
    }
    componentDidMount() {
        axios.get(`/instrument/view/${this.props.instId}`).then(res => {
            this.setState({ instrument: res.data[0] });
        
        toast.success("Successfully got Instruments")
    }).catch(()=>toast.error("Failed to Fetch Instruments"));
    }

    updateInst(inst_school_id, inst_type, serial_num, make, model, inst_year, purchase_price) {
        axios.put(`/instrument/update/${this.props.instId}`,
            { inst_school_id, inst_type, serial_num, make, model, inst_year, purchase_price })
            .then(res => {
                this.setState({
                    instrument: res.data
                })
                toast.success("Successfully got Instruments")
            }).catch(() => toast.error("Failed to Fetch Instruments"));
    }

    // showEdit() {
    //     this.setState({ editing: true });
    // }

    // hideEdit() {
    //     this.setState({ editing: false });
    // }

    // updateText(value) {
    //     this.setState({ text: value });
    //     this.hideEdit();
    // }

    _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut(value) {
        console.log('Left editor with text: ' + value);
        this.setState({
            text: value
        })
        console.log(this.state.text)
    }

    warningHandler(){

    }


    render() {
        console.log(this.inst_school_id)
        console.log(this.props.instId)
        console.log(this.state.instrument)
        let el = this.state.instrument;
        return (
            <div>
                {this.props.instId}
                <div key={el.inst_id} ref={this.inst_school_id} >
                    <p>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</p>
                    <p>Make: {el.make}, Model: {el.model}, Year: {el.inst_year}, Purchase Price: {el.purchase_price}</p>
                    {/* <textarea onClick={this.updateText} className="school id" value={this.state.text} onChange={(e) => this.updateText(e.target.value)}></textarea> */}
                    <EditableLabel text={el.inst_school_id}
                        onFocus={this._handleFocus}
                        onFocusOut={this._handleFocusOut}
                    />
                </div>
                <button>Delete Instrument</button>
                <button>Submit</button>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { instId } = state;
    return {
        instId
    }
}

export default connect(mapStateToProps)(UpdateInst);