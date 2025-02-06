"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { UserFormsProps } from "./UserForm.types"

import {

    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

import {

    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { Toast } from "@/components/ui/toast"
import { toast } from "@/hooks/use-toast"


import { UploadButton } from "@/utils/uploadthing"
import { formSchema } from "./UserForm.form"



export function UserForm(props: UserFormsProps) {
    const { user } = props
    const router = useRouter()

    const [photoUploaded, setPhotoUploaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
      
            name: user.name,
            rol: user.rol,
            code: user.code,
            function: user.function

        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/user/${user.id}`, values)
            toast({
                title: "Usuario Actualizado"
            })
            router.refresh()

        } catch (error) {
            toast({
                title: "Error al actualizar los registros A",
                variant: "destructive"
            })

        }

    }



    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-3">

                    {/* ORDEN */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del Usuario</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del Usuario" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* ESTADO */}
                    <FormField
                        control={form.control}
                        name="rol"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Escoja del Rol</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >

                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el rol" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="Rol A">Rol A</SelectItem>
                                        <SelectItem value="Rol B">Rol B</SelectItem>
                                        <SelectItem value="Rol C">Rol C</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* TIPO INSPECCION*/}
                    <FormField
                        control={form.control}
                        name="function"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Función:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >

                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione la función" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="Funcion A">Funcion A</SelectItem>
                                        <SelectItem value="Funcion B">Funcion B</SelectItem>
                                        <SelectItem value="Funcion C">Funcion C</SelectItem>
                                        <SelectItem value="Funcion D">Funcion D</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                  

                    {/* LOTE */}
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Codigo de Colaborador</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: 1234" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                
                </div>
                <Button type="submit">Actualizar Usuario</Button>

            </form>
        </Form>



    )
}