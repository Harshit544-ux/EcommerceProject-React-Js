import { createContext, useState } from "react";
import { products } from "../assets/assets";

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 20;
    const [search,setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const contextValue = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;