import React, { Component, createRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

class UpdateInst extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            instrument: {},
            text: 'This stuff',
            inst_school_id: '',
            inst_type: '',
            serial_num: '',
            make: '',
            model: '',
            inst_year: 0,
            purchase_price: 0
        }
        // this.inst_school_id = createRef()
        // this.hideEdit = this.hideEdit.bind(this);
        // this.showEdit = this.showEdit.bind(this);
        // this._handleFocus = this._handleFocus.bind(this);
        // this._handleFocusOut = this._handleFocusOut.bind(this);
        this.instSchoolID_handleFocus = this.instSchoolID_handleFocus.bind(this);
        this.instSchoolID_handleFocusOut = this.instSchoolID_handleFocusOut.bind(this);
        this.type_handleFocus = this.type_handleFocus.bind(this);
        this.type_handleFocusOut = this.type_handleFocusOut.bind(this);
        this.serialNum_handleFocus = this.serialNum_handleFocus.bind(this);
        this.serialNum_handleFocusOut = this.serialNum_handleFocusOut.bind(this);
        this.make_handleFocus = this.make_handleFocus.bind(this);
        this.make_handleFocusOut = this.make_handleFocusOut.bind(this);
        this.model_handleFocus = this.model_handleFocus.bind(this);
        this.model_handleFocusOut = this.model_handleFocusOut.bind(this);
        this.year_handleFocus = this.year_handleFocus.bind(this);
        this.year_handleFocusOut = this.year_handleFocusOut.bind(this);
        this.price_handleFocus = this.price_handleFocus.bind(this);
        this.price_handleFocusOut = this.price_handleFocusOut.bind(this);
        this.updateInst = this.updateInst.bind(this);

    }
    componentDidMount() {
        axios.get(`/instrument/view/${this.props.instId}`).then(res => {
            this.setState({
                instrument: res.data[0],
                inst_school_id: res.data[0].inst_school_id,
                inst_type: res.data[0].inst_type,
                serial_num: res.data[0].serial_num,
                make: res.data[0].make,
                model: res.data[0].model,
                inst_year: res.data[0].inst_year,
                purchase_price: res.data[0].purchase_price
            });

            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
    }

    updateInst(inst_school_id, inst_type, serial_num, make, model, inst_year, purchase_price) {
        console.log(this);
        axios.put(`/instrument/update/${this.props.instId}`,
            { inst_school_id: this.state.inst_school_id, inst_type: this.state.inst_type, serial_num: this.state.serial_num, make: this.state.make, model: this.state.model, inst_year: this.state.inst_year, purchase_price: this.state.purchase_price })
            .then(res => {
                this.setState({
                    instrument: res.data
                })
                this.props.history.push('/instruments')
                toast.success("Successfully got Instruments")
            }).catch(() => toast.error("Failed to Fetch Instruments"));
    }

    // showEdit() {
    //     this.setState({ editing: true });
    // }

    // hideEdit() {
    //     this.setState({ editing: false });
    // }

    // updateText(value) {
    //     this.setState({ text: value });
    //     this.hideEdit();
    // }

    // _handleFocus(text) {
    //     // console.log('Focused with text: ' + text);
    // }

    // _handleFocusOut(value) {
    //     // console.log('Left editor with text: ' + value);
    //     this.setState({
    //         text: value
    //     })
    //     // console.log(this.state.text)
    // }
    instSchoolID_handleFocus(text) {
        // console.log('Focused with text: ' + text);
    }

    instSchoolID_handleFocusOut(value) {
        // console.log('Left editor with text: ' + value);
        this.setState({
            inst_school_id: value
        })
        // console.log(this.state.text)
    }
    type_handleFocus(text) {
    }

    type_handleFocusOut(value) {
        this.setState({
            inst_type: value
        })
    }
    serialNum_handleFocus(text) {
    }

    serialNum_handleFocusOut(value) {
        this.setState({
            serial_num: value
        })
    }
    make_handleFocus(text) {
    }

    make_handleFocusOut(value) {
        this.setState({
            make: value
        })
    }
    model_handleFocus(text) {
    }

    model_handleFocusOut(value) {
        this.setState({
            model: value
        })
    }
    year_handleFocus(text) {
    }

    year_handleFocusOut(value) {
        this.setState({
            inst_year: value
        })
    }
    price_handleFocus(text) {
    }

    price_handleFocusOut(value) {
        this.setState({
            purchase_price: value
        })
    }

    render() {
        // console.log(this.inst_school_id)
        // console.log(this.props.instId)
        console.log(this.state)
        let el = this.state.instrument;
        return (
            <div>
                {this.props.instId}
                <div key={el.inst_id} ref={this.inst_school_id} >
                    <p>School ID: {el.inst_school_id}, Type: {el.inst_type}, Serial Number: {el.serial_num}</p>
                    <p>Make: {el.make}, Model: {el.model}, Year: {el.inst_year}, Purchase Price: {el.purchase_price}</p>
                    {/* <EditableLabel
                        text={this.state.text}
                        onFocus={this._handleFocus}
                        onFocusOut={this._handleFocusOut}
                    /> */}
                    <EditableLabel text={el.inst_school_id}
                        onFocus={this.instSchoolID_handleFocus}
                        onFocusOut={this.instSchoolID_handleFocusOut}
                    />
                    <EditableLabel text={el.inst_type}
                        onFocus={this.type_handleFocus}
                        onFocusOut={this.type_handleFocusOut}
                    />
                    <EditableLabel text={el.serial_num}
                        onFocus={this.serialNum_handleFocus}
                        onFocusOut={this.serialNum_handleFocusOut}
                    />
                    <EditableLabel text={el.make}
                        onFocus={this.make_handleFocus}
                        onFocusOut={this.make_handleFocusOut}
                    />
                    <EditableLabel text={el.model}
                        onFocus={this.model_handleFocus}
                        onFocusOut={this.model_handleFocusOut}
                    />
                    <EditableLabel text={el.inst_year}
                        onFocus={this.year_handleFocus}
                        onFocusOut={this.year_handleFocusOut}
                    />
                    <EditableLabel text={el.purchase_price}
                        onFocus={this.price_handleFocus}
                        onFocusOut={this.price_handleFocusOut}
                    />
                </div>
                <button onClick={this.updateInst}>Submit</button>
                <Link to='/instruments'><button>Cancel</button></Link>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { instId } = state;
    return {
        instId
    }
}

export default connect(mapStateToProps)(UpdateInst);