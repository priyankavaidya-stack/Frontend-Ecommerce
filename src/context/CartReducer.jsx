
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
            return {
                ...state,
                cartItems: action.payload,
                totalPrice: action.payload.reduce((total, item) => total + item.price * item.qty, 0)
            }
        case 'ADD_TO_CART':
            const updatedCartItems = [
                ...state.cartItems, 
                { ...action.payload }
            ]

            const updatedProducts = state.products.map((item)=> {
                if(item.id === action.payload.id){
                    // Make sure to return the updated product object
                    return {...item, isAdded: true}
                }
                // Ensure other items are unchanged
                return item;
            })
            const updatedPrice = updatedCartItems.reduce((total, item)=> total + item.price* item.qty, 0);
            
            const updatedWishListItem = state.wishList.map((item)=>{
                if(item.id === action.payload.id){
                    return { ...item, isAdded: true}
                }else return item;
            })
            return{
                ...state,
                products: updatedProducts,
                cartItems: updatedCartItems,
                totalPrice: updatedPrice,
                wishList: updatedWishListItem
            };
        case 'REMOVE_FROM_CART':
            const filteredCartItems = state.cartItems.filter((item)=> item.id !== action.payload.id);
            const updatedFilteredPrice = filteredCartItems.reduce((total, item)=> total + item.price, 0);
            
            const updatedFilteredProducts = state.products.map((item)=> {
                if(item.id === action.payload.id){
                    return {...item, isAdded: false}
                }
                // Ensure all products are returned correctly
                return item;
            })
        
            const updatedRemovedItemList = state.wishList.map((item)=> {
                if(item.id === action.payload.id)return { ...item, isAdded: false}
                else return item;
            })
            
            return{
                ...state,
                products: updatedFilteredProducts,
                cartItems: filteredCartItems,
                totalPrice: updatedFilteredPrice,
                wishList: updatedRemovedItemList
            }
        case 'CLEAR_CART':
            return{
                ...state,
                cartItems: [],
                totalPrice: 0,
            };
        case 'ADD_TO_WISHLIST':
            // Check if the product is already in the wishlist
            const existingProductIndex = state.wishList.findIndex(item => item.id === action.payload.id);
            
            let updatedProductList;
            let updatedWishList;
            if(existingProductIndex > -1){
                // Remove the product if it's already in the wishlist
                updatedWishList = state.wishList.filter(item => item.id !== action.payload.id);
                updatedProductList = state.products.map(item => {
                    if(item.id === action.payload.id){
                        return { ...item, isFavourite: false}
                    }else return item;
                })
            }else{
                // Add the product to the wishlist
                updatedWishList = [...state.wishList, action.payload];
                updatedProductList = state.products.map(item => {
                    if(item.id === action.payload.id){
                        return {... item, isFavourite: true}
                    }else return item;
                    })
            }
            return{
                ...state,
                products: updatedProductList,
                wishList: updatedWishList
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
                }else return item
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

