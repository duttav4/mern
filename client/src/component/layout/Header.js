import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { FaLaptopMedical } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function Header()
{
    /* useAuth Context */
    const [ auth, setAuth ] = useAuth();

    /* logout function */
    const handleLogout = () =>
    {
        console.log('first')
        setAuth( {
            ...auth,
            user: null,
            token: ""
        } );
        localStorage.removeItem( 'auth' );
        toast.success( "logout Successfully" );
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
                <div className="container-fluid">
                    <Link to=" " className="navbar-brand" > <FaLaptopMedical /> MediRehab </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">


                            {!auth.user ? ( 
                            <>
                            </> ) : (
                                <>
                                    <div className="dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : ''}`} className="dropdown-item" >Dashboard</NavLink></li>
                                            <li><NavLink onClick={handleLogout} to="/" className="dropdown-item" >Logout</NavLink></li>
                                        </ul>
                                    </div>

                                </>
                            )}


                            <li className="nav-item">
                                <NavLink className="nav-link disabled">Disabled </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
