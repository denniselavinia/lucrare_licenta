import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [message, setMessage] = useState('');
    const { loginUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
            try {
                await loginUser(data.email, data.password);
                navigate('/');
            } catch (error) {
                console.error("Eroare la înregistrare!", error);
                if (error.code === 'auth/invalid-credential') {
                    setMessage('Email și/sau parolă invalidă!');
                } else if (error.code === 'auth/user-not-found') {
                    setMessage('Nu există un cont cu acest email!');
                } else if (error.code === 'auth/too-many-requests') {
                    setMessage('Prea multe încercări. Încearcă din nou mai târziu!');
                } else if (error.code === 'auth/user-disabled') {
                    setMessage('Acest cont a fost dezactivat!');
                } else {
                    setMessage('Eroare necunoscută la autentificare!');
                }
            }
        }

    const handleGoogleSignIn = async () => {
        try { 
            await signInWithGoogle();
            navigate('/');
        }catch (error) {
            console.error("Eroare la autentificare cu Google!", error);
            setMessage('Eroare la autentificare cu Google!');
        }
    }

    return (
        <div className='relative flex flex-col min-h-[70vh] w-full max-w-8xl mx-auto justify-center items-center px-64'>
            <div className='w-full max-w-sm mx-auto bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                <Link to="/" className='relative flex justify-center items-center mb-4'>
                    <IoExtensionPuzzleSharp className='size-9' style={{ color: "#FF4500", transform: "rotate(30deg)" }} />
                    <span className="text-md font-bold text-blue-800 leading-tight ml-1" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                        The <span className="text-pink-500">New</span><br /><span className="text-purple-500">Life</span> of <span className="text-green-500">Puzzles</span>
                    </span>
                </Link>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='email'>Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email" name="email" id="email" placeholder='Email Adress'
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
                        <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded focus:outline-none focus:shadow-outline'>
                            Login
                        </button>
                    </div>
                </form>
                <p className='flex justify-center items-center align-baseline font-medium mt-2 text-sm' >Don't have an account? Please
                    <Link to='/register' className='text-blue-500 hover:text-blue-800'>&nbsp;Register</Link>
                </p>
                <div className='mt-2'>
                    <button
                        onClick={handleGoogleSignIn}
                        className='w-full flex flex-wrap gap-1 items-center justify-center bg-blue-900 
                        hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none'>
                        <FaGoogle />
                        Sing in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login