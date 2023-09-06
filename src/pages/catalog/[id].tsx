import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import '../../styles/SinglePage.scss'
import lang from '@/utils/language'
import { ITEM_API } from '@/utils/axios'
import { Item } from '@/utils/IGoods'


export const createMarkup = (htmlTag: string) => {
    return (<>
        <p dangerouslySetInnerHTML={{ __html: htmlTag }}></p>
    </>
    )
}

export const singleItem = async (id: any) => {
    const { data } = await ITEM_API.get(`/item/${id}`)
    return await data
}

export default function singlePage() {
    const { query: { id }, pathname, locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const [item, setItems] = useState<Item>()




    useEffect(() => {
        if (id) {
            singleItem(id).then(res => setItems(res))
        }
    }, [id])



    return (
        <main className="main">
            <div className="container">
                <div className="title">
                    <div className="title--text">
                        <h1>Каталог</h1>
                        <span><img src="/assets/svg/red--arrow.svg" alt="arrow" /></span>
                        <h1>{item?.title}</h1>
                    </div>
                    <div className="title--front">
                        <div style={{ backgroundImage: `url(${item?.photo})` }} className="gallery--cards--fon act"></div>
                        {
                            item && (
                                <div className="title--front--paragraphs">
                                    <h1>{item.title}</h1>
                                    {createMarkup(locale == 'ru' ? item.description : item.description_ky)}
                                    <div className="title--front--paragraphs--designe">
                                        <div>
                                            {createMarkup(locale == 'ru' ? item?.content : item?.content_ky)}
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
                                            <h1>{item?.discount ?? ''}</h1>
                                            <h2>{item.price}</h2>
                                        </div>
                                        <button>{t.goods.buy}</button>
                                    </div>
                                </div>

                            )
                        }
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
                    </div>
                </div>
            </div>
        </main>
    )
}
