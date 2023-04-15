import { format } from 'date-fns';
import React, { useState } from 'react';

const BookingModal = ({treatment, selectedDate}) => {
    const date = format(selectedDate, 'PP');
    const [formData, setFormData] = useState({});
    const handleSubmit = (event) => {
        const form = event.target.parentElement.parentElement;
        form.reset();
        console.log(form, formData)
    }      
    const handleOnBlur = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newFormData = {...formData};
        newFormData[field] = value;
        setFormData(newFormData)
    }
    return (
        // ********fix the form submit***********
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <p className="py-4">{treatment.name}</p>

                <form className='flex flex-col justify-center'>
                    <input type="text" value={date} disabled  className="input input-secondary w-full my-2 " />
                    <select  onBlur={handleOnBlur} name="slot"  className="select select-bordered select-secondary w-full ">
                        {
                            treatment.slots.map(slot => <option value={slot}>{slot}</option>)
                        }
                    </select>
                    <input required name="name" onBlur={handleOnBlur} type="text"  className="input input-secondary w-full my-2" />
                    <input required name="email" onBlur={handleOnBlur} type="email"  className="input input-secondary w-full my-2" />
                    <input required name="phone" onBlur={handleOnBlur} type="text"  className="input input-secondary w-full my-2" />

                    <div className="modal-action">
                        <label onClick={handleSubmit} htmlFor="booking-modal" className="btn btn-secondary text-white"> Submit</label>
                    </div>
                </form>

                
            </div>
            </div>
        </>
    );
};

export default BookingModal;