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
import { Separator } from "@radix-ui/react-select"



export function AmefForm(props: AmefFormsProps) {
    const { amef } = props
    const router = useRouter()

    const [photoUploaded, setPhotoUploaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            order: amef.order,
            procesoProduccion: amef.procesoProduccion,
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

                    <Separator className="col-span-2" />
                    <h2 className="col-span-2 text-lg font-semibold">Completar los registros AMEF</h2>

                    {/* MODO DE FALLO */}
                    <FormField
                        control={form.control}
                        name="modoFallo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Modo de Fallo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Modo de fallo" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* EFECTO */}
                    <FormField
                        control={form.control}
                        name="efecto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Efecto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Efecto" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* CAUSA MODO FALLO */}
                    <FormField
                        control={form.control}
                        name="causaModoFallo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Causa Modo de Fallo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Causa modo de fallo" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* MEDIDAS DE ENSAYO */}
                    <FormField
                        control={form.control}
                        name="medidasEnsayo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Medidas de Ensayo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Medidas de ensayo" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* OCURRENCIA */}
                    <FormField
                        control={form.control}
                        name="ocurrencia"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ocurrencia</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ocurrencia" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* GRAVEDAD */}
                    <FormField
                        control={form.control}
                        name="gravedad"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gravedad</FormLabel>
                                <FormControl>
                                    <Input placeholder="Gravedad" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* DETECCION */}
                    <FormField
                        control={form.control}
                        name="deteccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Detección</FormLabel>
                                <FormControl>
                                    <Input placeholder="Detección" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* NPR */}
                    <FormField
                        control={form.control}
                        name="npr"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>NPR</FormLabel>
                                <FormControl>
                                    <Input placeholder="NPR" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* ESTADO NPR */}
                    <FormField
                        control={form.control}
                        name="estadoNPR"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado NPR</FormLabel>
                                <FormControl>
                                    <Input placeholder="Estado NPR" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* CODIGO COLABORADOR CT */}
                    <FormField
                        control={form.control}
                        name="codigoColaboradorCT"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código Colaborador CT</FormLabel>
                                <FormControl>
                                    <Input placeholder="Código Colaborador CT" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* CODIGO RESPONSABLE INSPECCION */}
                    <FormField
                        control={form.control}
                        name="codigoResponsableInspeccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código Responsable Inspección</FormLabel>
                                <FormControl>
                                    <Input placeholder="Código Responsable Inspección" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* ACCION IMPLEMENTADA */}
                    <FormField
                        control={form.control}
                        name="accionImplementada"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Acción Implementada</FormLabel>
                                <FormControl>
                                    <Input placeholder="Acción Implementada" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* FECHA VALIDACION CORRECCION */}
                    <FormField
                        control={form.control}
                        name="fechaValidacionCorreccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha Validación Corrección</FormLabel>
                                <FormControl>
                                    <Input placeholder="Fecha Validación Corrección" type="date" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* COSTO REPROCESO */}
                    <FormField
                        control={form.control}
                        name="costoReproceso"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Costo Reproceso</FormLabel>
                                <FormControl>
                                    <Input placeholder="Costo Reproceso" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                </div>
                <Button type="submit">Completar registro</Button>

            </form>
        </Form>



    )
}