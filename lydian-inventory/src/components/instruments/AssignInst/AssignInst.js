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
            students: [],
            criteria: 'student_school_id',
            checked: -1,
            search: '',
            student: '',
            checkoutDate: moment(),
            dueDate: moment(),
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
    }

    componentDidMount() {
        //get selected instrument
        axios.get(`/instrument/view/${this.props.instId}`).then(res => {
            this.setState({
                instrument: res.data[0]
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

    assignInst(student_id, checkout_date, due_date, return_date) {
        console.log(this);
        axios.put(`/instrument/assign/${this.props.instId}`,
            { student_id: this.state.checked, checkout_date: this.state.checkoutDate, due_date: this.state.dueDate, return_date: this.state.returnDate })
            .then(res => {
                this.setState({
                    instrument: res.data
                })
                this.props.history.push('/instruments')
                toast.success("Successfully got Instruments")
            }).catch(() => toast.error("Failed to Fetch Instruments"))
            .then(()=>{
                axios.post(``)
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

    selectHandler(value) {
        this.setState({
            criteria: value
        })
    }

    checkboxHandler(event) {
        const target = event.target;
        const value = target.value;
        console.log(value)

        this.setState({
            checked: value
        });
        this.props.get_student_id(value);

    }

    filterHandler(filter) {
        this.setState({
            search: filter
        })
    }

    render() {
        let el = this.state.instrument;
        // console.log(this.inst_school_id)
        // console.log(this.props.instId)
        // console.log(this.state.instrument)
        // console.log(this.state.students)
        // console.log(this.state.dueDate)
        // console.log(this.state.checkoutDate)

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
                    <input type='checkbox' checked={this.state.checked == el.student_id} onChange={this.checkboxHandler} value={el.student_id} />
                    <ul>
                    <li><p className="assign">School ID: {el.student_school_id}, First Name: {el.student_first}, Last Name: {el.student_last}, Phone: {el.student_phone}</p></li>
                    </ul>
                </div>

            )
        })

        let student = this.state.students.filter((el, i) => {
            if (this.state.checked === el.student_id){

            }
        })

        return (
            <div className="main">
                <div className="mainBody">
                    {/* Display instrument seleceted from InstInv */}
                    <h1 className="titleNoNav">Assign an Instrument</h1>
                    <p className="instructions">Instrument Being Assigned:</p>

                    <div key={el.inst_id} >
                        <li>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</li>
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