"use client"

import { Button } from "@/components/ui/button"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { CirclePlus } from "lucide-react"
import { SetStateAction, useState } from "react"
import { FormCreateOrder } from "../FormCreateOrder"


export function HeaderOrders() {

    const [openModalCreate, setOpenModalCreate] = useState(false)

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl">Lista de Ordenes</h2>

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>Crear Orden</Button>
                </DialogTrigger>
                <DialogContent className="sm:mac-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>
                            Crear Orden
                        </DialogTitle>
                        <DialogDescription>
                            Ingresar los datos de la orden de Inspección
                        </DialogDescription>
                    </DialogHeader>

                    <FormCreateOrder setOpenModalCreate={setOpenModalCreate}/>

                </DialogContent>
            </Dialog>
        </div>
    )
}