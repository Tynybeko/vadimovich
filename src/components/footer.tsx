"use client"
import React from 'react'
import '../styles/Footer.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import lang from '@/utils/language'


export default function footer() {
    const { asPath, pathname, locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg

    const navlinks = [
        { title: 'Каталог', href: '/', desc: 'catolog' },
        { title: 'Туризм', href: '/turism', desc: 'turism' },
        { title: t.nav.bomber, href: '/bombers', desc: 'bombers' },
        { title: t.nav.shoes, href: '/shoes', desc: 'shoes' },
    ]


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
                                navlinks.map(({ title, href, desc }, index) => (
                                    <Link key={index} className={pathname.includes(desc) || pathname == href ? 'activ' : ''} href={href}>{title}</Link>
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
