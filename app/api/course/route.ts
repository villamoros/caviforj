import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        const { courseName, slug, level } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Verificar si el slug ya existe
        const existingCourse = await prisma.course.findUnique({
            where: { slug }
        });

        if (existingCourse) {
            return new NextResponse("Ya existe un curso con este slug", { status: 400 });
        }

        const course = await prisma.course.create({
            data: {
                userId,
                title: courseName,
                slug,
                level,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSE]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}