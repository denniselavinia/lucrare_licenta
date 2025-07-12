import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PuzzleCard from "../puzzles/PuzzleCard";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useFetchPuzzlesQuery } from "../../redux/features/puzzles/puzzlesAPI";

const Models = () => {
	// const [puzzles, setPuzzles] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const puzzlesPerPage = 12;

	const { data: puzzles = [] } = useFetchPuzzlesQuery();
	console.log(puzzles);

	const indexOfLastPuzzle = currentPage * puzzlesPerPage;
	const indexOfFirstPuzzle = indexOfLastPuzzle - puzzlesPerPage;
	const currentPuzzles = puzzles.slice(indexOfFirstPuzzle, indexOfLastPuzzle);
	const totalPages = Math.ceil(puzzles.length / puzzlesPerPage);

	const nextPage = () => {
		if (indexOfLastPuzzle < puzzles.length) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const prevPage = () => {
		if (indexOfFirstPuzzle > 0) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo(0, 0);
	};

	return (
		<>
			<div className="relative flex flex-wrap justify-center gap-2 w-full max-w-full">
				{currentPuzzles.length > 0 &&
					currentPuzzles.map((puzzle, index) => (
						<div
							key={index}
							className="p-2 flex-grow min-w-[200px] max-w-[250px] flex justify-center"
						>
							<PuzzleCard puzzle={puzzle} />
						</div>
					))}
			</div>
			<div className="flex justify-center mt-20 ">
				<button
					onClick={prevPage}
					disabled={currentPage === 1}
					className="mr-2 ml-2 relatives flex flex-row items-center bg-gray-100 rounded-md p-1"
				>
					<GrPrevious /> Înapoi
				</button>

				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index}
						onClick={() => handlePageClick(index + 1)}
						className={`mx-1 ${
							currentPage === index + 1
								? "font-bold text-lg items-center"
								: "text-sm"
						}`}
					>
						{index + 1}
					</button>
				))}
				<button
					onClick={nextPage}
					disabled={indexOfLastPuzzle >= puzzles.length}
					className="mr-2 ml-2 relatives flex flex-row items-center bg-gray-100 rounded-md p-1"
				>
					Înainte <GrNext />
				</button>
			</div>
		</>
	);
};

export default Models;
