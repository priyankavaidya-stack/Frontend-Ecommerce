import axios from 'axios';

export const addToCartAPI = async (productId, sessionId, dispatch) => {
   
    try {
        const response = await axios.post('http://localhost:4000/api/cart/add', {
            product_id: productId,
            session_id: sessionId
        })
        if(dispatch){
            dispatch({type: 'ADD_TO_CART', payload: response.data});
        }
        // Then sync with full server state
        const updatedCart = await fetchCartItems(sessionId);
        
        dispatch({type: 'FETCH_CART_ITEMS', payload: updatedCart});
        return updatedCart;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw new Error('Failed to add to cart');
    }
}

export const removeFromCartAPI = async (productId, sessionId, dispatch) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/cart/remove/${productId}`);

        if(dispatch){
            dispatch({type: 'REMOVE_FROM_CART', payload: response.data});
        }
      
        // // Then sync with full server state
        const updatedCart = await fetchCartItems(sessionId);
        
        dispatch({type: 'FETCH_CART_ITEMS', payload: updatedCart});
        return updatedCart;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw new Error('Failed to remove from cart');
    }
}

export const fetchCartItems = async (sessionId) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/cart/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw new Error('Failed to fetch cart items');
    }
}

export const incrementQty = async (productId, sessionId, dispatch) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/cart/incrementQty/${productId}`);
        
        if(dispatch){
            dispatch({type: 'INCREMENT_QTY', payload: response.data});
        }
        // // Then sync with full server state
        const updatedCart = await fetchCartItems(sessionId);
        dispatch({type: 'FETCH_CART_ITEMS', payload: updatedCart});
        return updatedCart;

    } catch (error) {
        console.log("Error incresing qty in API integration:", error);
        throw new Error('Failed to increase the qty of item in cart');
    }
}

export const decrementQty = async (productId, sessionId, dispatch) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/cart/decrementQty/${productId}`);
        console.log("Response", response)
        if(dispatch){
            dispatch({type: 'DECREMENT_QTY', payload: response.data});
        }
      
        // // Then sync with full server state
        const updatedCart = await fetchCartItems(sessionId);
        dispatch({type: 'FETCH_CART_ITEMS', payload: updatedCart});
        return updatedCart;

    } catch (error) {
        console.log("Error decresing qty in API integration:", error);
        throw new Error('Failed to decrease the qty of item in cart');
    }
}

export const toggleWishListAPI = async (productId, sessionId, dispatch) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/wishlist/toggle`, {
            product_id: productId,
            session_id: sessionId
        });
        if(dispatch) {
            dispatch({type: 'FETCH_WISHLIST_ITEMS', payload: response.data});
        }
        return response.data;

    } catch (error) {
        console.log('Error while adding item to watchlist');
        throw new Error('Failed to add item to watchlist');
    }
}

export const fetchWishlistItems = async (sessionId) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/wishlist/${sessionId}`);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        throw new Error('Failed to fetch wishlist items');
    }
}

export const clearFromCartAPI = async (sessionId, dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:4000/api/cart/clear/${sessionId}`);
         dispatch({type: 'CLEAR_CART', payload: response.data});
        return response.data;

    } catch (error) {
        console.error('Error clearing the cart', error);
        throw new Error('Failed clearing the cart');
    }
}