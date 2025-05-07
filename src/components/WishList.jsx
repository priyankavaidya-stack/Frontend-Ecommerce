import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import WishListItem from './WishListItem';

function WishList() {
    const {state} = useCartContext();
    
    const navigate = useNavigate();

    function goToShopping(){
        navigate('/');
    }

    return (
        <>
        {state.wishList.length > 0 ? 
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5'>
                {state.wishList.map((item, index)=>(
                    <WishListItem key={index} product={item} />
                ))}
            </div>
        :
            <div className='text-center m-2 mt-5'>
                <h2 className='text-orange-400 font-bold'>Your Wishlist is empty!</h2>
                <p className='mt-4 text-gray-600 text-sm'>seems like you don't have wishes here.</p>
                <p className='text-gray-600 text-sm'>Make a wish!</p>
                <button className='bg-blue-400 text-white text-xs font-medium px-5 py-2 mt-5 border border-none cursor-pointer' onClick={goToShopping}>Start Shopping</button>
            </div>
        }
        </>
        
    );
}

export default WishList;