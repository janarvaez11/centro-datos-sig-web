"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import axios from "axios"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import { useRef, useState } from "react"
import { FormCreateOrderProps } from "./FormCreateOrder.types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { title } from "process"
import { Toast } from "@/components/ui/toast"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Separator } from "@radix-ui/react-separator"

import { useEffect } from "react"


const formSchema = z.object({
    order: z.string().min(2),
    estado: z.string().min(2),
    tipoInspeccion: z.string().min(2),
    fechaProgramada: z.string().min(2),
    procesoProduccion: z.string().min(2),
    especificacionProceso: z.string().min(2),
    muestra: z.string().min(2),
    cliente: z.string().min(2),
    fig: z.string().min(2),
    proyecto: z.string().min(2),
    area: z.string().min(2),
    designacion: z.string().min(2),
    norma: z.string().min(2),
    lote: z.string().min(2)
})



export function FormCreateOrder(props: FormCreateOrderProps) {


    {/*PARA GENERA EL NUMERO DE ORDEN */ }
    const [order, setOrderNumber] = useState("");


    {/*Crear una función para obtener el último número de orden*/ }
    useEffect(() => {
        const fetchNextOrderNumber = async () => {
            try {
                const response = await axios.get("/api/order/last"); // Obtiene la última orden
                const lastOrder = response.data?.order || "ODI00000";

                // Si la respuesta indica que no hay órdenes, inicializa con ODI00001
                const nextOrder = lastOrder === "ODI00000" ? "ODI00001" : `ODI${String(parseInt(lastOrder.replace("ODI", ""), 10) + 1).padStart(5, "0")}`;

                console.log("Nuevo número de orden generado:", nextOrder);

                setOrderNumber(nextOrder);  // Actualiza el estado del número de orden
                form.setValue("order", nextOrder, { shouldValidate: true });

            } catch (error) {
                console.error("Error obteniendo el número de orden:", error);
                setOrderNumber("ODI00001");
                form.setValue("order", "ODI00001", { shouldValidate: true });
            }
        };

        fetchNextOrderNumber();
    }, []);


    //const { setOpenModalCreate} = props
    const { setOpenModalCreate, setOpen, setOrderId } = props

    const router = useRouter()

    const [photoUploaded, setPhotoUploaded] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            order: "",
            estado: "",
            tipoInspeccion: "",
            fechaProgramada: "",
            procesoProduccion: "",
            especificacionProceso: "",
            muestra: "",
            cliente: "",
            fig: "",
            proyecto: "",
            area: "",
            designacion: "",
            norma: "",
            lote: "",


        },
    })

    const { isValid } = form.formState

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            //axios.post("/api/order", values)
            const responseOrder = await axios.post("/api/order", values);
            const orderId = responseOrder.data.id; // Suponiendo que el backend devuelve el ID


            toast({ title: "Orden Creada Correctamente" })



            // Llamar al flujo de Power Automate para registrar en SharePoint
            const response = await fetch("https://prod-136.westus.logic.azure.com:443/workflows/51ffde8d7bd14ff0a3eea66cd36c001e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kWpnGHilCBgpHBdZUp-AhEbqZ07IauXu20prUxWr3wY", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ordenInspeccion: values.order,
                    estadoInspeccion: values.estado,
                    tipoInspeccion: values.tipoInspeccion,
                    fechaInspeccion: values.fechaProgramada,
                    procesoProduccionInspeccion: values.procesoProduccion,
                    procesoEspecificacionInspeccion: values.especificacionProceso,
                    muestraInspeccion: values.muestra,
                    clienteInspeccion: values.cliente,
                    proyectoInspeccion: values.proyecto,
                    figInspeccion: values.fig,
                    areaInspeccion: values.area,
                    designacionInspeccion: values.designacion,
                    normaInspeccion: values.norma,
                    loteInspeccion: values.lote,
                }),
            })
            if (response.ok) {
                toast({ title: "Datos enviados correctamente a Power Automate y SharePoint" })
            } else {
                toast({ title: "Error al enviar los datos a Power Automate", variant: "destructive" })
            }



           // Abre el modal de responsables y pasa el ID de la orden
           setOrderId(orderId); // Actualiza el orderId
           setOpen(true); // Abre el modal de responsables

            router.refresh()
            setOpenModalCreate(false)

        } catch (error) {
            Toast({
                title: "Something went wrong",
                variant: "destructive"
            })

        }
    }

    return (
        <div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-4 gap-3">

                        <FormField
                            control={form.control}
                            name="order"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número de Orden</FormLabel>
                                    <FormControl>
                                        <Input readOnly {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="estado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
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
                                                <SelectValue placeholder="Seleccione el tipo" />
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

                        <FormField
                            control={form.control}
                            name="fechaProgramada"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fecha</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full p-2 border rounded pl-10"
                                            placeholder="Seleccione una fecha"
                                            type="date"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


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
                                                <SelectValue placeholder="Seleccione la especificación" />
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

                        <FormField
                            control={form.control}
                            name="cliente"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cliente</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: SEDEMI" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fig"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fig</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: PMC00XXXX" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="proyecto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Proyecto</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: 75XXXXX" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


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

                        <FormField
                            control={form.control}
                            name="designacion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designación</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: ASDXX" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="norma"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Norma Aplicable</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: ASDXX" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lote"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cantidad de Lote</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: 0000" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="muestra"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Muestra</FormLabel>
                                    <FormControl>
                                        <Input placeholder="2000" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>
                    <Button type="submit" disabled={!isValid}> Registrar Orden</Button>
                </form>
            </Form>

        </div>
    )
}


