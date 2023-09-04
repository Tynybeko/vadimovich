'use client'
import React, { SetStateAction, useEffect, useState } from 'react'
import '../styles/Header.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import lang from '../utils/language'


export default function Header() {
    const { asPath, pathname, locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg

    const navlinks = [
        { title: 'Каталог', href: '/', desc: 'catolog' },
        { title: 'Туризм', href: '/turism', desc: 'turism' },
        { title: t.nav.bomber, href: '/bombers', desc: 'bombers' },
        { title: t.nav.shoes, href: '/shoes', desc: 'shoes' },
    ]
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
                                navlinks.map(({ title, href, desc }, index) => (
                                    <Link key={index} className={(pathname.includes(desc) || pathname == href) ? 'activ' : ''} href={href}>{title}</Link>
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
                            <img className="open" src="/assets/svg/burger--menu--open.svg" alt="burger--button" />
                            <img className="close" src="/assets/svg/close--burger--menu.svg" alt="burger--button" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
