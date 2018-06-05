import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class AddStudent extends Component {
    constructor() {
        super()
        this.state = {
            student_school_id: '12345678',
            student_first: 'Name',
            student_last: 'Last',
            student_email: 'email@email.com',
            student_phone: 1234567890,
            student_address: 'I live somewhere S 234 W',
            student_city: 'Provo',
            student_state: 'UT',
            student_zip: 12345,
            jokeSetup: '',
            punchline: ''
        }
        this.addStudent = this.addStudent.bind(this);
        this.studentIdHandler = this.studentIdHandler.bind(this);
        this.firstNameHandler = this.firstNameHandler.bind(this);
        this.lastNameHandler = this.lastNameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.phoneHandler = this.phoneHandler.bind(this);
        this.addressHandler = this.addressHandler.bind(this);
        this.cityHandler = this.cityHandler.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        this.zipHandler = this.zipHandler.bind(this);

    }

    componentDidMount() {
        axios.get('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke').then(res => {
            this.setState({
                jokeSetup: res.data.setup,
                punchline: res.data.punchline
            });
        })
    }

    addStudent(value) {
        axios.post('/student/add', this.state).then(res => {
            alert(`Answer: ${this.state.punchline}`)
            this.props.history.push('/students')
        })
    }

    studentIdHandler(val) {
        this.setState({
            student_school_id: val
        })
    }

    firstNameHandler(val) {
        this.setState({
            student_first: val
        })
    }

    lastNameHandler(val) {
        this.setState({
            student_last: val
        })
    }

    emailHandler(val) {
        this.setState({
            student_email: val
        })
    }
    phoneHandler(val) {
        this.setState({
            student_phone: val
        })
    }

    addressHandler(val) {
        this.setState({
            student_address: val
        })
    }

    cityHandler(val) {
        this.setState({
            student_city: val
        })
    }
    stateHandler(val) {
        this.setState({
            student_state: val
        })
    }
    zipHandler(val) {
        this.setState({
            student_zip: val
        })
    }

    render() {
        // console.log(this.props)
        return (
            <div className="mainBody">
                <h1 className="title">Joke of the Day:</h1>
                <p>{this.state.jokeSetup}</p>

                
                <h1 className="titleNoNav">Add Student</h1>
                <p>School ID:</p>
                <input onChange={(e) => this.studentIdHandler(e.target.value)} type="text" value={this.state.student_school_id} />
                <p>First:</p>
                <input onChange={(e) => this.firstNameHandler(e.target.value)} type="text" value={this.state.student_first} />
                <p>Last:</p>
                <input onChange={(e) => this.lastNameHandler(e.target.value)} type="text" value={this.state.student_last} />
                <p>Email:</p>
                <input onChange={(e) => this.emailHandler(e.target.value)} type="text" value={this.state.student_email} />
                <p>Phone:</p>
                <input onChange={(e) => this.phoneHandler(e.target.value)} type="text" value={this.state.student_phone} />
                <p>Address:</p>
                <input onChange={(e) => this.addressHandler(e.target.value)} type="text" value={this.state.student_address} />
                <p>City:</p>
                <input onChange={(e) => this.cityHandler(e.target.value)} type="text" value={this.state.student_city} />
                <p>State:</p>
                <input onChange={(e) => this.stateHandler(e.target.value)} type="text" value={this.state.student_state} />
                <p>Zipcode:</p>
                <input onChange={(e) => this.zipHandler(e.target.value)} type="text" value={this.state.student_zip} />


                <div className="buttonBarNoNav">
                    <div className="updateBtnsNoNav">
                        <button onClick={this.addStudent}>Add Student</button>
                        <Link to='/students'><button>Cancel</button></Link>
                    </div>
                </div>
            </div>

        )
    }
}