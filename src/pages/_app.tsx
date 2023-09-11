'use client'
import type { AppProps } from 'next/app'
import '@/app/style.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import { ItemsContext } from '@/hooks/CartContect'
import { Item } from '@/utils/IGoods'
import type { ItemsContextType } from '@/hooks/CartContect'

export default function MyApp({ Component, pageProps }: AppProps) {
    const [items, setItems] = useState<Item[]>([])
    useEffect(() => {
        const storage = localStorage.getItem('cart')
        if (storage) {
            const data = JSON.parse(storage)
            setItems([...data])
        } else {
            localStorage.setItem('cart', JSON.stringify([]))
        }
    }, [])

    return (
        <ItemsContext.Provider value={[items, setItems] as ItemsContextType}>
            <section className='font'>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </section>
        </ItemsContext.Provider>
    )
}