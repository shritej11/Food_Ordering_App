import { useEffect, useState } from "react";
import { MENU_API } from "../constants/constants";


const useRestaurantMenu = (id) => {
    const [resInfo, setResInfo] = useState(null);
    
    useEffect (()=> {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch( MENU_API + id );
        const json = await data.json();
        console.log(json);
        setResInfo(json?.data);
    };

    return resInfo;
    
}

export default useRestaurantMenu;