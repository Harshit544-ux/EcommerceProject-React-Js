import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 20;
    const [search,setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {
        setCartItems(prev => {
            const newCart = { ...prev };
            if (!newCart[itemId]) {
                newCart[itemId] = {};
            }
            if (!newCart[itemId][size]) {
                newCart[itemId][size] = 0;
            }
            newCart[itemId][size] += 1;
            return newCart;
        });
    }


     const getCartCount=()=>{
        let totalCount = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                totalCount += cartItems[item][size];
            }
        }
        return totalCount;
     }


    const contextValue = {
        products, 
        currency, 
        delivery_fee,
        search, 
        setSearch, 
        showSearch, 
        setShowSearch,
        addToCart,  
        cartItems ,
        getCartCount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;



