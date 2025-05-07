import axios from 'axios';

export const addToCartAPI = async (productId, sessionId, dispatch) => {
   
    try {
        const response = await axios.post('http://localhost:4000/api/cart/add', {
            product_id: productId,
            session_id: sessionId
        })
        console.log("Response from Cart API", response.data);
        if(dispatch){
            dispatch({type: 'ADD_TO_CART', payload: response.data});  
        }
        // Then sync with full server state
        const updatedCart = await fetchCartItems(sessionId);
        dispatch({ type: 'FETCH_CART_ITEMS', payload: updatedCart });

        return updatedCart;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw new Error('Failed to add to cart');
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