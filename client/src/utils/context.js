import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
export const Context = createContext();
const AppContext = ({ children }) => {
    const [categories, setCategories] = useState([]); // Provide an initial value (an empty array)
    const [products, setProducts] = useState([]); // Provide an initial value (an empty array)

    const [cartItem, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [CartSubTotal, setCartSubTotal] = useState(0);
    const location = useLocation();
       
       useEffect(()=>{
        window.scrollTo(0,0);
       },[location]);

    useEffect(()=>{
       let count = 0;
       cartItem.map((item) => (count += item.attributes.quantity));
       setCartCount(count)
        let subTotal=0;
        cartItem.map((item)=>(subTotal += item.attributes.price * item.attributes.quantity));
        setCartSubTotal(subTotal);
    },[cartItem])

  const handleAddToCart = (product, quantity) => {
    
    const updatedCart = [...cartItem];
    // Find index of the product in the cart
    const index = updatedCart.findIndex((p) => p.id === product.id);
    if (index !== -1) {
        // If product exists in the cart, update its quantity
        updatedCart[index].attributes.quantity += quantity;
    } else {
        // If product doesn't exist in the cart, add it with the specified quantity
        product.attributes.quantity = quantity;
        updatedCart.push(product);
    }
    
    // Update the cartItem state with the updated cart array
    setCartItem(updatedCart);
};



const handleRemoveFromCart = (product) => {
    // Create a copy of cartItem array
    const updatedCart = [...cartItem];
    
    // Filter out the product to be removed from the updated cart
    const filteredCart = updatedCart.filter((p) => p.id !== product.id);

    // Update the cartItem state with the filtered cart array
    setCartItem(filteredCart);
};


    const handleCartProductQuantity=(type,product)=>{
         let items = [...cartItem];
         let index = items.findIndex((p) => p.id === product.id);
         if(type === "inc"){
            items[index].attributes.quantity += 1;
        }else if (type === "dec"){
            if(items[index].attributes.quantity === 1) return;
            items[index].attributes.quantity -= 1;
            
         }
         setCartItem(items);
    };
    const contextValue = {
        message: 'Hello from context!',
        // other context data or state properties
    };

    return (
        <Context.Provider value={{
            categories,
            setCategories, // Use this setter function to update categories
            products,
            setProducts, // Use this setter function to update products

            cartItem,
            setCartItem,

            cartCount,
            setCartCount,

            CartSubTotal,
            setCartSubTotal,

            handleAddToCart,
            handleRemoveFromCart,
            handleCartProductQuantity,
            contextValue
        }}>
            {children}
        </Context.Provider>
    );
};

export default AppContext;
