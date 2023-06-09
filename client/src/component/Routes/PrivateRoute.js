import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';

export default function PrivateRoute()
{
    const [ ok, setOk ] = useState( "" );
    const [ auth ] = useAuth();

    useEffect( () =>
    {
        const authCheck = async () =>
        {
            const res = await axios.get( "/api/medi/auth/admin-auth" );
            if ( res.data.ok )
            {
                setOk( true );
            } else
            {
                setOk( false );
            }
        };
        if ( auth?.token ) authCheck();
    }, [ auth.token ] );

    return ok ? <Outlet /> : <Spinner />;
}
