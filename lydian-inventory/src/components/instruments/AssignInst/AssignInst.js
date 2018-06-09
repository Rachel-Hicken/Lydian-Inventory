import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { get_inst_id, get_student_id } from '../../../ducks/reducer';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import '../noNav.css';
import '../InstInv/InstInv.css';

class AssignInst extends Component {
    constructor(props) {
        super(props)
        this.state = {
            instrument: [],
            instrumentID: '',
            students: [],
            criteria: 'student_school_id',
            checked: -1,
            search: '',
            student: '',
            checkoutDate: moment(),
            dueDate: moment(),
            fee: 0,
            returnDate: null,
            to: '',
            first: ''
        }
        this.filterHandler = this.filterHandler.bind(this);
        this.studentHandler = this.studentHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.dueDateHandler = this.dueDateHandler.bind(this);
        this.checkoutHandler = this.checkoutHandler.bind(this);
        this.assignInst = this.assignInst.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.firstNameHandler = this.firstNameHandler.bind(this);
        this.feeHandler = this.feeHandler.bind(this);
    }

    componentDidMount() {
        //get selected instrument
        axios.get(`/instrument/view/${this.props.instId}`).then(res => {
            this.setState({
                instrument: res.data[0],
                instrumentID: res.data[0].inst_school_id
            });
            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
        // get all students
        axios.get('/students/view').then(res => {
            this.setState({
                students: res.data
            })
            toast.success("Successfully got Students")
        }).catch(() => toast.error("Failed to Fetch Students"));
    }

    assignInst(student_id, checkout_date, due_date, return_date, fee) {
        console.log(this);
        axios.put(`/instrument/assign/${this.props.instId}`,
            { student_id: this.state.checked, checkout_date: this.state.checkoutDate, due_date: this.state.dueDate, return_date: this.state.returnDate, fee: this.state.fee })
            .then(res => {
                this.setState({
                    instrument: res.data
                })
                this.props.history.push('/instruments')
                toast.success("Successfully got Instruments")
            }).catch(() => toast.error("Failed to Fetch Instruments"))
            .then(()=>{
                axios.post(`/email`, {to: this.state.to, text: `Dear ${this.state.first}, The instrument ${this.state.instrumentID} has been checked out to you. Please be sure to return the instrument on or before ${moment(this.state.due_date).format('MMM DD, YYYY')}.  If you have any questions contact your instructor.`})
            })
    }

    studentHandler(email, first) {
        this.setState({
            to: email,
            first: first
        })
    }

    checkoutHandler(date) {
        this.setState({
            checkoutDate: date
        })
    }

    dueDateHandler(date) {
        this.setState({
            dueDate: date
        })
    }

    feeHandler(fee){
        this.setState({
            fee: fee
        })
    }

    selectHandler(value) {
        this.setState({
            criteria: value
        })
    }

    checkboxHandler(event, first, email) {
        const target = event.target;
        const value = target.value;
        console.log(value)

        this.setState({
            checked: value
        });
        this.props.get_student_id(value);
        this.firstNameHandler(first)
        this.emailHandler(email)
    }

    filterHandler(filter) {
        this.setState({
            search: filter
        })
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

    render() {
        let el = this.state.instrument;
        // console.log(this.state.instrument)
        // console.log(this.state.students)

        let students = this.state.students.filter((el, i) => {
            switch (this.state.criteria) {
                case 'student_school_id':
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
                case 'student_phone':
                    if (el.student_phone.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                default:
                    return true;
            }
        }).map(el => {
            return (
                <div key={el.student_id} className="checkbox">
                    <input type='checkbox' checked={this.state.checked == el.student_id} onChange={(e)=>this.checkboxHandler(e, el.student_first, el.student_email)} value={el.student_id} />
                    <ul>
                    <li><p className="assign">School ID: {el.student_school_id}, First Name: {el.student_first}, Last Name: {el.student_last}, Phone: {el.student_phone}, Email: {el.student_email}</p></li>
                    </ul>
                </div>

            )
        })

        // let student = this.state.students.filter((el, i) => {
        //     if (this.state.checked === el.student_id){
        //         this.emailHandler(el.student_email),
        //         this.firstNameHandler(el.student_first)
        //         console.log('hit')
        //     }
        // })

        return (
            <div className="main">
                <div className="mainBody">
                    {/* Display instrument seleceted from InstInv */}
                    <h1 className="titleNoNav">Instrument Check Out</h1>
                    {/* <p className="instructions">Instrument Being Assigned:</p> */}

                    <div key={el.inst_id} >
                        <li className="liCheckOut">School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</li>
                        {/* <p>Make: {el.make}, Model: {el.model}, Year: {el.inst_year}, Purchase Price: {el.purchase_price}</p> */}
                    </div>
                        {/* Search for student to assign */}
                        {/* <p className="instructions">Search For a Student</p> */}
                        <div className="searchBar">
                            <select onChange={(e) => this.selectHandler(e.target.value)} name="searchCriteria">
                                <option value="student_school_id">Student School ID</option>
                                <option value="student_first">First Name</option>
                                <option value="student_last">Last Name</option>
                                <option value="student_phone">Phone</option>
                            </select>
                            <input 
                            onChange={(e) => this.filterHandler(e.target.value)} 
                            type="search"
                            placeholder="Search..."
                            />
                        </div>
                        <div className="inventoryList">
                            {students}
                        </div>
                    {/* <div>
                        <p>Checkout Date</p>
                        <DatePicker
                            selected={this.state.checkoutDate}
                            onChange={this.checkoutHandler}
                        />
                        <p>Due Date</p>
                        <DatePicker
                            selected={this.state.dueDate}
                            onChange={this.dueDateHandler}
                        />
                    </div> */}
                    <div className="buttonBarNoNav">
                    <p className="dateText">Checkout Date</p>
                        <DatePicker className="datePicker"
                            selected={this.state.checkoutDate}
                            onChange={this.checkoutHandler}
                        />
                        <p className="dateText">Due Date</p>
                        <DatePicker className="datePicker"
                            selected={this.state.dueDate}
                            onChange={this.dueDateHandler}
                        />
                        <p className="feeText">Fee:</p>
                        <input type="number" onChange={(e)=>this.feeHandler(e.target.value)} className="feeInput"/>
                        <div className="updateBtnsNoNav">
                        
                            <button onClick={this.assignInst}
                            
                            >Assign</button>
                            <Link to='/instruments/available'><button>Cancel</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { instId } = state;
    return {
        instId,
    }
}

export default connect(mapStateToProps, { get_student_id })(AssignInst);