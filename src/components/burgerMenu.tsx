'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import lang from '@/utils/language'
import '../styles/MyBurger.scss'




export default function BurgerMenu({ isBurger }: { isBurger: boolean }) {
    const { pathname, asPath, locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const navlinks = [
        { title: 'Каталог', href: '/', desc: 'catolog' },
        { title: 'Туризм', href: '/turism', desc: 'turism' },
        { title: t.nav.bomber, href: '/bombers', desc: 'bombers' },
        { title: t.nav.shoes, href: '/shoes', desc: 'shoes' },
    ]

    


    return (
        <div className={`myBurger ${isBurger ? 'myBurger-active' : ''}`}>
            <nav>
                {
                    navlinks.map(({ title, href, desc }, index) => (
                        <Link key={index} className={(pathname == href) ? 'activ' : ''} href={href}>{title}</Link>
                    ))
                }
            </nav>
            <div className="buttons">
                <div className="buttons--leng">
                    <Link href={asPath} locale={'ru'}>
                        <h1 className={locale == 'ru' ? 'activ' : ''}>Ru</h1>
                    </Link>
                    <span>\</span>
                    <Link href={asPath} locale='kg'>
                        <h1 className={locale == 'kg' ? 'activ' : ''} >Kg</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}
