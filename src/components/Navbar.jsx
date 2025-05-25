import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegHeart } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';
import SearchInput from './SearchInput';
import { MdClose } from 'react-icons/md';

function Navbar() {
    const { state } = useCartContext();
    const { cartItems } = state;
    const [openHamburger, setOpenHamburger] = useState(false);

    const handleSideBar = () => {
        setOpenHamburger(!openHamburger);
    }

    return (
        <div className='flex justify-center items-center px-5 py-2 shadow-2xs sticky top-0 bg-white z-10'>
                <div>
                    <Link to="/" className='font-bold text-orange-400 text-xl'>Online Store</Link>
                </div>
                <div className='flex-grow flex justify-center mx-3'>
                        <SearchInput />
                </div>
                <div className='md:flex hidden'>
                    <ul className='list-none flex justify-center items-center'>
                        <li className='px-1'>
                            <Link to="/sign-in">
                                <button className='bg-orange-400 text-white text-xs font-medium px-5 py-2 mx-2 border border-none cursor-pointer'>Sign in</button>
                            </Link>
                        </li>
                        <li className='px-2 flex items-center'>
                            <Link to="/login">
                                <button className='bg-white text-orange-400 text-xs font-medium px-5 py-2 mx-2 border border-orange-400 cursor-pointer'>Login</button>
                            </Link>
                        </li>
                    </ul>
                    <div className='flex justify-between items-center'>
                        <Link to="/wishlist" className='mx-0.5'>
                            <FaRegHeart className='m-1' size={20} />
                        </Link>
                        <Link to="/cart" className='flex flex-col justify-center items-center mx-0.5'>
                            <span className='font-bold text-orange-400 text-xl'>{cartItems.length}</span>
                            <FaShoppingCart className='m-1' size={30} />
                        </Link>
                    </div>
                </div>
                <div className='flex md:hidden'>
                    <GiHamburgerMenu size={20} className='text-orange-400' onClick={ handleSideBar }/>
                </div>

                {openHamburger && (
                    <div className="fixed inset-0 trans " onClick={handleSideBar}>
                        <div
                            className="fixed top-0 right-0 h-full w-64 bg-gray-100 shadow-lg p-4 z-40"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-orange-400">Online Store</h2>
                                <button onClick={handleSideBar} className="text-xl font-bold text-gray-600">
                                    <MdClose size={30} className='text-orange-400' />
                                </button>
                            </div>
                            <ul className="space-y-4">
                                <li><Link to="/" onClick={handleSideBar}>Home</Link></li>
                                <li><Link to="/wishlist" onClick={handleSideBar}>Wishlist</Link></li>
                                <li><Link to="/cart" onClick={handleSideBar}>Cart</Link></li>
                                <li><Link to="/login" onClick={handleSideBar}>Login</Link></li>
                                <li><Link to="/sign-in" onClick={handleSideBar}>Sign In</Link></li>
                            </ul>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Navbar;