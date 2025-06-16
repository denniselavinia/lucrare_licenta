
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import AISearch from './AI/searchWithAI'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {

  const cartItems = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const favoriteItems = useSelector(state => state.favorites.favoriteItems);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteItems));
  }, [favoriteItems]);


  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider >
        <Navbar />
        {/* <main className='flex-1 mx-auto px-2 py-6 font-primary'> */}
          <main className='flex-1 px-2 py-6 font-primary'>
            <Outlet />
        </main>
        <Footer />
        <AISearch />
      </AuthProvider>
    </div>
    )
}

export default App
