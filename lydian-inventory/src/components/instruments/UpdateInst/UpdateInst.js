import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get_inst_id } from '../../../ducks/reducer';

export default class UpdateInst extends Component {
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