import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../noNav.css'


export default class Add_Inst extends Component {
    constructor() {
        super()
        this.state = {
            inst_school_id: 'Test1',
            inst_type: 'violin',
            serial_num: 'vln1234',
            make: 'strad',
            model: 's34',
            inst_year: '1774',
            purchase_price: '123234',
            jokeSetup: '',
            punchline: ''
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

    componentDidMount(){
        axios.get('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke').then(res=>{
            this.setState({
                jokeSetup: res.data.setup, 
                punchline: res.data.punchline
            });
        })
    }

    addInst(value) {
        axios.post('/instrument/add', this.state).then(res => {
            alert(`Answer: ${this.state.punchline}`)
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
                <h1 className="title">Joke of the Day:</h1>
                <p>{this.state.jokeSetup}</p>

                
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
                    <button onClick={this.addInst}>Add</button>
                    <Link to='/instruments'><button>Cancel</button></Link>
                    </div>
                </div>
            </div>

        )
    }
}