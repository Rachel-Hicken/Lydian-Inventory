import React, { Component, createRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import {get_student_id} from '../../../ducks/reducer';
import EditableLabel from 'react-inline-editing';

class UpdateStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            student: {},
            student_school_id: '',
            student_first: '',
            student_last: '',
            student_email: '',
            student_phone: '',
            student_address: '',
            student_city: '',
            student_state: '',
            student_zip: 0
        }

        this.schoolID_handleFocus = this.schoolID_handleFocus.bind(this);
        this.schoolID_handleFocusOut = this.schoolID_handleFocusOut.bind(this);
        this.first_handleFocus = this.first_handleFocus.bind(this);
        this.first_handleFocusOut = this.first_handleFocusOut.bind(this);
        this.last_handleFocus = this.last_handleFocus.bind(this);
        this.last_handleFocusOut = this.last_handleFocusOut.bind(this);
        this.email_handleFocus = this.email_handleFocus.bind(this);
        this.email_handleFocusOut = this.email_handleFocusOut.bind(this);
        this.phone_handleFocus = this.phone_handleFocus.bind(this);
        this.phone_handleFocusOut = this.phone_handleFocusOut.bind(this);
        this.address_handleFocus = this.address_handleFocus.bind(this);
        this.address_handleFocusOut = this.address_handleFocusOut.bind(this);
        this.city_handleFocus = this.city_handleFocus.bind(this);
        this.city_handleFocusOut = this.city_handleFocusOut.bind(this);
        this.state_handleFocus = this.state_handleFocus.bind(this);
        this.state_handleFocusOut = this.state_handleFocusOut.bind(this);
        this.zip_handleFocus = this.zip_handleFocus.bind(this);
        this.zip_handleFocusOut = this.zip_handleFocusOut.bind(this);

        this.updateStudent = this.updateStudent.bind(this);

    }
    componentDidMount() {
        axios.get(`/student/view/${this.props.studentID}`).then(res => {
            this.setState({
                student: res.data[0],
                student_school_id: res.data[0].student_school_id,
                student_first: res.data[0].student_first,
                student_last: res.data[0].student_last,
                student_email: res.data[0].student_email,
                student_phone: res.data[0].student_phone,
                student_address: res.data[0].student_address,
                student_city: res.data[0].student_city,
                student_state: res.data[0].student_state,
                student_zip: res.data[0].student_zip
            });

            toast.success("Successfully gotstudents")
        }).catch(() => toast.error("Failed to Fetchstudents"));
    }

    updateStudent(student_school_id, student_first, student_last,
        student_email, student_phone, student_address,
        student_city, student_state, student_zip) {
        console.log(this.state);
        axios.put(`/student/update/${this.props.studentID}`,
            { student_school_id: this.state.student_school_id, student_first: this.state.student_first, student_last: this.state.student_last, student_email: this.state.student_email, student_phone: this.state.student_phone, student_address: this.state.student_address, student_city: this.state.student_city, student_state: this.state.student_state, student_zip: this.state.student_zip })
            .then(res => {
                this.setState({
                    student: res.data
                })
                this.props.history.push('/students')
                toast.success("Successfully got Students")
            }).catch(() => toast.error("Failed to Fetch Students"));
    }

    schoolID_handleFocus(text) {
        // console.log('Focused with text: ' + text);
    }

    schoolID_handleFocusOut(value) {
        // console.log('Left editor with text: ' + value);
        this.setState({
            student_school_id: value
        })
        // console.log(this.state.text)
    }
    first_handleFocus(text) {
    }

    first_handleFocusOut(value) {
        this.setState({
            student_first: value
        })
    }
    last_handleFocus(text) {
    }

    last_handleFocusOut(value) {
        this.setState({
            student_last: value
        })
    }
    email_handleFocus(text) {
    }

    email_handleFocusOut(value) {
        this.setState({
            student_email: value
        })
    }
    phone_handleFocus(text) {
    }

    phone_handleFocusOut(value) {
        this.setState({
            student_phone: value
        })
    }
    address_handleFocus(text) {
    }

    address_handleFocusOut(value) {
        this.setState({
            student_address: value
        })
    }
    city_handleFocus(text) {
    }

    city_handleFocusOut(value) {
        this.setState({
            student_city: value
        })
    }

    state_handleFocus(text) {
    }

    state_handleFocusOut(value) {
        this.setState({
            student_state: value
        })
    }

    zip_handleFocus(text) {
    }

    zip_handleFocusOut(value) {
        this.setState({
            student_zip: value
        })
    }

    render() {
        // console.log(this.student_school_id)
        // console.log(this.props.studentID)
        // console.log(this.state)
        let el = this.state.student;
        return (
            <div className="main">
                <div className="mainBody">
                <div className="updateContainer">
                
                    <h1 className="title">Click in the field to edit text</h1>

                    <div key={el.student_id} className="updateEl" >
                        <div className="left">
                            <li className="label">Student ID:</li>
                            <li className="studEdit">
                            <EditableLabel
                                inputClassName='editLabel'
                                text={el.student_school_id}
                                onFocus={this.schoolID_handleFocus}
                                onFocusOut={this.schoolID_handleFocusOut}
                            /></li>
                            <li className="label">First:</li>
                            <li className="studEdit">
                            <EditableLabel
                                inputClassName='editLabel'
                                text={el.student_first}
                                onFocus={this.first_handleFocus}
                                onFocusOut={this.first_handleFocusOut}
                            /></li>
                            <li className="label">Last:</li>
                            <li className="studEdit">
                            <EditableLabel
                                inputClassName='editLabel'
                                text={el.student_last}
                                onFocus={this.last_handleFocus}
                                onFocusOut={this.last_handleFocusOut}
                            /></li>
                            <li className="label">Email:</li>
                            <li className="emailEdit">
                            <EditableLabel
                                inputClassName='editLabel'
                                text={el.student_email}
                                onFocus={this.email_handleFocus}
                                onFocusOut={this.email_handleFocusOut}
                            /></li>
                            <li className="label">Phone:</li>
                            <li className="studEdit">
                            <EditableLabel
                                inputClassName='editLabel'
                                text={el.student_phone}
                                onFocus={this.phone_handleFocus}
                                onFocusOut={this.phone_handleFocusOut}
                            /></li>
                        </div>
                        <div className="right">
                            <li className="label">Address:</li>
                            <li className="studEdit">
                            <EditableLabel
                                inputClassName='editLabel'
                                text={el.student_address}
                                onFocus={this.address_handleFocus}
                                onFocusOut={this.address_handleFocusOut}
                            /></li>
                            <li className="label">City:</li>
                            <li className="studEdit"> 
                            <EditableLabel
                                inputClassName='editLabel'
                                text={el.student_city}
                                onFocus={this.city_handleFocus}
                                onFocusOut={this.city_handleFocusOut}
                            /></li>
                            <li className="label">State:</li>
                            <li className="studEdit"> 
                            <EditableLabel
                                inputClassName='editLabel'
                                text={el.student_state}
                                onFocus={this.state_handleFocus}
                                onFocusOut={this.state_handleFocusOut}
                            /></li>
                            <li className="label">Zipcode:</li>
                            <li className="studEdit"> 
                            <EditableLabel
                                inputClassName='editLabel'
                                text={Number(el.student_zip)}
                                onFocus={this.zip_handleFocus}
                                onFocusOut={this.zip_handleFocusOut}
                            /></li>
                        </div>
                    </div>
                    </div>
                    <div className="buttonBarNoNav">
                        <div className="updateBtnsNoNav">
                            <button onClick={this.updateStudent}>Submit</button>
                            <Link to='/students'><button>Cancel</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { studentID } = state;
    return {
        studentID
    }
}

export default connect(mapStateToProps)(UpdateStudent);