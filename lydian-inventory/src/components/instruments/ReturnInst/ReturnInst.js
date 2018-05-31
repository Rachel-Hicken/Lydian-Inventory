import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class ReturnInst extends Component {
    constructor() {
        super()
        this.state = {
            instrument: {},
            returnDate: moment()
            
        }
        this.returnDateHandler = this.returnDateHandler.bind(this);
    }

    componentDidMount() {
        axios.get(`/instrument/view/${this.props.instId}`).then(res => {
            this.setState({
                instrument: res.data[0]
            });

            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
    }

    returnInst(){

    }

    returnDateHandler(date) {
        this.setState({
            dueDate: date
        })
    }

    render() {
        let el = this.state.instrument;
        return (
            <div>ReturnInst

                <div key={el.status_id} >
                    <p>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</p>
                    <p>Make: {el.make}, Model: {el.model}, Year: {el.inst_year}, Purchase Price: {el.purchase_price}</p>
                </div>
                <h1>Return Date:</h1>
                <DatePicker
                        selected={this.state.returnDate}
                        onChange={this.returnDateHandler}
                    />
                <button>Return</button>
                <Link to='/instruments/out'><button>Cancel</button></Link>

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

export default connect(mapStateToProps)(ReturnInst);