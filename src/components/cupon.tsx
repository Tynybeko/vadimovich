import React, { useState, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/router'
import lang from '@/utils/language'
import useDebounce from '@/hooks/useDebouns'
import { useItemsContext } from '@/hooks/CartContect';
import type { Item, buySize } from '@/utils/IGoods';
import { ITEM_API } from '@/utils/axios';

interface BuyModalProps {
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
}


export const cuponRes = async (cupon: string) => {
    let res = await ITEM_API('/coupon-code/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            coupon_code: cupon
        }
    })
    return await res.data

}

export const buySum = (arr: Item[]) => {
    const result = arr.reduce((acc: any, elem: Item) => {
        let summms = elem?.buySize.reduce((sizeAcc: any, size: buySize) => {
            let sizePrice = elem?.sizes.find((elemSize: any) => elemSize?.size?.title == size.sizeitem).price_size
            sizeAcc.sizeSum += size.quantity * (sizePrice || elem.discounted_price)
            sizeAcc.sizeCount += size.quantity
            return sizeAcc
        }, { sizeSum: 0, sizeCount: 0 })
        acc.sum += summms.sizeSum
        acc.count += summms.sizeCount
        return acc
    }, { sum: 0, count: 0 })
    return result
}

const Cupon: React.FC<BuyModalProps> = ({ setClose }) => {
    const { pathname, locale, asPath } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const debounceSearch = useDebounce(cuponSearch, 500)
    const [items, setItems] = useItemsContext()
    const [{ sum, count }, setSum] = useState<{ sum: number, count: number }>({ sum: 0, count: 0 })
    const [dis, setDis] = useState<number>(0)

    useEffect(() => {
        setSum(buySum(items))
    }, [items])

    function cuponSearch(cupon: string) {
        if (cupon) {
            cuponRes(cupon).then(res => {
                setDis(res?.discount)
                sessionStorage.setItem('cupon', cupon)
            })

        }


    }


    return (
        <div className="cupon">
            <div className="container">
                <div className="cupon--body">
                    <div className="cupon--body--find">
                        <h1>{t.cart.title}</h1>
                        <div className="cupon--body--find--btn">
                            <form>
                                <button type='button' className="btn">
                                    <input
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            e.preventDefault()
                                            debounceSearch(e.target.value)
                                        }}
                                        type="text"
                                    />
                                </button>
                                <p>{!dis ? t.cart.isError : t.cart.isTrue}</p>
                                <button type='reset' className="x">X</button>
                            </form>
                        </div>
                    </div>
                    <div className="cupon--body--count">
                        <h1>{t.cart.goodsCount} {count}</h1>
                        <div className="cupon--body--count--flex">
                            <h1>{!dis ? sum : (sum / 100) * (100 - dis)}</h1>
                            <button onClick={() => {
                                if (items.length) {
                                    setClose(prev => !prev)

                                }
                            }} className="btn">{t.cart.buy}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cupon