'use client'
import React, { useEffect, useState } from 'react'
import '@/styles/Goods.scss'
import lang from '@/utils/language'
import { useRouter } from 'next/router'




export default function goods() {
    const { locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const [items, setItems] = useState([])

    useEffect(() => {

    }, [])

    return (
        <div className="gallery">
            <div className="gallery--point">
                <h1>Каталог</h1>
                <div className="gallery--point--buttons">
                    <button>{t.goods.category}</button>
                    <button>
                        <img src="/assets/svg/price--arrow.svg" alt="arrow" />
                        {t.goods.price}
                    </button>
                </div>
            </div>
            <div className="gallery--cards">
                <a href="#" className="gallery--cards--fon"></a>
                <a href="#" className="gallery--cards--fon"></a>
                <a href="#" className="gallery--cards--fon"></a>
                <a href="#" className="gallery--cards--fon"></a>
                <a href="#" className="gallery--cards--fon"></a>
                <a href="#" className="gallery--cards--fon"></a>
            </div>
            <div className="gallery--buttons">
                <img src="/assets/svg/slider--arrow--left.svg" alt="arrow" />
                <div className="gallery--buttons--btn">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                </div>
                <img src="/assets/svg/slider--arrow--right.svg" alt="arrow" />
            </div>
        </div>
    )
}
