import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';


export default class InstInv extends Component {
    constructor() {
        super()
        this.state = {
            all_instruments: []
        }
    }
    componentDidMount() {
        //get all instruments
        axios.get('/instruments/view').then(res => {
            this.setState({
                all_instruments: res.data
            })
            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
    }

    render() {
        let instruments = this.state.all_instruments.map(el => {
            return (
                <div key={el.inst_id}>
                    <p>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</p>
                    <p>Make: {el.make}, Model: {el.model}, Year: {el.inst_year}, Purchase Price: {el.purchase_price}</p>
                    <br />
                </div>

            )
        })
        return (
            <div>{instruments}
            <Link to='/instruments'><button>Back</button></Link>
            </div>
        )
    }
}