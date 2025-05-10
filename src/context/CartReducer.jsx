
export const initialState = {
    products: [],
    cartItems: [],
    totalPrice: 0,
    wishList: []
};

export const cartReducer = (state, action) => {
    switch(action.type){
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'FETCH_CART_ITEMS':
             const updatedCartPrice = action.payload.reduce((total, item)=> total + item.price* item.quantity, 0)
            return {
                ...state,
                cartItems: action.payload,
                totalPrice: updatedCartPrice
            }
        case 'ADD_TO_CART':
            const updatedPrice = state.cartItems.reduce((total, item)=> total + item.price* item.quantity, 0)
            
            return{
                ...state,
                totalPrice: updatedPrice,
            };
            
        case 'REMOVE_FROM_CART':
            const updatedFilteredPrice = state.cartItems.reduce((total, item)=> total + item.price, 0);
            
            return{
                ...state,
                totalPrice: updatedFilteredPrice,
                // wishList: updatedRemovedItemList
            }
        case 'CLEAR_CART':
            return{
                ...state,
                cartItems: [],
                totalPrice: 0,
            };
        case 'FETCH_WISHLIST_ITEMS':
             return {
                ...state,
                wishList: action.payload
            }
        case 'DECREMENT_QTY':
            const updatedDecrementedQty = state.cartItems.map(item => {
                if(item.id === action.payload.id){
                    // Ensuring the qty doesn't go below 1
                    return { ...item, qty: Math.max(item.qty - 1, 1)}
                }else return item;
            })

            const updatedDecQtyPrice = updatedDecrementedQty.reduce((total, item)=> total + item.price* item.qty, 0);

            return{
                ...state,
                cartItems: updatedDecrementedQty,
                totalPrice: updatedDecQtyPrice
            }
        case 'INCREMENT_QTY':
            const updatedIncrementedQty = state.cartItems.map(item => {
                if(item.id === action.payload.id){
                    return { ...item, qty: item.qty + 1}
                }else return item;
            })

            const updatedIncQtyPrice = updatedIncrementedQty.reduce((total, item)=> total + item.price* item.qty, 0);

            return{
                ...state,
                cartItems: updatedIncrementedQty,
                totalPrice: updatedIncQtyPrice
            }
        default: 
            return state;
    }
};

