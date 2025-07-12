import React from "react";
import Models from "./Models";
import { useFetchPuzzlesQuery } from "../../redux/features/puzzles/puzzlesAPI";

const Home = () => {
	const { data: puzzles = [], isLoading, isError } = useFetchPuzzlesQuery();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Eroare la încărcarea puzzle-urilor!</div>;

	return (
		<div className="relative flex  min-h-[70vh] w-full max-w-8xl mx-auto px-64">
			<div className="w-[220px]"></div>
			<div className="flex-1 flex flex-col justify-center items-center">
				<Models puzzles={puzzles} />
			</div>
			<div className="w-[220px]"></div>
		</div>
	);
};

export default Home;
