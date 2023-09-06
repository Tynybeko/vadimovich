import React, { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import lang from '@/utils/language'
import useDebounce from '@/hooks/useDebouns'


interface BuyModalProps {
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cupon: React.FC<BuyModalProps> = ({ setClose }) => {
    const { pathname, locale, asPath } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const debounceSearch = useDebounce(cuponSearch, 500)

    function cuponSearch(cupon: string) {

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
                                <p>{t.cart.isError}</p>
                                <button type='reset' className="x">X</button>
                            </form>
                        </div>
                    </div>
                    <div className="cupon--body--count">
                        <h1>{t.cart.goodsCount} 24</h1>
                        <div className="cupon--body--count--flex">
                            <h1>$1243</h1>
                            <button type='reset' onClick={() => {
                                setClose(prev => !prev)
                            }} className="btn">{t.cart.buy}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cupon