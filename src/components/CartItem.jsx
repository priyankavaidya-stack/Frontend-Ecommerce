import { useCartContext } from '../context/CartContext';
import { removeFromCartAPI, incrementQty, decrementQty } from '../api calls/api';

function CartItem({ product }) {
    const { product_id, product_name, product_img, description, price, quantity } = product;
        const { dispatch } = useCartContext();
        
        const decreaseQty = async (productId, sessionId) => {
            if(product.qty > 1)
                console.log("hello")
                decrementQty(productId, sessionId, dispatch);
        }

        const increaseQty = async (productId, sessionId) => {
            incrementQty(productId, sessionId, dispatch);
        }

        const removeFromCart = async(productId, sessionId) => {
                try{
                    removeFromCartAPI(productId, sessionId, dispatch);
                }
                catch(error){
                    console.error('Error removing from cart:', error);
                }
        }

    return (
        <div className='flex flex-col sm:flex-row rounded-b-lg rounded-t-lg border border-gray-300 hover:border-orange-400 mb-5'>
            <img src={product_img} alt={product_name} className='rounded-t-lg sm:rounded-tl-lg sm:rounded-bl-lg sm:rounded-tr-none sm:w-2/5 w-full h-48 object-cover'/>
            <div className='px-2 py-1'>
                <h3 className='font-semibold'>{product_name}</h3>
                <p className='text-sm text-gray-500 mt-2 truncate text-wrap'>{description}</p>
                <p className='mt-3 text-lg font-bold'>₹ {Number(price).toLocaleString('en-IN')}</p>
                <div className='flex items-center text-center my-2'>
                    <div className='flex justify-around items-center text-gray-700'>
                        <button className={`border w-5 h-5 rounded-full flex justify-center items-center text-center pb-1 mx-1 ${quantity === 1 ? "text-gray-300" : "cursor-pointer"}`} onClick={()=>decreaseQty(product_id, 123)}>-</button>
                        <span className='px-5 border'>{quantity}</span>
                        <button className='border w-5 h-5 rounded-full cursor-pointer flex justify-center items-center text-center pb-1 mx-1' onClick={()=>increaseQty(product_id, 123)}>+</button>
                    </div>
                </div>
                <button className='bg-orange-400 text-white font-semibold text-sm  px-2 py-1 my-2 cursor-pointer' onClick={() => removeFromCart(product_id, 123)}>Remove From Cart</button>
            </div>
        </div>
    );
}

export default CartItem;