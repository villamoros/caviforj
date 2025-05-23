import { Chapter } from "@prisma/client"

export interface ChaptersBlockProps {
    idCourse: string;
    chapters: Chapter[] | null;
}