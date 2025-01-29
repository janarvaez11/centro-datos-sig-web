"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"



import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { OrderFormsProps } from "./OrderForm.types"

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
import { formSchema } from "./OrderForm.form"



export function OrderForm(props: OrderFormsProps) {
    const { order } = props
    const router = useRouter()

    const [photoUploaded, setPhotoUploaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            order: order.order,
            estado: order.estado,
            tipoInspeccion: order.tipoInspeccion,
            fechaProgramada: order.fechaProgramada,
            procesoProduccion: order.procesoProduccion,
            especificacionProceso: order.especificacionProceso,
            responsableCT: order.responsableCT,
            responsableInspeccion: order.responsableInspeccion,
            instrumentoMedicion: order.instrumentoMedicion,
            codigoInstrumento: order.codigoInstrumento,
            muestra: order.muestra,
            cliente: order.cliente,
            fig: order.fig,
            proyecto: order.proyecto,
            area: order.area,
            designacion: order.designacion,
            norma: order.norma,
            lote: order.lote

        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/order/${order.id}`, values)
            toast({
                title: "Orden Actualizada"
            })
            router.refresh()

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
                                    <Input placeholder="Nombre de la orden" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* ESTADO */}
                    <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado de la Orden</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >

                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el estado" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="Abierto">Abierto</SelectItem>
                                        <SelectItem value="Cerrado">Cerrado</SelectItem>
                                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* TIPO INSPECCION*/}
                    <FormField
                        control={form.control}
                        name="tipoInspeccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de Inspección</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >

                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el tipo de Inspección" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="En proceso">En Proceso</SelectItem>
                                        <SelectItem value="Producto terminado">Producto Terminado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* FECHA PROGRAMADA */}
                    <FormField
                        control={form.control}
                        name="fechaProgramada"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha Programada</FormLabel>
                                <FormControl>
                                    <Input placeholder="Fecha de registro" type="date" {...field} />
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
                                        <SelectItem value="Torres y apernados">Torres y Apernados</SelectItem>
                                        <SelectItem value="Armado y soldadura">Armado y Soldadura</SelectItem>
                                        <SelectItem value="Pintura">Pintura</SelectItem>
                                        <SelectItem value="Galvanizado">Galvanizado</SelectItem>
                                        <SelectItem value="Pmc">PMC</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/*ESPECIFICACION DE  PROCESO*/}
                    <FormField
                        control={form.control}
                        name="especificacionProceso"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Especificación del Proceso</FormLabel>
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
                                        <SelectItem value="Inspeccion grating">Inspección Grating</SelectItem>
                                        <SelectItem value="Inspeccion pasamanos">Inspección Pasamanos</SelectItem>
                                        <SelectItem value="Inspeccion bandejas">Inspección Bandejas Portacables</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* RESPONSABLE CT */}
                    <FormField
                        control={form.control}
                        name="responsableCT"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Responsable del Centro de Trabajo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Codigo Colaborador" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* RESPONSABLE INSPECCION*/}
                    <FormField
                        control={form.control}
                        name="responsableInspeccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Responsable de la Inspección</FormLabel>
                                <FormControl>
                                    <Input placeholder="Codigo Auditor" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/*INSTRUMENTO MEDICION*/}
                    <FormField
                        control={form.control}
                        name="instrumentoMedicion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instrumento de Medición</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >

                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el instrumento" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="Flexometro">Flexómetro</SelectItem>
                                        <SelectItem value="Micrometro">Micrómetro</SelectItem>
                                        <SelectItem value="Medidor especial">Medidor Especial</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CODIGO INSTRUMENTO MEDICION*/}
                    <FormField
                        control={form.control}
                        name="codigoInstrumento"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código del Instrumento utilizado</FormLabel>
                                <FormControl>
                                    <Input placeholder="Codigo " type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* LOTE */}
                    <FormField
                        control={form.control}
                        name="lote"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cantidad de Lote</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: 1234" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* MUESTRA */}
                    <FormField
                        control={form.control}
                        name="muestra"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cantidad de Muestra</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: 1234" type="number" {...field} />
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
                                    <Input placeholder="Ej: SEDEMI" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* FIG */}
                    <FormField
                        control={form.control}
                        name="fig"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fig</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: PMC00XXXX" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* PROYECTO */}
                    <FormField
                        control={form.control}
                        name="proyecto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Proyecto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: ASDF123" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/*AREA*/}
                    <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Area</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >

                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el área" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="Pmc produccion">PMC PRODUCCION</SelectItem>
                                        <SelectItem value="Bodega">BODEGA</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* DESIGNACION */}
                    <FormField
                        control={form.control}
                        name="designacion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Desginación</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: ASDF147" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* NORMA */}
                    <FormField
                        control={form.control}
                        name="norma"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Norma</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: AWS1.1" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Actualizar</Button>

            </form>
        </Form>



    )
}