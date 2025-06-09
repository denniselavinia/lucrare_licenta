import { useParams } from 'react-router-dom';
import { useFetchPuzzleByIdQuery } from '../../redux/features/puzzles/puzzlesAPI';
import { getImgUrl } from '../../utils/getImgUrl';
import { LuShoppingCart } from 'react-icons/lu';
import { FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice';
import { addToFavorites } from '../../redux/features/favorites/favoriteSlice';

const SinglePuzzle = () => {
    const { id } = useParams();
    const { data: puzzle, isLoading, isError } = useFetchPuzzleByIdQuery(id);
    const [zoomed, setZoomed] = useState(false);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading puzzle</div>;

    const dispatch = useDispatch();
    const handleAddToCart = (puzzle) => {
        dispatch(addToCart(puzzle))
    };

    const handleAddToFavorites = (puzzle) => {
        dispatch(addToFavorites(puzzle))
    }

    return (
        <div className="w-full p-5 inline-flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-8">{puzzle.title}</h1>
            <div className="flex-shrink-0 flex justify-center items-start w-1/2 pr-8 mt-5">
                {!zoomed ? (
                    <img
                        src={getImgUrl(puzzle.coverImage)}
                        alt={puzzle.title}
                        className="max-w-lg rounded-lg shadow-lg transition-transform duration-300 cursor-zoom-in"
                        onClick={() => setZoomed(true)}
                        />   
                ) : (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                        onClick={() => setZoomed(false)}
                        style={{ cursor: 'zoom-out' }}
                    >
                        <img
                            src={getImgUrl(puzzle.coverImage)}
                            alt={puzzle.title}
                            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl transition-transform duration-300"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                )}
            </div>
            <div className="max-w-3xl shadow-md p-10 flex flex-col items-center mx-auto my-10 w-1/2">
                <div className="w-full flex flex-col items-center">
                    <div className="w-full mb-3">
                        <p className="text-gray-700"><strong>Număr de piese:</strong> {puzzle.noPieces}</p>
                        <p className="text-gray-700"><strong>Categorie:</strong> {puzzle.categoryImage}</p>
                        <p className="text-gray-700"><strong>Descriere:</strong> {puzzle.description}</p>
                        <p className="text-gray-700"><strong>Brand:</strong> {puzzle.categoryManufacturer}</p>
                        <p className="text-gray-700 mb-4">
                            <strong>Dată publicare:</strong> {new Date(puzzle?.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 font-bold items-center gap-2">
                        <strong>Preț:</strong> {puzzle?.price} RON</p>
                    </div>
                    <div className='card-info relative flex flex-row fustify-between items-center mb-2 gap-3 text-lg'>
                        <button onClick={() => handleAddToCart(puzzle)} className="flex items-center gap-2 bg-blue-700 text-white rounded-md p-2">
                            <LuShoppingCart className="" />
                        </button>
                        <button onClick={() => handleAddToFavorites(puzzle)} className="flex items-center gap-2 bg-red-700 text-white rounded-md p-2">
                            <FaRegHeart className="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )}

export default SinglePuzzle;