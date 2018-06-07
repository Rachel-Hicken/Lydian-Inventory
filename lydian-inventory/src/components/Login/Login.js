
import React from 'react';
// import logo from ''
import './Login.css'
// import Nav from '../Nav/Nav';

export default function Login() {
    return (
        <div className='loginPg'>
            <nav className="lgNav">
                <div className="loginNav">
                <div className='company_name'>
                    <p className="lydian">Lydian</p>
                    <p className="inventory"> Inventory</p>
                </div>
                <div className="login">
                    <a className='home_login' href={process.env.REACT_APP_LOGIN}>
                        <button className="loginBtn">Login</button>
                    </a>
                </div>
                </div>
            </nav>
        </div>
    )
}