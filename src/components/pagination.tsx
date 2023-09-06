import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

export default function pagination({ pageCount }: any) {
    const { query: { page, ...somequery } } = useRouter()
    const paginationBtn = []
    for (let i = 1; Math.ceil(+pageCount / 6) >= i; i++) {
        const queryString = new URLSearchParams(somequery as Record<string, string>).toString()
        const url = `/?page=${i}${queryString ? `&${queryString}` : ''}`
        const renderItem = (
            <Link href={url}>
                <button className={`${(page ?? page == i) ? 'active' : page ? '' : 'active'}`} key={i}>
                    {i}
                </button>
            </Link>
        );
        paginationBtn.push(renderItem)

    }

    return <>{paginationBtn}</>

}
