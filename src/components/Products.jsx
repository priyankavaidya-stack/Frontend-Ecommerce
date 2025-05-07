import React from 'react';
import { useCartContext } from '../context/CartContext';
import Product from './Product.jsx';

function Products() {
    const { state } = useCartContext();
    const { products} = state;


    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5'>
            {products.length === 0 ? (
                <p>No products available</p>
            ) :
            (products.map((item, index)=>(
                    <Product key={index} product={item} />
            )))}
        </div>
    );
}

export default Products;