"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Cog } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import { CourseFormProps } from "./CourseForm.form";
import { formSchema } from "./CourseForm.form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



export function CourseForm(props: CourseFormProps) {
    const { course } = props;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: course.title || "",
            slug: course.slug || "",
            description: course.description || "",
            category: course.category || "",
            level: course.level || "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            axios.patch(`/api/course/${course.id}`, values)
            toast("Curso actualizado correctamente. 🎉")           
        } catch {
            toast.error("Ups, algo ha salido mal 😭")
        }

    }

    return (
        <div className="p-6 bg-white rounded-md">
            <TitleBlock title="Configuración del Curso" icon={Cog} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título del Curso</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Curso de ReactJS" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Este es lo que el usuario verá como título del curso.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Url del Curso</FormLabel>
                                    <FormControl>
                                        <Input placeholder="curso-de-reactjs" {...field} disabled />
                                    </FormControl>
                                    <FormDescription>
                                        Es única y no se puede modificar.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoría</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona la categoría del curso." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Frontend">Frontend</SelectItem>
                                            <SelectItem value="Backend">Backend</SelectItem>
                                            <SelectItem value="Full Stack">Full Stack</SelectItem>
                                            <SelectItem value="RPA&AI">RPA & Automatización IA</SelectItem>
                                            <SelectItem value="Infraestructura">Infraestructura</SelectItem>
                                            <SelectItem value="Arquitectura">Arquitectura de Software</SelectItem>
                                            <SelectItem value="Diseño UX/UI">Diseño UX/UI Web</SelectItem>
                                            <SelectItem value="Big Data">Big Data</SelectItem>
                                            <SelectItem value="Blockchain">Blockchain</SelectItem>
                                            <SelectItem value="Creación de Contenido">Content Creator</SelectItem>
                                            <SelectItem value="Emprendimiento Digital">Emprendimiento Digital</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nivel de Aprendizaje</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona el nivel de aprendizaje del curso." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Principiante">Principiante</SelectItem>
                                            <SelectItem value="Intermedio">Intermedio</SelectItem>
                                            <SelectItem value="Avanzado">Avanzado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Pon la descripción del curso"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Descripción completa del curso.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">Guardar información básica</Button>

                </form>
            </Form>
        </div>
    )
}
