import React from 'react';
import { useCartContext } from '../context/CartContext';

function CartItem({ product }) {
    const { product_name, product_img, description, price, quantity } = product;
        const { dispatch } = useCartContext();

        console.log(product);

        function removeFromCart(product){
            dispatch({type: 'REMOVE_FROM_CART', payload: product});
        }

        function decrementQty(product){
            if(product.qty > 1)
            dispatch({ type: 'DECREMENT_QTY', payload: product})
        }

        function incrementQty(product){
            dispatch({ type: 'INCREMENT_QTY', payload: product});
        }

    return (
        <div className='flex flex-col sm:flex-row rounded-b-lg rounded-t-lg border border-gray-300 hover:border-orange-400 mb-5'>
            <img src={product_img} alt={product_name} className='rounded-t-lg sm:rounded-tl-lg sm:rounded-bl-lg sm:rounded-tr-none sm:w-2/5 w-full h-48 object-cover'/>
            <div className='px-2 py-1'>
                <h3 className='font-semibold'>{product_name}</h3>
                <p className='text-sm text-gray-500 mt-2 truncate text-wrap'>{description}</p>
                <p className='mt-3 text-lg font-bold'>₹ {price}</p>
                <div className='flex items-center text-center my-2'>
                    <div className='flex justify-around items-center text-gray-700'>
                        <button className={`border w-5 h-5 rounded-full flex justify-center items-center text-center pb-1 mx-1 ${quantity === 1 ? "text-gray-300" : "cursor-pointer"}`} onClick={()=>decrementQty(product)}>-</button>
                        <span className='px-5 border'>{quantity}</span>
                        <button className='border w-5 h-5 rounded-full cursor-pointer flex justify-center items-center text-center pb-1 mx-1' onClick={()=>incrementQty(product)}>+</button>
                    </div>
                </div>
                <button className='bg-orange-400 text-white font-semibold text-sm  px-2 py-1 my-2 cursor-pointer' onClick={() => removeFromCart(product)}>Remove From Cart</button>
            </div>
        </div>
    );
}

export default CartItem;