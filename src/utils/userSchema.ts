import z from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    phone: z.string().refine(value => {
        const cleanedValue = value.replace(/\D/g, "");
        if (cleanedValue.startsWith("996") && cleanedValue.length === 11) {
            return true;
        }
    }),
    whatsApp: z.string().refine(value => {
        const cleanedValue = value.replace(/\D/g, "");
        if (cleanedValue.startsWith("996") && cleanedValue.length === 11) {
            return true;
        }
    }),
    name: z.string(),
    country: z.string()

});

export type User = z.infer<typeof userSchema>;