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
import { FormTool } from "../../[orderId]/components/NewTool/FormTool"


export function HeaderOrders() {


    const [openModalCreate, setOpenModalCreate] = useState(false)

    {/*PARA RESPONSABLES*/ }
    const [openResponsiblesModal, setOpenResponsiblesModal] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null); // Estado para el ID de la orden

    const [responsiblesCount, setResponsiblesCount] = useState(0);


    {/*PARA HERRAMIENTAS*/ }
    const [openToolsModal, setOpenToolsModal] = useState(false);

    const [toolsCount, setToolsCount] = useState(0);



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


                <DialogContent className="sm:max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle>
                            Crear Orden
                        </DialogTitle>
                        <DialogDescription>
                            Información General
                        </DialogDescription>
                    </DialogHeader>

                    {/*Para crear una orden
                    <FormCreateOrder setOpenModalCreate={setOpenModalCreate} />*/}
                    <FormCreateOrder
                        setOpenModalCreate={setOpenModalCreate}
                        setOpen={setOpenResponsiblesModal} // Pasa la función para abrir el modal de responsables
                        setOrderId={setOrderId} // Pasa la función para actualizar el orderId

                    />

                </DialogContent>

            </Dialog>



            {/* Modal para Responsables */}
            <Dialog open={openResponsiblesModal} onOpenChange={setOpenResponsiblesModal}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Registrar Responsables</DialogTitle>
                        <DialogDescription>
                            Ingrese la información de los 4 responsables.
                        </DialogDescription>
                    </DialogHeader>
                    {orderId && (
                        <FormContact
                            setOpen={setOpenResponsiblesModal}
                            orderId={orderId}
                            onResponsibleAdded={() => {
                                setResponsiblesCount((prev) => prev + 1);
                                if (responsiblesCount + 1 === 4) {
                                    setOpenResponsiblesModal(false);
                                }
                            }}
                        />
                    )}

                </DialogContent>
            </Dialog>



            {/* Modal para Instrumentos */}
            <Dialog open={openToolsModal} onOpenChange={setOpenToolsModal}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Registrar Responsables</DialogTitle>
                        <DialogDescription>
                            Ingrese la información de los 4 responsables.
                        </DialogDescription>
                    </DialogHeader>
                    {orderId && (
                        <FormTool
                            setOpen={setOpenToolsModal}
                            orderId={orderId}
                            onResponsibleAdded={() => {
                                setToolsCount((prev) => prev + 1);
                                if (toolsCount + 1 === 4) {
                                    setOpenToolsModal(false);
                                }
                            }}
                        />
                    )}

                </DialogContent>
            </Dialog>




        </div>
    )
}