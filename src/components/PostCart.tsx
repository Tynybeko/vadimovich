'use client'

import { Item } from '@/utils/IGoods'
import React, { useEffect, useState } from 'react'
import lang from '@/utils/language'
import { useRouter } from 'next/router'
import { createMarkup } from '@/pages/catalog/[id]'
import { useItemsContext } from '@/hooks/CartContect'
import type { buySize } from '@/utils/IGoods'


export default function PostCart({ item }: { item: Item }) {
    const { locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const [items, setItems] = useItemsContext()
    const [itemState, setItemState] = useState<Item>(item)
    const [changedSize, setSize] = useState<buySize>(itemState.buySize[0])
    useEffect(() => {
        if (items.length) {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [changedSize, items])


    const handleAddSize = () => {
        setItems((prevItems: Item[]) =>
            prevItems.map((prevItem) =>
                prevItem.id === item.id
                    ? {
                        ...prevItem,
                        buySize: prevItem.buySize.map((size) => {
                            if (size.sizeitem === changedSize?.sizeitem) {
                                size.quantity += 1
                                setSize(size)
                            }
                            return size
                        }

                        ),
                    }
                    : prevItem
            )
        );
    }


    const handleRemoveSize = () => {
        setItems((prevItems: Item[]) =>
            prevItems.map((prevItem) =>
                prevItem.id === item.id
                    ? {
                        ...prevItem,
                        buySize: prevItem.buySize.map((size) => {
                            if (size.sizeitem === changedSize?.sizeitem && size.quantity >= 1) {
                                size.quantity -= 1
                                setSize(size)
                            }
                            return size
                        }),
                    }
                    : prevItem
            )
        );
    }


    return (
        <div className="buy--title">
            <div className="buy--title--img">
                <a href={`catalog/${item.id}`} style={{ backgroundImage: `url(${item?.photo})` }} className="gallery--cards--fon act"></a>
            </div>
            <div className="buy--title--text">
                <div className="buy--title--text--top">
                    <h1>{item?.title}</h1>
                    <div className="buy--title--text--top--proce">
                        <h1>{item?.discount}</h1>
                        <h2>{changedSize?.price || item?.price}</h2>
                        <button onClick={() => {
                            const storage = JSON.parse(localStorage.getItem('cart') ?? '[]')
                            const data = storage.filter((elem: Item) => elem.id != item.id)
                            localStorage.setItem('cart', JSON.stringify(data))
                            setItems(data)
                        }} className="title--front--paragraphs--flex--btn--act">X</button>
                    </div>
                </div>
                <div className="buy--title--text--center">
                    {createMarkup(locale == 'ru' ? item?.content : item?.content_ky)}
                </div>
                <div className="buy--title--text--count">
                    <div className="buy--title--text--count--block">
                        <h1>{t.cart.count}</h1>
                        <div className="buy--title--text--count--block--flex">
                            <button onClick={handleRemoveSize} className="title--front--paragraphs--flex--btn--act">-</button>
                            <p>{changedSize?.quantity}</p>
                            <button onClick={handleAddSize} className="title--front--paragraphs--flex--btn--act">+</button>
                        </div>
                        <div className="title--front--paragraphs--flex">
                            <p>{t.goods.size}</p>
                            <div className="title--front--paragraphs--flex--btn">
                                {
                                    item.sizes.map((size: any) => (
                                        <button key={size.id} onClick={() => {
                                            let sized = item.buySize.find((sized: buySize) => sized.sizeitem == size.size.title)
                                            if (sized) {
                                                setSize(sized)
                                                return
                                            }
                                            let newSize = {
                                                product: item.id,
                                                sizeitem: size.size.title,
                                                quantity: 0
                                            }
                                            item.buySize.push(newSize as buySize)
                                            setSize(newSize as buySize)
                                            items.splice(items.findIndex((elem: Item) => elem.id == item.id), 1, item)
                                            setItems(items)
                                        }} className={`title--front--paragraphs--flex--btn--act ${size.size.title == changedSize?.sizeitem || items.some((elem: Item) => elem.id == item.id &&  elem.buySize.some((sizes: buySize) => (sizes.sizeitem == size.size.title && Boolean(sizes?.quantity)) == true) == true) ? 'activ' : ''}`}>{size.size.title}</button>
                                    ))
                                }


                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div >
    )
}
