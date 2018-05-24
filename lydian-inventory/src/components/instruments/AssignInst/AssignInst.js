import React, {Component} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export default class Add_Inst extends Component{
    constructor(props){
        super(props)
        this.state={
            instrument: '',
            student: '',
            checkout: '',
            due: ''
        }
    }

    componentDidMount() {
        //get selected instrument
        axios.get('/instrument/view/:id').then(res => {
            this.setState({
                instrument: res.data
            })
            toast.success("Successfully got Instruments")
        }).catch(()=>toast.error("Failed to Fetch Instruments"));
    }
    studentHandler(){

    }

    checkoutHandler(){

    }

    dueDateHandler(){
        
    }


    render(){
        return(
            <div>
                <p>Selected Instrument Here</p>
                <div>
                <p>Student Name:</p>
                <input type="text"/>
                </div>
                <div>
                <p>Checkout Date</p>
                <input type="date" name="checkout"/>
                <p>Due Date</p>
                <input type="date" name="due"/>
                </div>
                <button>Assign</button>
            </div>
        )
    }
}