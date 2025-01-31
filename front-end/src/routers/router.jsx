import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Command from "../pages/home/Command";
import Delivery from "../pages/home/Delivery";
import ReturnPolicy from "../pages/home/ReturnPolicy";
import Payment from "../pages/home/Payment";
import Terms from "../pages/home/Terms";
import AboutUs from "../pages/home/AboutUs";
import CartPage from "../pages/puzzles/CartPage";
import Favorites from "../pages/puzzles/Favorites";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,  
            },
            {
                path: "/cos",
                element: <CartPage/>,
            },
            {
                path: "/favorite",
                element: <Favorites/>,
            },
            {
                path: "/cum-comand",
                element: <Command/>,  
            },
            {
                path: "/livrarea-produselor",
                element: <Delivery/>,
            },
            {
                path: "/politica-de-retur",
                element: <ReturnPolicy/>,
            },
            {
                path: "/plata",
                element: <Payment/>,  
            },
            {
                path: "/termeni",
                element: <Terms/>,
            },
            {
                path: "/despre-noi",
                element: <AboutUs/>,
            }
        ]
    },
]);

export default router;