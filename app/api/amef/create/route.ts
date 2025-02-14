import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Obtener la orden relacionada para obtener los datos existentes
        const order = await db.order.findFirst({
            where: {
                order: data.order
            }
        });

        if (!order) {
            return new NextResponse("Orden no encontrada", { status: 404 });
        }

        // Crear el registro AMEF combinando datos de la orden y los nuevos datos
        const amef = await db.amef.create({
            data: {
                order: order.order,
                especificacionProceso: order.especificacionProceso,
                fig: order.fig,
                proyecto: order.proyecto,
                cliente: order.cliente,
                elemento: data.elemento,
                fechaDeteccion: data.fechaDeteccion,
                nivelInspeccion: order.nivelInspeccion,
                planMuestra: order.planMuestra,
                // Campos que se completarán después
                modoFallo: "",
                efecto: "",
                causaModoFallo: "",
                medidasEnsayo: "",
                ocurrencia: "",
                gravedad: "",
                deteccion: "",
                npr: "",
                estadoNPR: "",
                codigoColaboradorCT: "",
                codigoResponsableInspeccion: "",
                accionImplementada: "",
                fechaValidacionCorreccion: "",
                costoReproceso: ""
            }
        });

        return NextResponse.json(amef);
    } catch (error) {
        console.error("[AMEF_CREATE]", error);
        return new NextResponse("Error interno", { status: 500 });
    }
} 