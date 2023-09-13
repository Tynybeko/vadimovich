import z, { custom } from "zod";


export const userSchema = z.object({
    email: z.string().email('format'),
    number: z.string().refine(value => {
        const cleanedValue = value.replace(/\D/g, "");
        if (cleanedValue.startsWith("996") && cleanedValue.length === 12) {
            return true;
        }
        return false
    }, 'format'),
    whatsapp_num: z.string().refine(value => {
        const cleanedValue = value.replace(/\D/g, "");
        if (cleanedValue.startsWith("996") && cleanedValue.length === 12) {
            return true;
        }
        return false
    }, 'format'),
    order_name: z.custom<string>((value) => {
        if (!value) {
            return false
        }
        const regex = /^[^0-9\/W\g]*$/;
        return regex.test(`${value}`)
    }, 'format'),
    country: z.custom<string>((value) => {
        if (!value) {
            return false
        }
        return true
    }, 'format'),
    city: z.custom<string>((value) => {
        if (!value) {
            return false
        }
        return true
    }, 'format'),
    shipping_address: z.string().refine(value => value, 'format'),
    delivery: z.enum(['Самовызов', 'Фиксированая стоимость доставки по странам СНГ', 'Фиксированая стоимость доставки']),
    payment: z.enum(['Mbank', 'Перевод на карту', 'Наличными при получении', 'Картой банка при получении']),
});

export type User = z.infer<typeof userSchema>;