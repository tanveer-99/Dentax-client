import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointments = ({selectedDate}) => {
    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);  
    useEffect(()=> {
        fetch('AppointmentOptions.json')
        .then(res => res.json())
        .then(data => {
            setAppointmentOptions(data);
        })
    }, [])
    return (
        <section className='my-16 mx-6'>
            <p className='text-center text-secondary font-bold'>Available Appointments On: {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    appointmentOptions.map(option => 
                        <AppointmentOption
                        key={option._id}
                        option={option}
                        setTreatment={setTreatment}
                        >
                        </AppointmentOption>
                    )
                }
            </div>
           {
                treatment && 
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}>
                </BookingModal>
           }
        </section>
    );
};

export default AvailableAppointments;