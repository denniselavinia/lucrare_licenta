import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersAPI';

const Orders = () => {
    const { currentUser} = useAuth()
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);
    if (isLoading) return <div>Se prelucrează datele...</div>
    if (isError) return <div>Eroare la obținerea datelor despre comenzi</div>
    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Comenzile tale</h2>
            {
                orders.length === 0 ? (<div>Nu a fost găsită nicio comandă!</div>) : (<div>
                    {
                        orders.map((order, index) => (
                            <div key={order._id} className="border-b mb-4 pb-4">
                                <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
                                <h2 className="font-bold">Număr comandă: {order._id}</h2>
                                <p className="text-gray-600">Nume: {order.name}</p>
                                <p className="text-gray-600">Email: {order.email}</p>
                                <p className="text-gray-600">Număr telefon: {order.phone}</p>
                                <p className="text-gray-600">Preț total: {order.totalPrice} RON</p>
                                <h3 className="font-semibold mt-2">Adresă:</h3>
                                <p> {order.address.country}, {order.address.city}, {order.address.zipcode}</p>
                                <h3 className="font-semibold mt-2">Produse:</h3>
                                <ul>
                                    {order.productIds.map((id, idx) => (
                                        <li key={id || idx}>{id}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }
                </div>)
            }
        </div>
    )
}

export default Orders