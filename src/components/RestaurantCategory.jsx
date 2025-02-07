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
            <div className="w-6/12 mx-auto my-4  bg-grey-50 shadow-lg p-4">
                
                <div 
                className=" cursor-pointer P-4 flex justify-between text-center"
                onClick =  {handleClick}
                >
                
                <span className="font-bold text-lg">
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
