import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavBar.module.css'

import logo from '../logo.svg';

const NavBar = () => {
  return (
    <div className={styles.container}>
        <nav>
        <ul> 
            {/* <img src='./wklogo2.png' alt="logo" style={{ width: '70px', height: '70px' }}/>    */}
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/registerTeam">Register Team</Link>
            </li>
            <li>
            <Link to="/registerLink">Register Link</Link>
            </li>
            <li>
            <Link to="/dashBoard">DashBoard</Link>
            </li>
        </ul>
        </nav>
    </div>
  );
};

export default NavBar;