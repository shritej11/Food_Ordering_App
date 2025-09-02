import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import UserContext from "../utils/Context";
import myImage from '../../Images/logo.png';
import { Link } from "react-router-dom";
import shopping_cart from '../../Images/cart.png';


const Header = () => {
    // const [btnNameReact, setbtnNameReact] = useState("Login");

    const data = useContext(UserContext);

    //Subscribing to the store using a Selector
    const cartItems = useSelector((store) => store.cart.items);


    return (
        <div className="flex justify-between items-center bg-red-500 p-1 shadow-md">
            <div >
            <Link to="/"> 
                 <img className="ml-20 w-40" src={myImage} alt="logo" /> 
            </Link>
                
            </div>
            <div className="flex items-center">
                <ul className="flex space-x-8 px-8">
                    <li className="relative text-white text-lg font-semibold transition duration-300 hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="relative text-white text-lg font-semibold transition duration-300 hover:text-white  after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">
                        <Link to="/About">About Us</Link>
                    </li>
                    <li className="relative text-white text-lg font-semibold transition duration-300 hover:text-white  after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">
                        <Link to="/Contact">Contact Us</Link>
                    </li>

                    <li className="relative flex text-white text-lg font-semibold transition duration-300 hover:text-white  after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">
                        <img className="h-6.8 w-7 "
                            src={shopping_cart}
                            alt=""
                        />
                        <Link to="/cart"> Cart({cartItems.length})</Link>
                    </li>

                    {/* <button
                        className="px-4 py-1 bg-[#FFCC00] text-white text-lg font-semibold rounded-md hover:bg-[#FF9800] transition"
                        onClick={() => {
                            setbtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
                        }}
                    >
                        {btnNameReact}
                    </button> */}
                </ul>
            </div>
        </div>
    );
};

export default Header;