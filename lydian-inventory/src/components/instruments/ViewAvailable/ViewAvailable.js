import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { get_inst_id } from '../../../ducks/reducer';
import { connect } from 'react-redux'

class ViewAvailable extends Component {
    constructor() {
        super()
        this.state = {
            all_instruments: [],
            search: '',
            criteria: 'inst_school_id',
            checked: -1,
            nameDay: ''
        }
        this.filterHandler = this.filterHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
    }

    //get all instruments
    componentDidMount() {
        axios.get('/instruments/available').then(res => {
            this.setState({
                all_instruments: res.data
            })
            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
        axios.get('https://api.abalin.net/get/today?country=cz').then(res=>{
            this.setState({
                nameDay: res.data.data.name_cz
            })
        })
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
            if (el.status === 'Available') {
                return (
                    <div key={el.inst_id} className="checkbox">
                        <input type='checkbox' checked={this.state.checked == el.inst_id} onChange={this.checkboxHandler} value={el.inst_id} />
                        <div className="invItem">
                        <ul>
                            <li><p>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</p></li>
                            </ul>
                        </div>
                    </div>

                )
            }
            else {
                return false;
            }
        })

        return (
            <div>
                <div className="main">
                    <div className="mainBody">
                        <h1 className="title">Available Inventory</h1>
                        <div className="searchBar">
                            <select onChange={(e) => this.selectHandler(e.target.value)} name="searchCriteria">
                                <option value="inst_school_id">Instrument School ID</option>
                                <option value="inst_type">Type</option>
                                <option value="serial_num">Serial Number</option>
                            </select>

                            {/* search input and filtering */}
                            <input onChange={(e) => this.filterHandler(e.target.value)} type="search" />
                        </div>

                        <div className="inventoryList">
                            {instruments}
                        </div>
                        <p>Happy Name Day: {this.state.nameDay} !!!</p>



                        <div className="buttonBarNoNav">
                            <div className="updateBtnsNoNav">
                                <Link to={`/instrument/assign/${this.state.checked}`}><button>Assign</button></Link>
                                <Link to='/instruments'><button>Close</button></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}







export default connect(null, { get_inst_id })(ViewAvailable);
