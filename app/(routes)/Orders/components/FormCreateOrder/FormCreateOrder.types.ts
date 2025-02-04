import { Dispatch, SetStateAction } from "react"

export type FormCreateOrderProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>;

    setOpen:Dispatch<SetStateAction<boolean>>;
    
    setOrderId: Dispatch<SetStateAction<string | null>>; // Agregar esta línea


}