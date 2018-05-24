import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom';

export default class InstInv extends Component {
    constructor() {
        super()
        this.state = {
            all_instruments: [],
            search: '',
            criteria: 'inst_school_id',
            showMenu: false

        }
        this.filterHandler = this.filterHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
    }

    componentDidMount() {
        //get all instruments
        axios.get('/instruments/view').then(res => {
            this.setState({
                all_instruments: res.data
            })
            toast.success("Successfully got Instruments")
        }).catch(()=>toast.error("Failed to Fetch Instruments"));
    }

//search field handlers
    filterHandler(filter) {
        this.setState({
            search: filter
        })
    }

    selectHandler(value){
        this.setState({
            criteria: value
        })
    }

    render() {
        // let searchInput = this.state.all_instruments.filter((element, i) => {
        //     return [element].includes(this.state.search);
        // }).map((el, i) => {
        //     return <h2 key={i}>{el}</h2>
        // })

        let instruments = this.state.all_instruments.filter((el, i)=>{
            switch(this.state.criteria){
                case 'inst_school_id':
                if(el.inst_school_id.includes(this.state.search)) {
                    return true;
                }else{
                    return false;
                }   
                case 'inst_type':
                if(el.inst_type.includes(this.state.search)) {
                    return true;
                }else{
                    return false;
                }   
                case 'serial_num':
                if(el.serial_num.includes(this.state.search)) {
                    return true;
                }else{
                    return false;
                }   
                default:
                return true;
            }
        }).map(el => {
            return (
                <div key={el.inst_id}>
                    <p>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</p>
                    <p>Make: {el.make}, Model: {el.model}, Year: {el.inst_year}, Purchase Price: {el.purchase_price}</p>
                    <br />
                </div>

            )
        })

  


        return (
            <div>
                <h1>InstInv</h1>
                <select onChange={(e)=>this.selectHandler(e.target.value)}name="searchCriteria">
                    <option value="inst_school_id">Instrument School ID</option>
                    <option value="inst_type">Type</option>
                    <option value="serial_num">Serial Number</option>
                </select>
      
                {/* search input and filtering */}
                <input onChange={(e) => this.filterHandler(e.target.value)} type="text" />
                <button>Search</button>
                <p>{this.search}</p>
                {/* <p>{searchInput}</p> */}
                
                <div className="inventoryList">
                    <h1>INVENTORY</h1>
                    {instruments}
                    
                </div>

                <div className="button_bar">
                    <Link to='/instrument/add'><button>Add</button></Link>
                    <Link to = '/instrument/assign'><button>Assign</button></Link>
                    <Link to = '/instrument/update'><button>Update</button></Link>
                </div>
                <div className="side_bar">
                    {/* <Link to=""><p>View All</p></Link> */}
                </div>
            </div>

        )
    }
}