import React from 'react';
import { useCartContext } from '../context/CartContext';

function Checkout() {
    const {state} = useCartContext();
    const { cartItems, totalPrice} = state;

    return (
        <div className='border border-gray-300 rounded-lg'>
            <h1 className='font-medium uppercase text-gray-500 py-2 border-b border-b-gray-300 px-4'>Price Details</h1>
            <div className='items-center px-4 py-2 border-b border-b-gray-300 border-dashed'>
                <p className='py-2 flex justify-between'>Price ({cartItems.length===1 ? 'item' : 'items'}) <span className='font-semibold'>₹ {(Number(totalPrice) + 1000*cartItems.length).toLocaleString('en-IN')}</span></p>
                <p className='py-2 flex justify-between'>Discount <span className='text-emerald-500'>- ₹{(1000*cartItems.length).toLocaleString('en-IN')}</span></p>
                <p className='py-2 flex justify-between'>Delivery Charges <span className='text-emerald-500'>Free</span></p>
            </div> 
            <h2 className='flex justify-between font-semibold p-4 text-lg border-b border-b-gray-300 border-dashed'>Total Amount:
                <span>₹ {Number(totalPrice).toLocaleString('en-IN')}</span>
            </h2>
            <p className='font-medium px-4 py-2 text-emerald-500'>You will save ₹{(1000*cartItems.length).toLocaleString('en-IN')} on this order</p>
            <div className='text-center px-4 py-2'>
                <button className='bg-[#fb641b] text-white font-semibold text-lg px-4 py-2 mt-2 mb-4 cursor-pointer w-full'>Place Order</button>
            </div>
        </div>
    );
}

export default Checkout;