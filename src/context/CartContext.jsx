import React, { useEffect, createContext, useContext, useReducer} from 'react';
import { cartReducer, initialState} from './CartReducer';
import axios from 'axios';
import { fetchCartItems } from '../api calls/api';

const CartContext = createContext();

export const useCartContext = () => {
    // This will five access to the context values
    return useContext(CartContext);
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products');
                // console.log("response data", response.data);
                if (Array.isArray(response.data)) {
                    console.log("Response from API", response.data);
                    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
                } else {
                    console.error('Response data is not an array');
                }
            } catch (error) {
                console.error('Error while fetching the products')
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const initializeCart = async () => {
            try {
                // Get session ID from storage
                const sessionId = localStorage.getItem('sessionId') || 123;
                if(sessionId){
                    const cartItems = await fetchCartItems(sessionId);
                    dispatch({ type: 'FETCH_CART_ITEMS', payload: cartItems });
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                
            }

        }
        initializeCart()
    }, []);

    return(
        <CartContext.Provider value={{ state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}