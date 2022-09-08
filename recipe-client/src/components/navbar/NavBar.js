import React from 'react';
import {SiCodechef} from 'react-icons/si'
import { NavLink } from 'react-router-dom';
import { Session } from '../../requests';
import Search from './Search';


const NavBar = ({ currentUser, onSignOut }) => {
    
    const handleSignOut = () => {
        Session.destroy().then(() => { 
            onSignOut();
        })
    }


    return(
        <nav className="d-flex flex-row align-items-center mt-3">
            <a className="m-3 me-auto" alt="brand-logo" href="/">
                <SiCodechef size={ 30 } />
                My Recipe
            </a>
            <Search/>
            <div className="d-flex flex-row justify-content-end align-items-baseline ms-auto pb-3">
                <NavLink className="me-3 link" to='/'>Home</NavLink>
                <NavLink className="me-3 link" to='/meals'>Recipes</NavLink>
                {
                    currentUser ? (
                        <div className="d-flex flex-row justify-content-end align-items-baseline mt-3">
                            <NavLink className="me-3 link" to='/meals/new'>New Recipe</NavLink>
                            <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Welcome, {currentUser.full_name} 
                            </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to={`/users/${currentUser.id}`}>Profile</NavLink></li>
                                    <li><NavLink className="dropdown-item" to={`/users/${currentUser.id}/favourited`}>Favourites</NavLink></li>
                                    <li><button className="dropdown-item" onClick={handleSignOut}>Sign Out</button></li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                            <div>
                            <NavLink className="me-3 link" to='/sign_in'>Sign In</NavLink>
                            <NavLink className="me-3 link" to='/sign_up'>Sign Up</NavLink>
                            </div>
                    )
                }
            </div>
        </nav>
    )
}

export default NavBar;