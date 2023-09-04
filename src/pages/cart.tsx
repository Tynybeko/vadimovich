'use client'

import React, { useState, ChangeEvent } from 'react'
import '../styles/Cart.scss'
import { useRouter } from 'next/router'
import lang from '@/utils/language'
import BuyModal from '@/components/buyModal'
import useDebounce from '@/hooks/useDebouns'
import Cupon from '@/components/cupon'

export default function cart() {
  const { pathname, locale, asPath } = useRouter()
  const t = locale == 'ru' ? lang.ru : lang.kg
  const [open, setOpen] = useState<boolean>(false)

  return (
    <main className="main">
      <BuyModal isOpen={open} setClose={setOpen} />
      <div className="container">
        <div className="buy">
          <div className="buy--where">
            <h1>Каталог</h1>
            <span><img src="/assets/svg/red--arrow.svg" alt="arrow" /></span>
            <h1>{t.nav.cart}</h1>
          </div>
          <div className="buy--title">
            <div className="buy--title--img">
              <a href="#" className="gallery--cards--fon act"></a>
            </div>
            <div className="buy--title--text">
              <div className="buy--title--text--top">
                <h1>Футболка классическая</h1>
                <div className="buy--title--text--top--proce">
                  <h1>$1243</h1>
                  <h2>$1578</h2>
                  <button className="title--front--paragraphs--flex--btn--act">X</button>
                </div>
              </div>
              <div className="buy--title--text--center">
                <p>Дизайн: человек 1, человек 2</p>
                <p>{t.goods.compound}: 20% ткани, 80% ткани</p>
              </div>
              <div className="buy--title--text--count">
                <div className="buy--title--text--count--block">
                  <h1>{t.cart.count}</h1>
                  <div className="buy--title--text--count--block--flex">
                    <button className="title--front--paragraphs--flex--btn--act">-</button>
                    <p>2</p>
                    <button className="title--front--paragraphs--flex--btn--act">+</button>
                  </div>
                  <div className="title--front--paragraphs--flex">
                    <p>{t.goods.size}</p>
                    <div className="title--front--paragraphs--flex--btn">
                      <button className="title--front--paragraphs--flex--btn--act act">XS</button>
                      <button className="title--front--paragraphs--flex--btn--act act">S</button>
                      <button
                        className="title--front--paragraphs--flex--btn--act act activ">M</button>
                      <button className="title--front--paragraphs--flex--btn--act act">L</button>
                      <button className="title--front--paragraphs--flex--btn--act act">XL</button>
                      <button className="title--front--paragraphs--flex--btn--act act">XXL</button>
                    </div>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
          <div className="buy--title">
            <div className="buy--title--img">
              <a href="#" className="gallery--cards--fon act"></a>
            </div>
            <div className="buy--title--text">
              <div className="buy--title--text--top">
                <h1>Футболка классическая</h1>
                <div className="buy--title--text--top--proce">
                  <h1>$1243</h1>
                  <h2>$1578</h2>
                  <button className="title--front--paragraphs--flex--btn--act">X</button>
                </div>
              </div>
              <div className="buy--title--text--center">
                <p>Дизайн: человек 1, человек 2
                  Состав: 20% ткани, 80% ткани</p>
              </div>
              <div className="buy--title--text--count">
                <div className="buy--title--text--count--block">
                  <h1>Количество</h1>
                  <div className="buy--title--text--count--block--flex">
                    <button className="title--front--paragraphs--flex--btn--act">-</button>
                    <p>2</p>
                    <button className="title--front--paragraphs--flex--btn--act">+</button>
                  </div>
                  <div className="title--front--paragraphs--flex">
                    <p>Размер</p>
                    <div className="title--front--paragraphs--flex--btn">
                      <button className="title--front--paragraphs--flex--btn--act act">XS</button>
                      <button className="title--front--paragraphs--flex--btn--act act">S</button>
                      <button
                        className="title--front--paragraphs--flex--btn--act act activ">M</button>
                      <button className="title--front--paragraphs--flex--btn--act act">L</button>
                      <button className="title--front--paragraphs--flex--btn--act act">XL</button>
                      <button className="title--front--paragraphs--flex--btn--act act">XXL</button>
                    </div>
                  </div>
                </div>
                <div>

                </div>
              </div>
            </div>
          </div>
          <div className="buy--title">
            <div className="buy--title--img">
              <a href="#" className="gallery--cards--fon act"></a>
            </div>
            <div className="buy--title--text">
              <div className="buy--title--text--top">
                <h1>Футболка классическая</h1>
                <div className="buy--title--text--top--proce">
                  <h1>$1243</h1>
                  <h2>$1578</h2>
                  <button className="title--front--paragraphs--flex--btn--act">X</button>
                </div>
              </div>
              <div className="buy--title--text--center">
                <p>Дизайн: человек 1, человек 2
                  Состав: 20% ткани, 80% ткани</p>
              </div>
              <div className="buy--title--text--count">
                <div className="buy--title--text--count--block">
                  <h1>Количество</h1>
                  <div className="buy--title--text--count--block--flex">
                    <button className="title--front--paragraphs--flex--btn--act">-</button>
                    <p>2</p>
                    <button className="title--front--paragraphs--flex--btn--act">+</button>
                  </div>
                  <div className="title--front--paragraphs--flex">
                    <p>Размер</p>
                    <div className="title--front--paragraphs--flex--btn">
                      <button className="title--front--paragraphs--flex--btn--act act">XS</button>
                      <button className="title--front--paragraphs--flex--btn--act act">S</button>
                      <button
                        className="title--front--paragraphs--flex--btn--act act activ">M</button>
                      <button className="title--front--paragraphs--flex--btn--act act">L</button>
                      <button className="title--front--paragraphs--flex--btn--act act">XL</button>
                      <button className="title--front--paragraphs--flex--btn--act act">XXL</button>
                    </div>
                  </div>
                </div>
                <div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cupon setClose={setOpen} />
    </main>
  )
}
