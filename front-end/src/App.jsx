
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider >
        <Navbar />
          <main className='flex-1 mx-auto px-2 py-6 font-primary'>
            <Outlet />
          </main>
        <Footer />
      </AuthProvider>
    </div>
    )
}

export default App
