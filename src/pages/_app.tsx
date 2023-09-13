import type { AppProps } from 'next/app'
import '@/app/style.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import { ItemsContext } from '@/hooks/CartContect'
import { Item } from '@/utils/IGoods'
import type { ItemsContextType } from '@/hooks/CartContect'
import Head from 'next/head'




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
            <Head>
                <title>Vadimovich Store</title>
                <meta name='description' content='Магазин одежды Вадимович' />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="theme-color" content="#ffffff"></meta>
            </Head>
            <section className='font'>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </section>
        </ItemsContext.Provider>
    )
}