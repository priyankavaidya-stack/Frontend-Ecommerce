import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { clearFromCartAPI } from '../api calls/api';


function Cart() {
    const { state, dispatch } = useCartContext();
    const { cartItems } = state;

    const navigate = useNavigate();

    function goToShopping(){
        navigate("/");
    }

    const clearFromCart = async(sessionId) => {
                    try{
                        clearFromCartAPI(sessionId, dispatch);
                    }
                    catch(error){
                        console.error('Error clearing the cart:', error);
                    }
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
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 m-5 overflow-y-hidden'>
                    <div className='sm:col-span-2'>
                        <div className='max-h-[77vh] overflow-y-auto p-2 scrollbar-custom shadow-md'>
                            {cartItems.map((item, index)=>(
                                <CartItem key={index} product={item} />                  
                            ))}
                        </div>
                        <button className='bg-[#fb641b] text-white font-bold text-m my-2 px-3 py-1.5 cursor-pointer float-right' onClick={() => clearFromCart(123)}>Clear Cart</button>
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