import { z } from "zod" 

export const formSchema = z.object({
    coursName: z.string().min(2).max(200),
    slug: z.string().min(2).max(200),
})