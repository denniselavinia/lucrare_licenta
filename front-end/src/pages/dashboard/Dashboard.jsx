import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import getBaseUrl from "../../utils/baseURL";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { MdIncompleteCircle } from "react-icons/md";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${getBaseUrl()}/api/admin/stats`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				});

				setData(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchData();
	}, []);
	if (loading) return <Loading />;
	return (
		<>
			<section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 block w-full overflow-x-auto overflow-y-auto">
				<div className="flex items-center p-8 bg-white shadow rounded-lg overflow-x-auto overflow-y-auto">
					<div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
						<svg
							aria-hidden="true"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
					</div>
					<div>
						<span className="block text-2xl font-bold">
							{data?.totalPuzzles}
						</span>
						<span className="block text-gray-500">Număr total puzzle-uri</span>
					</div>
				</div>
				<div className="flex items-center p-8 bg-white shadow rounded-lg">
					<div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
						<svg
							aria-hidden="true"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
							/>
						</svg>
					</div>
					<div>
						<span className="block text-2xl font-bold">
							{data?.totalSales} RON
						</span>
						<span className="block text-gray-500">Vânzări</span>
					</div>
				</div>

				<div className="flex items-center p-8 bg-white shadow rounded-lg">
					<div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
						<MdIncompleteCircle className="size-6" />
					</div>
					<div>
						<span className="block text-2xl font-bold">
							{data?.totalOrders}
						</span>
						<span className="block text-gray-500">Numărul de comenzi</span>
					</div>
				</div>
			</section>
		</>
	);
};

export default Dashboard;
