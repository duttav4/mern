import React from 'react';

export default function Register( { handleSubmit, name, setName, email, setEmail, password, setPassword, role, setRole, type } )
{
    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* name */}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name'
                        onChange={( e ) => setName( e.target.value )} value={name}
                        placeholder='Enter Name' />
                </div>
                {/* email */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={( e ) => setEmail( e.target.value )} value={email}
                        placeholder='Enter Email' />
                </div>
                {/* password */}
                {type !== 'update' ? ( <>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            onChange={( e ) => setPassword( e.target.value )} value={password}
                            placeholder='Enter Password' />
                    </div>
                </> ) : ( <></> )}

                {/* role */}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Role</label>
                    <div className="form-floating">
                        <select className="form-control"
                            onChange={( e ) => setRole( e.target.value )} value={role}>
                            <option value={""}>Select Role</option>
                            <option value={1} >Admin</option>
                            <option value={2}>Manager</option>
                            <option value={3}>Therapist</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 text-center">
                    <button type='submit' className="btn btn-primary col-12 mt-4">Submit</button>
                </div>
            </form>

        </>
    );
}
