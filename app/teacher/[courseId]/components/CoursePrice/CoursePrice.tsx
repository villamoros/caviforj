"use client"
import React, { useState } from 'react'
import { TitleBlock } from '../TitleBlock'
import { DollarSign } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CoursePriceProps } from './CoursePrice.types'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'

export function CoursePrice(props: CoursePriceProps) {
    const { idCourse, priceCourse } = props;
    const [price, setPrice] = useState<string | undefined>(
        priceCourse || "Gratis"
    );

    const onChangePrice = async() => {
        try {
            await axios.patch(`/api/course/${idCourse}`, {
                price: price
            });
            toast.success("Precio Actualizado!! 🤑");
        } catch (error) {
            toast.error("Error al actualizar el precio");
        }
    }

    return (
        <div className='p-6 bg-white rounded-md h-fit'>
            <TitleBlock title='Precio del Curso' icon={DollarSign} />
            <Select onValueChange={setPrice} defaultValue={price}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Selecciona un precio" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Gratis">Gratis</SelectItem>
                    <SelectItem value="COP$ 50.000">COP$ 50.000</SelectItem>
                    <SelectItem value="COP$ 100.000">COP$ 100.000</SelectItem>
                    <SelectItem value="COP$ 120.000">COP$ 120.000</SelectItem>
                    <SelectItem value="COP$ 150.000">COP$ 150.000</SelectItem>
                </SelectContent>
            </Select>
            <Button
                onClick={onChangePrice}
                disabled={!price}
                className='mt-3'
            >
                Guardar Precio
            </Button>
        </div>
    )
}
