import React, { useContext, useState } from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import { AuthContext } from '../Contexts/AuthProvider';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawyer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>               
                </div> 
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawyer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><Link to="/dashboard">My Appointments</Link></li>
                        {
                            isAdmin &&
                            <>
                            <li><Link to="/dashboard/allusers">All Users</Link></li>
                            <li><Link to="/dashboard/addadoctor">Add A Doctor</Link></li>
                            <li><Link to="/dashboard/managedoctors">Manage Doctors</Link></li>
                            </>
                        }
                    </ul>
                
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;