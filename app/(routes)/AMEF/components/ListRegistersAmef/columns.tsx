"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import { Amef } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import Image from "next/image"


export const columns: ColumnDef<Amef>[] = [
    {
        accessorKey: "order",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Orden de Inspección
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "procesoProduccion",
        header: "Proceso",
    },
    {
        accessorKey: "fig",
        header: "FIG",
    },
    {
        accessorKey: "proyecto",
        header: "Proyecto",
    },
    {
        accessorKey: "cliente",
        header: "Cliente",
    },
    {
        accessorKey: "elemento",
        header: "Elemento",
    },
    {
        accessorKey: "fechaDeteccion",
        header: "Fecha detección",
    },
    {
        accessorKey: "modoFallo",
        header: "Modo de Falla",
    },
    {
        accessorKey: "efecto",
        header: "Efecto",
    },
    {
        accessorKey: "causaModoFallo",
        header: "Causa del Modo de Falla",
    },
    {
        accessorKey: "medidasEnsayo",
        header: "Medidas de Ensayo",
    },
    {
        accessorKey: "npr",
        header: "NPR",
    },
    {
        accessorKey: "estadoNPR",
        header: "Estado NPR",
    },
    {
        accessorKey: "accionImplementada",
        header: "Acción Implementada",
    },
    {
        accessorKey: "fechaValidacionCorreccion",
        header: "Fecha Corrección",
    },
    {
        accessorKey: "costoReproceso",
        header: "Costo de Reproceso",
    },

    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const { id } = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="w-8 h-4 p-0">
                            <span className="sr-only">
                                Open Menu
                            </span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">

                        <Link href={`/AMEF/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className="w-4 h-4" mr-2 />
                                Completar Registro
                            </DropdownMenuItem>
                        </Link>

                    </DropdownMenuContent>

                </DropdownMenu>
            )

        }

    },

]