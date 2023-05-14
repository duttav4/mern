import React, { useState } from 'react';
import Layout from '../component/layout/Layout';
import axios from "axios";
import "../../src/style/AuthStyle.css";
import { toast } from 'react-hot-toast';
import { useAuth } from '../component/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home()
{
    /* variables */
    const [ email, setemail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ auth, setAuth ] = useAuth();
    const navigate = useNavigate();

    /* handle form submit */
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            /* axios post request */
            const res = await axios.post( '/api/medi/auth/login', { email, password } );
            console.log(res)
            /* validation */
            if ( res && res.data.success )
            {
                toast.success( res.data.message );
                setAuth( {
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                } );
                localStorage.setItem( 'auth', JSON.stringify( res.data ) );
                navigate( "/dashboard/admin" );
            }
            else
            {
                toast.error( res.data.message );
            }
        } catch ( error ){
            console.log(error)
            toast.error("something went wrong on")
        }
    };

    return (
        <>
            <Layout>
                <div className='form-container bg-warning-subtle'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                onChange={( e ) => setemail( e.target.value )} value={email} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                onChange={( e ) => setPassword( e.target.value )} value={password} required />
                        </div>
                        <div className='text-center mt-3'>
                            <button type="submit" className="btn btn-primary col-6">Submit</button>
                        </div>
                    </form>

                </div>
            </Layout>
        </>
    );
}
