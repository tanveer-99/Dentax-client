import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, } = useForm();
    const {createUser, updateUser} = useContext(AuthContext);

    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    console.log("token", token)
    const navigate = useNavigate();

    if(token) {
        navigate('/');
    }

    const handleSignUp = (data)=> {
        
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            const userInfo = {
                displayName : data.name
            }
            updateUser(userInfo) 
            .then(()=>{
                saveUser(data.name, data.email)
            })
            .catch(error => console.log(error.message))

        })
        .catch(error => console.log(error.message))
    }

    const saveUser = (name, email) => {
        const user = {name, email};
        fetch('http://localhost:5000/users',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            setCreatedUserEmail(email)            
        })
    }
    
    
    return (
        <div className='flex justify-center items-center'>
            
            <div className='w-96 p-7'>

                <h2 className='text-2xl text-center text-secondary mb-4'>Sign Up</h2>

                <div className="border p-5">
                    <form onSubmit={handleSubmit(handleSignUp)}>

                            <div className="form-control w-full max-w-xs mb-4">
                                <label className="label"><span className="label-text">Name</span></label>
                                <input  {...register("name", { required: true })} type="text" className="input input-bordered w-full max-w-xs" />   
                            </div>

                            <div className="form-control w-full max-w-xs mb-4">
                                <label className="label"><span className="label-text">Email</span></label>
                                <input  {...register("email", { required: true })} type="text" className="input input-bordered w-full max-w-xs" />   
                            </div>

                            <div className="form-control w-full max-w-xs mb-4">
                                <label className="label"><span className="label-text">Password</span></label>
                                <input  {...register("password", { required: true })} type="password" className="input input-bordered w-full max-w-xs" />
                            </div>

                            <input className='btn btn-accent w-full mb-4' value="Create New Account" type="submit" />

                        </form>

                        <p>Already Have an account? <Link className='text-secondary' to="/login">Please Login!</Link></p>
                        <div className="divider">OR</div>
                        <button className="btn-outline btn w-full">Continue With Google</button>
                </div>
            
            </div>

        </div>
    );
};

export default SignUp;