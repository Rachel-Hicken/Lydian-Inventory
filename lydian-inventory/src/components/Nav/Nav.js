import React from 'react';
// import logo from ''
import './Nav.css'
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <nav>
                <div className='company_name'>
                    <p className="lydian">Lydian</p>
                    <p className="inventory"> Inventory</p>
                </div>
                <div className="navBtn">
                    <Link to='/Private'><button className="homeBtn">Home</button></Link>
                    <Link to='/'><button className="logoutNav">Logout</button></Link>
                </div>
            </nav>
        </div>
    )
}