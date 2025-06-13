import { createBrowserRouter } from "react-router-dom";
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
import Checkout from "../pages/puzzles/Checkout";
import SinglePuzzle from "../pages/puzzles/SinglePuzzle.jsx";
import PrivateRoute from "./privateRoute.jsx";
import Orders from "../pages/puzzles/Orders.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Filter from "../pages/puzzles/Filter.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/",
                element: <Filter/>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/cos",
                element: <PrivateRoute><CartPage /></PrivateRoute>,
            },
            {
                path: "/favorite",
                element: <PrivateRoute><Favorites /></PrivateRoute>,
            },
            {
                path: "/cum-comand",
                element: <Command />,
            },
            {
                path: "/livrarea-produselor",
                element: <Delivery />,
            },
            {
                path: "/politica-de-retur",
                element: <ReturnPolicy />,
            },
            {
                path: "/plata",
                element: <Payment />,
            },
            {
                path: "/termeni",
                element: <Terms />,
            },
            {
                path: "/despre-noi",
                element: <AboutUs />,
            },
            {
                path: "/finalizare-comanda",
                element: <PrivateRoute><Checkout /></PrivateRoute>,
            }
            ,
            {
                path: "/comenzi",
                element: <PrivateRoute><Orders /></PrivateRoute>,
            },
            {
                path: "/puzzles/:id",
                element: <SinglePuzzle />,
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLogin />, 
    },
    {
        path: "/dashboard",
        element: <AdminRoute><DashboardLayout/></AdminRoute>, 
        children: [
            {
                path: "",
                element: <AdminRoute><div>Dashboard Home</div></AdminRoute>
            },
            {
                path: "add-new-puzzle",
                element: <AdminRoute><div>Add New Puzzle</div></AdminRoute> 
            },
            {
                path: "edit-puzzle/:id",
                element: <AdminRoute><div>Edit Puzzle</div></AdminRoute> 
            },
            {
                path: "manage-puzzles",
                element: <AdminRoute><div>Manage Puzzles</div></AdminRoute> 
            }

        ]
    }
]);

export default router;