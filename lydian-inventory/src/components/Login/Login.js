
import React from 'react';
// import logo from ''
import './Login.css'
// import Nav from '../Nav/Nav';

export default function Login() {
    return (
        <div className='loginPg'>
            <nav>
                <div className='company_name'>
                    <p className="lydian">Lydian</p>
                    <p className="inventory"> Inventory</p>
                </div>
                <div className="login">
                    <a className='home_login' href={process.env.REACT_APP_LOGIN}>
                        <button className="loginBtn">Login</button>
                    </a>
                </div>
            </nav>
            <img className='home_img' src="https://images.pexels.com/photos/210854/pexels-photo-210854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt='temporarypic' />
        </div>
    )
}