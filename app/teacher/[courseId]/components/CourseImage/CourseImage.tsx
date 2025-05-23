"use client"
import React, { useState } from 'react'

import { FileImage, Pencil } from 'lucide-react'
import { TitleBlock } from '../TitleBlock'
import { CourseImageProps } from './CourseImage.types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/uploadthing'
import { toast } from 'sonner'
import axios from 'axios'



export function CourseImage(props: CourseImageProps) {
    const { idCourse, imageCourse } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(imageCourse);
    const onChangeImage = async (imageUrl: string) => {
        console.log(imageUrl)
        try {
        axios.patch(`/api/course/${idCourse}`,{
            imageUrl,
        })
        toast("Imagen actualizada correctamente")             
        } catch (error) {
           toast.error("Ups. Algo ha salido mal 🙈")
        }

    }
    return (
        <div className='p-4 rounded-lg bg-white h-fit'>
            <TitleBlock title='Imagen del Curso' icon={FileImage} />
            {isEditing ? (
                <div className='bg-slate-300 p-4 mt-2 rounded-lg'>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            onChangeImage(res[0]?.ufsUrl)
                            setImage(res[0]?.ufsUrl)
                            setIsEditing(false)
                        }}
                        onUploadError={() => {
                            toast.error("Ha ocurrido un error... 😭")
                        }}
                    />
                </div>

            ) : (
                <div className="relative w-full h-[250px]">
                    <Image
                        src={image || "/default-course.jpeg"}
                        alt='Curso'
                        className='w-full h-full rounded-md object-cover'
                        width={500}
                        height={250}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/default-course.jpeg";
                        }}
                        loading="lazy"
                        quality={75}
                    />
                </div>
            )}

            <Button
                className='w-full mt-4 '
                variant="outline"
                size='sm'
                onClick={() => setIsEditing(!isEditing)}
            >
                <Pencil className='w-4 h-4' />
                Editar Imagen
            </Button>
        </div>
    )
}
