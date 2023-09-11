'use client'

import React, { useState, ChangeEvent, useEffect } from 'react'
import '../styles/Cart.scss'
import { useRouter } from 'next/router'
import lang from '@/utils/language'
import BuyModal from '@/components/buyModal'
import useDebounce from '@/hooks/useDebouns'
import Cupon from '@/components/cupon'
import { useItemsContext } from '@/hooks/CartContect'
import { Item } from '@/utils/IGoods'
import { createMarkup } from './catalog/[id]'
import PostCart from '@/components/PostCart'





export default function cart() {
  const { pathname, locale, asPath } = useRouter()
  const t = locale == 'ru' ? lang.ru : lang.kg
  const [open, setOpen] = useState<boolean>(false)
  const [items, setItems] = useItemsContext()
  const [reqItems, setReqItems] = useState<any[]>([])

  useEffect(() => {
    const req = localStorage.getItem('reqItems') ?? '[]'
    setReqItems([...JSON.parse(req)])
  }, [])

  return (
    <main className="main">
      <BuyModal isOpen={open} setClose={setOpen} />
      <div className="container">
        <div className="buy">
          {
            items.length ? (
              <div className="buy--where">
                <h1>Каталог</h1>
                <span><img src="/assets/svg/red--arrow.svg" alt="arrow" /></span>
                <h1>{t.nav.cart}</h1>
              </div>

            ) : ""
          }

          {
            items.length ? items.map((elem: Item) => (
              <PostCart item={elem} />
            ))
              : <h1 className='ZERO'>Пока корзина пуст...</h1>
          }

        </div>
      </div>
      <Cupon setClose={setOpen} />
    </main>
  )
}
