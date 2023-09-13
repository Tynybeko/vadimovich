'use client'
import { createContext, useContext } from "react";
import { Item } from "@/utils/IGoods";

export type ItemsContextType = [Item[], React.Dispatch<React.SetStateAction<Item[]>>];





export const ItemsContext = createContext<any>([])

export const useItemsContext = () => {
    const context = useContext(ItemsContext)
    return context
}   


