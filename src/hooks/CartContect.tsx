'use client'
import { createContext, useContext } from "react";
import { Item } from "@/utils/IGoods";

type CartContextType = [Item[], React.Dispatch<React.SetStateAction<Item[]>>];





export const CartContext = createContext<any>([])

export const useCartContext = () => {
    const context = useContext(CartContext)
    return context
}   