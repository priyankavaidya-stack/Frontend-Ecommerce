import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart() {
    const { state } = useCartContext();
    const { cartItems } = state;

    const navigate = useNavigate();

    function goToShopping(){
        navigate("/");
    }
    return (
        <div>
            {cartItems.length === 0 ? (
                <div className='text-center m-2 mt-5'>
                    <h2 className='text-orange-400 font-bold'>Hey, it feels so light!</h2>
                    <p className='mt-4 text-gray-600 text-sm'>There is nothing in your bag. Let's add some items.</p>
                    <button className='bg-blue-400 text-white text-xs font-medium px-5 py-2 mt-5 border border-none cursor-pointer' onClick={goToShopping}>Start Shopping</button>
                </div>
            ):(
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 m-5'>
                    <div className='sm:col-span-2'>
                        {cartItems.map((item, index)=>(
                            <CartItem key={index} product={item} />                  
                        ))}
                    </div>
                    <div className='sm:mt-0'>
                        <Checkout />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;