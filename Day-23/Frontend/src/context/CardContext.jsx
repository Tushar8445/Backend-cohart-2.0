import { createContext, useState, useEffect } from "react";
import axios from 'axios';

// 1. Context create kiya
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

export const MyProvider = ({ children }) => {
    // 2. Data store karne ke liye state (Ise hi hum 'value' mein bhejenge)
    const [products, setProducts] = useState([]); 

    const getData = async () => {
        try {
            const res = await axios.get("https://fakestoreapi.com/products");
            setProducts(res.data); // Data state mein save kiya
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    // 3. Component load hote hi function ko call kiya
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getData();
    }, []);

    return (
        // 4. Sabse Zaroori: 'value' prop mein 'products' pass kiya
        // Yahan 'value' likhna compulsory hai
        <DataContext.Provider value={products}>
            {children}
        </DataContext.Provider>
    );
};