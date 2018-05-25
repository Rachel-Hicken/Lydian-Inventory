import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { get_inst_id } from '../../../ducks/reducer';

class AssignInst extends Component {
    constructor(props) {
        super(props)
        this.state = {
            instrument: {},
            students: {},
            studCriteria: '',
            search: '',
            student: '',
            checkout: '',
            due: ''
        }
    }

    componentDidMount() {
        //get selected instrument
        axios.get(`/instrument/view/${this.props.instId}`).then(res => {
            this.setState({
                instrument: res.data[0]
            })
            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));

        axios.get('/students/view').then(res => {
            this.setState({
                students: res.data
            })
            toast.success("Successfully got Students")
        }).catch(() => toast.error("Failed to Fetch Students"));
    }

    studentHandler() {

    }

    checkoutHandler() {

    }

    dueDateHandler() {

    }

    selectHandler(value) {
        this.setState({
            studCriteria: value
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

        let students = this.state.students.filter((el, i) => {
            switch (this.state.studCriteria) {
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
                case 'phone':
                    if (el.phone.includes(this.state.search)) {
                        return true;
                    } else {
                        return false;
                    }
                default:
                    return true;
            }
        }).map(el => {
            return (
                <div key={el.student_id}>
                    <input type='checkbox' checked={this.state.checked == el.student_id} onChange={this.checkboxHandler} value={el.student_id} />
                    <p>School ID: {el.student_school_id}, First Name: {el.student_first}, Last Name: {el.student_last}, Phone: {el.phone}</p>
                    <br />
                </div>

            )
        })

        return (
            <div>
                <h1>Instrument Being Assigned:</h1>
                <div key={el.inst_id} >
                    <p>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</p>
                    <p>Make: {el.make}, Model: {el.model}, Year: {el.inst_year}, Purchase Price: {el.purchase_price}</p>
                </div>
                <div>
                    <h1>Search Students</h1>
                    <select onChange={(e) => this.selectHandler(e.target.value)} name="searchStudCriteria">
                        <option value="student_school_id">Student School ID</option>
                        <option value="student_first">First Name</option>
                        <option value="student_last">Last Name</option>
                        <option value="student_phone">Phone</option>
                    </select>
                    <input onChange={(e) => this.filterHandler(e.target.value)} type="text" />
                    <button>Search</button>
                    <p>{this.search}</p>
                    <p>Student Name:</p>
                    <input type="text" />
                </div>
                <div>
                    <p>Checkout Date</p>
                    <input type="date" name="checkout" />
                    <p>Due Date</p>
                    <input type="date" name="due" />
                </div>
                <button>Assign</button>
                <div>
                    <p>Stuff</p>
                    {this.props.instId}
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

export default connect(mapStateToProps)(AssignInst);