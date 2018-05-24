import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get_inst_id } from '../../../ducks/reducer';

class UpdateInst extends Component {
    getInst(){
        axios.get('/instrument/update/:id').then(res => {
            this.setState({
                all_instruments: res.data
            })
            toast.success("Successfully got Instruments")
        }).catch(() => toast.error("Failed to Fetch Instruments"));
    }

    render() {
        const { get_inst_id } = this.props;
        console.log(this.props.inst_id)
        return (
            <div>
                <p>Stuff</p>
                {get_inst_id}
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

export default connect(mapStateToProps, { get_inst_id })(UpdateInst);