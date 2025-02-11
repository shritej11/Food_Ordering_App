import { useSelector, useDispatch } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    
    const cartItems = useSelector((store) => store.cart.items);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const goToHomePage = () => {
        navigate("/");
    };

    return (
        <div className="m-2 p-1">
            
            <div className="w-6/12 p-4 m-auto text-center">
                {cartItems.length === 0 ? (
                    <>
                        <div className="m-auto size-100">
                            <img
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
                                alt="Empty Cart"
                            />
                        </div>
                        <h1 className="font-bold text-md text-gray-600">
                            Your cart is empty
                        </h1>
                        <h3 className="text-gray-400 text-xs">
                            You can go to the home page to view more restaurants
                        </h3>
                        <div className="p-4">
                            <button className="shadow-lg hover:shadow-gray-500  w-45 border-black bg-red-500 p-1.5 rounded-md"
                                onClick={goToHomePage}
                            >
                                <div className="text-white font-bold text-md">Home</div>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex ">
                            <button
                                className="ml-auto rounded-xl font-bold text-sm p-2 m-2 bg-green-600 text-white"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </button>
                        </div>

                        <ItemList items={cartItems} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
