import { useSelector, useDispatch } from "react-redux";
import {
    clearCart,
    removeItem,
    incrementQty,
    decrementQty,
} from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";
import { CDN_URL } from "../constants/constants";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClearCart = () => dispatch(clearCart());
    const handleRemoveItem = (itemId) => dispatch(removeItem(itemId));
    const handleIncrement = (itemId) => dispatch(incrementQty(itemId));
    const handleDecrement = (itemId) => dispatch(decrementQty(itemId));
    const goToHomePage = () => navigate("/");

    const totalAmount = cartItems.reduce((total, item) => {
        const price =
            (item.card.info.price || item.card.info.defaultPrice || 0) / 100;
        return total + item.quantity * price;
    }, 0);

    const deliveryFee = 40;
    const gst = totalAmount * 0.08;
    const cancellationFee = totalAmount * 0.75;
    const totalToPay = totalAmount + deliveryFee + gst;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Left: Cart Items */}
                <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md p-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center">
                            <img
                                className="mx-auto w-60"
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
                                alt="Empty Cart"
                            />
                            <h1 className="mt-4 font-bold text-lg text-gray-700">
                                Your cart is empty
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                You can go to the home page to view more restaurants
                            </p>
                            <button
                                onClick={goToHomePage}
                                className="mt-6 bg-red-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow"
                            >
                                Browse Restaurants
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                                <button
                                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full shadow"
                                    onClick={handleClearCart}
                                >
                                    Clear Cart
                                </button>
                            </div>

                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.card.info.id}
                                        className="flex items-start gap-4 border-b pb-4 relative"
                                    >
                                        {/* Red Cross Button for Remove */}
                                        <div className="">
                                        <button
                                            onClick={() => handleRemoveItem(item.card.info.id)}
                                            className="absolute -top-4 right-2 text-white text-2xl z-10 bg-gradient-to-r from-black to bg-gray-500 px-1.5 py-0.5 rounded shadow-lg hover:bg-gradient-to-l"
                                        >
                                            &times;
                                        </button>
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-gray-800">
                                                {item.card.info.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-1">
                                                ₹
                                                {(item.card.info.price || item.card.info.defaultPrice) / 100}
                                            </p>
                                            {item.card.info.description && (
                                                <p className="text-gray-400 text-xs mt-2">
                                                    {item.card.info.description}
                                                </p>
                                            )}

                                            <div className="flex items-center mt-3 space-x-2">
                                                <button
                                                    className="bg-gray-200 px-2 rounded text-xl"
                                                    onClick={() => handleDecrement(item.card.info.id)}
                                                >
                                                    −
                                                </button>
                                                <span className="text-md font-semibold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="bg-gray-200 px-2 rounded text-xl"
                                                    onClick={() => handleIncrement(item.card.info.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-24 h-24 flex-shrink-0 relative">
                                            <img
                                                src={CDN_URL + item.card.info.imageId}
                                                alt={item.card.info.name}
                                                className="w-full h-full object-cover rounded-lg border"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Right: Bill Summary */}
                {cartItems.length > 0 && (
                    <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Bill Details
                        </h3>

                        <div className="flex justify-between mb-2">
                            <span>Item Total</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>
                                Delivery Fee <span className="text-gray-400 text-xs">|  ⓘ</span>
                            </span>
                            <span>₹{deliveryFee}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between mb-2">
                            <span>Delivery Tip</span>
                            <span className="text-orange-500 cursor-pointer hover:underline">
                                Add tip
                            </span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>
                                Cancellation Fee <span className="text-gray-400 text-xs">ⓘ</span>
                            </span>
                            <span>₹{cancellationFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>
                                GST & Other Charges <span className="text-gray-400 text-xs">ⓘ</span>
                            </span>
                            <span>₹{gst.toFixed(2)}</span>
                        </div>
                        <hr className="my-4 border-black" />

                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>TO PAY</span>
                            <span>₹{totalToPay.toFixed(0)}</span>
                        </div>

                        <button
                            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full font-semibold shadow"
                            onClick={() => alert("Checkout coming soon!")}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
