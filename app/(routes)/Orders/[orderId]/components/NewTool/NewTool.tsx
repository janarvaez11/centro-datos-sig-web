"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { FormTool } from "./FormTool"



export function NewTool(){

    const [open, setOpen] = useState(false)

    return(

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    Agregar Herramienta de Medición
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Agregar un instrumento</DialogTitle>
                    <DialogDescription>Crear los instrumentos de Medición</DialogDescription>
                </DialogHeader>
                {/*<FormTool setOpen={setOpen}/>*/}
            </DialogContent>

        </Dialog>

    )
}