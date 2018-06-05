import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { get_student_id } from '../../../ducks/reducer';
import { connect } from 'react-redux';
import Nav from '../../Nav/Nav';
import './StudentView.css';


class StudentView extends Component {
    constructor() {
        super()
        this.state = {
            all_students: [],
            search: '',
            criteria: 'student_school_id',
            checked: -1,

        }
        this.filterHandler = this.filterHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    //get all students
    componentDidMount() {
        axios.get('/students/view').then(res => {
            this.setState({
                all_students: res.data
            })
            toast.success("Successfully got Students")
        }).catch(() => toast.error("Failed to Fetch Students"));
    }

    //remove an studnet from db
    deleteStudent(id) {
        axios.delete(`/student/delete/${id}`).then(res => {
            // console.log(res.data)
            this.setState({ all_students: res.data })
        });
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
        this.props.get_student_id(value);
        // console.log(checked)
    }

    render() {
        let students = this.state.all_students.filter((el, i) => {
            switch (this.state.criteria) {
                case 'student_school_id':
                    // console.log('blah');
                    // console.log(el);
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
                    <div className="invItem">
                        <ul>
                            <li><p className="stud">
                            School ID: {el.student_school_id}, 
                            First Name: {el.student_first}, 
                            Last Name: {el.student_last} 
                            <br />
                            Phone: {el.student_phone}
                            Email: {el.student_email} 
                            <br/>
                            Address: {el.student_address}, 
                            City: {el.student_city}, 
                            State: {el.student_state}, 
                            Zipcode: {el.student_zip}</p></li>
                        </ul>
                    </div>
                </div>

            )
        })

        return (
            <div>
                <Nav />
                <div className="main">
                    <div className="mainBodyStud">
                        <h1 className="title">Student Directory</h1>
                        <div className="searchBar">
                            <select onChange={(e) => this.selectHandler(e.target.value)} name="searchCriteria">
                                <option value="student_school_id">Student School ID</option>
                                <option value="student_first">First Name</option>
                                <option value="student_last">Last Name</option>
                                <option value="student_phone">Phone</option>
                            </select>

                            {/* search input and filtering */}
                            <input onChange={(e) => this.filterHandler(e.target.value)} type="text" />
                            <button>Search</button>
                            <p>{this.search}</p>
                        </div>

                        <div className="inventoryList">
                            {students}
                        </div>

                        <div className="buttonBar">
                            <div className="updateBtns">
                                <Link to='/student/add'><button>Add</button></Link>
                                <Link to={`/student/update/${this.state.checked}`}><button>Update</button></Link>
                                <button onClick={() => this.deleteStudent(this.state.checked)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default connect(null, { get_student_id })(StudentView);