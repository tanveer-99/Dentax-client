import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({booking}) => {
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [processing, setProcessing] = useState(false);

    const {price, patient, email,_id} = booking; 

    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://dentax-server-deploy.onrender.com/create-payment-intent", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
          body: JSON.stringify({price}),
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecret)
          });
      }, [price]);
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }


        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error) {
            console.log(error)
            setCardError(error)
        }
        else {
            setCardError('');
        }
        setSuccess('')
        setProcessing(true);
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: patient,
                  email: email
                },
              },
            },
          );

          if(confirmError) {
            setCardError(confirmError.message);
            return;
          }

          if(paymentIntent.status === "succeeded") {
            

            const paymentInfo = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            
            fetch('https://dentax-server-deploy.onrender.com/payment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(paymentInfo)
            })
            .then(res =>res.json())
            .then(data => {
                console.log(data)
                if(data.insertedId) {
                    setSuccess("Congratulations! Your payment is completed.");
                    setTransactionId(paymentIntent.id)
                }
            })
          }
          setProcessing(false)

    }


    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
                />
                <button className='btn btn-sm btn-primary mt-8' type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
                </button>
            </form>
            <p className="text-red-400">{cardError.message}</p>
            {
                success && 
                <div>
                    <p className="text-green-600">{success}</p>
                    <p>Your transaction id is: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;