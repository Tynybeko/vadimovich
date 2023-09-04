'use client'

import React from 'react'
import '../styles/BuyModal.scss'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userSchema } from "../utils/userSchema";

type FormData = z.infer<typeof userSchema>;

interface BuyModalProps {
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
}


const BuyModal: React.FC<BuyModalProps> = ({ isOpen, setClose }) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            phone: '',
            whatsApp: '',
            name: '',
            email: '',
            country: ''

        }
    });
    const onSubmit = (isValid: any) => {
        console.log(isValid)
    }

    return (
        <div className={`data ${isOpen ? 'block' : ''}`}>
            <form onSubmit={handleSubmit(onSubmit)} className='data--regist'>
                <button type='button' onClick={() => {
                    setClose(prev => !prev)
                }} className='data--regist--close'>X</button>
                <div className="data--regist--title activ">
                    <div className="data--regist--title--text">
                        <h1 className="activ">Личные данные</h1>
                        <h1>Доставка</h1>
                        <h1>Оплата</h1>
                    </div>
                    <h1>Личные данные</h1>
                    <div className="data--regist--title--inputs">
                        <div className='form-inner' >
                            <label htmlFor="">
                                <input
                                    {...register("name", { required: "Заполните форму" })}
                                    id='name'
                                    type="text"
                                    name='name'
                                    placeholder="Имя"
                                />
                                {errors?.email && (
                                    <p className="text-red-600 text-sm">
                                        {errors?.email?.message}
                                    </p>
                                )}
                            </label>
                            <label htmlFor="">
                                <input
                                    {...register("email", { required: "Заполните форму" })}
                                    type="email"
                                    name='email'
                                    id='email'
                                    placeholder="E-Mail"
                                />
                                {errors?.email && (
                                    <p className="text-red-600 text-sm">
                                        {errors?.email?.message}
                                    </p>
                                )}
                            </label>
                            <label htmlFor="">
                                <input
                                    {...register("phone", { required: "Заполните форму" })}
                                    pattern="^\+996\d{9}$"
                                    type="text"
                                    placeholder="Whatsapp"
                                />
                                {errors?.phone && (
                                    <p className="text-red-600 text-sm">
                                        {errors?.phone?.message}
                                    </p>
                                )}
                            </label>
                            <label htmlFor="">
                                <input
                                    {...register("whatsApp", { required: "Заполните форму" })}
                                    id='whatsApp'
                                    type="tel"
                                    pattern="^\+996\d{9}$"
                                    placeholder="Телефон"
                                />
                                {errors?.whatsApp && (
                                    <p className="text-red-600 text-sm">
                                        {errors?.whatsApp?.message}
                                    </p>
                                )}
                            </label>

                        </div>
                        <button type='button' id="next">Продолжить</button>

                    </div>
                </div>
                <div className="data--regist--title">
                    <div className="data--regist--title--text">
                        <h1>Личные данные</h1>
                        <h1 className="activ">Доставка</h1>
                        <h1>Оплата</h1>
                    </div>
                    <h1>Доставка</h1>
                    <div className="data--regist--title--inputs">
                        <div className='form-inner'>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Самовивоз</p>
                            </button>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Страна</p>
                            </button>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Фиксированая стоимость доставки по странам СНГ</p>
                            </button>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Город</p>
                            </button>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Фиксированая стоимость доставки</p>
                            </button>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Адресс доставки</p>
                            </button>
                        </div>
                        <button id="next">Продолжить</button>
                    </div>
                </div>
                <div className="data--regist--title">
                    <div className="data--regist--title--text">
                        <h1>Личные данные</h1>
                        <h1>Доставка</h1>
                        <h1 className="activ">Оплата</h1>
                    </div>
                    <h1>Оплата</h1>
                    <div className="data--regist--title--inputs">
                        <div className='form-inner'>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Mbank</p>
                            </button>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Наличными при получении</p>
                            </button>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Перевод на карту</p>
                            </button>
                            <button><img src="/assets/svg/btn--fon.svg" alt="" />
                                <p>Картой банка при получении</p>
                            </button>
                        </div>
                        <button id="next">Завершить</button>
                    </div>
                </div>
                <div className="data--regist--title">
                    <h1>Спасибо за ваш заказ </h1>
                    <h2>Заказ в обработке мы с вами скоро свяжемся</h2>
                    <div className="data--regist--title--inputs">
                        <button id="next">Завершить</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BuyModal
