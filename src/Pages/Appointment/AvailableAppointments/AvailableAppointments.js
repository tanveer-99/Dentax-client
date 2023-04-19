import { format } from 'date-fns';
import React, { useState } from 'react';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from 'react-query';

const AvailableAppointments = ({selectedDate}) => {
    const [treatment, setTreatment] = useState(null); 
    const date = format(selectedDate, 'PP');

    const {data : appointmentOptions = []} = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async ()=> {
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data;
        }
    })
    
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
                    treatment={treatment}
                    setTreatment={setTreatment}>
                </BookingModal>
           }
        </section>
    );
};

export default AvailableAppointments;