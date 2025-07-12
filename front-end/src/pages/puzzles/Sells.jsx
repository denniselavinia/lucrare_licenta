import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useGetSellByEmailQuery } from "../../redux/features/sells/sellsAPI";

const Sells = () => {
	const { currentUser } = useAuth();
	const {
		data: sells = [],
		isLoading,
		isError,
	} = useGetSellByEmailQuery(currentUser.email);
	if (isLoading) return <div>Se prelucrează datele...</div>;
	if (isError) return <div>Eroare la obținerea datelor despre vânzări</div>;
	return (
		<div className="container mx-auto p-6">
			<h2 className="text-2xl font-semibold mb-4">Vânzarile tale</h2>
			{sells.length === 0 ? (
				<div>Nu a fost găsită nicio vânzare!</div>
			) : (
				<div>
					{sells.map((sell, index) => (
						<div key={sell._id || index} className="border-b mb-4 pb-4">
							<p className="p-1 bg-secondary text-white w-10 rounded mb-1">
								# {index + 1}
							</p>
							<h2 className="font-bold">Număr vânzare: {sell._id}</h2>
							<p className="text-gray-600">Nume: {sell.name}</p>
							<p className="text-gray-600">Email: {sell.email}</p>
							<p className="font-semibold">Titlu puzzle: {sell.title}</p>
							<p className="font-semibold">
								Descriere puzzle: {sell.description}
							</p>
							<p className="font-semibold">
								Număr de piese puzzle: {sell.noPieces}
							</p>
							<p className="font-semibold">
								Categorie puzzle: {sell.categoryImage}
							</p>
							<p className="font-semibold">
								Brand puzzle: {sell.categoryManufacturer}
							</p>
							<p className="font-semibold">Preț puzzle: {sell.price} RON</p>
							<p className="font-semibold">Imagine puzzle: {sell.image}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Sells;
