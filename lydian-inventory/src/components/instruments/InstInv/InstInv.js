import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { get_inst_id } from '../../../ducks/reducer';
import { connect } from 'react-redux'
import Nav from '../../Nav/Nav';
import './InstInv.css'

class InstInv extends Component {
    constructor() {
        super()
        this.state = {
            all_instruments: [],
            search: '',
            criteria: 'inst_school_id',
            checked: -1,

        }
        this.filterHandler = this.filterHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    //get all instruments
    componentDidMount() {
        axios.get('/instruments/view').then(res => {
            this.setState({
                all_instruments: res.data
            })
            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
    }

    //remove an instrument from inventory
    deletePost(id) {
        if (window.confirm('Are you sure you want to delete this instrument?')) {
            axios.delete(`/instrument/delete/${id}`).then(res => {
                this.setState({
                    all_instruments: res.data
                })
                toast.success("Successfully got Instruments")
            }).catch(() => toast.error(alert("Instrument has a dependent record. Cannot be deleted")));
        }
    }


    //search field handlers
    filterHandler(filter) {
        this.setState({
            search: filter
        })
    }

    selectHandler(value) {
        this.setState({
            criteria: value
        })
    }

    //checkbox info to props
    checkboxHandler(event) {
        const target = event.target;
        const value = target.value;
        console.log(value)

        this.setState({
            checked: value
        });
        this.props.get_inst_id(value);
    }

    render() {
        let instruments = this.state.all_instruments.filter((el, i) => {
            switch (this.state.criteria) {
                case 'inst_school_id':
                    // console.log('blah');
                    // console.log(el);
                    // console.log(el.inst_school_id);
                    if (el === null || el.inst_school_id === null) {
                        return false;
                    }
                    if (el.inst_school_id.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                case 'inst_type':
                    if (el.inst_type.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                case 'serial_num':
                    if (el.serial_num.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                default:
                    return true;
            }
        }).map(el => {
            return (
                <div key={el.inst_id} className="checkbox">
                    <input type='checkbox' checked={this.state.checked == el.inst_id} onChange={this.checkboxHandler} value={el.inst_id} />
                    <div className="invItem">
                        <ul>
                            <li><p>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}
                                <br />
                                Make: {el.make}, Model: {el.model}, Year: {el.inst_year}, Purchase Price: {el.purchase_price}
                            </p></li>
                        </ul>
                    </div>
                </div>

            )
        })

        return (
            <div>
                <Nav />
                <div className="main">
                    <div className="mainBodyInst">
                        <h1 className="title">Instrument Inventory</h1>
                        <div className="searchBar">
                            <select onChange={(e) => this.selectHandler(e.target.value)} name="searchCriteria">
                                <option value="inst_school_id">Instrument School ID</option>
                                <option value="inst_type">Type</option>
                                <option value="serial_num">Serial Number</option>
                            </select>

                            {/* search input and filtering */}
                            <input
                                onChange={(e) => this.filterHandler(e.target.value)}
                                type="search"
                                placeholder="Search..."
                            />
                        </div>

                        <div className="inventoryList">
                            {instruments}
                        </div>

                        <div className="buttonBar">
                            <div className="updateBtns">
                                {/* <p>Select One Item Below</p> */}
                                <Link to='/instrument/add'><button>Add</button></Link>
                                <Link to={`/instrument/update/${this.state.checked}`}><button>Update</button></Link>
                                <button onClick={() => this.deletePost(this.state.checked)}>Delete</button>
                            </div>
                        </div>

                    </div>
                    <div className="sideBar">
                        <h1 className="sideTitle">View Instruments:</h1>
                        {/* <Link to="/instruments/view">
                            <p className="sideLink">All</p>
                        </Link> */}
                          <Link to="/instruments/available">
                            <p className="sideLink">Check Out</p>
                        </Link>
                        <Link to="/instruments/out">
                            <p className="sideLink">Check In</p>
                        </Link>
                        <Link to="/fees/main">
                            <p className="sideLink">Fees</p>
                        </Link>
                    </div>
                </div>
            </div>

        )
    }
}


export default connect(null, { get_inst_id })(InstInv);