'use client'

import React, { SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getItems } from './goods';
import { Item } from '@/utils/IGoods';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';



export default function Posts({ setPage, isSingle }: { setPage: React.Dispatch<SetStateAction<number>>, isSingle: boolean }) {
    const { query, } = useRouter()
    const [items, setItems] = useState<Item[]>([])
    const category = query?.category
    const search = new URLSearchParams(query as Record<string, string>).toString()
    const [isLoading, setLoading] = useState<boolean>(false)
    console.log(query.id);
    
    let myID = 0
    if (query?.id) {
        myID = +query?.id
    }


    useEffect(() => {
        getItems(search)
            .then(res => {
                setItems([...(res?.results ?? [])])
                setPage(res?.count)
                setLoading(true)
            })
    }, [search])

    return (
        <div className="gallery--cards">
            {
                !isLoading ?
                    <h1>Loading...</h1>
                    :
                    !isSingle ?
                        items.map((item: Item) =>
                            category ?
                                (item?.category == category ?
                                    (
                                        <Link className="gallery--cards--fon" style={{ backgroundImage: `url(${item.photo})` }} href={`/catalog/${item.id}`}>
                                        </Link>
                                    )
                                    : '')
                                : (
                                    <Link className="gallery--cards--fon" style={{ backgroundImage: `url(${item.photo})` }} href={`/catalog/${item.id}`}></Link>
                                )
                        )
                        :
                        <Swiper
                            modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
                            spaceBetween={20}
                            slidesPerView={3}
                            navigation
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false

                            }}
                            breakpoints={{
                                375: {
                                    slidesPerView: 1,
                                },
                                780: {

                                    slidesPerView: 2
                                },
                                1075: {
                                    slidesPerView: 3
                                }
                            }}
                            speed={3000}
                            scrollbar={{ draggable: true }}
                        >
                            {
                                items.filter((item: Item) => item.id != +myID).sort((a: any, b: any) => 0.5 - Math.random()).map((item: Item) =>
                                (

                                    <SwiperSlide>  <Link className="gallery--cards--fon" style={{ backgroundImage: `url(${item.photo})` }} href={`/catalog/${item.id}`}></Link></SwiperSlide>
                                ))

                            }
                        </Swiper>
            }
        </div>
    )
}
