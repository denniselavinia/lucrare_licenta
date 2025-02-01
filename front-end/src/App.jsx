
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <main className='min-h-screen min-w-screen max-w-screen-2x1 mx-auto px-60 py-6 font-primary space-x-16 space-y-4'>
      <Outlet />
      </main>
      <Footer />
    </>
    )
}

export default App
