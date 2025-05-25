import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SearchInput() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    function handleSearchInput(e){
        const newSearchText = e.target.value;
        setSearchText(e.target.value);
        console.log(newSearchText)

        if(searchText.length >=0){
            navigate(`/search?search=${newSearchText}`);
        }else{
            navigate('/')
        }
    }

    return (
        <>
            <input type="text" placeholder='Search products...' className='w-full rounded-md outline-0 p-2 bg-gray-100 text-sm shadow' onChange={ handleSearchInput } value={searchText} />
        </>
    );
}

export default SearchInput;