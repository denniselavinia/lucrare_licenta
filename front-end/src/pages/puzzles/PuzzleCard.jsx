import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

const PuzzleCard = ({ puzzle }) => {
    return (
        <div className="border flex flex-row sm:flex-col sm:items-center sm:h-70 sm:justify-center gap-1">
            <div className="sm:flex-shrink-0 border rounded-md">
                <Link to={`/puzzles/${puzzle?._id}`}>
                    <img
                        src={`${getImgUrl(puzzle?.coverImage)}`}
                        alt=""
                        className="w-50 bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                    />
                </Link>
                
            </div>
            <div className="flex flex-row sm:flex-col sm:items-center sm:h-70 sm:justify-center gap-1">
                <Link to={`/puzzles/${puzzle?._id}`}>
                    <h2 className="text-sm font-semibold hover:text-blue-600 mb-3">
                        {puzzle?.title}
                    </h2>
                </Link>
                <p className="font-semibold mb-2 items-left">
                    {puzzle?.noPieces}  piese
                </p>
                
                <div className='relative flex flex-row fustify-between items-center mb-2 gap-3 text-lg'>
                    <p className="text-gray-600 font-bold items-center gap-2">
                        {puzzle?.price} RON
                    </p>
                    <button className="flex items-center gap-2 bg-blue-700 text-white rounded-md p-2">
                        <LuShoppingCart className="" />
                    </button>
                    <button className="flex items-center gap-2 bg-red-700 text-white rounded-md p-2">
                        <FaRegHeart className="" />
                    </button>
                </div>
            </div>
        </div> 
    )
}

export default PuzzleCard