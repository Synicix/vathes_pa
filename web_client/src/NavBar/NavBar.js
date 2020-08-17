import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css'
import logo from '../images/logo_with_text.svg';

class NavBar extends Component {
    render() {
        return (
            <nav className='top-nav'>
                <div className='nav-logo'>
                    <NavLink to='/'><img src={logo} alt='Logo'/></NavLink>
                </div>
                <ul className='left-nav'>
                    <li><NavLink className='nav-link' to='/experiment-setups'>Experiment Setups</NavLink></li>
                    <li><NavLink className='nav-link' to='/mouse'>Mouse</NavLink></li>
                    <li><NavLink className='nav-link' to='/mouse-retina-experiment-sessions'>Mouse Retina Experiment Sessions</NavLink></li>
                </ul>
            </nav>
            
        )
    }
}

export default NavBar