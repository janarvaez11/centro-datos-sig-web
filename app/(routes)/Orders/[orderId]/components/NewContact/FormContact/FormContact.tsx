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
import { FormContactProps } from "./FormContact.types"
import { formSchema } from "./FormContact.form"
import { z } from "zod"
import { FormInput, Variable } from "lucide-react"
import { title } from "process"
import { toast } from "@/hooks/use-toast"



export function FormContact(props: FormContactProps) {

    const { setOpen } = props

    const params = useParams<{ orderId: string }>()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            code: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            axios.post(`/api/order/${params.orderId}/contact`, values)
            toast({title: "Responsables agregados"})
            router.refresh()
            setOpen(false)
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
                            <FormLabel>Nombre:</FormLabel>
                            <FormControl>
                                <Input placeholder="Colaborador" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cargo:</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccion el cargo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                                    <SelectItem value="Auditor">Auditor</SelectItem>
                                    <SelectItem value="Rol 1">Rol 1 </SelectItem>
                                    <SelectItem value="Rol 2">Rol 2</SelectItem>
                                </SelectContent>

                                <FormMessage />

                            </Select>
                        </FormItem>
                    )}
                />


                <FormField control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código Colaborado:</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: 1111r" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Guardar Responsables</Button>

            </form>

        </Form>
    )
}