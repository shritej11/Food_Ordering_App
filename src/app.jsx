import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import myImage from '/Images/logo.png';
import { createBrowserRouter, Outlet, RouterProvider, Link } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/shimmer";
import UserOnlineStatus from "./components/UserOnlineStatus";

const Header = () => {
    const [btnNameReact, setbtnNameReact] = useState("Login");

    return (
        <div className="flex justify-between items-center bg-red-500 p-4 shadow-md">
            <div>
                <img className="w-28" src={myImage} alt="logo" />
            </div>
            <div className="flex items-center">
                <ul className="flex space-x-8">
                    <li className="text-white text-lg font-semibold">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-white text-lg font-semibold">
                        <Link to="/About">About Us</Link>
                    </li>
                    <li className="text-white text-lg font-semibold">
                        <Link to="/Contact">Contact Us</Link>
                    </li>
                    <li className="text-white text-lg font-semibold">Cart</li>
                    <button
                        className="px-5 py-2 bg-[#FFCC00] text-white text-lg font-semibold rounded-md hover:bg-[#FF9800] transition"
                        onClick={() => {
                            setbtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
                        }}
                    >
                        {btnNameReact}
                    </button>
                </ul>
            </div>
        </div>
    );
};

const Body = () => {
    const [allRestaurants, setListOfRestaurant] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5060533&lng=73.931139&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();

        const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setListOfRestaurant(restaurants);
        setFilteredRestaurants(restaurants);
    };

    const onlineStatus = UserOnlineStatus();

    if (onlineStatus === false) return <h1>Looks like you're offline</h1>;

    if (allRestaurants.length === 0) {
        return <Shimmer />;
    }

    return (
        <div className="bg-gray-100 p-4">
            <div className="bg-red-500 p-3 rounded-lg mb-4">
                <div className="flex justify-center items-center space-x-4">
                    <input 
                        type="text"
                        placeholder="Search for Restaurants or Cuisines"
                        className=" w-1/2 p-2 rounded-full border border-white focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className="bg-[#FF6F00] text-white p-2 rounded-full hover:bg-[#FF9800] transition"
                        onClick={() => {
                            const filteredList = allRestaurants.filter(
                                (res) =>
                                    res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                    res.info.cuisines.join(", ").toLowerCase().includes(searchText.toLowerCase())
                            );
                            setFilteredRestaurants(filteredList);
                        }}
                    >
                        <img
                            className="w-6 h-6"
                            src="https://cdn.pixabay.com/photo/2021/07/02/04/48/search-6380865_1280.png"
                            alt="search"
                        />
                    </button>
                </div>
                <button
                    className="mt-4 bg-[#FF9800] text-white px-5 py-2 rounded-md hover:bg-[#FF6F00] transition"
                    onClick={() => {
                        const filteredList = allRestaurants.filter((res) => res.info.avgRating > 4.5);
                        setFilteredRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurants.map((restaurant) => (
                    <Link
                        key={restaurant.info.id}
                        to={"/restaurants/" + restaurant.info.id}
                    >
                        <div className="bg-white rounded-lg shadow-lg p-4 text-center">
                            <img
                                className="w-full h-40 object-cover rounded-lg"
                                src={
                                    restaurant.info.cloudinaryImageId
                                        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.info.cloudinaryImageId}`
                                        : "https://via.placeholder.com/200"
                                }
                                alt={restaurant.info.name}
                            />
                            <h3 className="mt-2 font-semibold text-xl">{restaurant.info.name}</h3>
                            <h4 className="text-gray-500">{restaurant.info.cuisines?.join(", ")}</h4>
                            <h4 className="mt-1 text-yellow-500 font-semibold">{restaurant.info.avgRating}</h4>
                            <h4 className="mt-1 text-gray-700">{restaurant.info.costForTwo}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const Applayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/Home",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/Contact",
                element: <Contact />
            },
            {
                path: "/restaurants/:id",
                element: <RestaurantMenu />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
