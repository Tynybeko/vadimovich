import React from 'react'
import Banner from '@/components/banner'
import Goods from '@/components/goods'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Vadimovich Store: Главная страница",
  description: "Магазин одежды Вадимович"
}


export default function index() {
  return (
    <main className='main'>
      <div className='container'>
        <Banner />
        <Goods />
      </div>
    </main>

  )
}
