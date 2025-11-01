'use client'

import { useState } from 'react';
import { useCart } from '@/contexts/cart-context';
import CheckoutItem from './checkout-item';
import axios from 'axios';
import ErrorAlert from './error-alert';

interface Error {
  title: string;
  desc: string;
  status: boolean;
}

const Checkout: React.FC = () => {
  const { orderItems, calculated, calculateOrder } = useCart(); 

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<Error>({status: false, title: '', desc: ''})

  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Review Items</h1>
      {error.status && (
        <ErrorAlert title={error.title} description={error.desc} onClose={() => setError({ status: false, title: '', desc: '' })} />
      )}
      <div className="flex flex-row gap-4 w-full">
        <div className="flex-1">
          {orderItems.map((item) => (
            <CheckoutItem key={item.catalogObjectId} item={item} />
          ))}
        </div>
        <form className="flex-1 p-4 space-y-4" onSubmit={getPaymentLink}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          <button
            type="button"
            onClick={getPaymentLink}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
          >
            Proceed to checkout
          </button>
        </form>
      </div>
      <p className="mt-4">Total Price: ${calculated ? calculated : 'Unable to calculate'}</p>
    </div>
  )

  function validatePhoneNumber(phoneNumber: string) {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  }

  function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  async function getPaymentLink(){
    if(name && email && phone){
        calculateOrder(name, email, phone).then(async (data) => {
            const order = data.order

            try {
                const response = await axios.post('/api/createPaymentLink', {
                    order: order
                });

                window.location.href = response.data.url;
            } catch (error) {
                console.log(error)
            }
        })
    
        
    } else {
        console.log('Missing required fields')
    }
  }
}

export default Checkout;
