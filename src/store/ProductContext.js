import React, { useState } from "react";

const ProductContext=React.createContext(
    {
        items:[],
        addItem:(item)=>{},
        removeItem:(id)=>{}
    }
)


export function ProductContextProvider(props) {
    const [items, setItems] = useState([]);
    const addItemToCart = (item) => {
        // Check if the item already exists in the cart
        const existingItemIndex = items.findIndex((existingItem) => existingItem.id === item.id);

        if (existingItemIndex !== -1) {
            // Item already exists, update its quantity
            const updatedItem = {
                ...items[existingItemIndex],
                quantity: items[existingItemIndex].quantity + item.quantity,
            };

            const updatedItemArray = [...items];
            updatedItemArray[existingItemIndex] = updatedItem;
            setItems(updatedItemArray);
        } else {
            // Item doesn't exist, add it to the cart
            setItems((prevItems) => [...prevItems, item]);
        }
    };

    const removeItemFromCart = (id) => {
        const existingItemIndex = items.findIndex((existingItem) => existingItem.id === id);
        if (existingItemIndex !== -1) {
            const existingItem = items[existingItemIndex];
            if (existingItem.quantity === 1) {
                // If the item's quantity is 1, remove the item from the cart
                const updatedItemsArray = items.filter((item) => item.id !== id);
                setItems(updatedItemsArray);
            } else {
                // If the item's quantity is greater than 1, decrease its quantity by 1
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity - 1,
                };
                const updatedItemsArray = [...items];
                updatedItemsArray[existingItemIndex] = updatedItem;
                setItems(updatedItemsArray);
            }
        }
    };



    const productContext = {
        items,
        addItem: addItemToCart,
        removeItem: removeItemFromCart
    };

    return (
        <ProductContext.Provider value={productContext}>
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductContext;
