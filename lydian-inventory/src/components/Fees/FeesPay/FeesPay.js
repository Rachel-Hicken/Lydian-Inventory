import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { get_student_id } from '../../../ducks/reducer';
import '../../instruments/noNav.css';
import '../../instruments/InstInv/InstInv.css';

class FeesPay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            checked: -1,
            student: [],
            fee: 0,
            statusID: '',
            to: '',
            first: ''
        }

        this.checkboxHandler = this.checkboxHandler.bind(this);
    }

    componentDidMount() {
        //get selected instrument
        axios.get(`/fees/student/${this.props.studentID}`).then(res => {
            this.setState({
                student: res.data[0],
                to: res.data[0].student_email,
                first: res.data[0].student_first
            });
            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
        // get all students
        axios.get(`/fees/student/list/${this.props.studentID}`).then(res => {
            this.setState({
                assignments: res.data
            })
            toast.success("Successfully got Students")
        }).catch(() => toast.error("Failed to Fetch Students"));
    }

    // assignInst(student_id, checkout_date, due_date, return_date, fee) {
    //     console.log(this);
    //     axios.put(`/instrument/assign/${this.props.instId}`,
    //         { student_id: this.state.checked, checkout_date: this.state.checkoutDate, due_date: this.state.dueDate, return_date: this.state.returnDate, fee: this.state.fee })
    //         .then(res => {
    //             this.setState({
    //                 instrument: res.data
    //             })
    //             this.props.history.push('/instruments')
    //             toast.success("Successfully got Instruments")
    //         }).catch(() => toast.error("Failed to Fetch Instruments"))
    //         // .then(()=>{
    //         //     axios.post(`/email`, {to: this.state.to, text: `Dear ${this.state.first}, The instrument ${this.state.instrumentID} has been checked out to you. Please be sure to return the instrument on or before ${moment(this.state.due_date).format('MMM DD, YYYY')}.  If you have any questions contact your instructor.`})
    //         // })
    // }

    // studentHandler(email, first) {
    //     this.setState({
    //         to: email,
    //         first: first
    //     })
    // }

    // feeHandler(fee){
    //     this.setState({
    //         fee: fee
    //     })
    // }

    // selectHandler(value) {
    //     this.setState({
    //         criteria: value
    //     })
    // }

    checkboxHandler(event, first, email) {
        const target = event.target;
        const value = target.value;
        console.log(value)

        this.setState({
            checked: value
        });
        this.props.get_status_id(value);
    }

    filterHandler(filter) {
        this.setState({
            search: filter
        })
    }

    render() {
        let el = this.state.student;
        // console.log(this.state.instrument)
        // console.log(this.state.students)

        let assignments = this.state.assignments.map(el => {
            return (
                <div key={el.status_id} className="checkbox">
                    <input type='checkbox' checked={this.state.checked == el.status_id} onChange={this.checkboxHandler} value={el.status_id} />
                    <ul>
                        <li><p className="assign">School ID: {el.inst_school_id}, Check Out Date: {el.checkout_date}, Return Date: {el.return_date}, Fee: {el.fee}, Payment Status: {el.status}</p></li>
                    </ul>
                </div>

            )
        })

        return (
            <div className="main">
                <div className="mainBody">
                    {/* Display Student seleceted from FeesStudents */}
                    <h1 className="titleNoNav">Fees List</h1>
                    <p className="instructions">Select Item to Pay For:</p>

                    <div key={el.student_id} >
                        <li>School ID: {el.student_school_id}, First: {el.student_first}, Last: {el.student_last}, Phone: {el.student_phone}</li>
                    </div>
                    <div className="inventoryList">
                        {assignments}
                    </div>
                    <div className="buttonBarNoNav">
                        <div className="updateBtnsNoNav">
                            <button onClick={this.payHandler}>Pay Fees</button>
                            <Link to='/fees/main'><button>Cancel</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        studentID: state.studentID
    }
}

export default connect(mapStateToProps, { get_student_id })(FeesPay);