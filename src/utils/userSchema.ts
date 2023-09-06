import z, { custom } from "zod";


export const userSchema = z.object({
    email: z.string().email('format'),
    number: z.string().refine(value => {
        const cleanedValue = value.replace(/\D/g, "");
        if (cleanedValue.startsWith("996") && cleanedValue.length === 12) {
            return true;
        }
    }, 'format'),
    whatsapp_num: z.string().refine((value) => {
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
        const regex = /^[^0-9\/W\g]*$/;
        return regex.test(`${value}`)
    }, 'format'),
    city: z.custom<string>((value) => {
        if (!value) {
            return false
        }
        const regex = /^[^0-9\/W\g]*$/;
        return regex.test(`${value}`)
    }, 'format'),
    shipping_address: z.string().refine(value => value, 'format'),
    delOption: z.enum(['opt1', 'opt2', 'opt3']),
    payOption: z.enum(['opt1', 'opt2', 'opt3', 'opt4']),
});

export type User = z.infer<typeof userSchema>;