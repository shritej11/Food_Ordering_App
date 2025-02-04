import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserOnlineStatus from "./UserOnlineStatus";
import Shimmer from "./shimmer";
import RestaurantMenu from "./RestaurantMenu";


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
                        className="  bg-white w-1/2 p-2 rounded-full border border-white focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className="bg-white text-white p-2 rounded-full hover:bg-[#e3e2df] transition"
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
                            className=" bg-white w-6 h-6"
                            src="https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png"
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

            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurants.map((restaurant) => (
                    <Link
                        key={restaurant.info.id}
                        to={"/restaurants/" + restaurant.info.id}
                    >
                        <div className="bg-white rounded-lg hover:scale-110 transition-transform duration-300 shadow-lg p-4 text-center">
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

export default Body;