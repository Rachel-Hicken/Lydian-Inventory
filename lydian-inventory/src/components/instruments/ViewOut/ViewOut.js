import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { get_status_id } from '../../../ducks/reducer';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import '../noNav.css';
import '../InstInv/InstInv.css';


class ViewOut extends Component {
    constructor() {
        super()
        this.state = {
            out_instruments: [],
            search: '',
            criteria: 'inst_school_id',
            checked: -1,
            returnDate: moment(),
            instrumentID: ''
        }
        this.returnInst = this.returnInst.bind(this);

        this.filterHandler = this.filterHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.firstNameHandler = this.firstNameHandler.bind(this);
        this.returnDateHandler = this.returnDateHandler.bind(this);

    }

    //get all instruments
    componentDidMount() {
        axios.get('/instruments/out').then(res => {
            this.setState({
                out_instruments: res.data,
                instrumentID: res.data[0].inst_school_id
            })
            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
    }

    returnInst() {
        // console.log(this.state.returnDate)
        // console.log(this.state.checked)
        axios.put(`/instrument/return`,
            { return_date: this.state.returnDate, status_id: this.state.checked })
            .then(res => {
                this.setState({
                    instrument: res.data
                })
                this.props.history.push('/instruments')
                toast.success("Successfully got Instruments")
            }).catch(() => toast.error("Failed to Fetch Instruments"))
            .then(()=>{
                axios.post(`/email`, {to: this.state.to, text: `Dear ${this.state.first}, Thank you for returning the instrument ${this.state.instrumentID}. It was returned on ${moment(this.state.returnDate).format('MMM DD, YYYY')}.`})
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
    checkboxHandler(event, first, email) {
        const target = event.target;
        const value = target.value;
        console.log(value)

        this.setState({
            checked: value
        });
        this.props.get_status_id(value);
        this.firstNameHandler(first);
        this.emailHandler(email);
    }

    emailHandler(email){
        this.setState({
            to: email
        })
    }
    firstNameHandler(first){
        this.setState({
            first: first
        })
    }

    returnDateHandler(date) {
        this.setState({
            returnDate: date
        })
    }

    render() {
        // console.log(this.state.checked)
        // console.log(this.props.status_id)
        // console.log(this.state.returnDate)
        let instruments = this.state.out_instruments.filter((el, i) => {
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
                case 'student_school_id':
                    // console.log(el.student_school_id);
                    if (el === null || el.student_school_id === null) {
                        return false;
                    }
                    if (el.student_school_id.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                case 'student_first':
                    if (el.student_first.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                case 'student_last':
                    if (el.student_last.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                default:
                    return true;
            }
        }).map(el => {
            return (
                <div key={el.status_id} className="checkbox">
                    <input type='checkbox' checked={this.state.checked == el.status_id} onChange={(e)=>this.checkboxHandler(e, el.student_first, el.student_email)} value={el.status_id} />
                    <div className="invItem">
                        <ul>
                            <li><p className="out">School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}
                                <br />
                                Student ID: {el.student_school_id}, First: {el.student_first}, Last: {el.student_last}
                                <br />
                                Check Out Date: {moment(el.checkout_date).format('MMM DD, YYYY')}, Due Date: {moment(el.due_date).format('MMM DD, YYYY')}</p></li>
                        </ul>
                    </div>
                </div>
            )
        })

        //only allow one item to be checked
        //checked item sent to props for Assign and Update?
        //


        return (
            <div className="main">
                <div className="mainBody">
                    <h1 className="title">INSTRUMENT CHECK IN</h1>
                    <div className="searchBar">
                        <select onChange={(e) => this.selectHandler(e.target.value)} name="searchCriteria">
                            <option value="inst_school_id">Instrument School ID</option>
                            <option value="inst_type">Type</option>
                            <option value="serial_num">Serial Number</option>
                            <option value="student_school_id">Student School ID</option>
                            <option value="student_first">First Name</option>
                            <option value="student_last">Last Name</option>
                        </select>

                        {/* search input and filtering */}
                        <input 
                        onChange={(e) => this.filterHandler(e.target.value)} 
                        type="search" 
                        placeholder="Search.."
                        />
                    </div>
                    {/* <p className="instructions">Select One to Return</p> */}

                    <div className="inventoryList">
                        {instruments}

                    </div>


                    <div className="buttonBarNoNav">

                        <div className="updateBtnsNoNav">
                            <p className="dateText">Return Date:</p>
                            <DatePicker className="datePicker"
                                selected={this.state.returnDate}
                                onChange={this.returnDateHandler}
                            />
                            <button onClick={this.returnInst}>Return</button>
                            <Link to={`/instruments`}><button>Close</button></Link>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default connect(null, { get_status_id })(ViewOut);