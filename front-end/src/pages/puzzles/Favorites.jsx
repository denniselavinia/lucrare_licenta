import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { clearFavorites, removeFromFavorites } from '../../redux/features/favorites/favoriteSlice';

const Favorites = () => {
  const favoriteItems = useSelector(state => state.favorites.favoriteItems);
  const dispatch = useDispatch()
  const totalPrice = favoriteItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  
  const handleRemoveFromFavorites = (puzzle) => {
    dispatch(removeFromFavorites(puzzle))
  }

  const handleClearFavorites = () => {
    dispatch(clearFavorites())
  }
  return (
    <>
      <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900">Favorite</div>
            {
              favoriteItems.length > 0 &&
              <div className="ml-3 flex h-7 items-center ">
                <button
                  type="button"
                  onClick={handleClearFavorites}
                  className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
                >
                  <span className="">Golește lista de favorite</span>
                </button>
              </div>}
          </div>

          <div className="mt-8">
            <div className="flow-root">

              {
                favoriteItems.length > 0 ? (
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {
                      favoriteItems.map((puzzle) => (
                        <li key={puzzle?._id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Link to={`/puzzles/${puzzle?._id}`}>
                              <img
                                alt=""
                                src={`${getImgUrl(puzzle?.coverImage)}`}
                                className="h-full w-full object-cover object-center"
                                />
                            </Link>
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link to={`/puzzles/${puzzle?._id}`}>{puzzle?.title}</Link>
                                </h3>
                                <p className="sm:ml-4">{puzzle?.price} RON</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Număr piese: </strong>{puzzle?.noPieces}</p>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleRemoveFromFavorites(puzzle)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Șterge
                                </button>
                              </div>
                            </div>

                          </div>
                        </li>
                      ))
                    }
                  </ul>
                ) : (<p>Lista de favorite este goala! <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                  >
                    Adaugă produse din oferta noastră.
                    <span aria-hidden="true"></span>
                  </button>
                </Link></p>)
              }
            </div>
          </div>
        </div>

        {
          favoriteItems.length > 0 &&
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>{totalPrice ? totalPrice : 0} RON
              </p>
            </div>
          </div>}
      </div>
    </>
  )
}

export default Favorites