import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemList = ({ items }) => {
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        // Dispatch an action
        dispatch(addItem(item));

        // Show toast notification
        toast.success("✅ Item added to cart!", {
            position: "bottom-right",
            autoClose: 2000, // Hide after 2 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div>
            {items.map((item) => (
                <div className=" w-full justify-between overflow-hidden  text-left p-2 m-1 border-b-2 border-gray-400" key={item.card.info.id} >

                    <div className="flex justify-between">

                        <div className="">

                            <div className=" font-semibold ">
                                {item.card.info.name}
                            </div>

                            <div className="font-semibold mt-0.5">
                                ₹{item.card.info.price
                                    ? item.card.info.price / 100
                                    : item.card.info.defaultPrice / 100}
                            </div>

                            <div className=" w-100">
                                <p className="text-xs font-serif text-gray-600 mt-3">{item.card.info.description}</p>
                            </div>
                        </div>
                        <div className="w-3/12 ">
                            <div className="hover:bg-gray-200 w-20 text-center border-2 border-gray-200 absolute font-bold p-1  bg-white text-green-600 mx-13 rounded-lg">
                                <button 
                                    className=""
                                    onClick={() => handleAddItem(item)}>

                                    ADD

                                </button>
                            </div>
                            <img className="w-full rounded-2xl"
                                src={CDN_URL + item.card.info.imageId} alt="" />
                        </div>

                    </div>
                </div>
            ))}

            {/* Toast Container to display notifications */}
            <ToastContainer />
        </div>
    );
}

export default ItemList;
