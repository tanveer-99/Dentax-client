import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const DisplayError = () => {
    const {logOutUser} = useContext(AuthContext); 
    const error = useRouteError();
    const handleLogOut = ()=> {
        logOutUser()
        .then()
        .catch(error => console.log(error.message))
    }
    return (
        <div>
            <p className="text-3xl text-red-600">Something Went Wrong!!!</p>
            <p className='text-red-500'>{error.statusText || error.message}</p>
            <h4 className="text-3xl">Please <button onClick={handleLogOut}>sign out</button> and log back in</h4>
        </div>
    );
};

export default DisplayError;