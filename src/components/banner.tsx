'use client'
import React from 'react'
import '../styles/Banner.scss'
import Link from 'next/link'

export default function banner() {
    return (
        <div className="title">
            <div className="title--follow">
                <img src="/assets/img/site--full--logo.png" alt="logo" />
                <h1>ассалому алейкум достор</h1>
                <div className="title--follow--icons">
                    <Link href="https://www.instagram.com/">
                        <img src="/assets/svg/inst--icon.svg" alt="title--icon" />
                    </Link>
                    <Link href="https://www.tiktok.com/">
                        <img src="/assets/svg/tick--icon.svg" alt="title--icon" />
                    </Link>
                    <Link href="https://twitter.com/?lang=ru">
                        <img src="/assets/svg/twitter--icon.svg" alt="title--icon" />
                    </Link>
                </div>
            </div>
            <div className="title--pos pos1">
                <img src="/assets/svg/arr1.svg" alt="arrow" />
                <span>Это лого</span>
            </div>
            <div className="title--pos pos2">
                <img src="/assets/svg/arr2.svg" alt="arrow" />
                <h1><span>Тут твои</span>
                    покупки</h1>
            </div>
            <div className="title--pos pos3">
                <img src="/assets/svg/arr3.svg" alt="arrow" />
                <span>Палец</span>
            </div>
            <div className="title--pos pos4">
                <img src="/assets/svg/arr4.svg" alt="arrow" />
                <h1><span>шевелюра</span>
                    отпад</h1>
            </div>
            <div className="title--pos pos5">
                <img src="/assets/svg/arr5.svg" alt="arrow" />
                <h1>яххха <span>в каждый дом</span></h1>
            </div>
            <div className="title--pos pos6">
                <img src="/assets/svg/arr6.svg" alt="arrow" />
                <span>Да подпишись уже</span>
            </div>
            <div className="title--pos pos7">
                <img src="/assets/svg/arr7.svg" alt="arrow" />
                <h1><span>Не мерч</span>а сказка</h1>
            </div>
            <div className="title--pos pos8">
                <img src="/assets/svg/arr8.svg" alt="arrow" />
                <h1>Огромный выбор</h1>
            </div>
            <div className="title--pos pos9">
                <img src="/assets/svg/arr9.svg" alt="arrow" />
                <h1><span>тут будут</span>трактористи</h1>
            </div>
        </div>
    )
}
