import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => { 
    return  useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
   
    let favorites = [];
    try {
      if (favoritesFromStorage && favoritesFromStorage !== "undefined") {
        favorites = JSON.parse(favoritesFromStorage);
        if (!Array.isArray(favorites)) favorites = [];
      }
    } catch {
      favorites = [];
    }

    let cart = [];
    try {
      if (cartFromStorage && cartFromStorage !== "undefined") {
        cart = JSON.parse(cartFromStorage);
        if (!Array.isArray(cart)) cart = [];
      }
    } catch {
        cart = [];
    }

    //înregistrare utilizator
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    //login utilizator
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    //login cu Google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    }

    //logout utilizator
    const logout = () => {
        return signOut(auth)
    }

    //gestionează utilizatorul curent
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const { email, displayName, photoURL } = user;
                const userData = {
                    email,
                    username: displayName,
                    photo: photoURL
                };
            }
        });
        return () => unsubscribe();
    }, [])

    const [favoriteItems, setFavoriteItems] = useState(favorites);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favoriteItems));
    }, [favoriteItems]);

    const [cartITems, setCartItems] = useState(cart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartITems));
    }, [cartITems]);


    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}