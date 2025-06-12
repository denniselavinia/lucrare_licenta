import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IoExtensionPuzzleSharp } from "react-icons/io5"
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';
import Swal from 'sweetalert2';

const AdminLogin = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
            try {
                const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const auth = response.data;
                if (auth.token) {
                    localStorage.setItem('token', auth.token);
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        Swal.fire({
                            title: "Token expirat!",
                            text: "Token-ul a expirat. Conectează-te din nou!",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        navigate('/');
                    }, 3600*1000); // 1 oră 
                    Swal.fire({
                        title: "Logare admin cu succes!",
                        text: "Te-ai conectat cu succes la contul de admin!",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error("Eroare la autentificarea adminului!", error);

                if (error.response && error.response.data && error.response.data.message) {
                    setMessage(error.response.data.message);
                }
                else if (error.message === "Network Error") {
                    setMessage("Eroare de rețea. Verifică conexiunea la internet!");
                }
                else if (error.response && error.response.status === 401) {
                    setMessage("Date de autentificare incorecte!");
                }
                else if (error.response && error.response.status === 403) {
                    setMessage("Nu ai permisiunea de a accesa această pagină!");
                }
                else {
                    setMessage("Eroare necunoscută la autentificare!");
                }
            }
        }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-full max-w-sm mx-auto bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                <Link to="/" className='relative flex justify-center items-center mb-4'>
                    <IoExtensionPuzzleSharp className='size-9' style={{ color: "#FF4500", transform: "rotate(30deg)" }} />
                    <span className="text-md font-bold text-blue-800 leading-tight ml-1" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                        The <span className="text-pink-500">New</span><br /><span className="text-purple-500">Life</span> of <span className="text-green-500">Puzzles</span>
                    </span>
                </Link>
                <p className='flex justify-center items-center align-baseline font-medium mt-2'>
                    <span className='text-gray-700 font-bold mb-2'>Admin Dashboard Login</span>
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='email'>Username</label>
                        <input
                            {...register("username", { required: true })}
                            type="text" name="username" id="username" placeholder='Username'
                            className='shadow appearence-none border rounded w-full py-2 px-3 
                            leading-tight focus:outline-none focus:shadow'
                            onFocus={() => setMessage('')}/>
                    </div>

                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='password'>Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password" name="password" id="password" placeholder='Password'
                            className='shadow appearence-none border rounded w-full py-2 px-3 
                            leading-tight focus:outline-none focus:shadow'
                            onFocus={() => setMessage('')}/>
                    </div>
                    {
                        message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                    }
                    <div className='flex justify-center items-center'>
                        <button className=' bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin