import React, { useEffect, useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { FaHeart } from "react-icons/fa";
import { addToCartAPI } from '../api calls/api.js'
import axios from 'axios';

function Product({ product }) {
    const { product_name, product_img, description, price, ratings, isfavourite:isFavourite } = product;
    const {  dispatch } = useCartContext();
    
    const [favourite, setFavourite] = useState(isFavourite);
    const [isAdded, setIsAdded] = useState(false);
    
    const addToCart = async(productId, sessionId) => {
        try{
            addToCartAPI(productId, sessionId, dispatch);
        }
        catch(error){
            console.error('Error adding to cart:', error);
        }
    }

    useEffect(()=>{
        // Assuming cartItems is fetched from the database and contains product IDs
        const fetchCartItems = async () => {
            try {
            const response = await axios.get('http://localhost:4000/api/cart/123'); // Replace with your API endpoint
            const cartItems = await response.data;
            const isProductInCart = cartItems.some(item => item.product_id === product.product_id);
            setIsAdded(isProductInCart);
            console.log("Cart Items", isAdded);
            } catch (error) {
            console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    },[]);

    function addToWishList(product) {
        // Toggle favourite status
        const updatedFavourite = !favourite;
        setFavourite(updatedFavourite);
        // Dispatch the action to add/remove from the wishlist
        dispatch({ type: 'ADD_TO_WISHLIST', payload: { ...product, isFavourite: updatedFavourite }});
        // console.log(state.wishList)
    }

    return (
        <div className='rounded-lg border border-gray-300 hover:border-orange-400 relative'>
            <FaHeart className={`m-1 absolute top-3 right-3 cursor-pointer ${favourite ? 'text-red-600' : 'text-white'}`} size={20} onClick={() => addToWishList(product)}/>
            <img src={product_img} className='rounded-t-lg w-full h-48 object-cover'/>
            <div className='px-2 py-1'>
                <h3 className='font-semibold'>{product_name}</h3>
                <p className='text-sm text-gray-500 mt-2 truncate'>{description}</p>
                <p className='mt-auto text-lg font-bold'>
                    ₹ {price.toLocaleString('en-IN')}
                </p>
                {isAdded ? (
                    <button className='bg-orange-200 text-white font-semibold text-sm px-2 py-1 my-2'>Added to Cart</button>
                ) : (
                    <button
                        className='bg-orange-400 text-white font-semibold text-sm px-2 py-1 my-2 cursor-pointer'
                        onClick={() => {
                            addToCart(product.product_id, 123);
                            setIsAdded(true);
                        }}
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}

export default Product;