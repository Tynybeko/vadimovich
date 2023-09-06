import type { AppProps } from 'next/app'
import '@/app/style.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import { CartContext } from '@/hooks/CartContect'
import { Item } from '@/utils/IGoods'

type CartContextType = [Item[], React.Dispatch<React.SetStateAction<Item[]>>];


export default function MyApp({ Component, pageProps }: AppProps) {
    const [items, setItems] = useState<Item[]>([])

    return (
        <CartContext.Provider value={[items, setItems] as CartContextType}>
            <section className='font'>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </section>
        </CartContext.Provider>
    )
}