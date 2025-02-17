"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"



import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AmefFormsProps } from "./AmefForm.types"

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
import { formSchema } from "./AmefForm.form"



export function AmefForm(props: AmefFormsProps) {
    const { amef } = props
    const router = useRouter()

    const [photoUploaded, setPhotoUploaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            order: amef.order,
            procesoProduccion: amef.especificacionProceso,
            fig: amef.fig,
            proyecto: amef.proyecto,
            cliente: amef.cliente,
            elemento: amef.elemento,
            fechaDeteccion: amef.fechaDeteccion,
            nivelInspeccion: amef.nivelInspeccion,
            planMuestra: amef.planMuestra,
            modoFallo: amef.modoFallo,
            efecto: amef.efecto,
            causaModoFallo: amef.causaModoFallo,
            medidasEnsayo: amef.medidasEnsayo,
            ocurrencia: amef.ocurrencia,
            gravedad: amef.gravedad,
            deteccion: amef.deteccion,
            npr: amef.npr,
            estadoNPR: amef.estadoNPR,
            codigoColaboradorCT: amef.codigoColaboradorCT,
            codigoResponsableInspeccion: amef.codigoResponsableInspeccion,
            accionImplementada: amef.accionImplementada,
            fechaValidacionCorreccion: amef.fechaValidacionCorreccion,
            costoReproceso: amef.costoReproceso
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/amef/${amef.id}`, values)
            toast({
                title: "Registro actualizado en AMEF"
            })
            router.refresh()
            router.push("/AMEF")
        } catch (error) {
            toast({
                title: "Error al actualizar los registros",
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
                        name="order"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de la Orden</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre de la orden" type="text" readOnly {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* PROCESO PRODUCCION */}
                    <FormField
                        control={form.control}
                        name="procesoProduccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Proceso de Producción</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >

                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el proceso" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="Abastecimiento">Abastecimiento</SelectItem>
                                        <SelectItem value="Torres y Apernados">Torres y Apernados</SelectItem>
                                        <SelectItem value="Armado y Soldadura">Armado y Soldadura</SelectItem>
                                        <SelectItem value="Pintura">Pintura</SelectItem>
                                        <SelectItem value="Galvanizado">Galvanizado</SelectItem>
                                        <SelectItem value="PMC">PMC</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* FIG */}
                    <FormField
                        control={form.control}
                        name="fig"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fig / Orden de fabricación</FormLabel>
                                <FormControl>
                                    <Input placeholder="FIG" type="text" readOnly {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Proyecto*/}
                    <FormField
                        control={form.control}
                        name="proyecto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Proyecto</FormLabel>
                                <FormControl>
                                    <Input placeholder="XXXXXXXXXX" type="text" readOnly {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* CLIENTE */}
                    <FormField
                        control={form.control}
                        name="cliente"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cliente</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: SEDEMI" type="text" readOnly {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* ELEMENTO */}
                    <FormField
                        control={form.control}
                        name="elemento"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número de Elemento</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: 1234" type="number" readOnly {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* FECHA DETECCION */}
                    <FormField
                        control={form.control}
                        name="fechaDeteccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha Detección</FormLabel>
                                <FormControl>
                                    <Input placeholder="Fecha de detecccion" type="date" readOnly {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/*NIVEL  INSPECCION*/}
                    <FormField
                        control={form.control}
                        name="nivelInspeccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plan de Inspección</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Actualice el plan de Inspección" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Normal">Normal</SelectItem>
                                        <SelectItem value="Estricto">Estricto</SelectItem>
                                        <SelectItem value="Reducido">Reducido</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    {/*PLAN MUESTRA*/}
                    <FormField
                        control={form.control}
                        name="planMuestra"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plan de Muestreo</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >

                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Actualice el plan de muestra" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="Simple">Simple</SelectItem>
                                        <SelectItem value="Doble">Doble</SelectItem>
                                        <SelectItem value="Múltiple">Múltiple</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                </div>
                <Button type="submit">Completar registro</Button>

            </form>
        </Form>



    )
}