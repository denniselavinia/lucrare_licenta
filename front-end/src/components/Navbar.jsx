import React from 'react'
import { Link } from 'react-router-dom'
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useState } from "react";

import avatarIcon from "../assets/avatarIcon.png";

const navigation = [
    {name: "Personal details", href:"/personal-details"},
    // {name: "Orders", href:"/orders"},
    // {name: "Cart Page", href:"/cart"},
    // {name: "Check Out", href:"/checkout"},
]

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const currentUser = true;

    const handleLogOut = () => {
        logout()
    }
    return (
        <header className='min-w-screen max-w-screen-2x1 mx-auto px-60 py-6 space-x-16 space-y-4' style={{ backgroundColor: "#FFFDD0" }}>
            <nav className='flex justify-between items-center'>
                {/* left side */}
                <div className='flex items-center md:gap-2 gap-4'>
                    <Link to="/"><IoExtensionPuzzleSharp className='size-8' style={{ color: "#3B5998" }} />
                    </Link>
                
                    {/* search input */}
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        <IoSearch className='absolute inline-block left-3 inset-y-2' style={{ color: "grey" }} />
                        <input type='text' placeholder='Caută un puzzle'
                            className='bg-[#FFFFFF] w-full py-1 md:px-6 px-6 rounded-md border border-gray-300' />
                    </div>
                    </div>

                    {/* right side */}
                <div className=' relative flex items-center md:space-x-2 space-x-2'>
                    <div>
                        {
                            currentUser ? <>
                                <button onClick={()=> setIsDropdownOpen(!isDropdownOpen)}>
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
                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                    )
                                }
                               </>
                                 : <Link to='/login'>
                                <LuUserRound className='size-8' style={{ color: "#666362" }} /></Link>
                        }
                    </div>

                     <Link to='/favorite' className='relative'>
                        <FaRegHeart className='size-8' style={{ color: "#666362" }} />
                        <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>0</span>
                    </Link>
                    <Link to='/cos' className='relative'>
                        <LuShoppingCart className='size-8' style={{ color: "#666362" }} />
                        <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>0</span>
                    </Link>
                 </div>
            </nav>

        </header>    
    )
}
export default Navbar