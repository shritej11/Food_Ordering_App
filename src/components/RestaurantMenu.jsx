import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../constants/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {

    const { id } = useParams();

    const resInfo = useRestaurantMenu(id);

    if (resInfo === null) return <Shimmer />
    const { name, cuisines, costForTwo } =
        resInfo?.cards[2]?.card?.card?.info;
    const { itemCards } =
        resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    console.log(itemCards);
    return (
        <div className="menu">
            <h1> {name} </h1>
            <h3>{cuisines.join(" ")} - {costForTwo / 100}</h3>
            <h2>Menu</h2>
            <ul>
                {itemCards.map((item) => (
                    <li key={item.card.info.id}>{item.card.info.name} - {item.card.info.price / 100}</li>
                ))}
            </ul>
        </div>
    )
}

export default RestaurantMenu;