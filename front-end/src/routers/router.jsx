import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Command from "../pages/footer/Command";
import Delivery from "../pages/footer/Delivery";
import ReturnPolicy from "../pages/footer/ReturnPolicy";
import Payment from "../pages/footer/Payment";
import Terms from "../pages/footer/Terms";
import AboutUs from "../pages/footer/AboutUs";
import CartPage from "../pages/puzzles/CartPage";
import Favorites from "../pages/puzzles/Favorites";
import Login from "../components/Login";
import Register from "../components/Register";

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
                path: "/login",
                element: <Login/>,  
            },
            {
                path: "/register",
                element: <Register/>,  
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