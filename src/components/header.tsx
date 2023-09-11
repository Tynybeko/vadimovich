'use client'

import React, { useEffect, useState } from 'react'
import '../styles/Header.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BurgerMenu from './burgerMenu'
import lang from '../utils/language'
import { getCategories } from './goods'


export interface nav {
    title: string,
    href: string,

}


export default function Header() {
    const { asPath, pathname, locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const [categories, setCategories] = useState<nav[]>([])


    useEffect(() => {
        getCategories().then(res => {
            setCategories([{ title: 'Каталог', href: '/' }])
            res?.results.forEach(({ id, title_ky, title }: { id: number, title_ky: string, title: string }, index: number) => {
                if (index < 3) {
                    setCategories(prev => [...prev, { title: (locale == 'ru' ? title : title_ky), href: `/?category_id=${id}` }])
                }
            })
        })
    }, [locale])

    const [isBurger, setBurgerState] = useState<boolean>(false)
    const handleChangeLang = (e: React.MouseEvent<HTMLHeadingElement>) => {

    }


    return (
        <header className="header">
            <div className="container">
                <div className="header--body">
                    <div className="header--body--logo">
                        <img src="/assets/img/site--logo.png" alt="logo" />
                    </div>
                    <div className="header--body--burger">
                        <nav className="header--body--burger--navigat">
                            {
                                categories.map(({ title, href }, index) => (
                                    <Link key={index} className={(pathname == href) ? 'activ' : ''} href={href}>{title}</Link>
                                ))
                            }
                        </nav>
                        <div className="header--body--burger--buttons">
                            <div className="header--body--burger--buttons--leng">
                                <Link href={asPath} locale={'ru'}>
                                    <h1 onClick={handleChangeLang} className={locale == 'ru' ? 'activ' : ''}>Ru</h1>
                                </Link>
                                <span>\</span>
                                <Link href={asPath} locale='kg'>
                                    <h1 onClick={handleChangeLang} className={locale == 'kg' ? 'activ' : ''} >Kg</h1>

                                </Link>
                            </div>
                            <button><Link href="/cart">{t.nav.cart}</Link></button>
                        </div>
                        <div className="header--body--menu">
                            <BurgerMenu navs={categories} isBurger={isBurger} />
                            {
                                !isBurger ? <img onClick={() => {
                                    setBurgerState(true)
                                }} className="open" src="/assets/svg/burger--menu--open.svg" alt="burger--button" /> :
                                    <img onClick={() => {

                                        setBurgerState(false)
                                    }} className="open" src="/assets/svg/close--burger--menu.svg" alt="burger--button" />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}


