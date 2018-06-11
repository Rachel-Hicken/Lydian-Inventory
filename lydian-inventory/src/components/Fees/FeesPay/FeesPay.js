import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { get_student_id, get_status_id } from '../../../ducks/reducer';
import '../../instruments/noNav.css';
import '../../instruments/InstInv/InstInv.css';
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';


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
            first: '',
            paidDate: moment()
        }

        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.feeHandler = this.feeHandler.bind(this);
        this.getList = this.getList.bind(this);
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
        this.getList();
    }

    getList(){
        // get all students
        axios.get(`/fees/student/list/${this.props.studentID}`).then(res => {
            this.setState({
                assignments: res.data
            })
            toast.success("Successfully got Students")
        }).catch(() => toast.error("Failed to Fetch Students"));
    }

    onToken = (token) => {
        token.card = void 0;
        axios.post('/payment', { token, amount: this.state.fee }).then(response => {
            this.setState({
                redirect: true
            })
            // alert('Thanks for your purchase')
        })
        .then(()=>{axios.put(`/fees/paid/${this.state.checked}`)
            .then(res => {
                // console.log('ALSKDJFAO;IWEO3892749823498')
                this.setState({
                    paidDate: res.data.paid_date
                })
                toast.success("Successfully updated paid date")
            }).catch(() => toast.error("Failed to update paid date"))
            .then(()=>{
                axios.post(`/email`, {to: this.state.to, text: `Dear ${this.state.first}, You payment was received on ${moment(this.state.paidDate).format('MMM DD, YYYY')}.  Thank you and have a nice day.`})
                this.getList();
            })})
    }

    feeHandler(fee) {
        this.setState({
            fee: fee
        })
    }

    checkboxHandler(event, fee) {
        const target = event.target;
        const value = target.value;
        console.log(value)
        const amount = (fee * 100)

        this.setState({
            checked: value,
            fee: amount
        });
        this.props.get_status_id(value);
        this.feeHandler(amount)
    }

    render() {
        let el = this.state.student;
        console.log(this.state.fee)
        let assignments = this.state.assignments.map(el => {
            return (
                <div key={el.status_id} className="checkbox">
                    <input type='checkbox' checked={this.state.checked == el.status_id} onChange={(e) => this.checkboxHandler(e, el.fee)} value={el.status_id} />
                    <ul>
                        <li><p className="assign">School ID: {el.inst_school_id}, Check Out Date: {moment(el.checkout_date).format('MMM DD, YYYY')}, Return Date: {moment(el.return_date).format('MMM DD, YYYY')}, Fee: {el.fee}, Payment Status: {el.status}</p></li>
                    </ul>
                </div>

            )
        })

        return (
            <div className="main">
                <div className="mainBody">
                    {/* Display Student seleceted from FeesStudents */}
                    <h1 className="title">Fees List</h1>

                    <div key={el.student_id} >
                        <li className="liCheckOut">School ID: {el.student_school_id}, First: {el.student_first}, Last: {el.student_last}, Phone: {el.student_phone}</li>
                    </div>
                    <p className="instructions">Select Item to Pay For:</p>
                    
                    <div className="inventoryList">
                        {assignments}
                    </div>
                    <div className="buttonBarNoNav">
                        <div className="updateBtnsNoNav">
                            <StripeCheckout
                                token={this.onToken}
                                stripeKey={'pk_test_XSsmVPCU6CEqksYbBJySqq2Z'}
                                amount={this.state.fee} // The amount displayed at the bottom of the payment form
                            />
                            <Link to='/fees/main'><button>Cancel</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        studentID: state.studentID
    }
}

export default connect(mapStateToProps, { get_student_id, get_status_id })(FeesPay);