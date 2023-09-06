'use client'
import React, { useEffect, useState, } from 'react'
import '@/styles/Goods.scss'
import lang from '@/utils/language'
import { useRouter } from 'next/router'
import { ITEM_API } from '@/utils/axios'
import { Item } from '@/utils/IGoods'
import Link from 'next/link'
import { useItemsContext } from '@/hooks/CartContect'
import Pagination from './pagination'


export const getItems = async (page: any) => {
    const { data } = await ITEM_API.get(`/item/for/users/?${page}`)
    return await data
}
export const getCategories = async () => {
    const { data } = await ITEM_API.get(`/category`)
    return await data
}



export default function goods() {
    const { locale, query } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const [page, setPage] = useState<string>('1')
    const [{ isNext, isPrev }, setPagState] = useState({ isNext: false, isPrev: false })
    const [categories, setCategories] = useState<any[]>([])
    const [items, setItems] = useItemsContext()
    const [{ isCheckCat, selectedCat }, setCat] = useState({ isCheckCat: false, selectedCat: '' })


    useEffect(() => {
        const queryString = new URLSearchParams(query as Record<string, string>).toString()
        if (query) {
            getItems(queryString).then(res => {
                setItems([...(res?.results ?? [])])
                setPage(res.count)
                setPagState(prev => ({ isNext: res.next, isPrev: res.previous }))
            })
            getCategories().then(res => {
                setCategories(prev => [...(res?.results ?? [])])
            })
        }
    }, [query, page])


    return (
        <div className="gallery">
            <div className="gallery--point">
                <h1>Каталог</h1>
                <div className="gallery--point--buttons">
                    <button className='cat' onClick={() => {
                        setCat(prev => ({ ...prev, isCheckCat: !isCheckCat }))
                    }} >{selectedCat || t.goods.category}
                        <div className={`categories  ${isCheckCat ? 'active' : ''}`}>
                            {
                                categories.map(item => item?.title != selectedCat ? (
                                    <button onClick={() => {
                                        setCat(prev => ({ ...prev, selectedCat: item?.title }))
                                    }}>{item?.title}</button>
                                ) : '')

                            }
                            {
                                selectedCat ? <button onClick={() => {
                                    setCat(prev => ({ ...prev, selectedCat: '' }))
                                }}>{t.goods.category}</button> : ''
                            }
                        </div></button>


                    <button>
                        <img src="/assets/svg/price--arrow.svg" alt="arrow" />
                        {t.goods.price}
                    </button>
                </div>
            </div >
            <div className="gallery--cards">
                {
                    items.map((item: Item) => (
                        <Link className="gallery--cards--fon" style={{ backgroundImage: `url(${item.photo})` }} href={`catalog/${item.id}`}></Link>
                    ))
                }
            </div>
            <div className="gallery--buttons">
                <svg onClick={() => {
                    if (isPrev) {
                        setPage(prev => String(+prev + 1))
                    }
                }} xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <g clip-path="url(#clip0_12_408)">
                        <path
                            d="M0 6.43997V7.55997C0 7.86913 0.088315 8.13309 0.264946 8.35184C0.441576 8.57059 0.671196 8.67997 0.953804 8.67997H6.69293L4.30435 11.2525C4.09783 11.4625 3.99457 11.725 3.99457 12.04C3.99457 12.355 4.09783 12.6175 4.30435 12.8275L4.91576 13.4925C5.11685 13.7083 5.36141 13.8162 5.64946 13.8162C5.93207 13.8162 6.17935 13.7083 6.3913 13.4925L11.6984 7.78747C11.8995 7.57163 12 7.30913 12 6.99997C12 6.69663 11.8995 6.43122 11.6984 6.20372L6.3913 0.516216C6.18478 0.294549 5.9375 0.183716 5.64946 0.183716C5.36685 0.183716 5.12228 0.294549 4.91576 0.516216L4.30435 1.16372C4.09783 1.38538 3.99457 1.6508 3.99457 1.95997C3.99457 2.26913 4.09783 2.53455 4.30435 2.75622L6.69293 5.31997H0.953804C0.671196 5.31997 0.441576 5.42934 0.264946 5.64809C0.088315 5.86684 0 6.1308 0 6.43997Z"
                            fill="#F2F2F2" />
                    </g>
                </svg>
                <div className="gallery--buttons--btn">
                    <Pagination pageCount={page} />
                </div>
                <svg onClick={() => {
                    if (isNext) {
                        setPage(prev => String(+prev - 1))
                    }
                }} xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <g clip-path="url(#clip0_12_408)">
                        <path
                            d="M0 6.43997V7.55997C0 7.86913 0.088315 8.13309 0.264946 8.35184C0.441576 8.57059 0.671196 8.67997 0.953804 8.67997H6.69293L4.30435 11.2525C4.09783 11.4625 3.99457 11.725 3.99457 12.04C3.99457 12.355 4.09783 12.6175 4.30435 12.8275L4.91576 13.4925C5.11685 13.7083 5.36141 13.8162 5.64946 13.8162C5.93207 13.8162 6.17935 13.7083 6.3913 13.4925L11.6984 7.78747C11.8995 7.57163 12 7.30913 12 6.99997C12 6.69663 11.8995 6.43122 11.6984 6.20372L6.3913 0.516216C6.18478 0.294549 5.9375 0.183716 5.64946 0.183716C5.36685 0.183716 5.12228 0.294549 4.91576 0.516216L4.30435 1.16372C4.09783 1.38538 3.99457 1.6508 3.99457 1.95997C3.99457 2.26913 4.09783 2.53455 4.30435 2.75622L6.69293 5.31997H0.953804C0.671196 5.31997 0.441576 5.42934 0.264946 5.64809C0.088315 5.86684 0 6.1308 0 6.43997Z"
                            fill="#F2F2F2" />
                    </g>
                    <defs>
                        <clipPath id="clip0_12_408">
                            <rect width="12" height="14" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div >
    )
}
