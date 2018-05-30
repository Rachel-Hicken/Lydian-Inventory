import React, { Component, createRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

class UpdateStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            student: {},
            student_school_id : '',
            student_first : '',
            student_last : '',
            student_email : '',
            student_phone : 0,
            student_address : '',
            student_city : '',
            student_state : '',
            student_zip : 0
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
        axios.get(`/student/view/${this.props.studentId}`).then(res => {
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
        console.log(this);
        axios.put(`/student/update/${this.props.studentId}`,
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
        console.log(this.props.studentId)
        console.log(this.state)
        let el = this.state.student;
        return (
            <div>
                {this.props.studentId}
                <div key={el.student_id} >
                    <p>School ID: {el.student_school_id}, First: {el.student_first}, Last: {el.student_last}, Phone: {el.student_phone}</p>
                    <p>Email: {el.student_email}, Address: {el.student_address}, City: {el.student_city}, State: {el.student_state}, Zipcode: {el.student_zip}</p>
                  
                    <EditableLabel text={el.student_school_id}
                        onFocus={this.schoolID_handleFocus}
                        onFocusOut={this.schoolID_handleFocusOut}
                    />
                    <EditableLabel text={el.student_first}
                        onFocus={this.first_handleFocus}
                        onFocusOut={this.first_handleFocusOut}
                    />
                    <EditableLabel text={el.student_last}
                        onFocus={this.last_handleFocus}
                        onFocusOut={this.last_handleFocusOut}
                    />
                    <EditableLabel text={el.student_email}
                        onFocus={this.email_handleFocus}
                        onFocusOut={this.email_handleFocusOut}
                    />
                    <EditableLabel text={el.student_phone}
                        onFocus={this.phone_handleFocus}
                        onFocusOut={this.phone_handleFocusOut}
                    />
                    <EditableLabel text={el.student_address}
                        onFocus={this.address_handleFocus}
                        onFocusOut={this.address_handleFocusOut}
                    />
                    <EditableLabel text={el.student_city}
                        onFocus={this.city_handleFocus}
                        onFocusOut={this.city_handleFocusOut}
                    />
                     <EditableLabel text={el.student_state}
                        onFocus={this.state_handleFocus}
                        onFocusOut={this.state_handleFocusOut}
                    />
                     <EditableLabel text={el.student_zip}
                        onFocus={this.zip_handleFocus}
                        onFocusOut={this.zip_handleFocusOut}
                    />
                </div>
                <button onClick={this.updateStudent}>Submit</button>
                <Link to='/students'><button>Cancel</button></Link>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { studentId } = state;
    return {
        studentId
    }
}

export default connect(mapStateToProps)(UpdateStudent);