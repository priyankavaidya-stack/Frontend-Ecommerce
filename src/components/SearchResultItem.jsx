import React, { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { FaHeart } from "react-icons/fa";

function SearchResultItem({product}) {
    const { product_name, product_img, description, price, ratings, isAdded, isFavourite } = product;
    const { state, dispatch } = useCartContext();
    const [favourite, setFavourite] = useState(isFavourite);
    
    function addToCart(product){
        dispatch({type: 'ADD_TO_CART', payload: product});
    }

    function addToWishList(product) {
        // Toggle favourite status
        const updatedFavourite = !favourite;
        setFavourite(updatedFavourite);
        // Dispatch the action to add/remove from the wishlist
        dispatch({ type: 'ADD_TO_WISHLIST', payload: { ...product, isFavourite: updatedFavourite }});
        console.log(state.wishList)
        console.log('Added to wishlist')
    }

    function removeFromCart(product){
        dispatch({type: 'REMOVE_FROM_CART', payload: product});
    }

    return (
        <div className='rounded-lg border border-gray-300 hover:border-orange-400 relative'>
            <FaHeart className={`m-1 absolute top-3 right-3 cursor-pointer ${favourite ? 'text-red-600' : 'text-white'}`} size={20} onClick={() => addToWishList(product)}/>
            <img src={product_img} className='rounded-t-lg w-full h-48 object-cover'/>
            <div className='px-2 py-1'>
                <h3 className='font-semibold'>{product_name}</h3>
                <p className='text-sm text-gray-500 mt-2 truncate'>{description}</p>
                <p className='mt-auto text-lg font-bold'>₹ {price}</p>
                {isAdded ? (
                    <button className='bg-orange-400 text-white font-semibold text-sm  px-2 py-1 my-2' onClick={() => removeFromCart(product)}>Remove From Cart</button>
                ) : (
                    <button className='bg-orange-400 text-white font-semibold text-sm  px-2 py-1 my-2 cursor-pointer' onClick={() => addToCart(product)}>Add to Cart</button>
                )}
            </div>
        </div>
    );
}

export default SearchResultItem;