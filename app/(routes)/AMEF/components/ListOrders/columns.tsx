"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import { Order } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import Image from "next/image"


export const columns: ColumnDef<Order>[] = [
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
        accessorKey: "tipoInspeccion",
        header: "Proceso",
    },
    {
        accessorKey: "fechaProgramada",
        header: "FIG",
    },
    {
        accessorKey: "lote",
        header: "Proyecto",
    },
    {
        accessorKey: "cliente",
        header: "Cliente",
    },
    {
        accessorKey: "fig",
        header: "Elemento",
    },
    {
        accessorKey: "area",
        header: "Fecha detección",
    },
    {
        accessorKey: "nivelInspeccion",
        header: "Plan de Inspección",
        cell: ({ row }) => {
            const nivelInspeccion = row.getValue("nivelInspeccion") as string; // Aseguramos que 'estado' es un string

            let backgroundColor = "";
            let textColor = "text-white"; // Para el color del texto

            // Asignamos el color de fondo y texto según el estado
            if (nivelInspeccion === "Normal") {
                backgroundColor = "bg-green-500"; // Verde
            } else if (nivelInspeccion === "Estricto") {
                backgroundColor = "bg-orange-500"; // Amarillo
                textColor = "text-black"; // Texto negro para contraste
            } else if (nivelInspeccion === "Reducido") {
                backgroundColor = "bg-yellow-500"; // Rojo
            }

            return (
                <div className={`py-1 px-3 rounded-lg ${backgroundColor} ${textColor}`}>
                    {nivelInspeccion}
                </div>
            );
        }
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

                        <Link href={`/Orders/${id}`}>
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