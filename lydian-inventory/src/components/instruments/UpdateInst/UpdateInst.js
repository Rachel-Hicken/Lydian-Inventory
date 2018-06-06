import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';
import './UpdateInst.css';
import '../noNav.css'
import '../InstInv/InstInv.css'

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

    instSchoolID_handleFocus(text) {
    }

    instSchoolID_handleFocusOut(value) {
        this.setState({
            inst_school_id: value
        })
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
        // console.log(this.props.instId)
        let el = this.state.instrument;
        return (
            <div className="main">
                <div className="mainBody">
                    <h2>Click in the field to edit text</h2>

                    <div key={el.inst_id} className="updateEl">

                        <div className="left">
                            <li className="label">School ID:</li>
                            <li><p className="instEdit"><EditableLabel text={el.inst_school_id}
                                onFocus={this.instSchoolID_handleFocus}
                                onFocusOut={this.instSchoolID_handleFocusOut}
                                className="info"
                            /></p></li>
                            <li className="label">Type:</li>
                            <li><p className="instEdit"><EditableLabel text={el.inst_type}
                                onFocus={this.type_handleFocus}
                                onFocusOut={this.type_handleFocusOut}
                            /></p></li>
                            <li className="label">Serial Number:</li>
                            <li><p className="instEdit"><EditableLabel text={el.serial_num}
                                onFocus={this.serialNum_handleFocus}
                                onFocusOut={this.serialNum_handleFocusOut}
                            /></p></li>
                        </div>

                        <div className="right">
                            <li className="label">Make:</li>
                            <li><p className="instEdit"><EditableLabel text={el.make}
                                onFocus={this.make_handleFocus}
                                onFocusOut={this.make_handleFocusOut}
                            /></p></li>
                            <li className="label">Model:</li>
                            <li><p className="instEdit"><EditableLabel text={el.model}
                                onFocus={this.model_handleFocus}
                                onFocusOut={this.model_handleFocusOut}
                            /></p></li>
                            <li className="label">Year:</li>
                            <li><p className="instEdit"><EditableLabel text={el.inst_year}
                                onFocus={this.year_handleFocus}
                                onFocusOut={this.year_handleFocusOut}
                            /></p></li>
                            <li className="label">Purchase Price:</li>
                            <li><p className="instEdit"><EditableLabel text={el.purchase_price}
                                onFocus={this.price_handleFocus}
                                onFocusOut={this.price_handleFocusOut}
                            /></p></li>
                        </div>
                    </div>
                </div>
                <div className="buttonBarNoNav">
                    <div className="updateBtnsNoNav">
                        <button onClick={this.updateInst}>Submit</button>
                        <Link to='/instruments'><button>Cancel</button></Link>
                    </div>
                </div>
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