import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;
        const { list } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId: userId
            }
        });

        if (!course) {
            return new NextResponse("Curso no encontrado", { status: 404 });
        }

        // Actualizar las posiciones de los capítulos
        for (const item of list) {
            await prisma.chapter.update({
                where: { id: item.id },
                data: { position: item.position }
            });
        }

        return NextResponse.json({ message: "Capítulos reordenados exitosamente" });
    } catch (error) {
        console.log("[CHAPTER_REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
} 