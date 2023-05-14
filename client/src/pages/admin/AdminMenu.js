import React from 'react';
import { NavLink } from "react-router-dom";

export default function AdminMenu()
{
    return (
        <>
            <div className="list-group">
                <NavLink to="/dashboard/admin/" className="list-group-item list-group-item-action" >
                    DashBoard
                </NavLink>
                <NavLink to="/dashboard/admin/create-user" className="list-group-item list-group-item-action">User Master</NavLink>
                <NavLink to="/dashboard/admin/create-hospital" className="list-group-item list-group-item-action">Hospital Master</NavLink>
            </div>

        </>
    );
}
