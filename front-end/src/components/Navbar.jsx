import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useState, useMemo } from "react";
import AISearch from '../AI/searchWithAI';

import avatarIcon from "../assets/avatarIcon.png";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const navigation = [
    // { name: "Dashboard", href: "/dashboard" },
    { name: "Detalii personale", href: "/personal-details" },
    { name: "Comenzile mele", href: "/comenzi" },
    { name: "Vânzările mele", href:"/vanzari" },
]

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems || []);
    const cartQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    const favoriteItems = useSelector((state) => state.favorites.favoriteItems || []);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        Swal.fire({
            title: "Te-ai delogat cu succes!",
            icon: "info",
            showConfirmButton: false,
            timer: 2000,
        });
        navigate('/');
    }

    useEffect(() => {
        setIsDropdownOpen(false);
    }, [currentUser]);

    return (
        <header className="w-full py-6 px-16" style={{ backgroundColor: "#FFFDD0" }}>
            <nav className="w-full flex justify-between items-center px-4"> 
                {/* left side */}
                <div className="relative flex items-center md:gap-1 gap-1">
                    <Link to="/" className="flex items-center" title="Acasă">
                        <IoExtensionPuzzleSharp className="size-9" style={{ color: "#FF4500", transform: "rotate(30deg)" }} />
                        <span className="text-md font-bold text-blue-800 leading-tight ml-1" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                            The <span className="text-pink-500">New</span><br /><span className="text-purple-500">Life</span> of <span className="text-green-500">Puzzles</span>
                        </span>
                    </Link>
                </div>

                {/* right side */}
                <div className="relative flex items-center md:space-x-4 space-x-3">
                    <div>
                        {
                            currentUser ? (
                                <>
                                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} title="Profilul meu">
                                        <img src={avatarIcon} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                    </button>
                                    {/* show dropdowns */}
                                    {
                                        isDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                                <ul className="py-2">
                                                    {
                                                        navigation.map((item) => (
                                                            <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                                <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                    <li>
                                                        <button
                                                            onClick={handleLogOut}
                                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Log out</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </>
                            ) : (
                                <Link to='/login' title="Autentificare">
                                    <LuUserRound className='size-8' style={{ color: "#666362" }} />
                                </Link>
                            )
                        }
                    </div>
                    <Link to='/vinde-puzzle' className='relative' title="Vinde un puzzle">
                        <IoExtensionPuzzleSharp className='size-8' style={{ color: "purple", transform: "rotate(250deg)" }} />
                    </Link>
                    <Link to='/favorite' className='relative ' title="Favorite">
                        <FaRegHeart className='size-8' style={{ color: "#666362" }} />
                        {
                            favoriteItems.length > 0 ? (
                                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>{favoriteItems.length}</span>)
                                : <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>0</span>
                        }
                    </Link>
                    <Link to='/cos' className='relative' title="Coșul meu">
                        <LuShoppingCart className='size-8' style={{ color: "#666362" }} />
                        {
                            cartItems.length > 0 ? (
                                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>{cartQuantity}</span>
                            ) : <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>0</span>
                        }
                    </Link>
                    
                </div>
            </nav>
        </header>
    )
}
export default Navbar