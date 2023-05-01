import React from 'react';

const AppointmentOption = ({option, setTreatment}) => {
    const {name, slots, price} = option;
    return (
        <div>
            <div className="card shadow-xl">
                <div className="card-body text-center ">
                    <h2 className="text-2xl text-secondary font-bold text-center">{name}</h2>
                    <p>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                    <p>{slots.length} {slots.length > 1 ? 'slots' : 'slot'} available</p>
                    <p><small>Price: ${price}</small></p>
                    <div className="card-actions justify-center">
                        <label htmlFor="booking-modal"
                        disabled={slots.length === 0}
                        className="btn btn-secondary text-white"
                        onClick={() => setTreatment(option)}
                        >Book Appointment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;