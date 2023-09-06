import type { AppProps } from 'next/app'
import '@/app/style.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <section className='font'>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </section>


    )
}