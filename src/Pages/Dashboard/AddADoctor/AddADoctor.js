import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const AddADoctor = () => {
    const { register, handleSubmit, } = useForm();
    const navigate = useNavigate();
    const { data: specialties, isLoading} = useQuery({
        queryKey: ['specialty'],
        queryFn: async ()=> {
            const res = await fetch('https://dentax-server-deploy.onrender.com/appointmentspecialty');
            const data = await res.json();
            return data;
        }
    })
    const handleAddDoctor = (data) => {
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=62143a8a5955d1a93127464ec2f9c180`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData =>{
            if(imgData.success) {
                const doctorInfo = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }

                console.log(doctorInfo)

                fetch('https://dentax-server-deploy.onrender.com/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctorInfo)
                })
                .then(res => res.json())
                .then(result => {
                    if(result.acknowledged) {
                        alert("Doctor Added!");
                        navigate('/dashboard/managedoctors')
                    }
                })
            }
        })
        
    }

    return (
        <div className='w-96 p-7'>
            <h3 className='text-3xl mb-5'>Add A Doctor</h3>

            <form onSubmit={handleSubmit(handleAddDoctor)}>

                <div className="form-control w-full max-w-xs mb-4">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input  {...register("name", { required: true })} type="text" className="input input-bordered w-full max-w-xs" />   
                </div>

                <div className="form-control w-full max-w-xs mb-4">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input  {...register("email", { required: true })} type="text" className="input input-bordered w-full max-w-xs" />   
                </div>

                <div className="form-control w-full max-w-xs mb-4">
                    <label className="label"><span className="label-text">Specialty</span></label>
                    
                    <select {...register("specialty", { required: true })} className="select select-bordered w-full max-w-xs">
                        {
                            specialties?.map(specialty => 
                                <option key={specialty._id} value={specialty.name}>{specialty.name}</option>    
                            )
                        }
                    </select>
                </div>

                <div className="form-control w-full max-w-xs mb-4">
                    <label className="label"><span className="label-text">Upload Your Photo</span></label>
                    <input  {...register("photo", { required: true })} type="file" className="input p-3 input-bordered w-full max-w-xs" />   
                </div>

                <input className='btn btn-accent w-full mb-4' value="Add Doctor" type="submit" />

            </form>
        </div>
    );
};

export default AddADoctor;