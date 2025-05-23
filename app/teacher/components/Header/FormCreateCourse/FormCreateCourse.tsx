"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { z } from "zod" 
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { formSchema } from './FormCreateCourse.form'

export function FormCreateCourse() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            coursName: "",
            slug: "",
            level: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        try {
            const res = await axios.post("/api/course", {
                courseName: values.coursName,
                slug: values.slug,
                level: values.level
            })
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                <FormField
                    control={form.control}
                    name="coursName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Curso</FormLabel>
                            <FormControl>
                                <Input placeholder="Escribe el nombre del curso" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug del Curso</FormLabel>
                            <FormControl>
                                <Input placeholder="nombre-curso" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nivel del Curso</FormLabel>
                            <FormControl>
                                <Input placeholder="Principiante, Intermedio, Avanzado" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Crear curso</Button>
            </form>
        </Form>
    )
} 