'use client'

import React, { SetStateAction, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import lang from '@/utils/language'
import '../styles/MyBurger.scss'
import type { nav } from './header'



export default function BurgerMenu({ isBurger, navs, setBurger }: { isBurger: boolean, navs: nav[], setBurger: React.Dispatch<SetStateAction<boolean>> }) {
    const { pathname, asPath, locale, query } = useRouter()
    const handleClose = () => {
        setBurger(prev => !prev)
    }


    return (
        <div className={`myBurger ${isBurger ? 'myBurger-active' : ''}`}>
            <nav>
                {
                    navs.map(({ title, href }, index) => (
                        <Link key={index} onClick={handleClose} className={!asPath.includes(`category_id`) && href == '/' ? 'activ' : (asPath == href && asPath != '/') ? 'activ' : ''} href={href}>{title}</Link>
                    ))
                }
            </nav>
            <div className="buttons">
                <div className="buttons--leng">
                    <Link onClick={handleClose} href={asPath} locale={'ru'}>
                        <h1 className={locale == 'ru' ? 'activ' : ''}>Ru</h1>
                    </Link>
                    <span>\</span>
                    <Link onClick={handleClose} href={asPath} locale='kg'>
                        <h1 className={locale == 'kg' ? 'activ' : ''} >Kg</h1>
                    </Link>
                </div>
            </div>
        </div >
    )
}
