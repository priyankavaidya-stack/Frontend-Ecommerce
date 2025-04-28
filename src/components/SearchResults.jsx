import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import SearchResultItem from './SearchResultItem';

function SearchResults() {

    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const searchText = query.get('search');
 
    const { state }  = useCartContext();

    let result = [];

    if(searchText === ""){
        navigate("/")
    }else{
        result = state.products.filter((item)=>
            item.product_name.toLowerCase().includes(searchText.toLowerCase())
        );
    }
    return (
        <div className='mt-3'>
            <h2 className='text-center text-orange-400'>Search Results for "{searchText}"</h2>
                {result.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5'>
                        {result.map((item, index)=>(
                            <SearchResultItem key={index} product={item} />
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-gray-600 text-sm'>No results found.</p>
                )}
        </div>
    );
}

export default SearchResults;