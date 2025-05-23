import { Chapter, Course } from "@prisma/client";
import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";

export type CourseFormProps = {
    course: CourseWithRelations;
}

type CourseWithRelations = Course & { chapters: Chapter[] };

export const formSchema = z.object({
    title: z.string().min(2).max(200),
    slug: z.string().min(2).max(200),
    description: z.string().min(2).max(500).optional().or(z.literal("")),
    category: z.string().min(2).max(200),
    level: z.string().min(2).max(200),
})