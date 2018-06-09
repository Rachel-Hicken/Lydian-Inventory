import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../Private/Private.css';
import Nav from '../../Nav/Nav';

export default class FeesMain extends Component{
    render(){
        return(
            <div className="private">
                <Nav/>
            <div className="instStudBtns">
                <Link to='/fees/students'>
                <button className='instruments'>Student Fees</button>
                </Link>
                <Link to='/fees/view'>
                <button className='students'>View Unpaid</button>
                </Link>
            </div>
        </div>
        )
    }
}