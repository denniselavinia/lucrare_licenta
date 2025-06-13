import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch()

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price , 0).toFixed(2);
  
   const handleRemoveFromCart = (puzzle) => {
    dispatch(removeFromCart(puzzle))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <>
      <div className="container mx-auto p-6  overflow-hidden bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900">Coș de cumpărături</div>
            {
              cartItems.length > 0 &&
              <div className="ml-3 flex h-7 items-center ">
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
                >
                  <span className="">Golește coș</span>
                </button>
              </div>}
          </div>

          <div className="mt-8">
            <div className="flow-root">

              {
                cartItems.length > 0 ? (
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {
                      cartItems.map((puzzle) => (
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
                                  onClick={() => handleRemoveFromCart(puzzle)}
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
                ) : (<p>Coșul de cumpărături este gol! <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                  >
                    Adaugă produse din oferta noastră.
                    <span aria-hidden="true"></span>
                  </button>
                </Link>
                </p>
                )
              }
            </div>
          </div>
        </div>

        {cartItems.length > 0 &&
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{totalPrice ? totalPrice : 0} RON
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Taxa de livrare se va calcula la următorul pas.</p>
            <div className="mt-6">
              <Link
                to="/finalizare-comanda"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Finalizează comanda
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <Link to="/">
                sau
                <button
                  type="button"

                  className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                >
                  Continuă cumpărăturile
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </div>
          </div>}
      </div>
    </>
  )
}

export default CartPage