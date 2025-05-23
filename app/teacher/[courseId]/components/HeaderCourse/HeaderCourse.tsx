"use client"

import React, { useState } from 'react'
import { HeaderCourseProps } from './HeaderCourse.types'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, MoveLeft, Trash } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

function HeaderCourseClient(props: HeaderCourseProps) {
    const { idCourse, isPublished } = props;
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const onPublish = async (state: boolean) => {
        setLoading(true);
        try {
            await axios.patch(`/api/course/${idCourse}`, {
                isPublished: state,
            });
            toast(state ? "Curso Publicado 🚀" : "Curso oculto 🙈")
            router.refresh();
        } catch (error) {
            toast("Ups! algo ha ido mal 😭")
        }
       
        setLoading(false);
    }
    

    const onDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/course/${idCourse}`);
            toast("Curso eliminado correctamente 🗑️");
            router.push("/teacher");
        } catch (error) {
            toast("Ups! algo ha ido mal al eliminar el curso 😭");
        }
        setLoading(false);
    }

    return (
        <div>
            <div className='mb-4'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <Button onClick={() => router.push("/teacher")}>
                        <MoveLeft />
                        Volver a todos los cursos.
                    </Button>
                    <div className='gap-2 flex items-center'>
                        {isPublished ? (
                            <Button
                                variant="outline"
                                onClick={() => onPublish(false)}
                                disabled={isLoading}
                            >
                                Despublicar
                                <EyeOff />
                            </Button>
                        ) : (
                            <Button
                                disabled={isLoading}
                                onClick={() => onPublish(true)}
                            >
                                Publicar
                                <Eye />
                            </Button>
                        )}
                        <Button
                            variant="destructive"
                            onClick={onDelete}
                            disabled={isLoading}
                        >
                            <Trash />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function HeaderCourse(props: HeaderCourseProps) {
    return <HeaderCourseClient {...props} />
}
