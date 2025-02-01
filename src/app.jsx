import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import myImage from '/Images/logo.png';
import { createBrowserRouter, Outlet, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About"
import Contact from "./components/Contact";
import Home from "./components/Home";
import Error from "./components/Error";
import { Link } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/shimmer";
import { Link } from "react-router-dom";
import UserOnlineStatus from "./components/UserOnlineStatus";
const Header = () => {
    const [btnNameReact, setbtnNameReact] = useState("Login");
    return (
        <div className="header">
            <div>
                <img className="logo" src={myImage} alt="logo" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="http://localhost:1234/  "> Home </Link>
                    </li>
                    <li>
                        <Link to="/About" > About Us </Link>
                    </li>
                    <li>
                        <Link to="/Contact" > Contact Us </Link>
                    </li>
                    <li>Cart</li>
                    <button
                        className="login"
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

        console.log(json);

        const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setListOfRestaurant(restaurants);
        setFilteredRestaurants(restaurants);


    };

    const onlineStatus = UserOnlineStatus();
    if (onlineStatus === false) 
        return 
            <h1>Looks like ur offline</h1>
    ;

    if (allRestaurants.length === 0) {
        return <h1><Shimmer /> </h1>
    }


    return (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            const filteredList = allRestaurants.filter(
                                (res) =>
                                    res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                    res.info.cuisines.join(", ").toLowerCase().includes(searchText.toLowerCase())
                            );
                            setFilteredRestaurants(filteredList);
                        }}
                    >
                        Search
                    </button>
                </div>
                <button
                    className="filter-btn"
                    onClick={() => {
                        const filteredList = allRestaurants.filter((res) => res.info.avgRating > 4.5);
                        setFilteredRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>

            <div className="res-container">
                {filteredRestaurants.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}> <div key={restaurant.info.id} className="res-card">

                        <img
                            className="restImg"
                            src={
                                restaurant.info.cloudinaryImageId
                                    ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.info.cloudinaryImageId}`
                                    : "https://via.placeholder.com/200" // Fallback for missing images
                            }
                            alt={restaurant.info.name}
                        />
                        <h3>{restaurant.info.name}</h3>
                        <h4>{restaurant.info.cuisines?.join(", ")}</h4>
                        <h4 className="avgRating">{restaurant.info.avgRating}</h4>
                        <h4>{restaurant.info.costForTwo}</h4>

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
