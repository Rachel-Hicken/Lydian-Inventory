import React, { Component } from 'react';
import { getUser } from '../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Private.css';
// import Nav from '../Nav/Nav';

class Private extends Component {

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        let { user_name, img } = this.props.user;
        return (
            <div className="mainPrivate">

                {
                    user_name ?
                        <div className="private">
                            <div className='userInfo'>
                                <h1 className='welcome'>Welcome to</h1>
                                <h1 className='lydianWelcome'>Lydian!</h1>
                                <div className="accountInfo">
                                    <p className="accountName">Account Name: {user_name} </p>
                                    <img className="loginPic" src={img} alt='' />
                                    <Link to='/'><button className="logout">Logout</button></Link>
                                </div>
                            </div>
                            <div className="instStudBtns">
                                <Link to='/instruments'><button className='instruments'>Instruments</button></Link>
                                <Link to='/students'><button className='students'>Students</button></Link>
                            </div>
                        </div>
                        :
                        <div className="private">
                            <div className="instStudBtns">

                                <Link to='/'><button>login</button></Link>
                            </div>
                        </div>
                }

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUser })(Private)