
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

    const { setOpenTools, orderId } = props; // Recibe el ID de la orden




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


/*

"use client"


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


import { Toast } from '@/components/ui/toast'


import axios from 'axios'
import { useParams, useRouter } from "next/navigation"
import { FormToolProps } from "./FormTool.types"
//import { formSchema } from "./FormContact.form"
import { z } from "zod"
import { FormInput, Variable } from "lucide-react"
import { title } from "process"
import { toast } from "@/hooks/use-toast"



import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Modificar el esquema para manejar múltiples responsables
const formSchema = z.object({
    tool: z.array(z.object({
        userId: z.string().optional(),
        name: z.string().min(2),
        code: z.string(),
        responsible: z.string(),
    })).length(4)
});

export function FormTool({ setOpenTools, orderId }: FormToolProps) {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<Array<any>>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tools: Array(4).fill({
                userId: "",
                name: "",
                code: "",
                responsible: ""
            })
        }
    });



        // Función mejorada para buscar el instrumento
        const searchTool = async (code: string, index: number) => {
            if (code.length < 3) return; // Solo buscar si hay al menos 2 caracteres
    
            try {
                const response = await axios.get(`/api/tool/search?code=${code}`);
                console.log("Respuesta de búsqueda:", response.data); // Para debugging
    
                if (response.data) {
                    const tool = response.data;
                    // Actualizar todos los campos del formulario
                    form.setValue(`tools.${index}.toolId`, tool.id);
                    form.setValue(`tools.${index}.name`, tool.name);
                    form.setValue(`tools.${index}.code`, tool.code);  // Asegúrate que coincida con el campo en la BD
                    form.setValue(`tools.${index}.responsible`, tool.responsible);
                }
            } catch (error) {
                console.error("Error en búsqueda:", error);
                toast({ 
                    title: "Error en la búsqueda", 
                    description: "No se encontró el usuario",
                    variant: "destructive" 
                });
            }
        };

        const onSubmit = async (values: z.infer<typeof formSchema>) => {
            try {
                setLoading(true);
                console.log("Enviando datos:", values); // Para debugging
    
                // Validar que todos los contactos tengan userId
                const allContactsValid = values.tools.every(contact => tools.userId);
                if (!allContactsValid) {
                    toast({ 
                        title: "Error de validación", 
                        description: "Todos los contactos deben ser usuarios válidos",
                        variant: "destructive" 
                    });
                    return;
                }
    
                // Registrar todos los contactos
                await Promise.all(values.tools.map(tool => 
                    axios.post(`/api/order/${orderId}/tool`, tool)
                ));
                
                toast({ title: "Instrumentos registrados exitosamente" });
                setOpenTools(false);
            } catch (error) {
                console.error("Error al registrar:", error);
                toast({ 
                    title: "Error al registrar responsables", 
                    description: "Por favor intente nuevamente",
                    variant: "destructive" 
                });
            } finally {
                setLoading(false);
            }
        };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Codigo</TableHead>
                            <TableHead>Responsable</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {form.watch('tools').map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <FormField
                                        control={form.control}
                                        name={`contacts.${index}.name`}
                                        render={({ field }) => (
                                            <Input 
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    searchUser(e.target.value, index);
                                                }}
                                                placeholder="Buscar usuario..."
                                            />
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        control={form.control}
                                        name={`contacts.${index}.role`}
                                        render={({ field }) => (
                                            <Input {...field} readOnly />
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        control={form.control}
                                        name={`contacts.${index}.code`}
                                        render={({ field }) => (
                                            <Input {...field} readOnly />
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        control={form.control}
                                        name={`contacts.${index}.function`}
                                        render={({ field }) => (
                                            <Input {...field} readOnly />
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Button 
                    type="submit" 
                    className="mt-4 w-full"
                    disabled={loading}
                >
                    Registrar Responsables
                </Button>
            </form>
        </Form>
    );
}
    */