import React from 'react';
import doctor from '../../../assets/images/doctor.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../Components/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='mt-32'
        style={{'background': `url(${appointment})`}}
        >
            <div className="hero ">
                <div className="hero-content p-0 flex-col lg:flex-row">
                    <img src={doctor} alt="" className="-mt-32 md:block lg:block hidden lg:w-[450px] rounded-lg " />
                    <div>
                        <h4 className='text-lg text-primary font-bold'>Appointment</h4>
                        <h1 className="text-4xl font-bold text-white">Make An Appointment Today</h1>
                        <p className="py-6 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, architecto possimus molestiae minima laudantium rem eligendi ex? Tempora veniam vero facere, quaerat repudiandae quam, exercitationem minima, reiciendis modi debitis facilis?</p>
                        <PrimaryButton>Make Appointment</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;