import React, { useState, useEffect } from 'react';
import { useCartContext } from '../context/CartContext';
import { FaHeart } from "react-icons/fa";
import { addToCartAPI, toggleWishListAPI, removeFromCartAPI } from '../api calls/api.js'

function WishListItem({product}) {
    const { product_id, product_name, product_img, description, price, ratings } = product;
    const { state, dispatch } = useCartContext();

     const [isAdded, setIsAdded] = useState(false);
    
    const addToCart = async(productId, sessionId) => {
            try{
                addToCartAPI(productId, sessionId, dispatch);
            }
            catch(error){
                console.error('Error adding to cart:', error);
            }
    }

    const removeFromCart = async(productId, sessionId) => {
                try{
                    removeFromCartAPI(productId, sessionId, dispatch);
                }
                catch(error){
                    console.error('Error removing from cart:', error);
                }
    }

    useEffect(()=>{
        const isProductInCart = state.cartItems.some(item => item.product_id === product.product_id);
        setIsAdded(isProductInCart);
    }, [state.cartItems]);

    const toggleWishList = async(productId, sessionId) => {
            try {
                toggleWishListAPI(productId, sessionId, dispatch);
            } catch (error) {
                console.error('Error while adding item to wishlist', error);
            }
    }

    const wishList = state.wishList;

    const isItemInWishlist = wishList.some(item => item.product_id === product_id);

    return (
        <div className='rounded-lg border border-gray-300 hover:border-orange-400 relative'>
            <FaHeart className={`m-1 absolute top-3 right-3 cursor-pointer ${isItemInWishlist ? 'text-red-600' : 'text-white'}`} size={20} onClick={() => toggleWishList(product_id, 123)}/>
            <img src={product_img} className='rounded-t-lg w-full h-48 object-cover'/>
            <div className='px-2 py-1'>
                <h3 className='font-semibold'>{product_name}</h3>
                <p className='text-sm text-gray-500 mt-2 truncate'>{description}</p>
                <p className='mt-auto text-lg font-bold'>₹ {Number(price).toLocaleString('en-IN')}</p>
                {isAdded ? (
                    <button className='bg-orange-400 text-white font-semibold text-sm  px-2 py-1 my-2' onClick={() => removeFromCart(product_id, 123)}>Remove From Cart</button>
                ) : (
                    <button className='bg-orange-400 text-white font-semibold text-sm  px-2 py-1 my-2 cursor-pointer' onClick={() => addToCart(product_id, 123)}>Add to Cart</button>
                )}
            </div>
        </div>
    );
}

export default WishListItem;