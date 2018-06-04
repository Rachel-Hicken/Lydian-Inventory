import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../noNav.css'


export default class Add_Inst extends Component {
    constructor() {
        super()
        this.state = {
            inst_school_id: 'erwe',
            inst_type: 'awer',
            serial_num: 'awe',
            make: 'war',
            model: 'awer',
            inst_year: '1234',
            purchase_price: '234'
        }
        this.addInst = this.addInst.bind(this);
        this.schoolIdHandler = this.schoolIdHandler.bind(this);
        this.typeHandler = this.typeHandler.bind(this);
        this.serialNumHandler = this.serialNumHandler.bind(this);
        this.makeHandler = this.makeHandler.bind(this);
        this.modelHandler = this.modelHandler.bind(this);
        this.yearHandler = this.yearHandler.bind(this);
        this.priceHandler = this.priceHandler.bind(this);
    }

    addInst(value) {
        axios.post('/instrument/add', this.state).then(res => {
            this.props.history.push('/instruments')
        })
    }

    schoolIdHandler(val) {
        this.setState({
            inst_school_id: val
        })
    }

    typeHandler(val) {
        this.setState({
            inst_type: val
        })
    }

    serialNumHandler(val) {
        this.setState({
            serial_num: val
        })
    }

    makeHandler(val) {
        this.setState({
            make: val
        })
    }

    modelHandler(val) {
        this.setState({
            model: val
        })
    }

    yearHandler(val) {
        this.setState({
            inst_year: val
        })
    }

    priceHandler(val) {
        this.setState({
            purchase_price: val
        })
    }

    render() {
        // console.log(this.props)
        return (
            <div className="mainBody">
                <h1 className="title">Add an Instrument</h1>
                <p>Instrument School ID:</p>
                <input onChange={(e) => this.schoolIdHandler(e.target.value)} type="text" value={this.state.inst_school_id} />
                <p>Type:</p>
                <input onChange={(e) => this.typeHandler(e.target.value)} type="text" value={this.state.inst_type} />
                <p>Serial Number:</p>
                <input onChange={(e) => this.serialNumHandler(e.target.value)} type="text" value={this.state.serial_num} />
                <p>Make:</p>
                <input onChange={(e) => this.makeHandler(e.target.value)} type="text" value={this.state.make} />
                <p>Model:</p>
                <input onChange={(e) => this.modelHandler(e.target.value)} type="text" value={this.state.model} />
                <p>Year:</p>
                <input onChange={(e) => this.yearHandler(e.target.value)} type="text" value={this.state.inst_year} />
                <p>Purchase Price:</p>
                <input onChange={(e) => this.priceHandler(e.target.value)} type="text" value={this.state.purchase_price} />
                <div className="buttonBarNoNav">
                <div className="updateBtnsNoNav">
                    <button onClick={this.addInst}>Add to Inventory</button>
                    <Link to='/instruments'><button>Cancel</button></Link>
                    </div>
                </div>
            </div>

        )
    }
}