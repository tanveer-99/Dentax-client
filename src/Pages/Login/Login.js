import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Login = () => {
    const {loginUser} = useContext(AuthContext);

    const { register, handleSubmit, } = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data)=> {
        loginUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate(from, {replace: true});
        })
        .then(error => console.log(error.message))
    }

    return (
        <div className='flex justify-center items-center'>
            
            <div className='w-96 p-7'>

                <h2 className='text-2xl text-center text-secondary mb-4'>Login</h2>

                <div className="border p-5">
                    <form onSubmit={handleSubmit(handleLogin)}>

                            <div className="form-control w-full max-w-xs mb-4">
                                <label className="label"><span className="label-text">Email</span></label>
                                <input  {...register("email", { required: true })} type="text" className="input input-bordered w-full max-w-xs" />   
                            </div>

                            <div className="form-control w-full max-w-xs mb-4">
                                <label className="label"><span className="label-text">Password</span></label>
                                <input  {...register("password", { required: true })} type="password" className="input input-bordered w-full max-w-xs" />
                                <label className="label"><span className="label-text">Forgot Password?</span></label>
                            </div>

                            <input className='btn btn-accent w-full mb-4' value="Login" type="submit" />

                        </form>

                        <p>New to Dentax? <Link className='text-secondary' to="/signup">Create New Account</Link></p>
                        <div className="divider">OR</div>
                        <button className="btn-outline btn w-full">Continue With Google</button>
                </div>
            
            </div>

        </div>
    );
};

export default Login;