import React, { useState, useEffect } from 'react';
import Layout from '../../component/layout/Layout';
import AdminMenu from './AdminMenu';
import Register from './Register';
import { Modal } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function CreateUser()
{
    /* variables */
    const [ visible, setVisible ] = useState( false );
    const [ name, setName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ role, setRole ] = useState( "" );
    const [ users, setUsers ] = useState( "" );
    const [ page, setPage ] = useState( 1 );
    const [ pageCount, setPageCount ] = useState( 0 );
    const [ selected, setSelected ] = useState();
    const [ updatedName, setUpdatedName ] = useState( '' );
    const [ updatedemail, setUpdatedEmail ] = useState( '' );
    const [ updatedPassword, setUpdatedPassword ] = useState( '' );
    const [ updatedrole, setUpdatedRole ] = useState( '' );
    const [ type, setType ] = useState( '' );
    const [ query, setQuery ] = useState( '' );

    /* handle form submit to add new user */
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            const res = await axios.post( "/api/medi/auth/register", { name, email, password, role } );
            if ( res?.data.success )
            {
                toast.success( res?.data.message );
                getAllUsers();
                setPage( 1 );
                setVisible( false );
                setName( "" );
                setEmail( "" );
                setPassword( "" );
                setRole( "" );
            }
        } catch ( error )
        {
            console.log( error );
            toast.error( "something went wrong" );
        }
    };

    /* search result handler */
    const handleKeyUp = ( e ) =>
    {
        setQuery( e.target.value );
        if ( ( query.trim().length === 0 ) || ( query.trim().length >= 3 ) ) setPage( 1 ); getAllUsers();
    };

    /* initiale call to list users */
    useEffect( () =>
    {
        getAllUsers();
    }, [ page ] );

    /* function to get list of all users */
    const getAllUsers = async () =>
    {
        try
        {
            const res = await axios.get( `/api/medi/user/getall-users?page=${page}&q=${query}` );
            setUsers( res.data.users );
            setPageCount( res.data.pagination.pageCount );
        } catch ( error )
        {
            console.log( error );
            toast.error( "Something went wrong" );
        }
    };

    /* function to update user details */
    const handleEdit = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            const res = await axios.put( `/api/medi/user/edit-user/${selected}`, { selected, updatedName, updatedemail, updatedrole } );
            if ( res.data.success )
            {
                toast.success( `${updatedName} is updated` );
                setVisible( false );
                getAllUsers();
            }
            else
            {
                toast.error( res.data.message );
            }
        } catch ( error )
        {
            console.log( error );
            toast.error( "something went wrong" );
        }
    };

    /* function to delete user */
    const handleDelete = async ( id ) =>
    {
        try
        {
            const res = await axios.delete( `/api/medi/user/delete-user/${id}` );
            if ( res.data.success )
            {
                toast.success( res.data.message );
            } else
            {
                toast.error( res.data.message );
            }
            getAllUsers();
        } catch ( error )
        {
            console.log( error );
            toast.error( "something went wrong" );
        }
    };

    /* pagination previous button */
    function handlePrevious()
    {
        setPage( ( p ) =>
        {
            if ( p === 1 ) return p;
            return p - 1;
        } );
    }

    /* pagination next button */
    function handleNext()
    {
        setPage( ( p ) =>
        {
            if ( p === pageCount ) return p;
            return p + 1;
        } );
    }

    return (
        <>
            <Layout>
                <div className='container-fluid m-3 p-3'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-9'>
                            <div className='card-shadow'>
                                <div className='card-header bg-primary text-light d-flex'>
                                    <div className='col-7 m-1'>
                                        <b> Manage Users</b>
                                    </div>
                                    <div className='col-3 m-1'>
                                        <div className='input-group'>
                                            <input type='text' placeholder='Search by name' minLength={3} className='form-control'
                                                onKeyUp={( e ) => handleKeyUp( e )}></input>
                                            <button className="btn btn-dark" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                    <div className='col m-1'>
                                        <button className='btn btn-success' onClick={() =>
                                        {
                                            setVisible( true );
                                            setType( 'new' );
                                        }}>
                                            Add User
                                        </button>
                                    </div>
                                </div>
                                <div className='card-body '>
                                    <div className='table-responsive text-nowrap'>
                                        <table className='table table-hover table-bordered module-grid'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.values( users ).map( ( c ) => (

                                                    <tr key={c._id}>
                                                        <td>{c.name}</td>
                                                        <td>{c.email}</td>
                                                        <td>{c.role}</td>
                                                        <td>
                                                            <button className='btn btn-primary ms-2' onClick={() =>
                                                            {
                                                                setType( 'update' );
                                                                setVisible( true );
                                                                setSelected( c._id );
                                                                setUpdatedName( c.name );
                                                                setUpdatedEmail( c.email );
                                                                setUpdatedPassword( c.password );
                                                                setUpdatedRole( c.role );
                                                            }}><FontAwesomeIcon icon={faUserPen} />
                                                            </button>

                                                            <button className='btn btn-danger ms-2' onClick={() =>
                                                            {
                                                                handleDelete( c._id );
                                                            }}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </td>
                                                    </tr>

                                                ) )}
                                            </tbody>
                                        </table>
                                        <footer className='d-flex justify-content-end m-1 text-center'>
                                            <button disabled={page === 1} onClick={handlePrevious} className='btn btn-primary ms-1 text-center'>
                                                Previuos
                                            </button>
                                            <button disabled={page === pageCount || pageCount === 0} onClick={handleNext} className='btn btn-primary ms-1 text-center'>
                                                Next
                                            </button>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal open={visible} destroyOnClose={true}
                            onCancel=
                            {() =>
                            {
                                // getAllUsers();   
                                setVisible( false );
                                setName( '' );
                                setUpdatedName( '' );
                                setEmail( '' );
                                setUpdatedEmail( '' );
                                setPassword( '' );
                                setUpdatedPassword( '' );
                                setRole();
                                setUpdatedRole( "" );
                                setType( '' );
                            }
                            } footer={null}
                        >
                            {( () =>
                            {
                                if ( type === 'new' )
                                {
                                    return (

                                        <Register
                                            handleSubmit={handleSubmit}
                                            name={name} setName={setName}
                                            email={email} setEmail={setEmail}
                                            password={password} setPassword={setPassword}
                                            role={role} setRole={setRole}
                                            type={type}
                                        />
                                    );
                                } else if ( type === 'update' )
                                {
                                    return (

                                        <Register
                                            handleSubmit={handleEdit}
                                            name={updatedName} setName={setUpdatedName}
                                            email={updatedemail} setEmail={setUpdatedEmail}
                                            // password={updatedpassword} setPassword={setUpdatedPassword}
                                            role={updatedrole} setRole={setUpdatedRole}
                                            type={type}
                                        />
                                    );
                                }
                            } )()}
                            {/* {type === 'new' ? ( <>
                                <Register
                                    handleSubmit={handleSubmit}
                                    name={name} setName={setName}
                                    email={email} setEmail={setEmail}
                                    password={password} setPassword={setPassword}
                                    role={role} setRole={setRole}
                                    type={type}
                                />
                            </> ) : ( <>
                                <Register
                                    handleSubmit={handleEdit}
                                    name={updatedName} setName={setUpdatedName}
                                    email={updatedemail} setEmail={setUpdatedEmail}
                                    // password={updatedpassword} setPassword={setUpdatedPassword}
                                    role={updatedrole} setRole={setUpdatedRole}
                                    type={type}
                                />
                            </> )} */}
                        </Modal>
                    </div>
                </div>
            </Layout>
        </>
    );
}
