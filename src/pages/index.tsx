
import React from 'react'
import Banner from '@/components/banner'
import Goods from '@/components/goods'
import { ITEM_API } from '@/utils/axios';


export default function index({ data }: { data: any }) {

  return (
    <main className='main'>
      <div className='container'>
        <Banner />
        <Goods />
      </div>
    </main>

  )
}
