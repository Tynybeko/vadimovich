import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import '../../styles/SinglePage.scss'
import lang from '@/utils/language'

export default function singlePage() {
    const { query: { id }, pathname, locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg

    return (
        <main className="main">
            <div className="container">
                <div className="title">
                    <div className="title--text">
                        <h1>Каталог</h1>
                        <span><img src="/assets/svg/red--arrow.svg" alt="arrow" /></span>
                        <h1>Футболка классическая</h1>
                    </div>
                    <div className="title--front">
                        <Link href="#" className="gallery--cards--fon act"></Link>
                        <div className="title--front--paragraphs">
                            <h1>Футболка классическая</h1>
                            <p>Выполнять рост показывает, организации форм повседневная направлений соответствующий
                                важные рост от играет реализации развития. Практика проверки существенных активизации. А
                                нашей интересный условий. Показывает, форм и требуют собой рамки что образом постоянный
                                от образом показывает, активности играет нашей организации.</p>
                            <div className="title--front--paragraphs--designe">
                                <div>
                                    <p>Дизайн: человек 1, человек 2</p>
                                    <p>{t.goods.compound}: 20% ткани, 80% ткани</p>
                                </div>
                                <div className="title--front--paragraphs--designe--chart">
                                    <p>Таблица размеров</p>
                                    <p>Оплата заказа</p>
                                    <p>Условия доставки</p>
                                    <p>Правила возврата</p>
                                    <p>Помощь клиентам</p>
                                </div>
                            </div>
                            <div className="title--front--paragraphs--flex">
                                <p>{t.goods.size}</p>
                                <div className="title--front--paragraphs--flex--btn">
                                    <button className="title--front--paragraphs--flex--btn--act">XS</button>
                                    <button className="title--front--paragraphs--flex--btn--act">S</button>
                                    <button className="title--front--paragraphs--flex--btn--act">M</button>
                                    <button className="title--front--paragraphs--flex--btn--act">L</button>
                                    <button className="title--front--paragraphs--flex--btn--act">XL</button>
                                    <button className="title--front--paragraphs--flex--btn--act">XXL</button>
                                </div>
                            </div>
                            <div className="title--front--paragraphs--price">
                                <div className="title--front--paragraphs--price--designe">
                                    <h1>$1243</h1>
                                    <h2>$1578</h2>
                                </div>
                                <button>{t.goods.buy}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    <div className="gallery--point">
                        <h1>{t.goods.otherOffers}</h1>
                    </div>
                    <div className="gallery--cards">
                        <Link href="#" className="gallery--cards--fon act"></Link>
                        <Link href="#" className="gallery--cards--fon act"></Link>
                        <Link href="#" className="gallery--cards--fon act"></Link>
                        <Link href="#" className="gallery--cards--fon act"></Link>
                        <Link href="#" className="gallery--cards--fon act"></Link>
                        <Link href="#" className="gallery--cards--fon act"></Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
