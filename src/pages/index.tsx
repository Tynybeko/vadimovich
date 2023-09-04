'use client'

import React from 'react'
import Banner from '@/components/banner'
import Goods from '@/components/goods'
import { useEffect } from 'react'


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
