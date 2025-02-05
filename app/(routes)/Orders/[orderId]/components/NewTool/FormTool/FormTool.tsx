"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { fromJSON } from "postcss"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage

} from '@/components/ui/form'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Input } from '@/components/ui/input'

import { Toast } from '@/components/ui/toast'


import axios from 'axios'
import { useParams, useRouter } from "next/navigation"
import { FormToolProps } from "./FormTool.types"
import { formSchema } from "./FormTool.form"
import { z } from "zod"
import { FormInput, Variable } from "lucide-react"
import { title } from "process"
import { toast } from "@/hooks/use-toast"



export function FormTool(props: FormToolProps) {

    //const { setOpen } = props

    const { setOpen, orderId } = props; // Recibe el ID de la orden




    const params = useParams<{ orderId: string }>()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            code: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/order/${orderId}/tool`, values); // Usa el ID de la orden
            toast({ title: "Instrumento Agregado" });
            form.reset(); // Limpia el formulario después de guardar
            {/* 
            axios.post(`/api/order/${params.orderId}/contact`, values)
            toast({ title: "Responsables agregados" })
            router.refresh()
            setOpen(false)
            */}
        } catch (error) {
            toast({
                title: "Error presente",
                variant: "destructive"
            })

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-1 grid gap-4">
                <FormField control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Instrumento:</FormLabel>
                            <FormControl>
                                <Input placeholder="Flexómetro" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código Instrumento:</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: 1111r" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit">Guardar Instrumento</Button>

            </form>

        </Form>
    )
}