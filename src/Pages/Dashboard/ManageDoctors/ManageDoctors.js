import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    
    const { data: doctorsData, isLoading, refetch} = useQuery({
        queryKey: ['doctors'],
        queryFn: async ()=> {
            try {
                const res = await fetch('https://dentax-server-deploy.onrender.com/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch(error) {

            }
        }
    })

    const closeModal = ()=> {
        setDeletingDoctor(null)
    }
    const handleDeleteDoctor = (doctor) => {
        fetch(`https://dentax-server-deploy.onrender.com/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(result => {
            if(result.deletedCount > 0) {
                refetch();
                alert(`Doctor ${doctor.name} deleted successfully!`)
            }
        })
    }

    return (
        <div>
            <h3 className='text-3xl mb-5'>Manage Doctors</h3>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Specialty</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        doctorsData?.map((doctor, i) => 
                        <tr key={doctor._id}>
                            <th>{i+1}</th>
                            <td className='flex align-center'>
                                <div className="avatar pr-4">
                                    <div className="w-10 rounded">
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div>
                                <span>{doctor.name} </span>
                            </td>
                            <td>{doctor.email}</td>
                            <td>{doctor.specialty}</td>
                            <td>
                                <label onClick={ ()=> setDeletingDoctor(doctor) } htmlFor="confirmationModal" className="btn btn-xs btn-error">Delete</label>
                            </td>
                            

                        </tr>
                        )
                    }
                   
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                title={`Are you sure you want to delete ${deletingDoctor.name}?`}
                message="You cannot undone after confirmation."
                closeModal={closeModal}
                modalData={deletingDoctor}
                successAction={handleDeleteDoctor}
                successButtonName="I Agree"
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;