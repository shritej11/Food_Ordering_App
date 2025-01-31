import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../constants/constants";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

 const {id} = useParams();
 

    useEffect(() => {
        fetchMenu();
    }, [])

    const fetchMenu = async () => {
        const data = await fetch(
            MENU_API + id
        );
        
        const json = await data.json();
        console.log(json);
        setResInfo(json?.data);
        
    };
    if (resInfo === null) return <Shimmer/>
    const {name, cuisines, costForTwo} = resInfo?.cards[2]?.card?.card?.info;
    const {itemCards} =  resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    console.log(itemCards);  
    return (
        <div className="menu">
            <h1> {name} </h1>
            <h3>{cuisines}</h3>
            <h3> Cost For Two = {costForTwo / 100}</h3>
            
            <h2>Menu</h2>
            <ul>
                {itemCards.map((item) => (
                  <li key={item.card.info.id}>{item.card.info.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default RestaurantMenu;