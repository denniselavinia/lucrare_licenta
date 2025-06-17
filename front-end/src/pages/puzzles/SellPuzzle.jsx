import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateASellMutation } from '../../redux/features/sells/sellsAPI';

const SellPuzzle = () => {

    const { currentUser } = useAuth();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    const [createSell, { isLoading, error}] = useCreateASellMutation();

    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false)

    const dispatch = useDispatch();

    const onSubmit = async (data) => {

        const sell = {
            name: data.name,
            email: currentUser?.email,
            address: data.zipcode,
            title: data.title,
            description: data.description,
            noPieces: data.noPieces,
            categoryImage: data.categoryImage,
            categoryManufacturer: data.categoryManufacturer,
            price: data.price,
            image: data.image,
        }

        try {
            await createSell(sell).unwrap();
            Swal.fire({
                title: "Vânzare creată!",
                text: "Vânzarea puzzle-ului a fost creată cu succes!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/vanzari")
        } catch (error) {
            console.error("Eroare la crearea vânzării", error);
            Swal.fire({
                title: "Vânzare eșuată!",
                text: "A fost intâmpinată o eroare la crearea vânzării. Vă rugăm să reîncercați!",
                icon: "error",
                showConfirmButton: true,
            });
        }
    }
    if(isLoading) {
        return <div className="text-center">Se procesează vânzarea...</div>;
    }

    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                <div className="md:col-span-5">
                                            <label htmlFor="full_name">Nume</label>
                                            <input
                                                // defaultValue={currentUser?.name}
                                                type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                {...register("name", { required: "Numele este obligatoriu" })}/>
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">E-mail</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                defaultValue={currentUser?.email}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="email@domain.com"
                                                {...register("email", {
                                                    required: "E-mailul este obligatoriu",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: "Introduceți un e-mail valid"
                                                    }
                                                })}
                                            />
                                            {errors.email && (
                                                <span className="text-red-500 text-xs">{errors.email.message}</span>
                                            )}
                                        </div>
                                </div>
                                
                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5 flex flex-col md:flex-row gap-4">
                                        <div className="md:col-span-5">
                                            <label htmlFor="titlu">Titlu puzzle</label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                {...register("title", {
                                                    required: "Tilul puzzle-ului este obligatoriu",
                                                    minLength: { value: 3, message: "Titlul trebuie să aibă cel puțin 3 caractere" }
                                                })}
                                            />
                                            {errors.title && (
                                                <span className="text-red-500 text-xs">{errors.title.message}</span>
                                            )}
                                        </div>
                                        <div className="md:col-span-1">
                                            <label htmlFor="noPieces">Număr de piese</label>
                                            <input
                                                type="number"
                                                name="noPieces"
                                                id="noPieces"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder=""
                                                {...register("noPieces", { required: "Numărul de piese este obligatoriu" })}
                                            />
                                            {errors.noPieces && (
                                                <span className="text-red-500 text-xs">{errors.noPieces.message}</span>
                                            )}
                                            </div>
                                            <div className="md:col-span-1">
                                                <label htmlFor="price">Preț</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="price"

                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder=""
                                                    {...register("price", { required: "Prețul este obligatoriu" })}
                                                />
                                                {errors.price && (
                                                    <span className="text-red-500 text-xs">{errors.price.message}</span>
                                                )}
                                            </div>
                                            </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="description">Descriere</label>
                                            <input
                                                type="text"
                                                name="description"
                                                id="description"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder=""
                                                {...register("description", { required: "Descrierea este obligatorie" })}
                                            />
                                            {errors.description && (
                                                <span className="text-red-500 text-xs">{errors.description.message}</span>
                                            )}
                                        </div>

                                        

                                        

                                            <div className="flex-1">
                                                <label htmlFor="categoryImage">Categorie</label>
                                                <input
                                                    list="category"
                                                    name="categoryImage"
                                                    id="categoryImage"
                                                    placeholder="Alege categoria"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    autoComplete="off"
                                                    {...register("categoryImage", { required: "Categoria este obligatoriu" })}
                                                />
                                                <datalist id="category">
                                                    <option value="Natură" />
                                                    <option value="Aminale" />
                                                    <option value="Orașe" />
                                                    <option value="Abstract" />
                                                    <option value="Natură si animale" />
                                                    <option value="Clădiri" />
                                                    <option value="Peisaje" />
                                                </datalist>
                                                {errors.categoryImage && (
                                                    <span className="text-red-500 text-xs">{errors.categoryImage.message}</span>
                                                )}
                                            </div>
                                            <div className="md:col-span-5 flex flex-col md:flex-row gap-4">

                                            <div className="flex-1">
                                                <label htmlFor="categoryManufacturer">Brand</label>
                                                <input
                                                    list="manufacturer"
                                                    name="categoryManufacturer"
                                                    id="categocategoryManufacturerryImage"
                                                    placeholder="Alege brand-ul"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    autoComplete="off"
                                                    {...register("categoryManufacturer", { required: "Brand-ul este obligatoriu" })}
                                                />
                                                <datalist id="manufacturer">
                                                    <option value="Trefl" />
                                                    <option value="Schmidt" />
                                                    <option value="Ravensburger" />
                                                    <option value="Clementoni" />
                                                    <option value="Castorland" />
                                                </datalist>
                                                {errors.categoryManufacturer && (
                                                    <span className="text-red-500 text-xs">{errors.categoryManufacturer.message}</span>
                                                )}
                                            </div>
                                            
                                            <div className="flex-1">
                                                <label htmlFor="image">Imagine</label>
                                                <input
                                                    type="text"
                                                    name="image"
                                                    id="image"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Adaugă URL-ul imaginii"
                                                    {...register("image", { required: "Imaginea este obligatoriu" })}
                                                />
                                                {errors.image && (
                                                    <span className="text-red-500 text-xs">{errors.image.message}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="billing_same"
                                                    id="billing_same"
                                                    className="form-checkbox"
                                                    checked={isChecked}
                                                    onChange={e => setIsChecked(e.target.checked)}
                                                />
                                                <label htmlFor="billing_same" className="ml-2 ">Am citit si sunt de acord cu <Link className='underline underline-offset-2 text-blue-600'>Temenii și condițiile The new Life of Puzzle</Link> </label>
                                            </div>
                                        </div>
                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    type="submit"
                                                    disabled={!isChecked || !isValid}
                                                    className={`font-bold py-2 px-4 rounded $
                                                            ${(!isChecked || !isValid)
                                                            ? 'bg-blue-300 text-white opacity-50 cursor-not-allowed'
                                                            : 'bg-blue-500 text-white hover:bg-blue-700 cursor-pointer'}
                                            `}  
                                                >
                                                    Vinde puzzle-ul
                                                </button>
                                           
                                        </div>
                                    </div>
                                </div>
                             </div>
                         </form>
                     </div>
                </div>
             </div>
        </div>
     </section >
    )
}

export default SellPuzzle;