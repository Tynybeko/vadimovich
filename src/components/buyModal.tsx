'use client'

import React, { useEffect, useState } from 'react'
import '../styles/BuyModal.scss'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userSchema } from "../utils/userSchema";
import lang from '@/utils/language';

type FormData = z.infer<typeof userSchema>;

interface BuyModalProps {
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
}



const BuyModal: React.FC<BuyModalProps> = ({ isOpen, setClose }) => {
    const [step, setStep] = useState<number>(1)
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
            delOption: 'opt1',
            shipping_address: '',
            payOption: 'opt1',
        },
    });


    useEffect(() => {
        for (let [key, { message }] of Object.entries(errors)) {
            setErr(prev => ({ ...prev, [key]: message }))
        }
    }, [errors])
    const selectDel = watch('delOption');
    const selectPay = watch('payOption');
    const onSubmit = () => {

    }

    const nextModel = () => {
        if (step == 1 && (getValues(['order_name', 'number', 'whatsapp_num', 'email']).every(item => Boolean(item) == true))) {
            for (let [key, { message }] of Object.entries(errors)) {
                if ((key != 'country' && key != 'city') && !Boolean(message)) {
                    return
                }
            }
            setStep(prev => prev + 1)
        } else if (step == 2 && (getValues(['country', 'city', 'shipping_address']).every(item => Boolean(item) == true))) {
            for (let [key, { message }] of Object.entries(errors)) {
                if (!Boolean(message)) {
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
                                    id='name'
                                    type="text"
                                    name='name'
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
                            <label htmlFor="">
                                <input
                                    {...register("whatsapp_num", { required: "Заполните форму" })}
                                    type="tel"
                                    id='whatsapp_num'
                                    name='whatsapp_num'
                                    placeholder="WhatsApp"

                                />
                                <p className="text-red-600 text-sm">
                                    {errors?.whatsapp_num?.message ? t.valid[whatsapp_num ? "format" : "required"] : 'V '}

                                </p>
                            </label>
                            <label htmlFor="">
                                <input
                                    {...register("number", { required: "Заполните форму" })}
                                    id='number'
                                    type="tel"
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
                            <label className='radio-input' htmlFor="delOption">
                                {selectDel == 'opt1' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input
                                    type="radio"
                                    {...register("delOption", { required: "Заполните форму" })}
                                    id='delOption'
                                    name='delOption'
                                    value={'opt1'}
                                />
                                <p>{t.model.pickup}</p>
                            </label>
                            <label className='radio-input' htmlFor="delOption2">
                                {selectDel == 'opt2' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input type="radio"
                                    {...register("delOption", { required: "Заполните форму" })}
                                    value={'opt2'}
                                    id='delOption2'
                                    name='delOption'

                                />
                                <p>{t.model.fixDelCountry}</p>
                            </label>
                            <label className='radio-input' htmlFor="delOption3">
                                {selectDel == 'opt3' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input
                                    type="radio"
                                    {...register("delOption", { required: "Заполните форму" })}
                                    value={'opt3'}
                                    id='delOption3'
                                    name='delOption'
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
                            <label className='radio-input' htmlFor="payOption">
                                {selectPay == 'opt1' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : <img src="/assets/svg/btn--fon.svg" alt="" />}
                                <input
                                    type="radio"
                                    {...register("payOption", { required: "Заполните форму" })}
                                    id='payOption'
                                    name='payOption'
                                    value={'opt1'}

                                />
                                <p>Mbank</p>
                            </label>
                            <label className='radio-input' htmlFor="payOption2">
                                {selectPay == 'opt2' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input type="radio"
                                    {...register("payOption", { required: "Заполните форму" })}
                                    id='payOption2'
                                    name='payOption'
                                    value={'opt2'}

                                />
                                <p>{t.model.cardv1}</p>
                            </label>
                            <label className='radio-input' htmlFor="payOption3">
                                {selectPay == 'opt3' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input
                                    type="radio"
                                    {...register("payOption", { required: "Заполните форму" })}
                                    id='payOption3'
                                    name='payOption'
                                    value={'opt3'}

                                />
                                <p>{t.model.cardv2}</p>
                            </label>
                            <label className='radio-input' htmlFor="payOption4">
                                {selectPay == 'opt4' ? <img src="/assets/svg/radio-checked.svg" alt="" /> : (<img src="/assets/svg/btn--fon.svg" alt="" />)}
                                <input
                                    type="radio"
                                    {...register("payOption", { required: "Заполните форму" })}
                                    id='payOption4'
                                    name='payOption'
                                    value={'opt4'}
                                />
                                <p>{t.model.cash}</p>
                            </label>
                        </div>
                        <button type='submit'>Завершить</button>
                    </div>
                </div>
                <div className={`data--regist--title ${step == 4 ? 'activ' : ''}`}>
                    <h1>Спасибо за ваш заказ </h1>
                    <h2>Заказ в обработке мы с вами скоро свяжемся</h2>
                    <div className="data--regist--title--inputs">
                        <button id="next">Завершить</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default BuyModal
