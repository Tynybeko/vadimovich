'use client'

import React, { useEffect, useState } from 'react'
import '../styles/BuyModal.scss'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userSchema } from "../utils/userSchema";
import lang from '@/utils/language';
import { useItemsContext } from '@/hooks/CartContect';
import { Item, buySize } from '@/utils/IGoods';
import { ITEM_API } from '@/utils/axios';
import { RSC } from 'next/dist/client/components/app-router-headers';

type FormData = z.infer<typeof userSchema>;

interface BuyModalProps {
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const postOrder = async (data: any) => {
    return await ITEM_API.post('/orders/user/create/', data)
}


const BuyModal: React.FC<BuyModalProps> = ({ isOpen, setClose }) => {
    const [step, setStep] = useState<number>(1)
    const [resSucces, setResSucces] = useState<boolean>(false)
    const [items, setItems] = useItemsContext()
    const { locale } = useRouter()
    const t = locale == 'ru' ? lang.ru : lang.kg
    const [{ number, whatsapp_num, order_name, email, country, city, shipping_address }, setErr] = useState({
        number: '',
        whatsapp_num: '',
        order_name: '',
        email: '',
        country: '',
        city: '',
        shipping_address: ''
    })

    const {
        handleSubmit,
        register,
        getValues,
        watch,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            number: '',
            whatsapp_num: '',
            order_name: '',
            email: '',
            country: '',
            city: '',
            delivery: 'Самовызов',
            shipping_address: '',
            payment: undefined,
        },
    });


    useEffect(() => {
        for (let [key, { message }] of Object.entries(errors)) {
            setErr(prev => ({ ...prev, [key]: message }))
        }

    }, [errors])
    const selectDel = watch('delivery');
    const selectPay = watch('payment');

    const onSubmit = (data: any) => {
        const myItems: any[] = []
        items.forEach((elem: Item) => {
            let prod = elem?.buySize.filter((item: buySize) => item.quantity > 0)
            myItems.push(...prod)
        })
        const reqData = { ...data, coupon: sessionStorage.getItem('cupon'), items: myItems }
        postOrder(reqData).then(res => {
            localStorage.setItem('cart', '[]')
            sessionStorage.setItem('cupon', '')
            setTimeout(() => {
                setResSucces(true)
                setStep(0)
            }, 1000)
            setItems([])
        })

    }

    const nextModel = () => {
        if (step == 1 && (getValues(['order_name', 'number', 'whatsapp_num', 'email']).every(item => Boolean(item) == true))) {
            for (let [key, { message }] of Object.entries(errors)) {
                if (key != 'country' && key != 'city' && key != 'payment' && key != "shipping_address" && Boolean(message)) {
                    return
                }
            }
            setStep(prev => prev + 1)
        } else if (step == 2 && (getValues(['country', 'city', 'shipping_address']).every(item => Boolean(item) == true))) {
            for (let [key, { message }] of Object.entries(errors)) {
                if (key != 'payment' && Boolean(message)) {
                    return
                }
            }
            setStep(prev => prev + 1)
        }
    }

    return (
        <div className={`data ${isOpen ? 'block' : ''}`}>
            <form onSubmit={handleSubmit(onSubmit)} className='data--regist'>
                <button type='button' onClick={() => {

                    setClose(prev => !prev)
                }} className='data--regist--close'>X</button>
                <div className={`data--regist--title ${step == 1 ? 'activ' : ''}`}>
                    <div className="data--regist--title--text">
                        <h1 className="activ">{t.model.data}</h1>
                        <h1>{t.model.delevery}</h1>
                        <h1>{t.model.pay}</h1>
                    </div>
                    <h1>Личные данные</h1>
                    <div className="data--regist--title--inputs">
                        <div className='form-inner' >
                            <label htmlFor="">
                                <input
                                    {...register("order_name", { required: true })}
                                    id='order_name'
                                    type="text"
                                    name='order_name'
                                    placeholder={t.model.name}
                                />
                                <p className="text-red-600 text-sm">
                                    {errors?.order_name?.message ? t.valid[order_name ? "format" : "required"] : 'V '}

                                </p>
                            </label>
                            <label htmlFor="">
                                <input
                                    {...register("email", { required: "Заполните форму" })}
                                    type="text"
                                    name='email'
                                    id='email'
                                    placeholder="E-Mail"
                                />
                                <p className="text-red-600 text-sm">
                                    {errors?.email?.message ? t.valid[email ? "format" : "required"] : 'V '}
                                </p>
                            </label>
                            <label htmlFor="whatsapp_num">
                                <input
                                    {...register("whatsapp_num", { required: "Заполните форму" })}
                                    id='whatsapp_num'
                                    name='whatsapp_num'
                                    placeholder="WhatsApp"

                                />
                                <p className="text-red-600 text-sm">
                                    {errors?.whatsapp_num?.message ? t.valid[whatsapp_num ? "format" : "required"] : 'V '}
                                </p>
                            </label>
                            <label htmlFor="number">
                                <input
                                    {...register("number", { required: "Заполните форму" })}
                                    id='number'
                                    name='number'
                                    placeholder="Телефон"
                                />
                                <p className="text-red-600 text-sm">
                                    {errors?.number?.message ? t.valid[number ? 'format' : "required"] : 'V '}
                                </p>
                            </label>
                        </div>
                        <button type='submit' onClick={nextModel} id="next">{t.model.continue}</button>
                    </div>
                </div>
                <div className={`data--regist--title ${step == 2 ? 'activ' : ''}`}>
                    <div className="data--regist--title--text">
                        <h1>{t.model.data}</h1>
                        <h1 className="activ">{t.model.delevery}</h1>
                        <h1>{t.model.pay}</h1>
                    </div>
                    <h1>Доставка</h1>
                    <div className="data--regist--title--inputs">
                        <div className='form-inner'>
                            <label className='radio-input' htmlFor="delivery">
                                {selectDel == 'Самовызов' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input
                                    type="radio"
                                    {...register("delivery", { required: "Заполните форму" })}
                                    id='delivery'
                                    name='delivery'
                                    value={'Самовызов'}
                                />
                                <p>{t.model.pickup}</p>
                            </label>
                            <label className='radio-input' htmlFor="delivery2">
                                {selectDel == 'Фиксированая стоимость доставки по странам СНГ' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input type="radio"
                                    {...register("delivery", { required: "Заполните форму" })}
                                    value={'Фиксированая стоимость доставки по странам СНГ'}
                                    id='delivery2'
                                    name='delivery'

                                />
                                <p>{t.model.fixDelCountry}</p>
                            </label>
                            <label className='radio-input' htmlFor="delivery3">
                                {selectDel == 'Фиксированая стоимость доставки' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input
                                    type="radio"
                                    {...register("delivery", { required: "Заполните форму" })}
                                    value={'Фиксированая стоимость доставки'}
                                    id='delivery3'
                                    name='delivery'
                                />
                                <p>{t.model.fixDel}</p>
                            </label>
                            <label htmlFor="">
                                <input
                                    {...register("country", { required: "Заполните форму" })}
                                    type="text"
                                    name='country'
                                    id='country'
                                    placeholder={t.model.country}
                                />
                                <p className="text-red-600 text-sm">
                                    {errors?.country?.message ? t.valid[country ? "format" : "required"] : 'V '}
                                </p>
                            </label>
                            <label htmlFor="">
                                <input
                                    {...register("city", { required: "Заполните форму" })}
                                    type="tel"
                                    id='city'
                                    name='city'
                                    placeholder={t.model.city}

                                />
                                <p className="text-red-600 text-sm">
                                    {errors?.city?.message ? t.valid[city ? "format" : "required"] : 'V '}

                                </p>
                            </label>
                            <label htmlFor="">
                                <input
                                    {...register("shipping_address", { required: "Заполните форму" })}
                                    id='shipping_address'
                                    type="text"
                                    name='shipping_address'
                                    placeholder={t.model.adress}
                                />
                                <p className="text-red-600 text-sm">
                                    {errors?.shipping_address?.message ? t.valid[shipping_address ? 'format' : "required"] : 'V '}
                                </p>
                            </label>
                        </div>
                        <button type='submit' onClick={nextModel} id="next">Продолжить</button>
                    </div>
                </div>
                <div className={`data--regist--title ${step == 3 ? 'activ' : ''}`}>
                    <div className="data--regist--title--text">
                        <h1>{t.model.data}</h1>
                        <h1>{t.model.delevery}</h1>
                        <h1 className="activ">{t.model.pay}</h1>
                    </div>
                    <h1>Оплата</h1>
                    <div className="data--regist--title--inputs">
                        <div className='form-inner'>
                            <label className='radio-input' htmlFor="payment1">
                                {selectPay == 'Mbank' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : <img src="/assets/svg/btn--fon.svg" alt="" />}
                                <input
                                    type="radio"
                                    {...register("payment", { required: "Заполните форму" })}
                                    id='payment1'
                                    name='payment'
                                    value={'Mbank'}
                                />
                                <p>Mbank</p>
                            </label>
                            <label className='radio-input' htmlFor="payment2">
                                {selectPay == 'Перевод на карту' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input
                                    type="radio"
                                    {...register("payment", { required: "Заполните форму" })}
                                    id='payment2'
                                    name='payment'
                                    value={'Перевод на карту'}
                                />
                                <p>{t.model.cardv1}</p>
                            </label>
                            <label className='radio-input' htmlFor="payment3">
                                {selectPay == 'Картой банка при получении' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input
                                    type="radio"
                                    {...register("payment", { required: "Заполните форму" })}
                                    id='payment3'
                                    name='payment'
                                    value={'Картой банка при получении'}

                                />
                                <p>{t.model.cardv2}</p>
                            </label>
                            <label className='radio-input' htmlFor="payment4">
                                {selectPay == 'Наличными при получении' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input
                                    type="radio"
                                    {...register("payment", { required: "Заполните форму" })}
                                    id='payment4'
                                    name='payment'
                                    value={'Наличными при получении'}
                                />
                                <p>{t.model.cash}</p>
                            </label>
                        </div>
                        <button type='submit'>Завершить</button>
                    </div>
                </div>
                <div className={`data--regist--title ${resSucces ? 'activ' : ''}`}>
                    <h1>Спасибо за ваш заказ </h1>
                    <h2>Заказ в обработке мы с вами скоро свяжемся</h2>
                    <div className="data--regist--title--inputs">
                        <button type='reset' onClick={() => {

                            setClose(prev => !prev)
                        }} id="next">Завершить</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default BuyModal
