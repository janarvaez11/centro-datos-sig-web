import { Dispatch, SetStateAction } from "react"

export type FormToolProps = {

    setOpen: Dispatch<SetStateAction<boolean>>;

    orderId: string;
    
    onResponsibleAdded: () => void;// Añade esta línea


};