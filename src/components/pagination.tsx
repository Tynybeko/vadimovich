
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { SetStateAction } from 'react'

export default function pagination({ pageCount }: { pageCount: number },) {
    const { query: { page, ...somequery } } = useRouter()
    const paginationBtn = []
    let count = Math.ceil(pageCount / 6)

    for (let i = 1; count >= i; i++) {
        const queryString = new URLSearchParams(somequery as Record<string, string>).toString()
        const url = `/?page=${i}${queryString ? `&${queryString}` : ''}`
        const renderItem = (
            <Link href={url}>
                <button className={`${page ? ((+page == i) ? 'active' : '') : (i == 1 ? 'active' : '')}`} key={i}>
                    {i}
                </button>
            </Link >
        );

        paginationBtn.push(renderItem)

    }

    return <>{paginationBtn}</>

}
