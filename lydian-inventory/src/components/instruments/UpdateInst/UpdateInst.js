import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class UpdateInst extends Component {
    constructor(){
        super()
        this.state={
            instrument: ''
        }
    }
    getInst(){
        axios.get(`/instrument/update/${this.props.get_inst_id}`, this.props.get_inst_id).then(res => {
            this.setState({
                instrument: res.data
            })
            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
    }

    render() {
        let instrument = this.state.instrument.map(el => {
            return (
                <div key={el.inst_id}>
                    <p>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</p>
                    <p>Make: {el.make}, Model: {el.model}, Year: {el.inst_year}, Purchase Price: {el.purchase_price}</p>
                    <br />
                </div>

            )
        })
        console.log(this.props.instId)
        return (
            <div>
                <p>Stuff</p>
                {this.props.instId}
                {instrument}
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