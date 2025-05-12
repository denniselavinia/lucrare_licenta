import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice';
import { addToFavorites } from '../../redux/features/favorites/favoriteSlice';


const PuzzleCard = ({ puzzle }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (puzzle) => {
        dispatch(addToCart(puzzle))
    };

    const handleAddToFavorites = (puzzle) => {
        dispatch(addToFavorites(puzzle))
    }

    return (
        <div className="card">
            <Link to={`/puzzles/${puzzle?._id}`}>
                <img
                    src={`${getImgUrl(puzzle?.coverImage)}`}
                    alt=""
                    className="card-image cursor-pointer hover:scale-105 transition-all duration-200"
                />
            </Link>
            <Link to={`/puzzles/${puzzle?._id}`}>
                <h2 className="card-title text-sm font-semibold hover:text-blue-600 mb-3">
                    {puzzle?.title}
                </h2>
            </Link>
            <div className="flex flex-row sm:flex-col sm:items-center sm:h-70 sm:justify-center gap-1">
                <p className="font-semibold mb-2 items-left">
                    {puzzle?.noPieces}  piese
                </p>
                <div className='card-info relative flex flex-row fustify-between items-center mb-2 gap-3 text-lg'>
                    <p className="text-gray-600 font-bold items-center gap-2">
                        {puzzle?.price} RON
                    </p>
                    <button onClick={() => handleAddToCart(puzzle)} className="flex items-center gap-2 bg-blue-700 text-white rounded-md p-2">
                        <LuShoppingCart className="" />
                    </button>
                    <button onClick={() => handleAddToFavorites(puzzle)} className="flex items-center gap-2 bg-red-700 text-white rounded-md p-2">
                        <FaRegHeart className="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PuzzleCard