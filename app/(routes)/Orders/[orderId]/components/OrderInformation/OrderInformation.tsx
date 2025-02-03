import { User } from "lucide-react";
import { OrderInformationProps } from "./OrderInformation.types";
import Image from "next/image";
import { OrderForm } from "../OrderForm";
import { NewContact } from "../NewContact";
import { ListContacts } from "../ListContacts";

export function OrderInformation(props: OrderInformationProps) {

    const { order } = props

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4" >
                <div>
                    {/*<Image src={order.profileImage} alt="Imagen de Orden" width={50} height={50} className="rounded-lg mb-3"/>*/}
                    <OrderForm order={order}/>
                </div>



            </div>

            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        <User className="w-5 h-5" />
                        Responsables
                    </div>
                    <div>
                        {/* TO DO: NUEVO CONTACTO */}
                        <NewContact/>
                    </div>

                </div>
                <ListContacts order={order}/>

            </div>

        </div>
    )
}