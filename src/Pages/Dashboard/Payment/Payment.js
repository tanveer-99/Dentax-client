import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51If55DLp7XmNo5Ko8mzaaPkmyssFeqHSk5ku1zQeskzK8IVLcxOodFwrHURKCMT7lsjtswdKgtZZl6Mp9t08vY8f00ftSWV8uF');

const Payment = () => {
    const data = useLoaderData();
    const {treatment, price, appointmentDate, slot} = data;
    return (
        <div>
            <h3 className="text-3xl mb-4">Payment for {treatment}</h3>
            <p>Please pay <strong>${price}</strong> for your appointment on {appointmentDate} at ({slot})</p>

            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={data}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;