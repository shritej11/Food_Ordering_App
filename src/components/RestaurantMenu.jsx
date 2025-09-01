import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";


const RestaurantMenu = () => {

    const { id } = useParams();

    const resInfo = useRestaurantMenu(id);

    const [showIndex, setShowIndex] = useState(0);

    if (resInfo === null) return <Shimmer />

    const { name, cuisines, costForTwo } =
        resInfo?.cards[2]?.card?.card?.info;

    const { itemCards } =
        resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    // console.log(itemCards);

    const categories
        = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(

            (c) => c.card?.card?.["@type"] ==
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );


    return (
        <div className="text-center ">

            <h1 className="font-bold my-6 text-2xl">
                {name}
            </h1>

            <h3 className="font-bold my-6 text-lg">
                {cuisines.join(" ")} - ₹{costForTwo / 100} For Two
            </h3>

            {categories.map((category, index) => (
                <RestaurantCategory
                    key={category?.card?.card.title}
                    data={category?.card?.card}
                    showItems={index == showIndex}
                    setShowIndex={() =>
                         setShowIndex((prevIndex) => (prevIndex === index ? null : index))
                        }
                />
            ))}


        </div>
    );
};


export default RestaurantMenu;