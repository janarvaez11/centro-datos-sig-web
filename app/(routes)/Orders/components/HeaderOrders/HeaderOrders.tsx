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
import { FormContact } from "../../[orderId]/components/NewContact/FormContact"


export function HeaderOrders() {


    const [openModalCreate, setOpenModalCreate] = useState(false)




    {/*PARA CREAR RESPONSABLES*/ }
    const [open, setOpen] = useState(false)



    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl">Planificación de Inspecciones</h2>


            {/* Modal para Crear Orden */}
            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>Crear Orden</Button>
                </DialogTrigger>


                <DialogContent className="sm:max-w-[1500px]">
                    <DialogHeader>
                        <DialogTitle>
                            Crear Orden
                        </DialogTitle>
                        <DialogDescription>
                            Información General
                        </DialogDescription>
                    </DialogHeader>

                    {/*Para crear una orden*/}
                    <FormCreateOrder setOpenModalCreate={setOpenModalCreate} />

                </DialogContent>

            </Dialog>




        </div>
    )
}