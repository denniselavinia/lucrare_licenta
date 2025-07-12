import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Command from "../pages/footer/Command";
import Delivery from "../pages/footer/Delivery";
import Payment from "../pages/footer/Payment";
import Terms from "../pages/footer/Terms";
import AboutUs from "../pages/footer/AboutUs";
import CartPage from "../pages/puzzles/CartPage";
import Favorites from "../pages/puzzles/Favorites";
import Login from "../components/Login";
import Register from "../components/Register";
import Checkout from "../pages/puzzles/Checkout";
import SinglePuzzle from "../pages/puzzles/SinglePuzzle.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Orders from "../pages/puzzles/Orders.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ManagePuzzle from "../pages/dashboard/ManagePuzzle.jsx";
import EditPuzzle from "../pages/dashboard/EditPuzzle.jsx";
import AddPuzzle from "../pages/dashboard/addPuzzle/AddPuzzle.jsx";
import SellPuzzle from "../pages/puzzles/SellPuzzle.jsx";
import Sells from "../pages/puzzles/Sells.jsx";
import Profile from "../components/Profile.jsx";
import Sell from "../pages/footer/Sell.jsx";

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
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/cos",
				element: (
					<PrivateRoute>
						<CartPage />
					</PrivateRoute>
				),
			},
			{
				path: "/favorite",
				element: (
					<PrivateRoute>
						<Favorites />
					</PrivateRoute>
				),
			},
			{
				path: "/personal-details",
				element: (
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				),
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
				path: "/cum-vand",
				element: <Sell />,
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
				element: (
					<PrivateRoute>
						<Checkout />
					</PrivateRoute>
				),
			},
			{
				path: "/comenzi",
				element: (
					<PrivateRoute>
						<Orders />
					</PrivateRoute>
				),
			},
			{
				path: "/vinde-puzzle",
				element: (
					<PrivateRoute>
						<SellPuzzle />
					</PrivateRoute>
				),
			},
			{
				path: "/vanzari",
				element: (
					<PrivateRoute>
						<Sells />
					</PrivateRoute>
				),
			},
			{
				path: "/puzzles/:id",
				element: <SinglePuzzle />,
			},
		],
	},
	{
		path: "/admin",
		element: <AdminLogin />,
	},
	{
		path: "/dashboard",
		element: (
			<AdminRoute>
				<DashboardLayout />
			</AdminRoute>
		),
		children: [
			{
				path: "",
				element: (
					<AdminRoute>
						<Dashboard />
					</AdminRoute>
				),
			},
			{
				path: "add-new-puzzle",
				element: (
					<AdminRoute>
						<AddPuzzle />
					</AdminRoute>
				),
			},
			{
				path: "edit-puzzle/:id",
				element: (
					<AdminRoute>
						<EditPuzzle />
					</AdminRoute>
				),
			},
			{
				path: "manage-puzzles",
				element: (
					<AdminRoute>
						<ManagePuzzle />
					</AdminRoute>
				),
			},
		],
	},
]);

export default router;
