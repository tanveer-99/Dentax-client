import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import Review from './Review';

const Testimonial = () => {
    const reviews = [
        {
            id: 1,
            name: 'Winson Herry',
            review: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quaerat corporis placeat suscipit tempore sed? Sint nihil ipsum similique atque',
            location: 'California',
            img: people1  
        },
        {
            id: 2,
            name: 'Winson Herry',
            review: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quaerat corporis placeat suscipit tempore sed? Sint nihil ipsum similique atque',
            location: 'California',
            img: people2  
        },
        {
            id: 3,
            name: 'Winson Herry',
            review: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quaerat corporis placeat suscipit tempore sed? Sint nihil ipsum similique atque',
            location: 'California',
            img: people3  
        }
    ]
    return (
        <section className='my-20'>
            <div className='flex justify-between'>
                <div>
                    <h4 className='font-bold text-xl text-primary'>Testimonial</h4>
                    <h2 className="text-4xl">What our patients say</h2>
                </div>
                <figure>
                    <img className=' w-20 lg:w-32' src={quote} alt="" />
                </figure>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    reviews.map(rev => <Review key={rev.id} rev={rev}></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonial;
