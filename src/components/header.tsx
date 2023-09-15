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
    const { asPath, pathname, locale, query } = useRouter()
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

    console.log(asPath);
    console.log(pathname);


    return (
        <header className="header">
            <div className="container">
                <div className="header--body">


                    <div className="header--body--logo">
                        <Link onClick={() => {
                            setBurgerState(false)
                        }} href={'/'}>
                            <img src="/assets/img/site--logo.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="header--body--burger">
                        <nav className="header--body--burger--navigat">
                            {
                                categories.map(({ title, href }, index) => (
                                    <Link key={index} className={!asPath.includes(`category_id`) && href == '/' ? 'activ' : (asPath == href && asPath != '/') ? 'activ' : ''} href={href}>{title}</Link>
                                ))
                            }
                        </nav>
                        <div className="header--body--burger--buttons">
                            <div className="header--body--burger--buttons--leng">
                                <Link href={asPath} locale={'ru'}>
                                    <h1 className={locale == 'ru' ? 'activ' : ''}>Ru</h1>
                                </Link>
                                <span>\</span>
                                <Link href={asPath} locale='kg'>
                                    <h1 className={locale == 'kg' ? 'activ' : ''} >Kg</h1>

                                </Link>
                            </div>
                            <button><Link href="/cart">{t.nav.cart}</Link></button>
                        </div>
                        <div className="header--body--menu">
                            <BurgerMenu setBurger={setBurgerState} navs={categories} isBurger={isBurger} />
                            <div className="burger-menu">
                                <div className="inner">
                                    <button className={`menu ${isBurger ? 'opened' : ''}`} onClick={() => {
                                        setBurgerState(prev => !prev)
                                    }} aria-expanded={isBurger} aria-label="Main Menu">
                                        <svg width="40" height="40" viewBox="0 0 100 100">
                                            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                            <path className="line line2" d="M 20,50 H 80" />
                                            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                                        </svg>
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}


