import React, { Component } from 'react';
import { getUser } from '../../ducks/reducer_users';
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
            <div>

                {
                    user_name ?
                        <div className='userInfo'>
                            <h1 className='welcome'>Welcome to Lydian!</h1>
                            <img src={img} alt='' />
                            <p>Account Name: {user_name} </p>
                            <Link to='/'><button>Logout</button></Link>
                            <div>
                                <Link to='/instruments'><button className='instruments'>Instruments</button></Link>
                                <button className='students'>Students</button>
                            </div>
                        </div>
                        :
                        <Link to='/'><button>login</button></Link>
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