"use client"
import React from 'react'
import { FormChapterNameProps } from './FormChapterName.types'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { formSchema } from './FormChapterName.form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'



export function FormChapterName(props: FormChapterNameProps) {
    const { idCourse, setShowInputChapter } = props;

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            axios.post(`/api/course/${idCourse}/chapter`, {
                title: values.title
            })

            toast("Módulo creado 🚀")
            setShowInputChapter(false)
            router.refresh()
        } catch (error) {
            toast("Hubo un error al crear un módulo 🙈")
            console.log(error)
        }
        console.log(values)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Ej: Introducción a la programación"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={!form.formState.isValid}>
                    Crear Módulo
                </Button>
            </form>
        </Form>
    )
}
