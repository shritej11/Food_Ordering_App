import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import myImage from '/Images/logo.png';
import { createBrowserRouter, Outlet, RouterProvider, Link } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Body from "./components/Body";


const Header = () => {
    const [btnNameReact, setbtnNameReact] = useState("Login");

    return (
        <div className="flex justify-between items-center bg-red-500 p-4 shadow-md">
            <div>
                <img className="w-28" src={myImage} alt="logo" />
            </div>
            <div className="flex items-center">
                <ul className="flex space-x-8">
                    <li className="text-white text-lg font-semibold">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-white text-lg font-semibold">
                        <Link to="/About">About Us</Link>
                    </li>
                    <li className="text-white text-lg font-semibold">
                        <Link to="/Contact">Contact Us</Link>
                    </li>
                    <li className="text-white text-lg font-semibold">Cart</li>
                    <button
                        className="px-5 py-2 bg-[#FFCC00] text-white text-lg font-semibold rounded-md hover:bg-[#FF9800] transition"
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
