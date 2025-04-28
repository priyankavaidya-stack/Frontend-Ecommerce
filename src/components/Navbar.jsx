import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useCartContext } from '../context/CartContext';
import SearchInput from './SearchInput';

function Navbar() {
    const { state } = useCartContext();
    const { cartItems } = state;

    return (
        <div className='flex justify-center items-center p-2 shadow-2xs sticky top-0 bg-white z-10'>
            <div>
                <Link to="/" className='font-bold text-orange-400 text-xl'>Online Store</Link>
            </div>
            <div className='flex-grow flex justify-center'>
                    <SearchInput />
            </div>
            <div className='flex justify-evenly'>
                <ul className='list-none flex justify-between items-center'>
                    {/* <li className='px-1'>
                        <Link to="/products">Products</Link>
                    </li> */}
                    <li className='px-2'>
                        <Link to="/categories">Categories</Link>
                    </li>
                </ul>
                <div className='flex justify-between items-center'>
                    <Link to="/wishlist">
                        <FaRegHeart className='m-1'/>
                    </Link>
                    <Link to="/cart" className='flex flex-col justify-center items-center'>
                        <span className='font-bold text-orange-400'>{cartItems.length}</span>
                        <FaShoppingCart className='m-1'/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;