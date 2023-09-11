
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import '../../styles/SinglePage.scss'
import lang from '@/utils/language'
import { ITEM_API } from '@/utils/axios'
import { Item } from '@/utils/IGoods'
import { useItemsContext } from '@/hooks/CartContect'
import Posts from '@/components/Posts'

export const createMarkup = (htmlTag: string) => {
    return (<>
        <p dangerouslySetInnerHTML={{ __html: htmlTag }}></p>
    </>
    )
}

export const singleItem = async (id: any) => {
    const { data } = await ITEM_API.get(`/item/for/users/${id}`)
    return await data
}

export default function singlePage() {
    const { query: { id }, pathname, locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const [pageCount, setPageCount] = useState<number>(1)
    const [item, setItem] = useState<Item>()
    const [items, setItems] = useItemsContext()
    const [changed, setChanged] = useState<boolean>(false)

    useEffect(() => {
        if (id) {
            singleItem(id).then(res => {
                setItem(res)
                if (items.some((elem: Item) => elem?.id == +id)) {
                    setChanged(true)
                } else {
                    setChanged(false)
                }
            })
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
                                      
                                    </div>
                                    <div className="title--front--paragraphs--flex">
                                        <p>{t.goods.size}</p>
                                        <div className="title--front--paragraphs--flex--btn">
                                            {
                                                item?.sizes.map((elem: any) => (
                                                    <button className="title--front--paragraphs--flex--btn--act">{elem.size.title}</button>
                                                )
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="title--front--paragraphs--price">
                                        <div className="title--front--paragraphs--price--designe">
                                            <h1>{item?.discount}</h1>
                                            <h2>{item?.price}</h2>
                                        </div>
                                        <button onClick={() => {
                                            if (id) {
                                                if (changed) {
                                                    const data = items.filter((elem: Item) => elem.id != +id)
                                                    localStorage.setItem('cart', JSON.stringify(data))
                                                    setItems([...data])
                                                    setChanged(false)
                                                } else {
                                                    const data = [...items, { ...item, buySize: [{ product: item.id, sizeitem: item.sizes[0]?.size.title, quantity: 1, price: item.sizes[0].size_price || item.discounted_price}] }]
                                                    setItems([...data] as Item[])
                                                    localStorage.setItem('cart', JSON.stringify(data))
                                                    setChanged(true)
                                                }
                                            }
                                        }}>{!changed ? t.goods.buy : t.goods.changed}</button>
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
                    <Posts setPage={setPageCount} isSingle={true} />
                </div>
            </div>
        </main >
    )
}
