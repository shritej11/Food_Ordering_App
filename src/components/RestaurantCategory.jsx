const RestaurantCategory = ({data}) => {
    console.log(data);
    return (
        <div>
        {
            <div className=" flex justify-between text-center mx-auto my-4  w-6/12 bg-grey-50 shadow-lg p-4">
                <span className="font-bold text-lg">
                    {data.title } ({data.itemCards.length})
                </span>
                <span>▼</span>
            </div>
        }
    </div>
    )
    
}

export default RestaurantCategory;