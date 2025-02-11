import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({data, showItems, setShowIndex}) => {
    
    // const[showItems, setShowItems] = useState(false)

    const handleClick = () =>{
       setShowIndex();
    }

    console.log(data);
    return (
        <div className="">
        {
            <div className="w-6/12 mx-auto my-3  border-b-5 border-gray-200  p-3">
                
                <div 
                className=" cursor-pointer P-3 flex justify-between text-center"
                onClick =  {handleClick}
                >
                
                <span className="font-bold text-md">
                    {data.title } ({data.itemCards.length})
                </span>
               
                <span>
                    ▼
                </span>
                </div>

                {showItems && <ItemList items={data.itemCards} />}
            </div>
        }
    </div>
    )
    
}

export default RestaurantCategory;
