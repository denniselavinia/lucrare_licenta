import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PuzzleCard from '../puzzles/PuzzleCard';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const Models = () => {
    const [puzzles, setPuzzles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const puzzlesPerPage = 9;

    useEffect(() => {
        fetch("puzzles.json")
            .then(res => res.json())
            .then(data => setPuzzles(data));
    }, []);

    const indexOfLastPuzzle = currentPage * puzzlesPerPage;
    const indexOfFirstPuzzle = indexOfLastPuzzle - puzzlesPerPage;
    const currentPuzzles = puzzles.slice(indexOfFirstPuzzle, indexOfLastPuzzle);
    const totalPages = Math.ceil(puzzles.length / puzzlesPerPage);

    const nextPage = () => {
        if (indexOfLastPuzzle < puzzles.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (indexOfFirstPuzzle > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

   const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (
        <>
            <div className='relative flex flex-wrap items-center justify-center gap-2'>
                {currentPuzzles.length > 0 && currentPuzzles.map((puzzle, index) => (
                    <div key={index} className='w-1/4'>
                        <PuzzleCard puzzle={puzzle} />
                    </div>
                ))}
            </div>
            {/* <div className='flex justify-center mt-4'>
                <button onClick={prevPage} disabled={currentPage === 1} className='mr-2 relatives flex flex-row items-center bg-gray-200 rounded-md p-1'>
                    <GrPrevious /> Înapoi
                </button>
                <button onClick={nextPage} disabled={indexOfLastPuzzle >= puzzles.length} className='mr-2 relatives flex flex-row items-center bg-gray-200 rounded-md p-1'>
                    Înainte <GrNext />
                </button>
            </div> */}
            <div className='flex justify-center mt-4'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(index + 1)}
                        className={`mx-1 ${currentPage === index + 1 ? 'font-bold' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Models