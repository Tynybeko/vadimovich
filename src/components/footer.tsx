"use client"
import React, { useEffect, useState } from 'react'
import '../styles/Footer.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import lang from '@/utils/language'
import type { nav } from './header'
import { getCategories } from './goods'




export default function footer() {
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



    return (
        <footer className="footer">
            <div className="container">
                <div className="footer--body">
                    <div className="footer--body--top">
                        <div className="footer--body--top--logo">
                            <img src="/assets/img/site--logo.png" alt="logo" />
                            <div className="footer--body--top--logo--meet">
                                <img src="/assets/svg/arr10.svg" alt="arrow" />
                                <h1>ассалому
                                    алейкум
                                    достор</h1>
                            </div>
                        </div>
                        <nav className="footer--body--top--navigate">
                            {
                                categories.map(({ title, href }, index) => (
                                    <Link key={index} className={!asPath.includes(`category_id`) && href == '/' ? 'activ' : (asPath == href && asPath != '/') ? 'activ' : ''} href={href}>{title}</Link>
                                ))
                            }
                        </nav>
                        <div className="footer--body--top--net">
                            <div className="footer--body--top--net--icons">
                                <Link href="https://www.instagram.com/">
                                    <img src="/assets/svg/inst--white--icon.svg" alt="instagram" />
                                </Link>
                                <Link href="https://www.tiktok.com/">
                                    <img src="/assets/svg/tick--white--icon.svg" alt="ticktok" />
                                </Link>
                                <Link href="https://twitter.com/?lang=ru">
                                    <img src="/assets/svg/twitter--white--icon.svg" alt="twitter" />
                                </Link>
                            </div>
                            <div className="footer--body--top--net--know">
                                <img src="/assets/svg/arr11.svg" alt="arrow" />
                                <h1><span>Да что ты знаешь про</span>вайб</h1>
                            </div>
                        </div>
                    </div>
                    <div className="footer--body--end">
                        <p>Пользовательское соглашение</p>
                        <h1>PROlab 2023™</h1>
                        <p>Размерная сетка</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
