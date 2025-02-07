import { CDN_URL } from "../constants/constants";

const ItemList = ({ items }) => {
    console.log(items);
    return (
        <div>
            {items.map((item) => (
                <div className="w-full justify-between overflow-hidden  text-left p-4 m-2 border-gray-500  shadow-sm border-b-2" key={item.card.info.id} >

                    <div className="flex justify-between  ">

                        <div className="">

                            <div className=" font-semibold ">
                                {item.card.info.name}
                            </div>

                            <div className="font-semibold mt-0.5">
                                ₹{item.card.info.price
                                    ? item.card.info.price / 100
                                    : item.card.info.defaultPrice / 100}
                            </div>

                            <div className=" w-150">
                                <p className="text-sm font-serif text-gray-600 mt-3">{item.card.info.description}</p>
                            </div>
                        </div>
                        <div className="w-3/12 p-4">
                            <div className="absolute font-bold p-1.5  bg-white text-green-600 mx-12 rounded-lg">
                            <button className="P-2 bg-white shadow-lg ">ADD+</button>
                            </div>
                            <img className="w-full rounded-2xl"
                                src={CDN_URL + item.card.info.imageId} alt="" />
                        </div>

                    </div>





                </div>

            ))}

        </div>
    )
}
export default ItemList;